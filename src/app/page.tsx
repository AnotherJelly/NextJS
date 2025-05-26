"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

// Тип данных урока
interface Lesson {
  id: number;
  title: string;
  description: string;
  progress: number;
}

const lessonsData: Omit<Lesson, 'progress'>[] = [
  { id: 1, title: 'Что такое SEO?', description: 'Что такое SEO, почему оно важно для продвижения сайтов и какие преимущества дает использование методов поисковой оптимизации.' },
  { id: 2, title: 'Как работают поисковые системы?', description: 'Как поисковые системы собирают, анализируют и показывают информацию пользователям. Ключевые этапы работы поисковых систем и их значимость для SEO.' },
  { id: 3, title: 'Техническое SEO', description: 'Важность технического SEO для улучшения видимости сайта в поисковых системах.' },
  { id: 4, title: 'Внутренняя оптимизация сайта', description: 'Важные аспекты внутренней оптимизации сайта, которые помогают улучшить видимость страниц в поисковых системах и сделать сайт более удобным для пользователей.' },
  { id: 5, title: 'Работа с контентом', description: 'Как правильно работать с контентом на странице, включая оптимизацию текста для SEO.' },
  { id: 6, title: 'Внутренние ссылки', description: 'Внутренние ссылки, их значением для SEO и как правильно их использовать на сайте для улучшения навигации и поисковой оптимизации.' },
  { id: 7, title: 'Локальное SEO', description: 'Локальное SEO помогает вашему бизнесу отображаться в результатах поиска, когда пользователи ищут товары или услуги в конкретных географических местах.' },
  { id: 8, title: 'SEO-аналитика', description: 'SEO-аналитика играет важную роль в оценке эффективности ваших SEO-усилий и позволяет отслеживать источники трафика, а также поведение пользователей на вашем сайте.' },
  { id: 9, title: 'Советы и тренды SEO', description: 'Веб-среда постоянно меняется, и вместе с ней развиваются новые методы SEO-оптимизации. Чтобы оставаться конкурентоспособным в поисковых системах, важно следить за современными тенденциями и рекомендациями.' },
];

export default function HomePage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const updatedLessons = lessonsData.map((lesson) => {
      const cookieProgress = Cookies.get(`lesson_${lesson.id}_progress`) || '0';
      return { ...lesson, progress: parseInt(cookieProgress) };
    });
    setLessons(updatedLessons);
  }, []);

  return (
    <>
      <header className="bg-green-500 text-white py-5 shadow-lg mb-5">
        <h1 className="text-center text-2xl font-bold">
          Основы SEO
        </h1>
      </header>
      <main className="bg-gray-100 py-5">
        <div className="container mx-auto w-[90%] max-w-[1200px]">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Link
                href={`/lesson/${lesson.id}`}
                key={lesson.id}
                className="text-black block p-4 border rounded-lg transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="text-gray-800 text-xl font-bold mb-2.5">Урок {lesson.id}: {lesson.title}</div>
                <div className="text-gray-600 text-base">{lesson.description}</div>
                {lesson.id < 9 && (
                  <div className="relative w-full h-6 bg-gray-200 rounded">
                    <div
                      className="absolute top-0 left-0 h-full bg-green-500 rounded"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                    <div className="absolute inset-0 text-center text-sm leading-6">
                      {lesson.progress}%
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </section>
          </div>
      </main>
      </>
  );
}