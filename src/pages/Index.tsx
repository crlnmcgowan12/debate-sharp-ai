
import React, { useState } from 'react';
import TopicSelector from '@/components/TopicSelector';
import PositionSelector from '@/components/PositionSelector';
import DebateInterface from '@/components/DebateInterface';
import { DebateStage } from '@/utils/types';

const Index = () => {
  const [stage, setStage] = useState<DebateStage>('topic');
  const [topic, setTopic] = useState<string>('');
  const [position, setPosition] = useState<'for' | 'against'>('for');

  const handleSelectTopic = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setStage('position');
  };

  const handleSelectPosition = (selectedPosition: 'for' | 'against') => {
    setPosition(selectedPosition);
    setStage('debate');
  };

  const handleBackToTopic = () => {
    setStage('topic');
  };

  const handleBackToPosition = () => {
    setStage('position');
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 bg-gradient-to-b from-slate-50 to-blue-50">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-primary">Debate Me</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Sharpen your argument skills by debating with an AI that takes the opposing position. 
          Receive feedback on logical fallacies and improve your critical thinking.
        </p>
      </header>

      <main className="flex-grow flex items-start justify-center">
        {stage === 'topic' && (
          <TopicSelector onSelectTopic={handleSelectTopic} />
        )}
        
        {stage === 'position' && (
          <PositionSelector 
            topic={topic} 
            onSelectPosition={handleSelectPosition} 
            onBack={handleBackToTopic}
          />
        )}
        
        {stage === 'debate' && (
          <DebateInterface 
            topic={topic} 
            userPosition={position} 
            onBack={handleBackToPosition}
          />
        )}
      </main>

      <footer className="mt-8 text-center text-sm text-slate-500">
        <p>Debate Me App &copy; {new Date().getFullYear()} - Improve your critical thinking skills</p>
      </footer>
    </div>
  );
};

export default Index;
