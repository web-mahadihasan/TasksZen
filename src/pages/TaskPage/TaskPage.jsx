import { DragDropContext } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import TaskBoard from "../../components/TaskBoard";
import { useTaskContext } from "../../contexts/TaskContext";
import useAuth from "../../hooks/useAuth";

export default function TaskPage() {
  const { tasks, isLoading, isError, moveTask, logActivity } = useTaskContext();
  const {user} = useAuth()

  const columns = {
    "To-Do": tasks?.filter((task) => task.category === "To-Do"),
    "In Progress": tasks?.filter((task) => task.category === "In Progress"),
    Done: tasks?.filter((task) => task.category === "Done"),
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find((t) => t._id === draggableId);
    if (task) {
      moveTask(draggableId, destination.droppableId);
      logActivity({
        title: `Task '${task.title}' was moved from ${source.droppableId} to ${destination.droppableId}`,
        userEmail: user?.email,
      })
    }
  };
  // const onDragEnd = (result) => {
  //   const { destination, source, draggableId } = result

  //   if (!destination) return

  //   if (destination.droppableId === source.droppableId && destination.index === source.index) {
  //     return
  //   }

  //   const sourceColumn = columns[source.droppableId]
  //   const destColumn = columns[destination.droppableId]
  //   const task = sourceColumn.find((t) => t._id === draggableId)

  //   if (source.droppableId === destination.droppableId) {
  //     // Reordering within the same column
  //     const newTasks = Array.from(sourceColumn)
  //     newTasks.splice(source.index, 1)
  //     newTasks.splice(destination.index, 0, task)

  //     const updatedTasks = newTasks.map((t, index) => ({ ...t, order: index }))
  //     reorderTasks(updatedTasks)
  //     logActivity({
  //       title: `Task '${task.title}' was reordered in ${source.droppableId}`,
  //       userEmail: "user@example.com", // Replace with actual user email
  //     })
  //   } else {
  //     // Moving to a different column
  //     const sourceTasks = Array.from(sourceColumn)
  //     sourceTasks.splice(source.index, 1)
  //     const destTasks = Array.from(destColumn)
  //     destTasks.splice(destination.index, 0, { ...task, category: destination.droppableId })

  //     const updatedSourceTasks = sourceTasks.map((t, index) => ({ ...t, order: index }))
  //     const updatedDestTasks = destTasks.map((t, index) => ({ ...t, order: index }))

  //     reorderTasks([...updatedSourceTasks, ...updatedDestTasks])
  //     updateTask({ ...task, category: destination.droppableId })
  //     logActivity({
  //       title: `Task '${task.title}' was moved from ${source.droppableId} to ${destination.droppableId}`,
  //       userEmail: "user@example.com", // Replace with actual user email
  //     })
  //   }
  // }


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks</div>;

  return (
    <div className="min-h-screen bg-background p-6">
    <div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold my-4">
          TasksZen Dashboard
        </CardTitle>
        {/* <Button onClick={handleLogout}>
          Logout
          <LogOut className="ml-2 h-4 w-4" />
        </Button> */}
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskBoard columns={columns} />
        </DragDropContext>
      </CardContent>
    </div>
  </div>
  );
}
