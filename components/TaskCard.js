import { CheckIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react';

export const TaskCard = ({
  task,
  openModal,
  deleteTask,
  toggleComplete,
  isCompleted,
}) => {
  const PriorityBorderColors = {
    High: 'bg-rose-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  const PriorityTextColors = {
    High: 'text-rose-300',
    Medium: 'text-yellow-300',
    Low: 'text-green-300',
  };

  return (
    <div
      className={`${
        !isCompleted ? PriorityBorderColors[task.priority] : ''
      } bg-opacity-10 border-2 border-zinc-600 p-4 rounded-lg`}
    >
      <div className="flex flex-col gap-2 tracking-wide">
        <h3 className="text-xl font-medium">{task.title}</h3>
        <p className="font-normal">{task.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            Priority:{' '}
            <span
              className={`${
                !isCompleted ? PriorityTextColors[task.priority] : ''
              }`}
            >
              {task.priority}
            </span>
          </div>

          <div className="space-x-4">
            {!isCompleted ? (
              <>
                <button
                  onClick={() => openModal(task)}
                  className="bg-blue-700 p-2 rounded-lg hover:bg-blue-600"
                >
                  <PencilIcon className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-700 p-2 rounded-lg hover:bg-red-600"
                >
                  <TrashIcon className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={() => toggleComplete(task.id)}
                  className="bg-green-700 p-2 rounded-lg hover:bg-green-600"
                >
                  <CheckIcon className="w-5 h-5 text-white" />
                </button>
              </>
            ) : (
              <button
                onClick={() => toggleComplete(task.id)}
                className="bg-red-700 p-2 rounded-lg hover:bg-red-600"
              >
                <XIcon className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
