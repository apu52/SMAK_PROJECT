
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      title: "Surgical Ethics and Consent in Practice",
      date: "September 27, 2025",
      time: "8:00 PM IST",
      location: "Virtual Event",
      type: "Webinar",
      image: "https://i.postimg.cc/FsjKDWDN/Whats-App-Image-2025-09-14-at-15-52-31-074a71b4.jpg",
      description: "Join us for an insightful webinar on 'Surgical Ethics and Consent in Practice' by Dr. Gunjan Desai, DNB GI Surgery Teaching Faculty at Lilavati Hospital and Director of Edusurg Clinics. This session will focus on the crucial principles of surgical ethics, real-world challenges in obtaining informed consent, and best practices to ensure patient-centered care. Designed for surgeons, medical students, and healthcare professionals, the webinar emphasizes ethical decision-making in clinical practice. Learn how to navigate complex situations, communicate effectively with patients, and uphold professional responsibility. Don't miss this opportunity to strengthen your ethical approach in surgical care.",
      speaker: "Dr. Gunjan Desai, DNB GI Surgery"
    }
  ];

  const pastEvents = [
    {
      title: "World Asthma Day",
      date: "May 6, 2025",
      attendees: "250+",
      image: "https://i.postimg.cc/dVg3M8DW/IMG-20250613-WA0032.jpg"
    },
    {
      title: "World Asthma Day",
      date: "May 6, 2025",
      attendees: "250+",
      image: "https://i.postimg.cc/ncPc7vKH/IMG-20250613-WA0033.jpg"
    },
    {
      title: "World Asthma Day",
      date: "May 6, 2025",
      attendees: "250+",
      image: "https://i.postimg.cc/hG9SH6kj/IMG-20250613-WA0034.jpg"
    },
    {
      title: "The Forensic Lens: Understanding Suicide Through FMT",
      date: "September 10, 2025",
      attendees: "300+",
      image: "https://i.postimg.cc/JhjHJrvc/Whats-App-Image-2025-09-03-at-23-29-38-c5cc9a21.jpg",
      description: "SMAK Maharashtra presented an insightful webinar on World Suicide Prevention Day exploring medico-legal, psychological, and forensic dimensions of suicide with Prof. (Dr.) Kiran Kumar Pattnaik, HOD FMT - GMC Balasore.",
      organizer: "SMAK Maharashtra",
      speaker: "Prof. (Dr.) Kiran Kumar Pattnaik"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 min-h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 dark:from-blue-950 dark:via-purple-900 dark:to-pink-900 overflow-hidden">
  {/* Previous animated orbs and gradients */}
  <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-300/30 rounded-full blur-2xl animate-pulse"></div>
  <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-pink-300/40 rounded-full blur-2xl animate-pulse delay-1000"></div>
  <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-300/50 rounded-full blur-lg animate-pulse delay-500"></div>
  <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-blue-400/30 rounded-full blur-lg animate-pulse delay-700"></div>
  {/* Subtle grid pattern */}
  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.06]"></div>
  {/* Exciting wave animation */}
  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-200/20 via-purple-100/10 to-transparent dark:from-pink-900/20 dark:via-purple-800/10"></div>
  {/* Diagonal gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-pink-100/30 dark:from-transparent dark:via-blue-950/20 dark:to-pink-950/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 flex items-center justify-center gap-4">
              <span className="inline-block">
                <Calendar className="inline h-12 w-12 text-pink-500 mr-2 animate-gentle-pulse" />
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-pink-400 bg-clip-text text-white dark:text-white">
                SMAK Events
              </span>
            </h1>
            <p className="text-xl text-blue-50 dark:text-blue-100 mb-8 font-semibold drop-shadow-lg">
              Join our community of medical students and professionals in learning, networking, and growing together through our diverse range of events.
            </p>
          </div>
        </div>
        <style>{`
          @keyframes gentle-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          .animate-gentle-pulse { animation: gentle-pulse 3s ease-in-out infinite; }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          .card-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 200% 100%;
            animation: shimmer 3s ease-in-out infinite;
          }
          
          .glow-blue {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1);
          }
          
          .glow-red {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3), 0 0 40px rgba(239, 68, 68, 0.1);
          }
          
          .glow-purple {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(147, 51, 234, 0.1);
          }
        `}</style>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't miss out on these exciting learning opportunities
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="max-w-2xl w-full">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-[1.02] hover:border-blue-400/50 border-2 border-transparent bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 hover:from-blue-50/50 hover:to-green-50/30 dark:hover:from-blue-950/50 dark:hover:to-green-950/30 hover:glow-blue relative group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-shimmer pointer-events-none"></div>
                  <div className="aspect-video relative z-10">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="relative z-10">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium dark:bg-blue-900/20 dark:text-blue-400">
                        {event.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-blue-600" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                        {event.location}
                      </div>
                    </div>
                    {event.speaker && (
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                          🎙️ Speaker: {event.speaker}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Teaching Faculty at Lilavati Hospital & Director of Edusurg Clinics
                        </p>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-950/10 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Past Events
            </h2>
            <p className="text-lg text-muted-foreground">
              Celebrating our successful events and their impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/25 hover:scale-[1.02] hover:border-red-400/50 border-2 border-transparent bg-gradient-to-br from-white to-red-50/20 dark:from-gray-900 dark:to-red-950/20 hover:from-red-50/30 hover:to-pink-50/30 dark:hover:from-red-950/30 dark:hover:to-pink-950/30 hover:glow-red relative group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-shimmer pointer-events-none"></div>
                <div className="aspect-video relative z-10">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </CardDescription>
                  {event.organizer && (
                    <CardDescription className="text-blue-600 font-medium text-sm">
                      {event.organizer}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="relative z-10">
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {event.description}
                    </p>
                  )}
                  {event.speaker && (
                    <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                        🎙️ Speaker: {event.speaker}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center text-blue-600 font-medium">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} Attendees
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Event Categories
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Webinars", description: "Expert-led online sessions", icon: "🎥" },
              { title: "Workshops", description: "Hands-on learning experiences", icon: "🔬" },
              { title: "Competitions", description: "Test your knowledge and skills", icon: "🏆" },
              { title: "Conferences", description: "Large-scale academic gatherings", icon: "🏛️" }
            ].map((category, index) => (
              <Card key={index} className="text-center overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-[1.05] hover:border-purple-400/50 border-2 border-transparent bg-gradient-to-br from-white to-purple-50/20 dark:from-gray-900 dark:to-purple-950/20 hover:from-purple-50/30 hover:to-violet-50/30 dark:hover:from-purple-950/30 dark:hover:to-violet-950/30 hover:glow-purple relative group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-shimmer pointer-events-none"></div>
                <CardContent className="pt-6 relative z-10">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
