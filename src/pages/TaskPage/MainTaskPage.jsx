import { useState, useEffect } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { useTaskContext } from "../../contexts/TaskContext"
import DndColumn from "../../components/DndColumn"
import useAuth from "../../hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskCard from "../../components/TaskCard"

const defaultColumns = [
  { id: "To-Do", title: "To-Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Done", title: "Done" },
]

const MainTaskPage = () => {
  const { tasks, updateTask, moveTask, reorderTasks, logActivity } = useTaskContext()
  const {user} = useAuth()
  const [columns, setColumns] = useState({
    "To-Do": [],
    "In Progress": [],
    Done: [],
  })
  const [activeTask, setActiveTask] = useState(null)

  useEffect(() => {
    const newColumns = {
      "To-Do": tasks.filter((task) => task.category === "To-Do").sort((a, b) => a.order - b.order),
      "In Progress": tasks.filter((task) => task.category === "In Progress").sort((a, b) => a.order - b.order),
      Done: tasks.filter((task) => task.category === "Done").sort((a, b) => a.order - b.order),
    }
    setColumns(newColumns)
  }, [tasks])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const findContainer = (id) => {
    if (id in columns) return id

    return Object.keys(columns).find((key) => columns[key].some((task) => task._id === id))
  }

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t._id === event.active.id)
    if (task) setActiveTask(task)
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (!over) return

    const activeContainer = findContainer(active.id)
    const overContainer = findContainer(over.id)

    if (!activeContainer || !overContainer) return

    if (activeContainer !== overContainer) {
      // Moving to a different column
      const activeTask = tasks.find((t) => t._id === active.id)
      if (activeTask) {
        // Update local state first for immediate feedback
        setColumns((prev) => {
          const activeItems = prev[activeContainer]
          const overItems = prev[overContainer]
          const activeIndex = activeItems.findIndex((item) => item._id === active.id)

          return {
            ...prev,
            [activeContainer]: activeItems.filter((item) => item._id !== active.id),
            [overContainer]: [...overItems, { ...activeItems[activeIndex], category: overContainer }],
          }
        })

        // Update database
        await moveTask(activeTask._id, overContainer)

        // Log activity
        await logActivity({
          title: `Task '${activeTask.title}' was moved from ${activeContainer} to ${overContainer}`,
          userEmail: user?.email, 
        })
      }
    } else {
      // Reordering within the same column
      const oldIndex = columns[activeContainer].findIndex((item) => item._id === active.id)
      const newIndex = columns[activeContainer].findIndex((item) => item._id === over.id)

      if (oldIndex !== newIndex) {
        // Update local state first for immediate feedback
        const newItems = arrayMove(columns[activeContainer], oldIndex, newIndex)
        const updatedTasks = newItems.map((task, index) => ({
          ...task,
          order: index,
        }))

        setColumns((prev) => ({
          ...prev,
          [activeContainer]: updatedTasks,
        }))

        // Update database
        await reorderTasks(updatedTasks, activeContainer)

        // Log activity
        await logActivity({
          title: `Task '${columns[activeContainer][oldIndex].title}' was reordered in ${activeContainer}`,
          userEmail: user?.email, 
        })
      }
    }

    setActiveTask(null)
  }

  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold my-4">
          TasksZen Dashboard
        </CardTitle>
        
      </CardHeader>
      <CardContent className={"p-0"}>
      <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {defaultColumns.map((column) => (
          <DndColumn key={column.id} id={column.id} title={column.title} tasks={columns[column.id]} />
        ))}
      </div>
      <DragOverlay>{activeTask ? <TaskCard task={activeTask} /> : null}</DragOverlay>
    </DndContext>
    </CardContent>
    </div>
  )
}

export default MainTaskPage

