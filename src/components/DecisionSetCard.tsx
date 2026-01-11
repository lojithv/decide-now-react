import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Edit, Layers, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DecisionSetCardProps {
  id: string;
  title: string;
  description: string;
  levelCount: number;
  lastUsed?: string;
  onDelete?: () => void;
}

const DecisionSetCard = ({ id, title, description, levelCount, lastUsed, onDelete }: DecisionSetCardProps) => {
  return (
    <div className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/editor/${id}`} className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Layers className="w-4 h-4" />
          <span>{levelCount} level{levelCount !== 1 ? 's' : ''}</span>
        </div>
        {lastUsed && (
          <span className="text-sm text-muted-foreground">
            Last used: {lastUsed}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="hero" size="sm" className="flex-1" asChild>
          <Link to={`/play/${id}`}>
            <Play className="w-4 h-4" />
            Play
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/editor/${id}`}>
            <Edit className="w-4 h-4" />
            Edit
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DecisionSetCard;
