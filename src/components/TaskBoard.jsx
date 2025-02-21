import { Droppable } from "react-beautiful-dnd"
import TaskColumn from "./TaskColumn"
import { Card } from "./ui/card"
import { ListTodo, Timer, CheckCircle } from "lucide-react"

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

export default function TaskBoard({ columns }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Object.entries(columns).map(([columnId, tasks]) => (
        <Droppable key={columnId} droppableId={columnId}>
          {(provided, snapshot) => (
            <Card
              className={`p-4 bg-gradient-to-b ${columnColors[columnId]} border-t-4 ${
                columnId === "To-Do"
                  ? "border-t-blue-500"
                  : columnId === "In Progress"
                    ? "border-t-yellow-500"
                    : "border-t-green-500"
              } transition-all duration-200 ${snapshot.isDraggingOver ? "scale-[1.02]" : ""}`}
            >
              <div {...provided.droppableProps} ref={provided.innerRef} className="h-full">
                <div className="flex items-center gap-2 mb-4">
                  {columnIcons[columnId]}
                  <h2 className="text-xl font-semibold">{columnId}</h2>
                  <span className="ml-auto bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                    {tasks.length}
                  </span>
                </div>
                <TaskColumn columnId={columnId} tasks={tasks} />
                {provided.placeholder}
              </div>
            </Card>
          )}
        </Droppable>
      ))}
    </div>
  )
}

