// HPI 1.7-V
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Target, 
  Globe, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Compass
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Types & Interfaces ---

interface FeatureStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface BenefitItem {
  title: string;
  description: string;
}

// --- Canonical Data Sources ---

const STEPS_DATA: FeatureStep[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Complete Profile',
    description: 'Share your academic background, goals, and preferences during our comprehensive onboarding process to tailor the experience to you.',
    icon: GraduationCap
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Discover Universities',
    description: 'Browse and filter a curated list of global universities based on your specific criteria, budget, and academic ambitions.',
    icon: Globe
  },
  {
    id: 'step-3',
    number: '03',
    title: 'AI Guidance',
    description: 'Get personalized recommendations and instant answers from our advanced AI counsellor, available 24/7 to support your decisions.',
    icon: MessageSquare
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Apply Confidently',
    description: 'Follow actionable to-dos, track your application progress, and submit with the confidence that you have made the right choice.',
    icon: CheckCircle
  }
];

const BENEFITS_DATA: BenefitItem[] = [
  {
    title: 'Personalized Recommendations',
    description: 'AI-powered suggestions based on your academic profile, goals, and budget constraints.'
  },
  {
    title: 'Stage-Based Guidance',
    description: 'Clear milestones and actionable steps for each phase of your application journey.'
  },
  {
    title: 'Comprehensive Database',
    description: 'Access detailed information about programs, rankings, costs, and campus life.'
  },
  {
    title: '24/7 AI Support',
    description: 'Get instant answers to your questions anytime through our intelligent chatbot.'
  }
];

// --- Components ---

const ParallaxImage = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full">
        <Image
          src="https://static.wixstatic.com/media/e0fcd4_2219069eb5fe4423a6c59153b9cdac4b~mv2.png?originWidth=1152&originHeight=768"
          alt="Student studying abroad"
          width={1200}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

