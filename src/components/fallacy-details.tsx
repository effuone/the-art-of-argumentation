import React, { FC } from 'react';
import Link from 'next/link';
import { X, ExternalLink, AlertTriangle, Shield, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Fallacy } from '@/lib/types';
import { fallacyCategories } from '@/data/fallacy-categories';

interface FallacyDetailsProps {
  fallacy: Fallacy | null;
  isOpen: boolean;
  onClose: () => void;
}

// Адаптивный компонент диалогового окна для логических ошибок
const FallacyDetails: FC<FallacyDetailsProps> = ({
  fallacy,
  isOpen,
  onClose,
}) => {
  if (!fallacy) return null;

  const category = fallacyCategories.find((cat) => cat.id === fallacy.category);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className='max-w-sm sm:max-w-lg md:max-w-2xl p-4 sm:p-6'>
        {/* Адаптивная шапка */}
        <DialogHeader className='pb-3 flex flex-col'>
          <div className='mb-2'>
            <span
              className='px-2 py-0.5 text-xs sm:text-sm rounded-full text-white'
              style={{ backgroundColor: category?.color }}
            >
              {category?.name}
            </span>
          </div>
          <DialogTitle className='text-xl sm:text-2xl flex items-center gap-2'>
            <span className='text-2xl sm:text-3xl'>{fallacy.icon}</span>
            {fallacy.name}{' '}
            <span className='text-gray-500 text-sm sm:text-base font-normal'>
              ({fallacy.latinName})
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Основное описание - адаптивное */}
        <div className='bg-slate-50 dark:bg-slate-900 rounded-md p-3 sm:p-4 text-sm sm:text-base mb-3 sm:mb-4'>
          <div className='mb-3'>
            <p className='text-gray-800 dark:text-gray-200'>
              {fallacy.shortDescription || fallacy.description}
            </p>
          </div>

          {/* Пример */}
          <div className='border-l-2 sm:border-l-4 border-gray-300 pl-2 sm:pl-3 py-1 italic text-gray-600 dark:text-gray-400 text-xs sm:text-sm'>
            <p>"{fallacy.example}"</p>
            <p className='text-gray-500 mt-1 text-xs'>— {fallacy.context}</p>
          </div>
        </div>

        {/* Секции с иконками */}
        <div className='space-y-3'>
          {/* Опасности */}
          <div className='flex items-start gap-2'>
            <AlertTriangle className='h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mt-0.5 flex-shrink-0' />
            <div>
              <h4 className='text-sm sm:text-base font-medium text-amber-700 dark:text-amber-400 mb-0.5'>
                Почему это опасно:
              </h4>
              <p className='text-xs sm:text-sm text-gray-700 dark:text-gray-300'>
                {fallacy.danger}
              </p>
            </div>
          </div>

          {/* Распознавание */}
          <div className='flex items-start gap-2'>
            <Shield className='h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0' />
            <div>
              <h4 className='text-sm sm:text-base font-medium text-green-700 dark:text-green-400 mb-0.5'>
                Как распознать:
              </h4>
              <ul className='text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside pl-0.5'>
                {fallacy.recognitionSteps.slice(0, 2).map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className='flex justify-between items-center pt-3 mt-3 border-t border-gray-200 dark:border-gray-700'>
          <Button
            variant='outline'
            size='sm'
            onClick={onClose}
            className='text-xs sm:text-sm h-8 sm:h-9'
          >
            Закрыть
          </Button>
          <Link href={`/${fallacy.slug}`}>
            <Button
              size='sm'
              className='gap-1.5 items-center text-xs sm:text-sm h-8 sm:h-9'
            >
              Подробнее <ExternalLink className='h-3.5 w-3.5' />
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FallacyDetails;
