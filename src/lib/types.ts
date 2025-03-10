export type FallacyCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
};

export type FallacyExample = {
  title: string;
  context: string;
  quote: string | null;
  explanation: string;
  result: string | null;
};

export type DefenseStrategy = {
  title: string;
  incorrectExample: string;
  correctExample: string;
  explanation: string;
};

export type Fallacy = {
  id: string;
  name: string;
  latinName: string;
  slug: string;
  category: string;
  icon: string;
  description: string;
  shortDescription: string;
  example: string;
  context: string;
  danger: string;
  recognitionSteps: string[];
  detailedDescription: string;
  historicalExamples: FallacyExample[] | null;
  modernExamples: FallacyExample[];
  howToDistinguish: {
    validArgument: string[];
    fallacyExample: string[];
    exceptions: string | null;
  } | null;
  defenseStrategies: DefenseStrategy[] | null;
  similarFallacies: {
    id: string;
    explanation: string;
  }[];
  value: number;
};
