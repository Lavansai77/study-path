import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { useTaskStore, type UserTask } from '@/stores/taskStore';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskManagerProps {
  showHeader?: boolean;
  compact?: boolean;
  stageFilter?: string;
}

export default function TaskManager({ showHeader = true, compact = false, stageFilter }: TaskManagerProps) {
  const { member } = useMember();
  const { tasks, setTasks, toggleTask } = useTaskStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (member?._id) {
      loadUserTasks();
    }
  }, [member?._id]);

  const loadUserTasks = async () => {
    if (!member?._id) return;
    
    setIsLoading(true);
    try {
      // Fetch all application tasks
      const tasksResult = await BaseCrudService.getAll<any>('applicationtasks', {}, { limit: 100 });
      
      // Fetch user's task progress
      const progressResult = await BaseCrudService.getAll<any>('usertaskprogress', {}, { limit: 100 });
      
      // Fetch guidance items for stage names
      const guidanceResult = await BaseCrudService.getAll<any>('applicationguidance', {}, { limit: 100 });
      
      // Create a map of guidance by ID
      const guidanceMap = new Map(guidanceResult.items.map(g => [g._id, g]));
      
      // Create a map of user progress
      const progressMap = new Map(progressResult.items
        .filter(p => p.userId === member._id)
        .map(p => [p.taskId, p])
      );
      
      // Combine tasks with progress and guidance info
      const userTasks: UserTask[] = tasksResult.items.map(task => {
        const progress = progressMap.get(task._id);
        const guidance = guidanceMap.get(task.applicationGuidanceId);
        
        return {
          _id: progress?._id || `progress-${task._id}`,
          taskId: task._id,
          taskTitle: task.taskTitle || '',
          description: task.description,
          isCompleted: progress?.isCompleted || false,
          completedDate: progress?.completedDate,
          dueDate: task.dueDate,
          estimatedEffort: task.estimatedEffort,
          isOptional: task.isOptional,
          stageName: guidance?.stageName,
        };
      });
      
      setTasks(userTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (task: UserTask) => {
    if (!member?._id) return;
    
    setIsSaving(true);
    try {
      const newCompletedStatus = !task.isCompleted;
      
      // Check if progress record exists
      const existingProgress = await BaseCrudService.getById<any>('usertaskprogress', task._id).catch(() => null);
      
      if (existingProgress) {
        // Update existing progress
        await BaseCrudService.update('usertaskprogress', {
          _id: task._id,
          isCompleted: newCompletedStatus,
          completedDate: newCompletedStatus ? new Date() : null,
        });
      } else {
        // Create new progress record
        await BaseCrudService.create('usertaskprogress', {
          _id: `progress-${task.taskId}-${member._id}`,
          userId: member._id,
          taskId: task.taskId,
          isCompleted: newCompletedStatus,
          completedDate: newCompletedStatus ? new Date() : null,
        });
      }
      
      // Update local state
      toggleTask(task.taskId);
    } catch (error) {
      console.error('Failed to update task:', error);
      // Reload on error to sync with server
      await loadUserTasks();
    } finally {
      setIsSaving(false);
    }
  };

  const displayTasks = stageFilter 
    ? tasks.filter(t => t.stageName === stageFilter)
    : tasks;

  const completedCount = displayTasks.filter(t => t.isCompleted).length;
  const totalCount = displayTasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-primary/5 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h3 className="font-heading text-2xl text-primary">
            {stageFilter ? `${stageFilter} Tasks` : 'Your Tasks'}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-paragraph text-base text-secondary">
              {completedCount} of {totalCount} tasks completed
            </p>
            <div className="w-32 h-2 bg-primary/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {displayTasks.length > 0 ? (
        <div className={`space-y-3 ${compact ? 'max-h-96 overflow-y-auto' : ''}`}>
          {displayTasks.map((task, index) => (
            <motion.div
              key={task.taskId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className={`p-4 border-primary/20 cursor-pointer transition-all hover:border-primary/40 ${
                task.isCompleted ? 'bg-primary/5' : ''
              }`}>
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleToggleTask(task)}
                    disabled={isSaving}
                    className="mt-1 flex-shrink-0"
                  >
                    {task.isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    ) : (
                      <Circle className="h-6 w-6 text-secondary/40 hover:text-secondary" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className={`font-heading text-base ${
                          task.isCompleted 
                            ? 'text-secondary line-through' 
                            : 'text-primary'
                        }`}>
                          {task.taskTitle}
                        </h4>
                        {task.description && (
                          <p className={`font-paragraph text-sm mt-1 ${
                            task.isCompleted 
                              ? 'text-secondary/50' 
                              : 'text-secondary'
                          }`}>
                            {task.description}
                          </p>
                        )}
                      </div>
                      {task.isOptional && (
                        <span className="text-xs font-medium text-secondary/60 bg-secondary/10 px-2 py-1 rounded whitespace-nowrap">
                          Optional
                        </span>
                      )}
                    </div>
                    
                    {task.dueDate && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-secondary">
                        <AlertCircle className="h-3 w-3" />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center border-primary/20">
          <p className="font-paragraph text-base text-secondary">
            {stageFilter ? `No tasks for this stage yet.` : 'No tasks available. Check back soon!'}
          </p>
        </Card>
      )}
    </div>
  );
}
