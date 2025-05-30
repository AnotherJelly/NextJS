'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lesson } from '@/app/types/lesson';

export function LessonClient({ id, lessonsWithProgress,}: { id: number; lessonsWithProgress: Lesson[]; }) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  // Для skeleton loaders
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundLesson = lessonsWithProgress.find((l) => l.id === id) || null;
    setLesson(foundLesson);
    setProgress(foundLesson?.progress || 0);
    setIsLoading(false);
  }, [id, lessonsWithProgress]);

  function checkAnswer() {
    if (!lesson) return;

    if (progress >= 100) {
      setMessage("Урок уже пройден!");
      return;
    }

    if (userAnswer.trim() === lesson.correctAnswer) {
      const newProgress = 100;
      setProgress(newProgress);
      document.cookie = `lesson_${lesson.id}_progress=${newProgress}; path=/; max-age=${60 * 60 * 24 * 30}`;
      setMessage("Правильно! Поздравляем, урок завершён.");
      setUserAnswer("");
    } else {
      setMessage("Неверно! Попробуйте еще раз.");
    }
  }

  return (
    <main className="min-h-screen p-6 bg-[#f4f4f4] text-gray-800 max-w-8xl mx-auto">
        <div className="min-h-screen p-6 bg-white text-gray-800 max-w-6xl mx-auto flex gap-6">
            <aside className="w-64 hidden md:block p-5 border-r-2 border-[#ddd] mr-5">
                <h3 className="text-lg font-bold mb-4">Все уроки</h3>
                <ul className="space-y-2 list-none p-0 m-0">
                    {lessonsWithProgress.map((l) => (
                        <li key={l.id}>
                            <Link href={`/lesson/${l.id}`} className="block text-gray-800 font-bold hover:text-[#4CAF50]">
                                Урок {l.id}: {l.title}
                            </Link>
                            <div className="text-sm text-gray-500">Прогресс: {l.progress}%</div>
                        </li>
                    ))}
                </ul>
            </aside>

            <div className="flex-1">
                <header className="mb-8">
                    <Link href="/" className="text-blue-600 hover:underline">
                        ← Вернуться на главную
                    </Link>

                    {isLoading ? (
                        <>
                            <div className="h-8 w-1/2 bg-gray-300 rounded mt-4 mb-2 animate-pulse" />
                            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                        </>
                        ) : (
                        lesson ? (
                            <>
                                <h1 className="text-3xl font-bold mt-4">
                                    Урок {lesson?.id}: {lesson?.title}
                                </h1>
                                <p className="text-gray-600 mt-2">{lesson?.description}</p>
                            </>
                        ) : null
                    )}
                </header>

                <article className="prose max-w-none mb-6">
                    {isLoading ? (
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                    </div>
                    ) : (
                    <div dangerouslySetInnerHTML={{ __html: lesson?.content || "" }} />
                    )}
                </article>
                {!isLoading ? 
                    lesson && lesson.task !== "" ? (
                        <>
                        <section className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Задание:</h2>
                            <p>{lesson.task}</p>
                            <textarea
                                className="w-full p-2 border rounded mb-2"
                                rows={4}
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Напишите ответ здесь"
                                disabled={progress >= 100}
                            />
                            <button
                                onClick={checkAnswer}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 disabled:opacity-50"
                                disabled={progress >= 100}
                            >
                            Проверить
                            </button>
                            {message && <p className="mt-2 text-red-600">{message}</p>}
                        </section>

                        <section>
                            <h3 className="mb-2">Прогресс:</h3>
                            <div className="relative w-full h-6 bg-gray-200 rounded">
                                <div
                                    className="absolute top-0 left-0 h-full bg-green-500 rounded"
                                    style={{ width: `${progress}%` }}
                                ></div>
                                <div className="absolute inset-0 text-center text-sm leading-6">
                                    {progress}%
                                </div>
                            </div>
                        </section>
                        </>
                    ) : <div>Урок не найден</div>
                : null}
            </div>
        </div>
    </main>
  );
}
