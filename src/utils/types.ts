
export interface Fallacy {
  name: string;
  description: string;
  improvement: string;
}

export interface MessageType {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  fallacies: Fallacy[];
}

export type DebateStage = 'topic' | 'position' | 'debate';
