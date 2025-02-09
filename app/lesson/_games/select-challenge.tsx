import type React from "react";
import { BaseChallenge } from "./base-challenge";
import { ChallengeOption } from "../types/challenge-types";

interface SelectChallengeProps {
  options: ChallengeOption[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
}

export const SelectChallenge: React.FC<SelectChallengeProps> = (props) => {
  return <BaseChallenge {...props} type="SELECT" />;
};
