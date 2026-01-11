import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import DecisionSetCard from "@/components/DecisionSetCard";
import { mockDecisionSets, DecisionSet } from "@/lib/mockData";
import { Plus, Search, Zap } from "lucide-react";

const Dashboard = () => {
  const [decisionSets, setDecisionSets] = useState<DecisionSet[]>(mockDecisionSets);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSets = decisionSets.filter(set =>
    set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    set.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setDecisionSets(prev => prev.filter(set => set.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-up">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Your Decision Sets</h1>
              <p className="text-muted-foreground">
                Create, manage, and spin your decision wheels
              </p>
            </div>
            <Button variant="hero" asChild>
              <Link to="/editor/new">
                <Plus className="w-5 h-5" />
                New Decision Set
              </Link>
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-8 animate-fade-up animation-delay-100">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search your decision sets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>

          {/* Decision Sets Grid */}
          {filteredSets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSets.map((set, index) => (
                <div 
                  key={set.id} 
                  className="animate-fade-up"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <DecisionSetCard
                    id={set.id}
                    title={set.title}
                    description={set.description}
                    levelCount={set.levels.length}
                    lastUsed={set.lastUsed}
                    onDelete={() => handleDelete(set.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-up">
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchQuery ? "No results found" : "No decision sets yet"}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchQuery 
                  ? "Try a different search term or create a new decision set"
                  : "Create your first decision set and start making choices the fun way!"
                }
              </p>
              <Button variant="hero" asChild>
                <Link to="/editor/new">
                  <Plus className="w-5 h-5" />
                  Create Decision Set
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
