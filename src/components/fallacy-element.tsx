import { fallacyCategories } from '@/data/fallacy-categories';
import { Fallacy } from '@/lib/types';
import { FC } from 'react';

interface FallacyElementProps {
  fallacy: Fallacy;
  onClick: (fallacy: Fallacy) => void;
}

// Компонент элемента карты
const FallacyElement: FC<FallacyElementProps> = ({ fallacy, onClick }) => {
  const category = fallacyCategories.find((cat) => cat.id === fallacy.category);

  return (
    <div
      className='border rounded-md cursor-pointer hover:shadow-md transition hover:scale-105'
      style={{ backgroundColor: category?.color }}
      onClick={() => onClick(fallacy)}
    >
      <div className='p-4 text-center'>
        <div className='text-white text-3xl mb-2'>{fallacy.icon}</div>
        <div className='text-white text-sm font-medium h-12 flex items-center justify-center'>
          <span className='line-clamp-2'>{fallacy.name}</span>
        </div>
        <div className='text-white/75 text-xs mt-1 italic'>
          {fallacy.latinName}
        </div>
      </div>
    </div>
  );
};

export default FallacyElement;
