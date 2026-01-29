import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Universities } from '@/entities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MapPin, DollarSign, Award, BookOpen, Heart, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function UniversityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [university, setUniversity] = useState<Universities | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    if (id) {
      loadUniversity();
      checkShortlistStatus();
    }
  }, [id]);

  const loadUniversity = async () => {
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<Universities>('universities', id!);
      setUniversity(data);
    } catch (error) {
      console.error('Failed to load university:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkShortlistStatus = () => {
    const shortlist = JSON.parse(localStorage.getItem('shortlist') || '[]');
    setIsShortlisted(shortlist.includes(id));
  };

  const toggleShortlist = () => {
    const shortlist = JSON.parse(localStorage.getItem('shortlist') || '[]');
    if (isShortlisted) {
      const updated = shortlist.filter((uniId: string) => uniId !== id);
      localStorage.setItem('shortlist', JSON.stringify(updated));
      setIsShortlisted(false);
    } else {
      shortlist.push(id);
      localStorage.setItem('shortlist', JSON.stringify(shortlist));
      setIsShortlisted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
          <Card className="p-12 text-center border-primary/20">
            <h2 className="font-heading text-3xl text-primary mb-4">University Not Found</h2>
            <p className="font-paragraph text-lg text-secondary mb-8">
              The university you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/universities">
              <Button>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Universities
              </Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 space-y-12">
        {/* Back Button */}
        <Link to="/universities">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground h-11">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Universities
          </Button>
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Image */}
          {university.campusImage && (
            <div className="rounded-3xl overflow-hidden">
              <Image
                src={university.campusImage}
                alt={`${university.universityName} campus`}
                width={800}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          )}

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
                {university.universityName}
              </h1>
              
              <div className="space-y-3">
                {university.location && (
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-paragraph text-lg">{university.location}</span>
                  </div>
                )}
                
                {university.globalRanking && (
                  <div className="flex items-center gap-3 text-foreground">
                    <Award className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-paragraph text-lg">
                      Global Ranking: #{university.globalRanking}
                    </span>
                  </div>
                )}
                
                {university.estimatedBudget && (
                  <div className="flex items-center gap-3 text-foreground">
                    <DollarSign className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="font-paragraph text-lg">
                      ${university.estimatedBudget.toLocaleString()} per year
                    </span>
                  </div>
                )}
              </div>
            </div>

            {university.description && (
              <p className="font-paragraph text-lg text-secondary leading-relaxed">
                {university.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={toggleShortlist}
                variant={isShortlisted ? "default" : "outline"}
                className={`h-12 px-8 ${
                  isShortlisted 
                    ? '' 
                    : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                <Heart className={`mr-2 h-5 w-5 ${isShortlisted ? 'fill-current' : ''}`} />
                {isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
              </Button>
              <Link to="/chat">
                <Button className="h-12 px-8 w-full sm:w-auto">
                  Ask AI About This University
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Programs Section */}
        {university.programsOffered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="font-heading text-3xl text-primary">
                  Programs Offered
                </h2>
              </div>
              <p className="font-paragraph text-lg text-foreground leading-relaxed">
                {university.programsOffered}
              </p>
            </Card>
          </motion.div>
        )}

        {/* Key Information Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 border-primary/20">
            <h3 className="font-heading text-xl text-primary mb-3">Location</h3>
            <p className="font-paragraph text-base text-secondary">
              {university.location || 'Not specified'}
            </p>
          </Card>

          <Card className="p-6 border-primary/20">
            <h3 className="font-heading text-xl text-primary mb-3">Annual Cost</h3>
            <p className="font-paragraph text-base text-secondary">
              {university.estimatedBudget 
                ? `$${university.estimatedBudget.toLocaleString()}`
                : 'Contact for details'}
            </p>
          </Card>

          <Card className="p-6 border-primary/20">
            <h3 className="font-heading text-xl text-primary mb-3">Global Ranking</h3>
            <p className="font-paragraph text-base text-secondary">
              {university.globalRanking 
                ? `#${university.globalRanking}`
                : 'Not ranked'}
            </p>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-8 md:p-12 bg-mutedgreen border-mutedgreen text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">
              Ready to Apply?
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Get personalized guidance on your application process and connect with our AI counsellor for any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/guidance">
                <Button className="h-12 px-8 bg-background text-primary hover:bg-background/90">
                  View Application Guide
                </Button>
              </Link>
              <Link to="/chat">
                <Button 
                  variant="outline" 
                  className="h-12 px-8 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-mutedgreen"
                >
                  Chat with AI
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
