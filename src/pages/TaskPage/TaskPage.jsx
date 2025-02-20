import { DragDropContext } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import TaskBoard from "../../components/TaskBoard";
import { useTaskContext } from "../../contexts/TaskContext";

export default function TaskPage() {
  const navigate = useNavigate();
  const { tasks, isLoading, isError, moveTask } = useTaskContext();
  const { toast } = useToast();

  const columns = {
    "To-Do": tasks.filter((task) => task.category === "To-Do"),
    "In Progress": tasks.filter((task) => task.category === "In Progress"),
    Done: tasks.filter((task) => task.category === "Done"),
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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks</div>;

  return (
    <div className="min-h-screen bg-background p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">
            Task Flow Dashboard
          </CardTitle>
          <Button onClick={handleLogout}>
            Logout
            <LogOut className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <TaskBoard columns={columns} />
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
}
