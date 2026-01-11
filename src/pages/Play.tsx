import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SpinningWheel from "@/components/SpinningWheel";
import { mockDecisionSets, DecisionSet } from "@/lib/mockData";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, Sparkles } from "lucide-react";

const demoDecisionSet: DecisionSet = {
  id: "demo",
  title: "What Should I Do Today?",
  description: "A demo decision set to show you how DecideNow works!",
  levels: [
    {
      id: "demo-1",
      name: "Activity Type",
      options: ["Productive", "Relaxing", "Social", "Creative", "Adventure"]
    },
    {
      id: "demo-2",
      name: "Specific Activity",
      options: ["Work on a project", "Read a book", "Call a friend", "Draw or paint", "Go for a walk", "Learn something new"]
    }
  ],
  createdAt: "2024-01-01"
};

const Play = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDemo = id === "demo";
  
  const [decisionSet, setDecisionSet] = useState<DecisionSet | null>(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isDemo) {
      setDecisionSet(demoDecisionSet);
    } else {
      const found = mockDecisionSets.find(set => set.id === id);
      if (found) {
        setDecisionSet(found);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, isDemo, navigate]);

  if (!decisionSet) {
    return null;
  }

  const currentLevel = decisionSet.levels[currentLevelIndex];
  const totalLevels = decisionSet.levels.length;

  const handleResult = (result: string) => {
    const newResults = [...results, result];
    setResults(newResults);

    setTimeout(() => {
      if (currentLevelIndex < totalLevels - 1) {
        setCurrentLevelIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  };

  const handleReset = () => {
    setCurrentLevelIndex(0);
    setResults([]);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-up">
            <Button variant="ghost" size="icon" className="text-foreground" asChild>
              <Link to={isDemo ? "/" : "/dashboard"}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {decisionSet.title}
              </h1>
              <p className="text-muted-foreground text-sm">
                {decisionSet.description}
              </p>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>

          {/* Progress */}
          <div className="mb-8 animate-fade-up animation-delay-100">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Level {Math.min(currentLevelIndex + 1, totalLevels)} of {totalLevels}</span>
              <span>{Math.round((results.length / totalLevels) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${(results.length / totalLevels) * 100}%` }}
              />
            </div>
          </div>

          {/* Results Summary */}
          {results.length > 0 && (
            <div className="mb-8 space-y-2 animate-fade-up">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border animate-slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-xs text-muted-foreground">{decisionSet.levels[index].name}</span>
                    <p className="font-medium text-foreground">{result}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wheel or Completion */}
          {!isComplete ? (
            <div className="text-center animate-fade-up animation-delay-200">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                  {currentLevel.name}
                </span>
              </div>
              <SpinningWheel
                options={currentLevel.options}
                onResult={handleResult}
              />
            </div>
          ) : (
            <div className="text-center py-12 animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Decision Complete!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                The wheel has spoken. Here's what fate has decided for you:
              </p>
              
              <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-lg">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground">{decisionSet.levels[index].name}</span>
                    <span className="font-semibold text-foreground">{result}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={handleReset}>
                  <RotateCcw className="w-5 h-5" />
                  Spin Again
                </Button>
                {!isDemo && (
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/dashboard">
                      <ArrowRight className="w-5 h-5" />
                      Back to Dashboard
                    </Link>
                  </Button>
                )}
                {isDemo && (
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/login">
                      <ArrowRight className="w-5 h-5" />
                      Create Your Own
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Play;
