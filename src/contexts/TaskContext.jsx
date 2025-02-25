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
  const reorderTasksMutation = useMutation( {
    mutationFn: ({ tasks, category }) => axiosSecured.post("/tasks/reorder", { tasks, category, userEmail: user?.email }),
      onSuccess: () => {
        queryClient.setQueryData(["tasks"], data.data)
      },
  })
  // const reorderTasksMutation = useMutation( {
  //   mutationFn: ({ tasks, category }) => axiosSecured.post("/tasks/reorder", { tasks, category, userEmail: user?.email }),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["tasks"])
  //     },
  // })
  const moveTaskMutation = useMutation({
    mutationFn: ({ taskId, newCategory }) =>
      axiosSecured.put(`/tasks/${taskId}/move`, {
        newCategory,
        userEmail: user?.email,
      }),
      onSuccess: (data) => {
        queryClient.setQueryData(["tasks"], data.data)
      },
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

  // const moveTask = useCallback(
  //   (taskId, newCategory) => {
  //     const task = tasks.find((t) => t._id === taskId)
  //     if (task) {
  //       updateTaskMutation.mutate({ ...task, category: newCategory })
  //     }
  //   },
  //   [tasks, updateTaskMutation]
  // )
  const moveTask = useCallback(
    (taskId, newCategory) => {
      return moveTaskMutation.mutateAsync({ taskId, newCategory })
    },
    [moveTaskMutation],
  )
  // Rerecord task 
  const reorderTasks = useCallback(
    (tasks, category) => {
      reorderTasksMutation.mutateAsync({ tasks, category })
    },
    [reorderTasksMutation],
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
    <TaskContext.Provider value={{setSearch, search, tasks, isLoading, isError, addTask, updateTask, deleteTask, moveTask, logActivity, reorderTasks }}>
      {children}
    </TaskContext.Provider>
  )
}