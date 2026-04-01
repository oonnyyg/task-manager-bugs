import { useMemo, useState } from 'react';
import StatsCards from './components/StatsCards';
import TaskFilterBar, { type FilterKey } from './components/TaskFilterBar';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import { mockTasks } from './data/mockTasks';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);


  const statsSource = mockTasks;

  const searchedTasks = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return tasks;
    }

    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(keyword) ||
        task.description.toLowerCase().includes(keyword) ||
        task.assignee.toLowerCase().includes(keyword)
      );
    });
  }, [search, tasks]);

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') {
      return tasks;
    }

    return tasks.filter((task) => task.status === activeFilter);
  }, [activeFilter, tasks]);


  const visibleTasks = search ? searchedTasks : filteredTasks;

  const handleToggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'done' ? 'in-progress' : 'done',
            }
          : task
      )
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prev) => {
      const next = [...prev];


      next[0] = updatedTask;

      return next;
    });

    setEditingTask(null);
  };


  const shouldShowEmpty = filteredTasks.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Team Tasks
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track team priorities, review progress, and fix workflow issues.
          </p>
        </header>

        <div className="space-y-6">
          <StatsCards tasks={statsSource} />

          <TaskFilterBar
            search={search}
            activeFilter={activeFilter}
            onSearchChange={setSearch}
            onFilterChange={setActiveFilter}
          />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Task List</h2>
                <div className="text-sm text-slate-500">
                  Showing {visibleTasks.length} tasks
                </div>
              </div>

              {shouldShowEmpty ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                  <div className="text-base font-semibold text-slate-700">
                    No tasks in this view
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Try another filter or search keyword.
                  </p>
                </div>
              ) : (
                <TaskList
                  tasks={visibleTasks}
                  onToggleStatus={handleToggleStatus}
                  onEdit={handleEdit}
                />
              )}
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-800">Task Notes</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-500">
                <p>Use filters to review task status.</p>
                <p>Search should narrow down visible tasks.</p>
                <p>Editing a task should update the correct record.</p>
                <p>Statistics should reflect the latest state.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <EditTaskModal
        open={!!editingTask}
        task={editingTask}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
      />
    </div>
  );
}

export default App;
