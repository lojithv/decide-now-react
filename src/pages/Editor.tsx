import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { mockDecisionSets, createEmptyDecisionSet, DecisionSet, DecisionLevel } from "@/lib/mockData";
import { 
  Plus, 
  Trash2, 
  Save, 
  Play, 
  ArrowLeft, 
  GripVertical,
  Layers
} from "lucide-react";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  
  const [decisionSet, setDecisionSet] = useState<DecisionSet | null>(null);

  useEffect(() => {
    if (isNew) {
      setDecisionSet(createEmptyDecisionSet());
    } else {
      const found = mockDecisionSets.find(set => set.id === id);
      if (found) {
        setDecisionSet({ ...found });
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, isNew, navigate]);

  if (!decisionSet) {
    return null;
  }

  const updateTitle = (title: string) => {
    setDecisionSet(prev => prev ? { ...prev, title } : null);
  };

  const updateDescription = (description: string) => {
    setDecisionSet(prev => prev ? { ...prev, description } : null);
  };

  const addLevel = () => {
    setDecisionSet(prev => {
      if (!prev) return null;
      const newLevel: DecisionLevel = {
        id: `${Date.now()}`,
        name: `Level ${prev.levels.length + 1}`,
        options: ["Option 1", "Option 2"]
      };
      return { ...prev, levels: [...prev.levels, newLevel] };
    });
  };

  const removeLevel = (levelId: string) => {
    setDecisionSet(prev => {
      if (!prev) return null;
      return { ...prev, levels: prev.levels.filter(l => l.id !== levelId) };
    });
  };

  const updateLevelName = (levelId: string, name: string) => {
    setDecisionSet(prev => {
      if (!prev) return null;
      return {
        ...prev,
        levels: prev.levels.map(l => l.id === levelId ? { ...l, name } : l)
      };
    });
  };

  const addOption = (levelId: string) => {
    setDecisionSet(prev => {
      if (!prev) return null;
      return {
        ...prev,
        levels: prev.levels.map(l => {
          if (l.id === levelId) {
            return { ...l, options: [...l.options, `Option ${l.options.length + 1}`] };
          }
          return l;
        })
      };
    });
  };

  const removeOption = (levelId: string, optionIndex: number) => {
    setDecisionSet(prev => {
      if (!prev) return null;
      return {
        ...prev,
        levels: prev.levels.map(l => {
          if (l.id === levelId) {
            return { ...l, options: l.options.filter((_, i) => i !== optionIndex) };
          }
          return l;
        })
      };
    });
  };

  const updateOption = (levelId: string, optionIndex: number, value: string) => {
    setDecisionSet(prev => {
      if (!prev) return null;
      return {
        ...prev,
        levels: prev.levels.map(l => {
          if (l.id === levelId) {
            const newOptions = [...l.options];
            newOptions[optionIndex] = value;
            return { ...l, options: newOptions };
          }
          return l;
        })
      };
    });
  };

  const handleSave = () => {
    // In real app, save to backend
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-up">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">
                {isNew ? "Create Decision Set" : "Edit Decision Set"}
              </h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/play/${decisionSet.id}`}>
                  <Play className="w-4 h-4" />
                  Preview
                </Link>
              </Button>
              <Button variant="hero" onClick={handleSave}>
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6 animate-fade-up animation-delay-100">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={decisionSet.title}
                  onChange={(e) => updateTitle(e.target.value)}
                  placeholder="Enter a title for your decision set"
                  className="h-12 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={decisionSet.description}
                  onChange={(e) => updateDescription(e.target.value)}
                  placeholder="Describe what this decision set is for"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Levels */}
          <div className="space-y-4 animate-fade-up animation-delay-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Decision Levels
              </h2>
              <Button variant="outline" size="sm" onClick={addLevel}>
                <Plus className="w-4 h-4" />
                Add Level
              </Button>
            </div>

            {decisionSet.levels.map((level, levelIndex) => (
              <div 
                key={level.id}
                className="bg-card border border-border rounded-2xl p-5 animate-scale-in"
                style={{ animationDelay: `${levelIndex * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                  <Input
                    value={level.name}
                    onChange={(e) => updateLevelName(level.id, e.target.value)}
                    className="flex-1 font-medium"
                    placeholder="Level name"
                  />
                  {decisionSet.levels.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeLevel(level.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2 ml-8">
                  {level.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <Input
                        value={option}
                        onChange={(e) => updateOption(level.id, optionIndex, e.target.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1"
                      />
                      {level.options.length > 2 && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeOption(level.id, optionIndex)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addOption(level.id)}
                    className="ml-4 text-muted-foreground hover:text-primary"
                  >
                    <Plus className="w-4 h-4" />
                    Add Option
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
