import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Universities } from '@/entities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Heart, MapPin, DollarSign, Award, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function ShortlistPage() {
  const [shortlistedUniversities, setShortlistedUniversities] = useState<Universities[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadShortlist();
  }, []);

  const loadShortlist = async () => {
    setIsLoading(true);
    try {
      const shortlistIds = JSON.parse(localStorage.getItem('shortlist') || '[]');
      if (shortlistIds.length === 0) {
        setShortlistedUniversities([]);
        setIsLoading(false);
        return;
      }

      const result = await BaseCrudService.getAll<Universities>('universities');
      const shortlisted = result.items.filter(uni => shortlistIds.includes(uni._id));
      setShortlistedUniversities(shortlisted);
    } catch (error) {
      console.error('Failed to load shortlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromShortlist = (universityId: string) => {
    const shortlist = JSON.parse(localStorage.getItem('shortlist') || '[]');
    const updated = shortlist.filter((id: string) => id !== universityId);
    localStorage.setItem('shortlist', JSON.stringify(updated));
    setShortlistedUniversities(prev => prev.filter(uni => uni._id !== universityId));
  };

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
          <div className="flex items-center gap-4">
            <Heart className="h-10 w-10 text-primary fill-current" />
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary">
              My Shortlist
            </h1>
          </div>
          <p className="font-paragraph text-lg text-secondary max-w-3xl">
            Universities you've shortlisted for your study-abroad journey.
          </p>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="font-paragraph text-base text-secondary">
            {isLoading ? 'Loading...' : `${shortlistedUniversities.length} ${shortlistedUniversities.length === 1 ? 'university' : 'universities'} shortlisted`}
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {isLoading ? null : shortlistedUniversities.length > 0 ? (
            shortlistedUniversities.map((university, index) => (
              <motion.div
                key={university._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden border-primary/20 h-full flex flex-col">
                  {university.campusImage && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={university.campusImage}
                        alt={`${university.universityName} campus`}
                        width={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="flex-1 space-y-3">
                      <h3 className="font-heading text-2xl text-primary line-clamp-2">
                        {university.universityName}
                      </h3>
                      
                      <div className="space-y-2">
                        {university.location && (
                          <div className="flex items-center gap-2 text-secondary">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="font-paragraph text-sm">{university.location}</span>
                          </div>
                        )}
                        
                        {university.estimatedBudget && (
                          <div className="flex items-center gap-2 text-secondary">
                            <DollarSign className="h-4 w-4 flex-shrink-0" />
                            <span className="font-paragraph text-sm">
                              ${university.estimatedBudget.toLocaleString()} / year
                            </span>
                          </div>
                        )}
                        
                        {university.globalRanking && (
                          <div className="flex items-center gap-2 text-secondary">
                            <Award className="h-4 w-4 flex-shrink-0" />
                            <span className="font-paragraph text-sm">
                              Ranked #{university.globalRanking} globally
                            </span>
                          </div>
                        )}
                      </div>

                      {university.description && (
                        <p className="font-paragraph text-sm text-secondary line-clamp-3">
                          {university.description}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <Link to={`/universities/${university._id}`} className="flex-1">
                        <Button className="w-full h-11">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => removeFromShortlist(university._id)}
                        className="h-11 px-4 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="p-12 text-center border-primary/20">
                <Heart className="h-16 w-16 text-secondary/40 mx-auto mb-4" />
                <h2 className="font-heading text-2xl text-primary mb-4">
                  No Universities Shortlisted Yet
                </h2>
                <p className="font-paragraph text-lg text-secondary mb-8">
                  Start exploring universities and add your favorites to your shortlist.
                </p>
                <Link to="/universities">
                  <Button className="h-12 px-8">
                    Browse Universities
                  </Button>
                </Link>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
