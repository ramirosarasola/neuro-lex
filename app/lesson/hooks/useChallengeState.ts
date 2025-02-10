import { useState } from "react";
import type { Challenge } from "../types/challenge-types";

type ChallengeState = {
  selectedOption: number | { id: number; category: string }[] | undefined;
  setSelectedOption: (
    option: number | { id: number; category: string }[] | undefined
  ) => void;
  onSelect: (id: number) => void;
};

export const useChallengeState = (challenge: Challenge): ChallengeState => {
  const [selectedOption, setSelectedOption] = useState<
    undefined | number | { id: number; category: string }[]
  >(undefined);

  const onSelect = (id: any) => {
    switch (challenge.type) {
      case "SELECT":
        setSelectedOption(id);
        break;
      case "DRAG_AND_DROP":
        setSelectedOption(
          (prev: number | { id: number; category: string }[] | undefined) => {
            if (Array.isArray(prev)) {
              return [...prev, id];
            }
            return [id];
          }
        );
        break;
      // Add more cases for other challenge types as needed
      default:
        setSelectedOption(id);
    }
  };

  return { selectedOption, setSelectedOption, onSelect };
};
