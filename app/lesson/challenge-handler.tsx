import type React from "react";
import { AssistChallenge } from "./_games/assist-challenge";
import DragAndDropChallenge from "./_games/drag-and-drop-challenge";
import { SelectChallenge } from "./_games/select-challenge";
import { Challenge } from "./types/challenge-types";
interface ChallengeHandlerProps {
  challenge: Challenge;
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
}

export const ChallengeHandler: React.FC<ChallengeHandlerProps> = ({
  challenge,
  onSelect,
  status,
  selectedOption,
  disabled,
}) => {
  const commonProps = {
    challenge: challenge,
    onSelect,
    status,
    selectedOption,
    disabled,
  };

  switch (challenge.type) {
    case "ASSIST":
      return <AssistChallenge {...commonProps} />;
    case "SELECT":
      return <SelectChallenge {...commonProps} />;
    case "DRAG_AND_DROP":
      return <DragAndDropChallenge {...commonProps} />;
    default:
      return null;
  }
};
