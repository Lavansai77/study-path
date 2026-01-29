import { useMember } from '@/integrations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, GraduationCap, Target, FileText, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TaskManager from '@/components/TaskManager';
import { motion } from 'framer-motion';
import { useTaskStore } from '@/stores/taskStore';

export default function DashboardPage() {
  const { member } = useMember();
  const { tasks, getCompletedCount, getTotalCount, getProgressPercentage } = useTaskStore();
  
  // Get onboarding data from localStorage
  const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
  
  // Application stages
  const stages = [
    { id: 1, name: 'Profile Setup', status: 'completed', icon: GraduationCap },
    { id: 2, name: 'University Research', status: 'in-progress', icon: Target },
    { id: 3, name: 'Document Preparation', status: 'pending', icon: FileText },
    { id: 4, name: 'Application Submission', status: 'pending', icon: Send }
  ];

  const currentStage = stages.find(s => s.status === 'in-progress') || stages[0];
  const completedStages = stages.filter(s => s.status === 'completed').length;
  const progressPercentage = (completedStages / stages.length) * 100;
  
  // Task progress
  const completedTasks = getCompletedCount();
  const totalTasks = getTotalCount();
  const taskProgressPercentage = getProgressPercentage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 space-y-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="font-heading text-4xl md:text-5xl text-primary">
            Welcome back, {member?.profile?.nickname || member?.contact?.firstName || 'Student'}
          </h1>
          <p className="font-paragraph text-lg text-secondary">
            Track your progress and continue your study-abroad journey.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="p-8 border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl text-primary">
                  Application Progress
                </h2>
                <span className="font-paragraph text-lg text-secondary">
                  {completedStages} of {stages.length} stages completed
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="font-paragraph text-base text-secondary">
                Current Stage: <span className="text-primary font-medium">{currentStage.name}</span>
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Task Progress Overview */}
        {totalTasks > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Card className="p-8 border-mutedgreen/20 bg-mutedgreen/5">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-2xl text-primary">
                    Task Completion
                  </h2>
                  <span className="font-paragraph text-lg text-secondary">
                    {completedTasks} of {totalTasks} tasks completed
                  </span>
                </div>
                <Progress value={taskProgressPercentage} className="h-3" />
                <p className="font-paragraph text-base text-secondary">
                  Keep completing your actionable to-dos to stay on track with your application.
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className={`p-6 border-2 ${
                  stage.status === 'completed' 
                    ? 'border-primary bg-primary/5' 
                    : stage.status === 'in-progress'
                    ? 'border-mutedgreen bg-mutedgreen/5'
                    : 'border-primary/20'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        stage.status === 'completed'
                          ? 'bg-primary'
                          : stage.status === 'in-progress'
                          ? 'bg-mutedgreen'
                          : 'bg-secondary/20'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          stage.status === 'completed' || stage.status === 'in-progress'
                            ? 'text-primary-foreground'
                            : 'text-secondary'
                        }`} />
                      </div>
                      {stage.status === 'completed' ? (
                        <CheckCircle className="h-6 w-6 text-primary" />
                      ) : (
                        <Circle className="h-6 w-6 text-secondary/40" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-primary mb-2">
                        {stage.name}
                      </h3>
                      <p className="font-paragraph text-sm text-secondary capitalize">
                        {stage.status.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Profile Summary & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 border-primary/20 h-full">
              <h2 className="font-heading text-2xl text-primary mb-6">
                Profile Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-paragraph text-sm text-secondary mb-1">Education Level</p>
                  <p className="font-paragraph text-base text-foreground capitalize">
                    {onboardingData.currentEducationLevel?.replace('-', ' ') || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="font-paragraph text-sm text-secondary mb-1">Field of Study</p>
                  <p className="font-paragraph text-base text-foreground">
                    {onboardingData.fieldOfStudy || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="font-paragraph text-sm text-secondary mb-1">GPA</p>
                  <p className="font-paragraph text-base text-foreground">
                    {onboardingData.gpa || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="font-paragraph text-sm text-secondary mb-1">Preferred Countries</p>
                  <p className="font-paragraph text-base text-foreground">
                    {onboardingData.preferredCountries || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="font-paragraph text-sm text-secondary mb-1">Budget</p>
                  <p className="font-paragraph text-base text-foreground capitalize">
                    {onboardingData.budget?.replace('-', ' - ').replace('k', ',000') || 'Not specified'}
                  </p>
                </div>
                <Link to="/profile" className="block pt-4">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground h-11">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-8 border-primary/20 h-full">
              <h2 className="font-heading text-2xl text-primary mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4">
                <Link to="/universities">
                  <Button className="w-full h-12 justify-start text-left">
                    Browse Universities
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button className="w-full h-12 justify-start text-left">
                    Chat with AI Counsellor
                  </Button>
                </Link>
                <Link to="/guidance">
                  <Button className="w-full h-12 justify-start text-left">
                    View Application Guidance
                  </Button>
                </Link>
                <Link to="/shortlist">
                  <Button variant="outline" className="w-full h-12 justify-start text-left border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    My Shortlisted Universities
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Active Tasks Section */}
        {totalTasks > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="p-8 border-primary/20">
              <TaskManager showHeader={true} compact={true} />
              <Link to="/guidance" className="block mt-6">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View All Tasks & Guidance
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
