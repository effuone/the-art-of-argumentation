import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Shield,
  AlertTriangle,
  Info,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { fallacies } from '@/data/fallacies';
import { fallacyCategories } from '@/data/fallacy-categories';
import ShareButton from '@/components/share-button';

export default async function FallacyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fallacy = fallacies.find((f) => f.slug === slug) || null;

  if (!fallacy) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-2 text-foreground'>
            Ошибка не найдена
          </h1>
          <p className='text-muted-foreground mb-4'>
            Информация о данной логической ошибке отсутствует.
          </p>
          <Link href='/'>
            <Button>Вернуться к списку ошибок</Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = fallacyCategories.find((cat) => cat.id === fallacy.category);

  // Находим связанные ошибки той же категории
  const relatedFallacies = fallacies
    .filter((f) => f.category === fallacy.category && f.slug !== fallacy.slug)
    .slice(0, 4);

  // Prev/next навигация
  const fallacyIndex = fallacies.findIndex((f) => f.slug === fallacy.slug);
  const prevFallacy = fallacyIndex > 0 ? fallacies[fallacyIndex - 1] : null;
  const nextFallacy =
    fallacyIndex < fallacies.length - 1 ? fallacies[fallacyIndex + 1] : null;

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Навигационная панель */}
      <header className='bg-card border-b border-border'>
        <div className='max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between'>
            <Link
              href='/'
              className='flex items-center text-muted-foreground hover:text-foreground'
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              <span>К списку логических ошибок</span>
              <BookOpen className='h-4 w-4 ml-2 text-blue-500' />
            </Link>
          </div>
        </div>
      </header>

      {/* Содержимое страницы */}
      <main className='max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        {/* Заголовок и основная информация */}
        <div className='mb-8'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
            <div>
              <div
                className='inline-block px-3 py-1 rounded-full text-primary-foreground mb-2'
                style={{ backgroundColor: category?.color }}
              >
                {category?.name}
              </div>
              <h1 className='text-3xl font-bold flex items-center gap-2 mb-2 text-foreground'>
                <span className='text-4xl'>{fallacy.icon}</span>
                {fallacy.name}
              </h1>
              <p className='text-muted-foreground italic mb-4'>
                {fallacy.latinName}
              </p>
            </div>
            <ShareButton
              fallacyName={fallacy.name}
              slug={fallacy.slug}
            />
          </div>

          <Card className='mb-8'>
            <CardContent className='p-6'>
              <div className='flex flex-col gap-6'>
                <div>
                  <h2 className='text-xl font-semibold flex items-center gap-2 mb-3 text-foreground'>
                    <Info className='h-5 w-5 text-blue-500' />
                    Что это такое?
                  </h2>
                  <p className='text-card-foreground leading-relaxed'>
                    {fallacy.detailedDescription || fallacy.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h2 className='text-xl font-semibold flex items-center gap-2 mb-3 text-foreground'>
                    <AlertTriangle className='h-5 w-5 text-amber-500' />
                    Почему это опасно?
                  </h2>
                  <p className='text-card-foreground leading-relaxed'>
                    {fallacy.danger}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Расширенная информация о логической ошибке */}
        <Tabs
          defaultValue='examples'
          className='mb-10'
        >
          <TabsList className='grid grid-cols-3 mb-6'>
            <TabsTrigger value='examples'>Примеры</TabsTrigger>
            <TabsTrigger value='recognize'>Как распознать</TabsTrigger>
            <TabsTrigger value='protect'>Как защититься</TabsTrigger>
          </TabsList>

          <TabsContent value='examples'>
            <Card>
              <CardContent className='p-6'>
                {fallacy.historicalExamples &&
                fallacy.historicalExamples.length > 0 ? (
                  <>
                    <h3 className='text-lg font-medium mb-4 text-foreground'>
                      Исторические примеры
                    </h3>

                    {fallacy.historicalExamples.map((example, index) => (
                      <div
                        key={index}
                        className='mb-6'
                      >
                        <div className='bg-secondary dark:bg-secondary rounded-lg p-4 mb-4'>
                          <h4 className='font-medium text-lg mb-2 text-secondary-foreground'>
                            {example.title}
                          </h4>

                          <p className='font-medium mb-2 text-secondary-foreground'>
                            Контекст:
                          </p>
                          <p className='text-secondary-foreground mb-4'>
                            {example.context}
                          </p>

                          {example.quote && (
                            <>
                              <p className='font-medium mb-2 text-secondary-foreground'>
                                Цитата:
                              </p>
                              <blockquote className='border-l-4 pl-4 py-2 italic text-secondary-foreground/80'>
                                "
                                {typeof example.quote === 'string'
                                  ? example.quote
                                  : (example.quote as string[]).join(', ')}
                                "
                              </blockquote>
                            </>
                          )}
                        </div>

                        <p className='font-medium mb-2 text-foreground'>
                          Почему это {fallacy.name}?
                        </p>
                        <p className='text-card-foreground mb-4'>
                          {example.explanation}
                        </p>

                        {example.result && (
                          <>
                            <p className='font-medium mb-2 text-foreground'>
                              Результат:
                            </p>
                            <p className='text-card-foreground'>
                              {example.result}
                            </p>
                          </>
                        )}

                        {fallacy.historicalExamples &&
                          index < fallacy.historicalExamples.length - 1 && (
                            <Separator className='my-6' />
                          )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className='mb-6'>
                    <h3 className='text-lg font-medium mb-4 text-foreground'>
                      Исторический пример
                    </h3>
                    <div className='bg-secondary dark:bg-secondary rounded-lg p-4 mb-4'>
                      <p className='font-medium mb-2 text-secondary-foreground'>
                        Контекст:
                      </p>
                      <p className='text-secondary-foreground mb-4'>
                        {fallacy.context}
                      </p>

                      <p className='font-medium mb-2 text-secondary-foreground'>
                        Цитата:
                      </p>
                      <blockquote className='border-l-4 pl-4 py-2 italic text-secondary-foreground/80'>
                        "{fallacy.example}"
                      </blockquote>
                    </div>

                    <p className='font-medium mb-2 text-foreground'>
                      Анализ ошибки:
                    </p>
                    <p className='text-card-foreground'>
                      Этот случай является классическим примером ошибки "
                      {fallacy.name}". Вместо того, чтобы обсуждать по существу
                      аргументы оппонента, используется логически некорректный
                      прием, который уводит разговор от сути проблемы и
                      затрудняет конструктивный диалог.
                    </p>
                  </div>
                )}

                <Separator className='my-6' />

                <div>
                  <h3 className='text-lg font-medium mb-4 text-foreground'>
                    Современные примеры
                  </h3>

                  {fallacy.modernExamples &&
                  fallacy.modernExamples.length > 0 ? (
                    <div className='space-y-6'>
                      {fallacy.modernExamples.map((example, index) => (
                        <div
                          key={index}
                          className='mb-6'
                        >
                          <div className='bg-secondary dark:bg-secondary rounded-lg p-4 mb-4'>
                            <h4 className='font-medium text-lg mb-2 text-secondary-foreground'>
                              {example.title}
                            </h4>

                            <p className='font-medium mb-2 text-secondary-foreground'>
                              Контекст:
                            </p>
                            <p className='text-secondary-foreground mb-4'>
                              {example.context}
                            </p>

                            {example.quote && (
                              <>
                                <p className='font-medium mb-2 text-secondary-foreground'>
                                  Цитата:
                                </p>
                                <blockquote className='border-l-4 pl-4 py-2 italic text-secondary-foreground/80'>
                                  "
                                  {typeof example.quote === 'string'
                                    ? example.quote
                                    : (example.quote as string[]).join(', ')}
                                  "
                                </blockquote>
                              </>
                            )}
                          </div>

                          <p className='font-medium mb-2 text-foreground'>
                            Почему это {fallacy.name}?
                          </p>
                          <p className='text-card-foreground mb-4'>
                            {example.explanation}
                          </p>

                          {example.result && (
                            <>
                              <p className='font-medium mb-2 text-foreground'>
                                Результат:
                              </p>
                              <p className='text-card-foreground'>
                                {example.result}
                              </p>
                            </>
                          )}

                          {index < fallacy.modernExamples.length - 1 && (
                            <Separator className='my-6' />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='text-muted-foreground italic text-center p-4'>
                      Современные примеры отсутствуют
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='recognize'>
            <Card>
              <CardContent className='p-6'>
                <h3 className='text-lg font-medium mb-4 text-foreground'>
                  Как отличить эту ошибку?
                </h3>

                <div className='mb-6'>
                  <p className='mb-4 text-card-foreground'>
                    Распознавание логической ошибки "{fallacy.name}" требует
                    внимательного анализа аргументации. Вот ключевые признаки,
                    по которым вы можете её определить:
                  </p>

                  <ul className='space-y-4'>
                    {fallacy.recognitionSteps.map((step, idx) => (
                      <li
                        key={idx}
                        className='flex items-start gap-3 bg-secondary dark:bg-secondary p-3 rounded-md'
                      >
                        <div className='bg-primary/20 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5'>
                          {idx + 1}
                        </div>
                        <p className='text-secondary-foreground'>{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {fallacy.howToDistinguish && (
                  <div className='mt-6'>
                    <h3 className='text-lg font-medium mb-4 text-foreground'>
                      Отличие от правильной аргументации
                    </h3>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='bg-destructive/10 p-4 rounded-lg'>
                        <p className='font-medium text-destructive mb-2 flex items-center gap-2'>
                          <XCircle className='h-4 w-4' />
                          Некорректно:
                        </p>
                        <ul className='space-y-2'>
                          {fallacy.howToDistinguish.fallacyExample.map(
                            (example, idx) => (
                              <li
                                key={idx}
                                className='text-card-foreground'
                              >
                                "{example}"
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className='bg-primary/10 p-4 rounded-lg'>
                        <p className='font-medium text-primary mb-2 flex items-center gap-2'>
                          <CheckCircle className='h-4 w-4' />
                          Корректно:
                        </p>
                        <ul className='space-y-2'>
                          {fallacy.howToDistinguish.validArgument.map(
                            (example, idx) => (
                              <li
                                key={idx}
                                className='text-card-foreground'
                              >
                                "{example}"
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {fallacy.howToDistinguish.exceptions && (
                      <div className='mt-4 bg-accent/20 p-4 rounded-lg'>
                        <p className='font-medium text-accent-foreground mb-2'>
                          Исключения:
                        </p>
                        <p className='text-card-foreground'>
                          {fallacy.howToDistinguish.exceptions}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='protect'>
            <Card>
              <CardContent className='p-6'>
                <h3 className='text-lg font-medium mb-4 text-foreground'>
                  Как защититься от этой ошибки?
                </h3>

                <div className='mb-6'>
                  <p className='mb-4 text-card-foreground'>
                    Если вы столкнулись с ошибкой "{fallacy.name}" в дискуссии,
                    вот несколько стратегий, которые помогут вам эффективно на
                    неё отреагировать:
                  </p>

                  {fallacy.defenseStrategies && (
                    <div className='space-y-4'>
                      {fallacy.defenseStrategies.map((strategy, idx) => (
                        <div
                          key={idx}
                          className='bg-secondary dark:bg-secondary rounded-lg p-4'
                        >
                          <p className='font-medium mb-2 flex items-center gap-2 text-secondary-foreground'>
                            <Shield className='h-4 w-4 text-primary' />
                            {strategy.title}
                          </p>
                          <p className='text-secondary-foreground mb-2'>
                            {strategy.explanation}
                          </p>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='bg-destructive/10 p-3 rounded'>
                              <p className='text-xs text-destructive mb-1'>
                                ❌ Некорректно:
                              </p>
                              <p className='text-sm italic text-card-foreground'>
                                "{strategy.incorrectExample}"
                              </p>
                            </div>
                            <div className='bg-primary/10 p-3 rounded'>
                              <p className='text-xs text-primary mb-1'>
                                ✅ Корректно:
                              </p>
                              <p className='text-sm italic text-card-foreground'>
                                "{strategy.correctExample}"
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Связанные логические ошибки */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-4 text-foreground'>
            Связанные логические ошибки
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {relatedFallacies.map((relatedFallacy) => (
              <Link
                key={relatedFallacy.slug}
                href={`/${relatedFallacy.slug}`}
              >
                <Card className='hover:shadow-md transition-shadow cursor-pointer'>
                  <CardContent className='p-4 flex items-center gap-3'>
                    <div
                      className='h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground'
                      style={{ backgroundColor: category?.color }}
                    >
                      {relatedFallacy.icon}
                    </div>
                    <div>
                      <h3 className='font-medium text-foreground'>
                        {relatedFallacy.name}
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        {relatedFallacy.shortDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Нижняя навигация */}
      <div className='bg-card border-t border-border py-4'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 gap-4'>
            {prevFallacy ? (
              <Link
                href={`/${prevFallacy.slug}`}
                className='block'
              >
                <Button
                  variant='outline'
                  className='flex items-center gap-1 max-w-full'
                >
                  <ArrowLeft className='h-4 w-4 flex-shrink-0' />
                  <span className='line-clamp-1 text-sm sm:text-base'>
                    {prevFallacy.name}
                  </span>
                </Button>
              </Link>
            ) : (
              <div></div> // Пустой div для сохранения выравнивания
            )}

            {nextFallacy ? (
              <Link
                href={`/${nextFallacy.slug}`}
                className='block justify-self-end'
              >
                <Button
                  variant='outline'
                  className='flex items-center gap-1 max-w-full'
                >
                  <span className='line-clamp-1 text-sm sm:text-base'>
                    {nextFallacy.name}
                  </span>
                  <ArrowRight className='h-4 w-4 flex-shrink-0' />
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
