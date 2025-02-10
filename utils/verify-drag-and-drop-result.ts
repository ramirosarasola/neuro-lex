import { Challenge, ChallengeOption } from "@/app/lesson/types/challenge-types";

type VerifyDragAndDropResultProps = {
  options: ChallengeOption[];
  selectedOption: number | { id: number; category: string }[] | undefined;
  challenge: Challenge;
  startTransition: (callback: () => void) => void;
  openHeartsModal: () => void;
  upsertChallengeProgress: (challengeId: number) => Promise<any>;
  correctControls: { play: () => void };
  incorrectControls: { play: () => void };
  setStatus: (status: "correct" | "wrong" | "none") => void;
  setPercentage: (callback: (prev: number) => number) => void;
  setHearts: (callback: (prev: number) => number) => void;
  initialPercentage: number;
  challenges: Challenge[];
  reduceHearts: (challengeId: number) => Promise<any>;
};

const verifyDragAndDropResult = ({
  options,
  selectedOption,
  challenge,
  startTransition,
  openHeartsModal,
  upsertChallengeProgress,
  correctControls,
  incorrectControls,
  setStatus,
  setPercentage,
  setHearts,
  initialPercentage,
  challenges,
  reduceHearts,
}: VerifyDragAndDropResultProps) => {
  if (!Array.isArray(selectedOption)) {
    console.error(
      "Selected option should be an array for drag and drop challenges"
    );
    return;
  }

  const isCorrect = selectedOption.every((selection) => {
    const option = options.find((opt) => opt.id === selection.id);
    return option?.correctCategory === selection.category;
  });

  if (isCorrect) {
    startTransition(() => {
      upsertChallengeProgress(challenge.id)
        .then((response) => {
          if (response?.error === "hearts") {
            openHeartsModal();
            return;
          }

          correctControls.play();
          setStatus("correct");
          setPercentage((prev) => prev + 100 / challenges.length);

          if (initialPercentage === 100) {
            setHearts((prev) => Math.min(prev + 1, 5));
          }
        })
        .catch(() => console.error("Something went wrong. Please try again."));
    });
  } else {
    startTransition(() => {
      reduceHearts(challenge.id)
        .then((response) => {
          if (response?.error === "hearts") {
            openHeartsModal();
            return;
          }

          incorrectControls.play();
          setStatus("wrong");

          if (!response?.error) {
            setHearts((prev) => Math.max(prev - 1, 0));
          }
        })
        .catch(() => console.error("Something went wrong. Please try again."));
    });
  }
};

export default verifyDragAndDropResult;
