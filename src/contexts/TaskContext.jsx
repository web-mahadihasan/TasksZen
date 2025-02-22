import { createContext, useContext, useCallback, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import useAxiosSecured from "../hooks/useAxiosSecured"
import useAuth from "../hooks/useAuth"

const TaskContext = createContext(undefined)

export const useTaskContext = () => {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}

export const TaskProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const axiosSecured = useAxiosSecured()
  const {user} = useAuth()
  const [search, setSearch] = useState("")

  const fetchTasks = async () => {
    const response = await axiosSecured.get(`/tasks/${user?.email}?search=${search}`)
    return response.data
  }

  // set data for query
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks", search],
    queryFn: fetchTasks,
  })

  // data mutation
  const addTaskMutation = useMutation({
    mutationFn: (newTask) => axiosSecured.post("/tasks", newTask)
    .then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  })

  const updateTaskMutation = useMutation({
    mutationFn: (task) => axiosSecured.put(`/tasks/${task._id}`, task)
    .then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  })

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => axiosSecured.delete(`/tasks/${taskId}`)
    .then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  })

  const addTask = useCallback(
    async (task) => {
      const response = await addTaskMutation.mutateAsync(task)
      return response;
    },
    [addTaskMutation]
  )

  const updateTask = useCallback(
    async (task) => {
      const response = await updateTaskMutation.mutateAsync(task)
      return response;
    },
    [updateTaskMutation]
  )

  const deleteTask = useCallback(
    async (taskId) => {
      const response = await deleteTaskMutation.mutateAsync(taskId)
      return response;
    },
    [deleteTaskMutation]
  )

  const moveTask = useCallback(
    (taskId, newCategory) => {
      const task = tasks.find((t) => t._id === taskId)
      if (task) {
        updateTaskMutation.mutate({ ...task, category: newCategory })
      }
    },
    [tasks, updateTaskMutation]
  )

  // Activity log user 
  const logActivity = useCallback(async (activity) => {
    try {
      await axiosSecured.post("/activities", activity)
    } catch (error) {
      console.error("Failed to log activity:", error)
    }
  }, [])

  return (
    <TaskContext.Provider value={{setSearch, search, tasks, isLoading, isError, addTask, updateTask, deleteTask, moveTask, logActivity }}>
      {children}
    </TaskContext.Provider>
  )
}