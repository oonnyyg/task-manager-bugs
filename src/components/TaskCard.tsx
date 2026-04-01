import type { Task, TaskPriority, TaskStatus } from '../types';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityStyles: Record<TaskPriority, string> = {
  low: 'bg-emerald-50 text-emerald-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-rose-50 text-rose-700',
};

const statusStyles: Record<TaskStatus, string> = {
  'in-progress': 'bg-blue-50 text-blue-700',
  done: 'bg-slate-100 text-slate-700',
};

export default function TaskCard({ task, onToggleStatus, onEdit }: TaskCardProps) {
  const checked = task.status === 'done';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggleStatus(task.id)}
            className="mt-1 h-4 w-4 rounded border-slate-300"
          />

          <div>
            <h3
              className={`text-base font-semibold ${
                checked ? 'text-slate-400 line-through' : 'text-slate-800'
              }`}
            >
              {task.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{task.description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          Edit
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[task.status]}`}>
          {task.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-500 sm:grid-cols-2">
        <div>
          <span className="font-medium text-slate-600">Assignee:</span> {task.assignee}
        </div>
        <div>
          <span className="font-medium text-slate-600">Due:</span> {task.dueDate}
        </div>
      </div>
    </div>
  );
}