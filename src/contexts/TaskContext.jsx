import { createContext, useContext, useCallback } from "react"
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

  const fetchTasks = async () => {
    const response = await axiosSecured.get(`/tasks/${user?.email}`)
    return response.data
  }

  // set data for query
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  })

  // data mutation
  const addTaskMutation = useMutation({
    mutationFn: (newTask) => axiosSecured.post("/tasks", newTask),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  })

  const updateTaskMutation = useMutation({
    mutationFn: (task) => axiosSecured.put(`/tasks/${task._id}`, task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  })

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => axiosSecured.delete(`/tasks/${taskId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  })

  const addTask = useCallback(
    (task) => {
      addTaskMutation.mutate(task)
    },
    [addTaskMutation]
  )

  const updateTask = useCallback(
    (task) => {
      updateTaskMutation.mutate(task)
    },
    [updateTaskMutation]
  )

  const deleteTask = useCallback(
    (taskId) => {
      deleteTaskMutation.mutate(taskId)
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

  return (
    <TaskContext.Provider value={{ tasks, isLoading, isError, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  )
}
