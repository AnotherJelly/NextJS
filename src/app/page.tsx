import { cookies } from 'next/headers';
import Link from 'next/link';
import { lessonsData } from '@/app/data/lessons';
import { Lesson } from '@/app/types/lesson';

export default async function HomePage() {

  /* Чтение куки на сервере и заполнение их в progress */
  const cookieStore = await cookies(); 
  const lessonsWithProgress: Lesson[] = lessonsData.map((lesson) => {
    const cookieKey = `lesson_${lesson.id}_progress`;
    const value = cookieStore.get(cookieKey)?.value || '0';
    return { ...lesson, progress: parseInt(value, 10) };
  });

  return (
    <>
      <main className="bg-gray-100 py-5">
        <div className="container mx-auto w-[90%] max-w-[1200px]">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonsWithProgress.map((lesson) => (
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