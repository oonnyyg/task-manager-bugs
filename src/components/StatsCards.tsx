import type { Task } from '../types';

interface StatsCardsProps {
  tasks: Task[];
}

export default function StatsCards({ tasks }: StatsCardsProps) {
  const total = tasks.length;
  const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
  const done = tasks.filter((task) => task.status === 'done').length;
  const highPriority = tasks.filter((task) => task.priority === 'high').length;

  const items = [
    { label: 'Total', value: total },
    { label: 'In Progress', value: inProgress },
    { label: 'Done', value: done },
    { label: 'High Priority', value: highPriority },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="text-sm text-slate-500">{item.label}</div>
          <div className="mt-2 text-3xl font-semibold text-slate-800">{item.value}</div>
        </div>
      ))}
    </div>
  );
}