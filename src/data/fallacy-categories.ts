import { FallacyCategory } from '@/lib/types';

export const fallacyCategories: FallacyCategory[] = [
  {
    id: 'разрушительные',
    name: 'Разрушительные ошибки',
    icon: '💥',
    color: '#E57373', // Light Red
    description: 'Ошибки, наносящие существенный вред аргументации',
  },
  {
    id: 'манипулятивные',
    name: 'Манипулятивные ошибки',
    icon: '🤥',
    color: '#64B5F6', // Light Blue
    description: 'Ошибки, связанные с манипуляцией и искажением фактов',
  },
  {
    id: 'приводящие в заблуждение',
    name: 'Ошибки, приводящие в заблуждение',
    icon: '🚫',
    color: '#FFB74D', // Light Orange
    description: 'Ошибки, создающие ложное впечатление о фактах',
  },
  {
    id: 'отвлекающие',
    name: 'Отвлекающие ошибки',
    icon: '🔍',
    color: '#81C784', // Light Green
    description: 'Ошибки, использующие отвлечение внимания от главного',
  },
  {
    id: 'незначительные',
    name: 'Незначительные ошибки',
    icon: '⚖️',
    color: '#FFD54F', // Light Amber
    description: 'Ошибки, влияние которых несущественно',
  },
];
