type VideoLessonProps = {
  lesson: any; // Replace 'any' with your actual lesson type
  userProgress: any; // Replace 'any' with your actual user progress type
};

export const VideoLesson = ({ lesson, userProgress }: VideoLessonProps) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <iframe
          src={lesson.videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {lesson.description && (
        <div
          className="mt-4 prose"
          dangerouslySetInnerHTML={{ __html: lesson.description }}
        />
      )}
    </div>
  );
};
