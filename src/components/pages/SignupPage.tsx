import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SignupPage() {
  const { isAuthenticated, actions } = useMember();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/onboarding');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md p-8 md:p-12 space-y-8 border-primary/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-primary">
            Welcome to AI Counsellor
          </h1>
          <p className="font-paragraph text-base text-secondary leading-relaxed">
            Create your account to start your study-abroad journey with personalized guidance and support.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={actions.login}
            size="lg"
            className="w-full h-14 text-base"
          >
            Create Account / Sign In
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="font-paragraph text-sm text-secondary text-center">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        <div className="text-center pt-4">
          <Link 
            to="/" 
            className="font-paragraph text-base text-secondary hover:text-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
