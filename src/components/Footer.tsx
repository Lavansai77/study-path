import { Link } from 'react-router-dom';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <span className="font-heading text-2xl text-primary-foreground">
                AI Counsellor
              </span>
            </div>
            <p className="font-paragraph text-base text-primary-foreground/80 leading-relaxed">
              Empowering students to make confident study-abroad decisions through intelligent guidance and personalized support.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl text-primary-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/universities" 
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Universities
              </Link>
              <Link 
                to="/guidance" 
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Application Guidance
              </Link>
              <Link 
                to="/dashboard" 
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/chat" 
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                AI Chat
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl text-primary-foreground">
              Resources
            </h3>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/about" 
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/faq" 
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link 
                to="/privacy" 
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl text-primary-foreground">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/80 mt-1 flex-shrink-0" />
                <a 
                  href="mailto:support@aicounsellor.com" 
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  support@aicounsellor.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary-foreground/80 mt-1 flex-shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground/80 mt-1 flex-shrink-0" />
                <p className="font-paragraph text-base text-primary-foreground/80">
                  123 Education Street<br />
                  Learning City, LC 12345
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <p className="font-paragraph text-sm text-primary-foreground/60 text-center">
            © {new Date().getFullYear()} AI Counsellor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
