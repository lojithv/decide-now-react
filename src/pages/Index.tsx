import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { 
  Zap, 
  Layers, 
  Sparkles, 
  Share2, 
  Smartphone, 
  BarChart3,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Multi-Level Decisions",
    description: "Create nested decision trees with multiple levels. Perfect for complex choices with dependencies."
  },
  {
    icon: Sparkles,
    title: "Beautiful Wheel UI",
    description: "Premium spinning wheel experience with smooth animations and satisfying interactions."
  },
  {
    icon: Share2,
    title: "Share & Collaborate",
    description: "Share your decision sets with friends, family, or colleagues. Make group decisions fun."
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Works beautifully on any device. Spin the wheel on the go, anywhere, anytime."
  },
  {
    icon: BarChart3,
    title: "Decision History",
    description: "Track your past decisions and see patterns. Never wonder what you decided before."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "No sign up required to try. Get started in seconds and make decisions faster."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            Making decisions fun since 2024
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
            Stop Overthinking.
            <br />
            <span className="text-gradient">Start Deciding.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up animation-delay-200">
            Create beautiful spinning wheels for any decision. From dinner plans to life choices,
            let fate guide you with our premium decision-making experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/login">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/play/demo">
                Try Demo
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground animate-fade-up animation-delay-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Free forever
            </div>
          </div>
        </div>
      </section>

      {/* Wheel Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="relative max-w-lg mx-auto animate-float">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full shadow-2xl overflow-hidden" style={{ background: 'var(--gradient-wheel)' }}>
              <div className="absolute inset-4 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-card shadow-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to decide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features wrapped in a beautiful, intuitive interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to make any decision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Create", description: "Add your options and organize them into levels" },
              { step: "2", title: "Spin", description: "Let the wheel decide with a satisfying spin" },
              { step: "3", title: "Decide", description: "Follow the result or spin again for a new outcome" }
            ].map((item, index) => (
              <div key={item.step} className="text-center animate-fade-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-primary shadow-glow">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to stop overthinking?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of users who've made better decisions faster with DecideNow.
            </p>
            <Button variant="secondary" size="xl" asChild className="bg-background text-foreground hover:bg-background/90">
              <Link to="/login">
                Start Deciding Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">DecideNow</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 DecideNow. Make better decisions faster.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
