import type React from "react";
import { Card } from "../card";
import { cn } from "@/lib/utils";
import {
  Challenge,
  ChallengeOption,
  ChallengeType,
} from "../types/challenge-types";

interface BaseChallengeProps {
  challenge: Challenge;
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number | { id: number; category: string }[] | undefined;
  disabled?: boolean;
  type: ChallengeType;
}

export const BaseChallenge: React.FC<BaseChallengeProps> = ({
  challenge,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      )}
    >
      {challenge.challengeOptions.map((option, i) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
};
