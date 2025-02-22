import { useState } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import useAuth from "../hooks/useAuth"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddTaskForm({ columnId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addTask } = useTaskContext()
  const {user} = useAuth()
  const [date, setDate] = useState("")
  const [priority, setPriority] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title) return
    const taskInfo = {
      title,
      description,
      category: columnId,
      deadline: date,
      priorityLevel: priority,
      name: user?.displayName,
      userEmail: user?.email
    }
    setIsSubmitting(true)
    try {
      const result = await addTask(taskInfo)
      if(result.insertedCount){
        setIsSubmitting(false)
        setIsOpen(false)
        setTitle("")
        setDescription("")
        Swal.fire({
          title: "Successfully Added!",
          text: `${result?.task?.title} is added To-do task`,
          icon: "success"
        });
      }
      
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Failed!",
        text: `Failed to Added new tasks`,
        icon: "failed"
      });
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4 border-dashed border-2 hover:border-solid">
          <Plus className="w-4 h-4 mr-2" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                Deadline
            </Label>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-base font-medium text-gray-700">
                    Priority Level
            </Label>
            <Select value={priority} onValueChange={setPriority} className={"pt-2 space-y-2"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className={"mt-2"}>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
               </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

