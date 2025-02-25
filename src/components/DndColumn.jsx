import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Card } from "@/components/ui/card"
import { ListTodo, Timer, CheckCircle } from "lucide-react"
import DndCard from "./DndCard"
import AddTaskForm from "./AddTaskForm"
import TaskCard from "./TaskCard"


const columnIcons = {
  "To-Do": <ListTodo className="w-5 h-5" />,
  "In Progress": <Timer className="w-5 h-5" />,
  Done: <CheckCircle className="w-5 h-5" />,
}

const columnColors = {
  "To-Do": "from-blue-500/10 to-blue-500/5",
  "In Progress": "from-yellow-500/10 to-yellow-500/5",
  Done: "from-green-500/10 to-green-500/5",
}

const DndColumn = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "column",
      accepts: ["task"],
    },
  })

  return (
    <Card
      ref={setNodeRef}
      className={`p-4 bg-gradient-to-b h-fit ${columnColors[id]} border-t-4 ${
        id === "To-Do" ? "border-t-blue-500" : id === "In Progress" ? "border-t-yellow-500" : "border-t-green-500"
      }`}
    >
      <div className="h-full">
        <div className="flex items-center gap-2 mb-4">
          {columnIcons[id]}
          <h2 className="text-xl font-semibold">{title}</h2>
          <span className="ml-auto bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">{tasks.length}</span>
        </div>
        <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4 min-h-[50px]">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </SortableContext>
        <AddTaskForm columnId={id} />
      </div>
    </Card>
  )
}


export default DndColumn

