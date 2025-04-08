
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface TopicSelectorProps {
  onSelectTopic: (topic: string) => void;
}

const popularTopics = [
  "Universal Basic Income",
  "Social Media Regulation",
  "Artificial Intelligence Dangers",
  "Climate Change Solutions",
  "Free Speech Limitations",
  "Healthcare Systems",
  "Cryptocurrency Regulation",
  "Education Reform",
  "Immigration Policies",
  "Death Penalty"
];

const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelectTopic }) => {
  const [customTopic, setCustomTopic] = React.useState('');

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Select a Debate Topic</h2>
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your own topic..."
              className="w-full p-3 border rounded-md pr-20"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
            />
            <Button 
              className="absolute right-1 top-1 bottom-1"
              onClick={() => customTopic && onSelectTopic(customTopic)}
              disabled={!customTopic}
            >
              <ChevronRight className="h-4 w-4 mr-1" />
              Debate
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Popular Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {popularTopics.map((topic) => (
              <Button 
                key={topic} 
                variant="outline" 
                className="justify-start text-left h-auto py-3 px-4 hover:bg-debate-light-blue transition-colors"
                onClick={() => onSelectTopic(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicSelector;
