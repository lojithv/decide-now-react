export interface DecisionLevel {
  id: string;
  name: string;
  options: string[];
}

export interface DecisionSet {
  id: string;
  title: string;
  description: string;
  levels: DecisionLevel[];
  lastUsed?: string;
  createdAt: string;
}

export const mockDecisionSets: DecisionSet[] = [
  {
    id: "1",
    title: "Friday Night Plans",
    description: "What should we do this Friday? Spin to decide the perfect evening.",
    levels: [
      {
        id: "1-1",
        name: "Activity Type",
        options: ["Stay Home", "Go Out", "Adventure", "Relaxation"]
      },
      {
        id: "1-2", 
        name: "Specific Activity",
        options: ["Movie Night", "Board Games", "Dinner Out", "Bar Hopping", "Hiking", "Spa Day"]
      },
      {
        id: "1-3",
        name: "Time",
        options: ["6 PM", "7 PM", "8 PM", "9 PM"]
      }
    ],
    lastUsed: "2 days ago",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Lunch Decider",
    description: "Can't decide what to eat? Let the wheel choose for you!",
    levels: [
      {
        id: "2-1",
        name: "Cuisine",
        options: ["Italian", "Mexican", "Asian", "American", "Mediterranean", "Indian"]
      },
      {
        id: "2-2",
        name: "Style",
        options: ["Fast Food", "Sit Down", "Takeout", "Delivery"]
      }
    ],
    lastUsed: "Yesterday",
    createdAt: "2024-01-10"
  },
  {
    id: "3",
    title: "Team Building Activity",
    description: "Decide on the next team outing with your colleagues.",
    levels: [
      {
        id: "3-1",
        name: "Type",
        options: ["Indoor", "Outdoor", "Virtual", "Hybrid"]
      },
      {
        id: "3-2",
        name: "Activity",
        options: ["Escape Room", "Bowling", "Cooking Class", "Trivia Night", "Volunteer Day", "Karaoke"]
      },
      {
        id: "3-3",
        name: "Day",
        options: ["Monday", "Wednesday", "Friday"]
      }
    ],
    lastUsed: "1 week ago",
    createdAt: "2024-01-05"
  }
];

export const createEmptyDecisionSet = (): DecisionSet => ({
  id: Date.now().toString(),
  title: "New Decision Set",
  description: "Add a description for your decision set",
  levels: [
    {
      id: `${Date.now()}-1`,
      name: "Level 1",
      options: ["Option 1", "Option 2", "Option 3"]
    }
  ],
  createdAt: new Date().toISOString().split('T')[0]
});
