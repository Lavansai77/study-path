import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Calendar, Save } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { member } = useMember();
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
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load saved onboarding data
    const savedData = localStorage.getItem('onboardingData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('onboardingData', JSON.stringify(formData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="font-heading text-4xl md:text-5xl text-primary">
            Your Profile
          </h1>
          <p className="font-paragraph text-lg text-secondary">
            Manage your account information and academic profile.
          </p>
        </motion.div>

        {/* Account Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="p-8 border-primary/20">
            <h2 className="font-heading text-2xl text-primary mb-6 border-b border-primary/20 pb-3">
              Account Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-secondary" />
                <div>
                  <p className="font-paragraph text-sm text-secondary">Name</p>
                  <p className="font-paragraph text-base text-foreground">
                    {member?.profile?.nickname || member?.contact?.firstName || 'Not set'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary" />
                <div>
                  <p className="font-paragraph text-sm text-secondary">Email</p>
                  <p className="font-paragraph text-base text-foreground">
                    {member?.loginEmail || 'Not available'}
                  </p>
                </div>
              </div>
              {member?._createdDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="font-paragraph text-sm text-secondary">Member Since</p>
                    <p className="font-paragraph text-base text-foreground">
                      {new Date(member._createdDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Academic Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 border-primary/20">
            <h2 className="font-heading text-2xl text-primary mb-6 border-b border-primary/20 pb-3">
              Academic Profile
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentEducationLevel" className="font-paragraph text-base text-foreground">
                    Current Education Level
                  </Label>
                  <Select 
                    value={formData.currentEducationLevel}
                    onValueChange={(value) => handleChange('currentEducationLevel', value)}
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
                    Field of Study
                  </Label>
                  <Input
                    id="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                    placeholder="e.g., Computer Science"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gpa" className="font-paragraph text-base text-foreground">
                    GPA / Academic Score
                  </Label>
                  <Input
                    id="gpa"
                    value={formData.gpa}
                    onChange={(e) => handleChange('gpa', e.target.value)}
                    placeholder="e.g., 3.8/4.0"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredCountries" className="font-paragraph text-base text-foreground">
                    Preferred Countries
                  </Label>
                  <Input
                    id="preferredCountries"
                    value={formData.preferredCountries}
                    onChange={(e) => handleChange('preferredCountries', e.target.value)}
                    placeholder="e.g., USA, UK, Canada"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studyGoals" className="font-paragraph text-base text-foreground">
                  Study Goals
                </Label>
                <Textarea
                  id="studyGoals"
                  value={formData.studyGoals}
                  onChange={(e) => handleChange('studyGoals', e.target.value)}
                  placeholder="Describe your academic and career aspirations"
                  rows={4}
                  className="resize-none"
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
                  placeholder="Share any relevant academic achievements"
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget" className="font-paragraph text-base text-foreground">
                    Annual Budget (USD)
                  </Label>
                  <Select 
                    value={formData.budget}
                    onValueChange={(value) => handleChange('budget', value)}
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

                <div className="space-y-2">
                  <Label htmlFor="examStatus" className="font-paragraph text-base text-foreground">
                    Standardized Test Status
                  </Label>
                  <Select 
                    value={formData.examStatus}
                    onValueChange={(value) => handleChange('examStatus', value)}
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

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSave}
                  className="h-12 px-8"
                >
                  <Save className="mr-2 h-5 w-5" />
                  {isSaved ? 'Saved!' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
