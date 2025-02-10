import type React from "react";
import { Challenge, ChallengeOption } from "../types/challenge-types";
import { BaseChallenge } from "./base-challenge";
import { QuestionBubble } from "../question-bubble";
interface AssistChallengeProps {
  challenge: Challenge;
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
}

export const AssistChallenge: React.FC<AssistChallengeProps> = (props) => {
  return (
    <>
      <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
        {" "}
        Como se dice...
      </h1>
      <QuestionBubble question={props.challenge.question} />
      <BaseChallenge {...props} type="ASSIST" />
    </>
  );
};
