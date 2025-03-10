'use client';

import React, { useState } from 'react';
import { GithubIcon, Search, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Fallacy } from '@/lib/types';
import { fallacies } from '@/data/fallacies';
import { fallacyCategories } from '@/data/fallacy-categories';
import FallacyElement from '@/components/fallacy-element';
import CategoryLegend from '@/components/category-legend';
import FallacyDetails from '@/components/fallacy-details';

export default function LogicalFallacyMap() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFallacy, setSelectedFallacy] = useState<Fallacy | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Фильтрация логических ошибок по поисковому запросу
  const filteredFallacies = fallacies.filter(
    (fallacy) =>
      fallacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fallacy.latinName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetails = (fallacy: Fallacy) => {
    setSelectedFallacy(fallacy);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div className='min-h-screen bg-white dark:bg-gray-950'>
      {/* Шапка страницы */}
      <header className='bg-white dark:bg-gray-900 border-b sticky top-0 z-10'>
        <div className='max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='flex items-center'>
              <div className='mr-3 bg-blue-600 text-white p-2 rounded-lg'>
                <span className='text-2xl'>🧠</span>
              </div>
              <div>
                <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Карта логических ошибок
                </h1>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Визуальный справочник по ошибкам в аргументации
                </p>
              </div>
            </div>

            <div className='flex items-center w-full sm:w-auto'>
              <div className='relative w-full sm:w-64'>
                <Input
                  type='text'
                  placeholder='Поиск ошибок...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pr-10'
                />
                <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                  <Search className='h-4 w-4 text-gray-400' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Информационный блок */}
        <div className='mb-8 bg-blue-50 dark:bg-blue-950 rounded-lg p-6'>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='md:w-2/3'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                Что такое логические ошибки?
              </h2>
              <p className='text-gray-700 dark:text-gray-300 mb-3'>
                Логические ошибки — это ошибки в рассуждениях, которые делают
                аргумент некорректным. Они часто используются намеренно в
                риторике, чтобы ввести собеседника в заблуждение.
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                Эта интерактивная карта поможет вам распознать и избежать
                распространенных логических ошибок в повседневных дискуссиях,
                политических дебатах и критическом мышлении.
              </p>
              <div className='flex items-center mt-4'>
                <a
                  href='https://www.youtube.com/watch?v=IAQ_K3RE0wg&t=989s'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center text-blue-600 hover:text-blue-800 mr-6'
                >
                  <Youtube className='w-5 h-5 mr-1' />
                  <span>
                    Смотреть видео с подробным разбором 67 логических ошибок
                  </span>
                </a>
              </div>
            </div>
            <div className='md:w-1/3 flex justify-center md:justify-end'>
              <Badge className='h-fit text-lg py-2 px-4 bg-blue-600 hover:bg-blue-600'>
                Всего 67 ошибок
              </Badge>
            </div>
          </div>
        </div>

        {/* Легенда категорий */}
        <div className='mb-4'>
          <h2 className='text-lg font-medium text-gray-900 dark:text-white mb-3'>
            Категории логических ошибок
          </h2>
          <CategoryLegend categories={fallacyCategories} />
        </div>

        {/* Карта логических ошибок */}
        <div className='bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {filteredFallacies.map((fallacy, idx) => (
              <FallacyElement
                key={idx}
                fallacy={fallacy}
                onClick={handleOpenDetails}
              />
            ))}
          </div>

          {filteredFallacies.length === 0 && (
            <div className='text-center py-8'>
              <p className='text-gray-500 dark:text-gray-400'>
                Ничего не найдено по запросу "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* Информация об авторах */}
        <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-800'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <p className='text-gray-600 dark:text-gray-400'>
                Автор идеи:{' '}
                <span className='font-medium'>Абдулла Абдуллаев</span> (канал{' '}
                <a
                  href='https://www.youtube.com/@debateland'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline'
                >
                  Дебатляндия
                </a>
                )
              </p>
              <p className='text-gray-600 dark:text-gray-400 mt-1'>
                Разработчик:{' '}
                <a
                  href='https://github.com/alibackend'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline flex items-center inline-flex'
                >
                  <GithubIcon className='h-4 w-4 mr-1' /> @effuone
                </a>
              </p>
            </div>

            <div className='text-gray-500 dark:text-gray-400 text-sm'>
              &copy; {new Date().getFullYear()} Все права защищены
            </div>
          </div>
        </div>
      </main>

      {/* Диалоговое окно с деталями */}
      <FallacyDetails
        fallacy={selectedFallacy}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
