import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Eye, Download, Sparkles, Stethoscope, Activity, TestTube, Heart, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClinicalCorner = () => {
  const navigate = useNavigate();
  const [previewDialog, setPreviewDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleDeepDive = () => {
    navigate('/login');
  };

  const handlePreview = (content) => {
    setSelectedContent(content);
    setPreviewDialog(true);
  };

  const clinicalSections = [
    {
      id: 'clinical-cases',
      title: 'Clinical Cases',
      description: 'Explore real patient scenarios with detailed case presentations, differential diagnoses, and treatment plans.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      icon: '🏥',
      color: 'from-blue-500 to-blue-600',
      stats: '75+ Cases',
      features: ['Case of the Day', 'Interactive Discussions', 'Expert Analysis']
    },
    {
      id: 'emergency-protocols',
      title: 'Emergency Protocols',
      description: 'Master critical emergency situations with step-by-step protocols, ACLS guidelines, and life-saving procedures.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      icon: '⚡',
      color: 'from-blue-600 to-blue-700',
      stats: '50+ Protocols',
      features: ['ACLS & BLS Protocols', 'Trauma Management', 'Quick Reference Cards']
    },
    {
      id: 'lab-imaging',
      title: 'Lab & Imaging Interpretation',
      description: 'Master the art of interpreting X-rays, ECGs, blood work, and other diagnostic studies with expert guidance.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      icon: '🔬',
      color: 'from-blue-400 to-blue-500',
      stats: '200+ Studies',
      features: ['X-ray Interpretation', 'ECG Analysis', 'Lab Values Reference']
    }
  ];

  const featuredContent = [
    {
      title: "COVID-19 Management Protocol",
      type: "Emergency Protocol",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=150&fit=crop",
      icon: "⚡",
      difficulty: "Advanced",
      preview: "Comprehensive guidelines for managing COVID-19 patients in various clinical settings..."
    },
    {
      title: "Chest X-Ray Interpretation",
      type: "Imaging Study",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=150&fit=crop",
      icon: "🔬",
      difficulty: "Intermediate",
      preview: "Step-by-step approach to reading chest X-rays with common pathology examples..."
    },
    {
      title: "Cardiac Arrest Case Study",
      type: "Clinical Case",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=150&fit=crop",
      icon: "🏥",
      difficulty: "Expert",
      preview: "Complex cardiac arrest scenario with multiple decision points and treatment options..."
    }
  ];

  const stats = [
    { title: "Active Cases", value: "75+", icon: "📋", color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Emergency Protocols", value: "50+", icon: "⚡", color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Imaging Studies", value: "200+", icon: "🔬", color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Expert Reviews", value: "1000+", icon: "🏆", color: "text-blue-600", bgColor: "bg-blue-50" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 text-white overflow-hidden">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="flex justify-center items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <TestTube className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-6xl font-bold mb-6">
                Clinical Corner
              </h1>
              <p className="text-blue-100 mb-10 text-xl leading-relaxed max-w-3xl mx-auto">
                Your comprehensive clinical learning hub. Explore real-world medical scenarios, 
                emergency protocols, and master the art of clinical interpretation with expert guidance.
              </p>
              
              

              <Button 
                onClick={handleDeepDive}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="h-6 w-6 mr-3" />
                Deep Dive into Clinical Corner
              </Button>
            </div>
          </div>

         

          
          {/* Featured Content */}
          <Card className="border-2 border-blue-100 shadow-lg bg-white">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl text-blue-800">Featured This Week</span>
                <Badge className="bg-blue-600 text-white px-3 py-1">New</Badge>
              </CardTitle>
              <CardDescription className="text-base text-gray-600 mt-2">
                Handpicked clinical content to enhance your learning experience
              </CardDescription>
            </CardHeader>
            
            </Card>
          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Ready to Master Clinical Skills?</h2>
            <p className="text-blue-100 mb-8 text-xl max-w-3xl mx-auto leading-relaxed">
              Join thousands of medical students and professionals who are advancing their clinical knowledge with our comprehensive learning platform.
            </p>
            <Button 
              onClick={handleDeepDive}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <User className="h-6 w-6 mr-3" />
              Start Your Clinical Journey
            </Button>
          </div>
        </div>
      </main>

      {/* Preview Dialog */}
      <Dialog open={previewDialog} onOpenChange={setPreviewDialog}>
        <DialogContent className="max-w-2xl border-2 border-blue-100">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              {selectedContent && (
                <>
                  <span className="text-3xl">{selectedContent.icon}</span>
                  <span className="text-blue-800">{selectedContent.title}</span>
                  <Badge className="bg-blue-600 text-white">{selectedContent.type}</Badge>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedContent && (
              <>
                <img 
                  src={selectedContent.image} 
                  alt={selectedContent.title}
                  className="w-full h-48 object-cover rounded-lg border-2 border-blue-100"
                />
                <p className="text-gray-600 leading-relaxed text-base">
                  {selectedContent.preview}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-blue-100">
                  <Badge variant="outline" className="border-blue-200 text-blue-600">{selectedContent.difficulty}</Badge>
                  <div className="space-x-3">
                    <Button variant="outline" onClick={() => setPreviewDialog(false)} className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      Close Preview
                    </Button>
                    <Button onClick={handleDeepDive} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <User className="h-4 w-4 mr-2" />
                      Login to Access Full Content
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ClinicalCorner;
