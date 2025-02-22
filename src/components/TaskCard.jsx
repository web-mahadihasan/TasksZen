import { useState } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2, Trash2, Save, X, Clock } from "lucide-react"
import { differenceInDays, format } from "date-fns"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import Swal from "sweetalert2"
import { Badge } from "@/components/ui/badge"

export default function TaskCard({ task }) {
  const [isOpen, setIsOpen] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedCategory, setEditedCategory] = useState(task.category)
  const { updateTask, deleteTask } = useTaskContext()
  const [editDate, setEditDate] = useState(new Date(task.createDate))
  const [editPriority, setEditPriority] = useState(task.priorityLevel)

  const handleEdit = async () => {
    const result = await updateTask({
      ...task,
      title: editedTitle,
      description: editedDescription,
      category: editedCategory,
      deadline: editDate,
      priorityLevel: editPriority
    })
    if(result._id){
      Swal.fire({
        title: "Successfully Updated!",
        text: `${result?.title} is Updated`,
        icon: "success"
      });
    }
    setIsOpen(false)
  }

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#22b573",
      confirmButtonText: "Deleted",
      cancelButtonText: "Keep it"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteTask(task._id)
          if(result.deletedCount > 0){
            Swal.fire({
              title: "Successfully Deleted!",
              text: "Your taks has been deleted successfully.",
              icon: "success"
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Failed!",
            text: "Task was not deleted! Try Again.",
            icon: "error"
          });
        }
        
      }
    });
    
  }
  const daysDifference = differenceInDays(new Date(task.deadline), new Date);
  
  return (
    <Card className="mb-4 group">
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-medium text-lg line-clamp-2 capitalize">
              {task.title} <Badge variant="outline" 
               className={`${
                task?.priorityLevel === "High"
                  ? task?.category !== "Done"
                    ? "border-red-500 text-red-500"
                    : "border-emerald-500 text-emerald-500"
                  : task?.priorityLevel === "Medium"
                  ? task?.category !== "Done"
                    ? "border-orange-500 text-orange-500"
                    : "border-emerald-500 text-emerald-500"
                  : "border-emerald-500 text-emerald-500"
              }`}
              >{task?.priorityLevel}</Badge> 
              <Badge variant="outline" 
               className={`ml-2
                ${
                  task?.category === "To-Do"
                    ? "border-blue-500 text-blue-500"
                    : task?.category === "In Progress"
                      ? "border-yellow-500 text-yellow-500"
                      : "border-green-500 text-green-500"
                }`}
              >{task?.category}</Badge>
              </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <time>{format(new Date(task.createDate), "MMM d, yyyy")}</time>
              </div>
              <Badge variant="outline" className={` py-1 flex items-center gap-1 ${daysDifference <= 1 && task.category !== "Done" ? "border-red-300 text-red-500": "border-emerald-400 text-main"}`}>
                <span>Deadline: </span>
                <span>{format(new Date(task.deadline), "MMM d, yyyy")}</span>
              </Badge>
             
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-3">{task.description || "No description provided"}</p>
        
        <div className="flex justify-end gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost">
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    maxLength={200}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select value={editedCategory} onValueChange={setEditedCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To-Do">To-Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Update deadline   */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                      Deadline
                  </Label>
                  <Calendar mode="single" selected={editDate} onSelect={setEditDate} className="rounded-md border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-base font-medium text-gray-700">
                          Category
                  </Label>
                  <Select value={editPriority} onValueChange={setEditPriority} className={"pt-2 space-y-2"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className={"mt-2"}>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEdit}>Save Changes</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}

