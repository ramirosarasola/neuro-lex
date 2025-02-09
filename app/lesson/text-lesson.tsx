type TextLessonProps = {
  lesson: any; // Replace 'any' with your actual lesson type
  userProgress: any; // Replace 'any' with your actual user progress type
};

export const TextLesson = ({ lesson, userProgress }: TextLessonProps) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      />
    </div>
  );
};
