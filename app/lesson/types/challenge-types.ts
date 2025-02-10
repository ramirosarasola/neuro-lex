import type { challengeOptions, challenges } from "@/db/schema";

export type ChallengeType = (typeof challenges.$inferSelect)["type"];

export interface Challenge {
  id: number;
  type: ChallengeType;
  question: string;
  completed: boolean;
  challengeOptions: (typeof challengeOptions.$inferSelect)[];
  correct_category?: string;
}

export type ChallengeOption = typeof challengeOptions.$inferSelect;
