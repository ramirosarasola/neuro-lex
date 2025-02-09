import type React from "react";
import { ChallengeOption } from "../types/challenge-types";
import { BaseChallenge } from "./base-challenge";
interface AssistChallengeProps {
  options: ChallengeOption[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
}

export const AssistChallenge: React.FC<AssistChallengeProps> = (props) => {
  return <BaseChallenge {...props} type="ASSIST" />;
};
