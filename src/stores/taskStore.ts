import { create } from 'zustand';

export interface UserTask {
  _id: string;
  taskId: string;
  taskTitle: string;
  description?: string;
  isCompleted: boolean;
  completedDate?: Date;
  dueDate?: Date;
  estimatedEffort?: number;
  isOptional?: boolean;
  stageName?: string;
}

interface TaskStore {
  tasks: UserTask[];
  setTasks: (tasks: UserTask[]) => void;
  toggleTask: (taskId: string) => void;
  addTask: (task: UserTask) => void;
  removeTask: (taskId: string) => void;
  getCompletedCount: () => number;
  getTotalCount: () => number;
  getProgressPercentage: () => number;
  getTasksByStage: (stage: string) => UserTask[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  
  setTasks: (tasks) => set({ tasks }),
  
  toggleTask: (taskId) => {
    const tasks = get().tasks;
    const updatedTasks = tasks.map(task =>
      task.taskId === taskId
        ? {
            ...task,
            isCompleted: !task.isCompleted,
            completedDate: !task.isCompleted ? new Date() : undefined,
          }
        : task
    );
    set({ tasks: updatedTasks });
  },
  
  addTask: (task) => {
    const tasks = get().tasks;
    set({ tasks: [...tasks, task] });
  },
  
  removeTask: (taskId) => {
    const tasks = get().tasks;
    set({ tasks: tasks.filter(task => task.taskId !== taskId) });
  },
  
  getCompletedCount: () => {
    return get().tasks.filter(task => task.isCompleted).length;
  },
  
  getTotalCount: () => {
    return get().tasks.length;
  },
  
  getProgressPercentage: () => {
    const total = get().getTotalCount();
    if (total === 0) return 0;
    return (get().getCompletedCount() / total) * 100;
  },
  
  getTasksByStage: (stage) => {
    return get().tasks.filter(task => task.stageName === stage);
  },
}));
