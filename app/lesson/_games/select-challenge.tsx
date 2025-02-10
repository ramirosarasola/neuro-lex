import type React from "react";
import { Challenge } from "../types/challenge-types";
import { BaseChallenge } from "./base-challenge";

interface SelectChallengeProps {
  challenge: Challenge;
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number | { id: number; category: string }[] | undefined;
  disabled?: boolean;
}

export const SelectChallenge: React.FC<SelectChallengeProps> = (props) => {
  return (
    <>
      <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
        {props.challenge.question}
      </h1>
      <BaseChallenge {...props} type="SELECT" />
    </>
  );
};
