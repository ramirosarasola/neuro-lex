import type { userSubscription } from "@/db/schema";
import type { Challenge } from "./challenge-types";

export type QuizProps = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: Challenge[];
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean;
      })
    | null;
};
