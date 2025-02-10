"use client";

import { DndContext, UniqueIdentifier, type DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { Draggable } from "../draggable";
import { Droppable } from "../droppable";
import type { Challenge, ChallengeOption } from "../types/challenge-types";

interface DragAndDropOptions extends ChallengeOption {
  container?: UniqueIdentifier;
}

interface DragAndDropChallengeProps {
  challenge: Challenge;
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
}

export default function DragAndDropChallenge({
  challenge,
  onSelect,
  status,
  selectedOption,
  disabled,
}: DragAndDropChallengeProps) {
  const [items, setItems] = useState<DragAndDropOptions[]>(
    challenge.challengeOptions
  );
  const [correctContainer, incorrectContainer] = [1, 2];
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const draggedItem = items.find((item) => item.id === active.id);
      if (draggedItem) {
        const newItems = items.map((item) =>
          item.id === draggedItem.id ? { ...item, container: over.id } : item
        );
        setItems(newItems);
        onSelect(draggedItem.id);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex justify-between gap-10 w-full h-full min-h-[500px]">
        <Droppable id={correctContainer} label="Correct">
          {items
            .filter((item) => item.container === correctContainer)
            .map((item) => (
              <Draggable key={item.id} id={item.id}>
                <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow">
                  <img
                    src={item.imageSrc || "/placeholder.svg"}
                    alt={item.text}
                    className="w-16 h-16 mb-2"
                  />
                  <span>{item.text}</span>
                </div>
              </Draggable>
            ))}
        </Droppable>
        <Droppable id={incorrectContainer} label="Incorrect">
          {items
            .filter((item) => item.container === incorrectContainer)
            .map((item) => (
              <Draggable key={item.id} id={item.id}>
                <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow">
                  <img
                    src={item.imageSrc || "/placeholder.svg"}
                    alt={item.text}
                    className="w-16 h-16 mb-2"
                  />
                  <span>{item.text}</span>
                </div>
              </Draggable>
            ))}
        </Droppable>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {items
          .filter((item) => item.container === undefined)
          .map((item) => (
            <Draggable key={item.id} id={item.id}>
              <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow">
                <img
                  src={item.imageSrc || "/placeholder.svg"}
                  alt={item.text}
                  className="w-16 h-16 mb-2"
                />
                <span>{item.text}</span>
              </div>
            </Draggable>
          ))}
      </div>
    </DndContext>
  );
}
