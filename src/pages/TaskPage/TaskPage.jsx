import { DragDropContext } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import TaskBoard from "../../components/TaskBoard";
import { useTaskContext } from "../../contexts/TaskContext";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../LoadingPage/LoadingPage";

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
  


  if (isLoading) return <div><LoadingPage/></div>;
  if (isError) return <div>Error loading tasks</div>;

  return (
    <div className="min-h-screen bg-background p-6">
    <div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold my-4">
          TasksZen Dashboard
        </CardTitle>
        
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
