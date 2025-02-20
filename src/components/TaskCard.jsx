import { useState } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2, Trash2, Save, X, Clock } from "lucide-react"
import { format } from "date-fns"

export default function TaskCard({ task }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const { updateTask, deleteTask } = useTaskContext()
  const [editedCategory, setEditedCategory] = useState(task.category)
  const { toast } = useToast()

  const handleEdit = () => {
    if (isEditing) {
      updateTask({
        ...task,
        title: editedTitle,
        description: editedDescription,
        category: editedCategory,
      })
      setIsEditing(false)
      toast({
        title: "Task updated",
        description: "The task has been successfully updated.",
      })
    } else {
      setIsEditing(true)
    }
  }

  const handleDelete = () => {
    deleteTask(task._id)
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
    })
  }

  return (
    <Card className="mb-4 group">
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                maxLength={50}
                className="font-medium text-lg"
                placeholder="Task title"
              />
            ) : (
              <h3 className="font-medium text-lg line-clamp-2">{task.title}</h3>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <time>{format(new Date(task.timestamp), "MMM d, yyyy")}</time>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {isEditing ? (
            <>
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                maxLength={200}
                placeholder="Task description"
                className="min-h-[100px]"
              />
              <Select value={editedCategory} onValueChange={setEditedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To-Do">To-Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </>
          ) : (
            <p className="text-muted-foreground text-sm line-clamp-3">
              {task.description || "No description provided"}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleEdit}>
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

