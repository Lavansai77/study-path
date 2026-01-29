import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b border-primary/10 sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl text-primary group-hover:text-mutedgreen transition-colors">
              AI Counsellor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/universities" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
            >
              Universities
            </Link>
            <Link 
              to="/guidance" 
              className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
            >
              Application Guidance
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/chat" 
                  className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                >
                  AI Chat
                </Link>
              </>
            )}
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading && <LoadingSpinner />}
            {!isLoading && !isAuthenticated && (
              <>
                <Button 
                  variant="outline" 
                  onClick={actions.login}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground h-11"
                >
                  Sign In
                </Button>
                <Link to="/signup">
                  <Button className="h-11">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
            {!isLoading && isAuthenticated && (
              <>
                <Link to="/profile">
                  <Button 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground h-11"
                  >
                    {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  onClick={actions.logout}
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground h-11"
                >
                  Sign Out
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-primary"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-primary/10 pt-4">
            <Link 
              to="/universities" 
              className="block font-paragraph text-base text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Universities
            </Link>
            <Link 
              to="/guidance" 
              className="block font-paragraph text-base text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Application Guidance
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className="block font-paragraph text-base text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/chat" 
                  className="block font-paragraph text-base text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Chat
                </Link>
              </>
            )}
            <div className="flex flex-col gap-3 pt-2">
              {!isAuthenticated ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      actions.login();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground h-11"
                  >
                    Sign In
                  </Button>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full h-11">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground h-11"
                    >
                      {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      actions.logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground h-11"
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