const SectionHeader = ({ number, title, subtitle }: { number: string, title: string, subtitle?: string }) => {
  return (
    <div className="flex flex-col gap-4 mb-12 md:mb-20">
      <div className="flex items-center gap-4">
        <span className="font-heading text-primary text-xl md:text-2xl">{number}</span>
        <div className="h-[1px] w-12 bg-primary/30" />
      </div>
      <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.9]">
        {title}
      </h2>
      {subtitle && (
        <p className="font-paragraph text-lg text-secondary max-w-xl mt-4 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default function HomePage() {
  // Global scroll progress for subtle background shifts or indicators
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* --- HERO SECTION --- 
          Replicating the inspiration image structure: 
          Split layout, Left Green Block with Circle, Right Typography 
      */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left Column: The Visual Anchor */}
        <div className="w-full lg:w-1/2 bg-primary min-h-[60vh] lg:min-h-screen flex items-center justify-center p-8 lg:p-16 relative overflow-hidden">
          {/* Decorative background noise/texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md aspect-square"
          >
            {/* The Circular Mask Motif */}
            <div className="w-full h-full rounded-full overflow-hidden border-[1px] border-primary-foreground/20 shadow-2xl relative z-10">
              <Image
                src="https://static.wixstatic.com/media/e0fcd4_6e7cc1f570f6462aa7315c9e3445bc03~mv2.png?originWidth=1152&originHeight=768"
                alt="Student looking towards future"
                width={800}
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000 ease-out"
              />
            </div>
            
            {/* Decorative Orbit Lines */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border border-primary-foreground/10 rounded-full z-0 border-dashed"
            />
             <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-16 border border-primary-foreground/5 rounded-full z-0"
            />
          </motion.div>
        </div>

        {/* Right Column: The Narrative */}
        <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center p-8 lg:p-20 xl:p-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 lg:space-y-12"
          >
            <div className="flex items-center gap-4">
              <span className="font-heading text-primary text-xl">01</span>
              <span className="font-heading text-primary text-xl uppercase tracking-widest">Introduction</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary leading-[0.85] tracking-tight">
                AI <br/>
                <span className="italic font-light ml-4">Counsellor</span>
              </h1>
            </div>

            <p className="font-paragraph text-lg md:text-xl text-secondary leading-relaxed max-w-md">
              Navigate your study-abroad journey with confidence. A guided, stage-based platform tailored to your academic goals.
            </p>

            <div className="pt-4">
              <Link to="/signup" className="group inline-flex items-center gap-2 text-primary font-heading text-2xl hover:opacity-70 transition-opacity">
                Begin Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Bottom Right Decorative Element */}
          <div className="absolute bottom-8 right-8 hidden lg:block">
            <Compass className="w-12 h-12 text-primary/20 animate-spin-slow" style={{ animationDuration: '20s' }} />
          </div>
        </div>
      </section>

      {/* --- SECTION 2: STICKY BENEFITS (Why Choose) --- 
          Layout: Sticky Left Title, Scrolling Right Cards
      */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <SectionHeader 
                number="02" 
                title="Why Choose Us" 
                subtitle="Our platform combines intelligent technology with structured guidance to simplify your decision-making process."
              />
              <div className="hidden lg:block mt-12">
                <Link to="/universities">
                  <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg">
                    Explore Universities
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="lg:w-2/3 space-y-8">
            {BENEFITS_DATA.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/50 backdrop-blur-sm border border-primary/10 p-8 md:p-12 rounded-3xl hover:bg-white transition-colors duration-500"
              >
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-3xl text-primary mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {benefit.title}
                </h3>
                <div className="h-[1px] w-full bg-primary/10 mb-6 group-hover:w-1/2 transition-all duration-500" />
                <p className="font-paragraph text-lg text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: VISUAL BREATHER (Parallax) --- */}
      <section className="w-full h-[80vh] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ParallaxImage className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-primary/30 z-10" />
        <div className="relative z-20 text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-8xl text-primary-foreground drop-shadow-lg"
          >
            Global Opportunities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl text-primary-foreground/90 mt-6 max-w-2xl mx-auto"
          >
            Discover a world of education without borders.
          </motion.p>
        </div>
      </section>

      {/* --- SECTION 4: ZIG-ZAG PROCESS (How It Works) --- 
          Layout: Alternating text and image/icon blocks connected by a conceptual thread.
      */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16 py-32 overflow-hidden">
        <div className="text-center mb-24">
          <span className="font-heading text-primary text-xl block mb-4">03 — The Process</span>
          <h2 className="font-heading text-5xl md:text-7xl text-primary">Your Journey</h2>
        </div>

        <div className="relative space-y-32">
          {/* Central Line (Visual Connector) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/20 -translate-x-1/2 hidden md:block" />

          {STEPS_DATA.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                
                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.8 }}
                  className={`flex-1 text-left ${isEven ? 'md:text-right' : 'md:text-left'}`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-6 shadow-xl ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                    {step.title}
                  </h3>
                  <p className="font-paragraph text-lg text-secondary leading-relaxed max-w-md mx-auto md:mx-0">
                    {step.description}
                  </p>
                </motion.div>

                {/* Center Marker (Desktop) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full z-10 hidden md:block" />

                {/* Image/Visual Side */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-1 w-full"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <Image
                      src="https://static.wixstatic.com/media/e0fcd4_35470a04d8b24b708a9017f164c07426~mv2.png?originWidth=768&originHeight=576"
                      alt={step.title}
                      width={800}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Number Overlay */}
                    <div className={`absolute bottom-4 ${isEven ? 'left-4' : 'right-4'} z-20`}>
                      <span className="font-heading text-8xl text-white/20 font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </section>

      {/* --- SECTION 5: CTA (The Finale) --- 
          Full bleed, deep green, immersive.
      */}
      <section className="w-full bg-primary py-32 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-white/5 blur-3xl" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BookOpen className="w-16 h-16 text-primary-foreground/80 mx-auto mb-8" />
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-8 leading-tight">
              Ready to Shape <br/> Your Future?
            </h2>
            <p className="font-paragraph text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who have successfully navigated their study-abroad applications with AI Counsellor.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="h-16 px-10 text-lg bg-background text-primary hover:bg-softbeige rounded-full transition-all duration-300 hover:scale-105"
                >
                  Create Your Account
                </Button>
              </Link>
              <Link to="/universities">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-16 px-10 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full bg-transparent transition-all duration-300"
                >
                  Explore Universities
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}