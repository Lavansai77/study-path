import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { ApplicationGuidance } from '@/entities';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TaskManager from '@/components/TaskManager';
import { motion } from 'framer-motion';

export default function GuidancePage() {
  const [guidance, setGuidance] = useState<ApplicationGuidance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGuidance();
  }, []);

  const loadGuidance = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<ApplicationGuidance>('applicationguidance');
      const sorted = result.items.sort((a, b) => 
        (a.sequenceNumber || 0) - (b.sequenceNumber || 0)
      );
      setGuidance(sorted);
    } catch (error) {
      console.error('Failed to load guidance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Group guidance by stage
  const groupedGuidance = guidance.reduce((acc, item) => {
    const stage = item.stageName || 'General';
    if (!acc[stage]) {
      acc[stage] = [];
    }
    acc[stage].push(item);
    return acc;
  }, {} as Record<string, ApplicationGuidance[]>);

  const stages = Object.keys(groupedGuidance);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary">
            Application Guidance
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-3xl">
            Follow our structured, stage-based guidance to navigate your study-abroad application process with confidence.
          </p>
        </motion.div>

        {/* Guidance Content */}
        <div className="space-y-8 min-h-[400px]">
          {isLoading ? null : guidance.length > 0 ? (
            stages.map((stage, stageIndex) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stageIndex * 0.1 }}
              >
                <Card className="p-8 border-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="font-heading text-xl text-primary-foreground">
                        {stageIndex + 1}
                      </span>
                    </div>
                    <h2 className="font-heading text-3xl text-primary">
                      {stage}
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    {groupedGuidance[stage].map((item, index) => (
                      <AccordionItem 
                        key={item._id} 
                        value={item._id}
                        className="border border-primary/10 rounded-2xl px-6"
                      >
                        <AccordionTrigger className="hover:no-underline py-6">
                          <div className="flex items-center gap-4 text-left">
                            <Circle className="h-5 w-5 text-secondary flex-shrink-0" />
                            <span className="font-heading text-xl text-primary">
                              {item.stepTitle}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 pt-2">
                          <div className="pl-9 space-y-4">
                            {item.detailedDescription && (
                              <div>
                                <h4 className="font-paragraph text-base font-medium text-foreground mb-2">
                                  Description
                                </h4>
                                <p className="font-paragraph text-base text-secondary leading-relaxed">
                                  {item.detailedDescription}
                                </p>
                              </div>
                            )}
                            
                            {item.actionableToDos && (
                              <div>
                                <h4 className="font-paragraph text-base font-medium text-foreground mb-2">
                                  Action Items
                                </h4>
                                <div className="space-y-2">
                                  {item.actionableToDos.split('\n').filter(Boolean).map((todo, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                      <span className="font-paragraph text-base text-secondary">
                                        {todo.trim()}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Tasks for this stage */}
                            <div className="mt-4 pt-4 border-t border-primary/10">
                              <h4 className="font-paragraph text-base font-medium text-foreground mb-3">
                                Related Tasks
                              </h4>
                              <TaskManager showHeader={false} stageFilter={stage} compact={true} />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="p-12 text-center border-primary/20">
              <p className="font-paragraph text-lg text-secondary">
                No guidance available at the moment. Check back soon!
              </p>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
