
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react';

interface PositionSelectorProps {
  topic: string;
  onSelectPosition: (position: 'for' | 'against') => void;
  onBack: () => void;
}

const PositionSelector: React.FC<PositionSelectorProps> = ({ 
  topic, 
  onSelectPosition, 
  onBack 
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={onBack} className="mr-2 p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">What's your position?</h2>
        </div>
        
        <div className="text-lg mb-6 text-center font-medium p-3 bg-muted rounded-md">
          "{topic}"
        </div>
        
        <p className="text-center mb-6 text-muted-foreground">
          Select your position and the AI will take the opposite stance to help you strengthen your arguments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            className="h-24 text-lg flex flex-col items-center gap-2 bg-debate-light-blue hover:bg-debate-blue hover:text-white border border-debate-blue"
            variant="outline"
            onClick={() => onSelectPosition('for')}
          >
            <ThumbsUp className="h-6 w-6" />
            <span>I'm For This</span>
          </Button>
          
          <Button 
            className="h-24 text-lg flex flex-col items-center gap-2 bg-debate-light-red hover:bg-debate-red hover:text-white border border-debate-red"
            variant="outline"
            onClick={() => onSelectPosition('against')}
          >
            <ThumbsDown className="h-6 w-6" />
            <span>I'm Against This</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionSelector;
