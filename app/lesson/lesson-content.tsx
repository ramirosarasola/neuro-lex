import { Quiz } from "./quiz";
import { TextLesson } from "./text-lesson";
import { VideoLesson } from "./video-lesson";

type LessonContentProps = {
  lesson: any; // Replace 'any' with your actual lesson type
  userProgress: any; // Replace 'any' with your actual user progress type
  userSubscription: any; // Replace 'any' with your actual user subscription type
};

export const LessonContent = ({
  lesson,
  userProgress,
  userSubscription,
}: LessonContentProps) => {
  const initialPercentage = lesson.challenges
    ? (lesson.challenges.filter((challenge: any) => challenge.completed)
        .length /
        lesson.challenges.length) *
      100
    : 0;

  switch (lesson.type) {
    case "QUIZ":
      return (
        <Quiz
          initialLessonId={lesson.id}
          initialLessonChallenges={lesson.challenges}
          initialHearts={userProgress.hearts}
          initialPercentage={initialPercentage}
          userSubscription={userSubscription}
        />
      );
    case "TEXT":
      return <TextLesson lesson={lesson} userProgress={userProgress} />;
    case "VIDEO":
      return <VideoLesson lesson={lesson} userProgress={userProgress} />;
    default:
      return <div>Unknown lesson type</div>;
  }
};
