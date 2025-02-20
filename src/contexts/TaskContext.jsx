import { createContext, useContext, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

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

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks")
    return response.data
  }

  // ✅ Corrected `useQuery` syntax for React Query v5
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  })

  // ✅ Corrected `useMutation` syntax for React Query v5
  const addTaskMutation = useMutation({
    mutationFn: (newTask) => axios.post("http://localhost:5000/tasks", newTask),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  })

  const updateTaskMutation = useMutation({
    mutationFn: (task) => axios.put(`http://localhost:5000/tasks/${task._id}`, task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  })

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => axios.delete(`http://localhost:5000/tasks/${taskId}`),
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
