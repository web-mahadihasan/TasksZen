import { Draggable } from "react-beautiful-dnd"
import TaskCard from "./TaskCard"
import AddTaskForm from "./AddTaskForm"

export default function TaskColumn({ columnId, tasks }) {
    return (
      <div>
        {tasks.map((task, index) => (
          <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`mb-4 ${snapshot.isDragging ? "opacity-50" : ""}`}
              >
                <TaskCard task={task} />
              </div>
            )}
          </Draggable>
        ))}
        <AddTaskForm columnId={columnId} />
      </div>
    )
  }

