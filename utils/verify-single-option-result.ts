import { Challenge, ChallengeOption } from "@/app/lesson/types/challenge-types";

type VerifySingleChoiceResultProps = {
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

const verifySingleChoiceResult = ({
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
}: VerifySingleChoiceResultProps) => {
  const correctOption = options.find((option) => option.correctAnswer);

  if (!correctOption) {
    return;
  }

  if (correctOption.id === selectedOption) {
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

export default verifySingleChoiceResult;
