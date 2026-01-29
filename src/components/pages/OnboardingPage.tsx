import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';

export default function OnboardingPage() {
  const { member } = useMember();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    academicBackground: '',
    currentEducationLevel: '',
    fieldOfStudy: '',
    gpa: '',
    studyGoals: '',
    preferredCountries: '',
    budget: '',
    examStatus: '',
    examScores: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store onboarding data in localStorage for now
    localStorage.setItem('onboardingData', JSON.stringify(formData));
    navigate('/dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="text-center mb-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-primary">
            Complete Your Profile
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-2xl mx-auto">
            Help us understand your academic background and goals to provide personalized guidance.
          </p>
        </div>

        <Card className="p-8 md:p-12 border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Academic Background */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl text-primary border-b border-primary/20 pb-3">
                Academic Background
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="currentEducationLevel" className="font-paragraph text-base text-foreground">
                  Current Education Level *
                </Label>
                <Select 
                  value={formData.currentEducationLevel}
                  onValueChange={(value) => handleChange('currentEducationLevel', value)}
                  required
                >
                  <SelectTrigger id="currentEducationLevel" className="h-12">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy" className="font-paragraph text-base text-foreground">
                  Field of Study *
                </Label>
                <Input
                  id="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                  placeholder="e.g., Computer Science, Business, Engineering"
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gpa" className="font-paragraph text-base text-foreground">
                  GPA / Academic Score *
                </Label>
                <Input
                  id="gpa"
                  value={formData.gpa}
                  onChange={(e) => handleChange('gpa', e.target.value)}
                  placeholder="e.g., 3.8/4.0 or 85%"
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="academicBackground" className="font-paragraph text-base text-foreground">
                  Additional Academic Details
                </Label>
                <Textarea
                  id="academicBackground"
                  value={formData.academicBackground}
                  onChange={(e) => handleChange('academicBackground', e.target.value)}
                  placeholder="Share any relevant academic achievements, projects, or experiences"
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Study Goals */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl text-primary border-b border-primary/20 pb-3">
                Study Goals
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="studyGoals" className="font-paragraph text-base text-foreground">
                  What are your study-abroad goals? *
                </Label>
                <Textarea
                  id="studyGoals"
                  value={formData.studyGoals}
                  onChange={(e) => handleChange('studyGoals', e.target.value)}
                  placeholder="Describe your academic and career aspirations"
                  rows={4}
                  required
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredCountries" className="font-paragraph text-base text-foreground">
                  Preferred Countries *
                </Label>
                <Input
                  id="preferredCountries"
                  value={formData.preferredCountries}
                  onChange={(e) => handleChange('preferredCountries', e.target.value)}
                  placeholder="e.g., USA, UK, Canada, Australia"
                  required
                  className="h-12"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl text-primary border-b border-primary/20 pb-3">
                Budget
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="budget" className="font-paragraph text-base text-foreground">
                  Annual Budget (USD) *
                </Label>
                <Select 
                  value={formData.budget}
                  onValueChange={(value) => handleChange('budget', value)}
                  required
                >
                  <SelectTrigger id="budget" className="h-12">
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-20k">Under $20,000</SelectItem>
                    <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
                    <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
                    <SelectItem value="60k-80k">$60,000 - $80,000</SelectItem>
                    <SelectItem value="above-80k">Above $80,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Exam Readiness */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl text-primary border-b border-primary/20 pb-3">
                Exam Readiness
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="examStatus" className="font-paragraph text-base text-foreground">
                  Standardized Test Status *
                </Label>
                <Select 
                  value={formData.examStatus}
                  onValueChange={(value) => handleChange('examStatus', value)}
                  required
                >
                  <SelectTrigger id="examStatus" className="h-12">
                    <SelectValue placeholder="Select your exam status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-taken">Not Taken Yet</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.examStatus === 'completed' && (
                <div className="space-y-2">
                  <Label htmlFor="examScores" className="font-paragraph text-base text-foreground">
                    Exam Scores
                  </Label>
                  <Input
                    id="examScores"
                    value={formData.examScores}
                    onChange={(e) => handleChange('examScores', e.target.value)}
                    placeholder="e.g., TOEFL: 110, GRE: 325"
                    className="h-12"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-6">
              <Button 
                type="submit" 
                size="lg"
                className="h-14 px-12 text-base"
              >
                Complete Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
