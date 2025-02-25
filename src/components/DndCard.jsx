import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Clock } from "lucide-react"
import { format } from "date-fns"

const DndCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-4 group cursor-move">
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-medium text-lg line-clamp-2">{task.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <time>{format(new Date(task.deadline), "MMM d, yyyy")}</time>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-3">{task.description || "No description provided"}</p>
        <div className="flex justify-end gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost">
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="destructive">
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}


export default DndCard

