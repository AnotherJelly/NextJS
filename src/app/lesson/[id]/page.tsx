import { cookies } from "next/headers";
import { LessonClient } from "@/app/lesson/LessonClient";
import { lessonsData } from '@/app/data/lessons';

export default async function LessonPage({ params }: { params: { id: string } }) {

  /* Чтение куки на сервере и заполнение их в progress */
  const cookieStore = await cookies();
  const lessonsWithProgress = lessonsData.map((lesson) => {
    const cookieKey = `lesson_${lesson.id}_progress`;
    const value = cookieStore.get(cookieKey)?.value || '0';
    return { ...lesson, progress: parseInt(value, 10) };
  });

  const id = Number(params.id);

  return <LessonClient id={id} lessonsWithProgress={lessonsWithProgress} />;
}