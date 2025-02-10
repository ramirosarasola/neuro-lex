import { toast } from "sonner";
interface VerifyResultProps {
  options: any[];
  selectedOption: any;
  challenge: any;
  startTransition: (arg: any) => void;
  openHeartsModal: () => void;
  upsertChallengeProgress: (arg: any) => Promise<any>;
  correctControls: any;
  incorrectControls: any;
  setStatus: (arg: any) => void;
  setPercentage: (arg: any) => void;
  setHearts: (arg: any) => void;
  initialPercentage: number;
  challenges: any[];
  reduceHearts: (arg: any) => Promise<any>;
}

export default function verifyDragAndDropResult({
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
}: VerifyResultProps) {
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
          setPercentage((prev: number) => prev + 100 / challenges.length);

          // This is a practice
          if (initialPercentage === 100) {
            setHearts((prev: number) => Math.min(prev + 1, 5));
          }
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
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
            setHearts((prev: number) => Math.max(prev - 1, 0));
          }
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    });
  }
}
