"use client";

import {
  DndContext,
  type UniqueIdentifier,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { Draggable } from "../draggable";
import { Droppable } from "../droppable";
import type { Challenge, ChallengeOption } from "../types/challenge-types";

interface DragAndDropOptions extends ChallengeOption {
  container?: UniqueIdentifier;
}

interface DragAndDropChallengeProps {
  challenge: Challenge;
  onSelectForDragAndDrop: (
    option: number | { id: number; category: string }[] | undefined
  ) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number | { id: number; category: string }[] | undefined;
  disabled?: boolean;
}

export default function DragAndDropChallenge({
  challenge,
  onSelectForDragAndDrop,
  status,
  selectedOption,
  disabled,
}: DragAndDropChallengeProps) {
  const [items, setItems] = useState<DragAndDropOptions[]>(
    challenge.challengeOptions
  );

  // Define containers for Par (Even) and Impar (Odd)
  const containers = {
    par: "Par",
    impar: "Impar",
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const draggedItem = items.find((item) => item.id === active.id);

    if (draggedItem) {
      let updatedItems;

      if (over) {
        // El ítem se soltó dentro de un contenedor válido
        updatedItems = items.map((item) =>
          item.id === draggedItem.id ? { ...item, container: over.id } : item
        );
      } else {
        // El ítem se soltó fuera de un contenedor -> lo devolvemos a su estado inicial
        updatedItems = items.map((item) =>
          item.id === draggedItem.id ? { ...item, container: undefined } : item
        );
      }

      setItems(updatedItems);

      // Actualizar el estado `selectedOption`
      onSelectForDragAndDrop(
        // @ts-ignore
        (prev: number | { id: number; category: string }[] | undefined) => {
          if (Array.isArray(prev)) {
            const existingIndex = prev.findIndex(
              (opt) => opt.id === draggedItem.id
            );

            if (existingIndex !== -1) {
              if (over) {
                // Si existe y se suelta en una categoría, actualizamos
                return prev.map((opt) =>
                  opt.id === draggedItem.id
                    ? { ...opt, category: over.id as string }
                    : opt
                );
              } else {
                // Si existe y se suelta fuera de un contenedor, lo eliminamos de la lista
                return prev.filter((opt) => opt.id !== draggedItem.id);
              }
            } else {
              // Si no existe y se suelta en una categoría, lo agregamos
              return over
                ? [...prev, { id: draggedItem.id, category: over.id as string }]
                : prev;
            }
          }

          // Si prev es undefined, inicializamos con el nuevo valor si se suelta en un contenedor
          return over
            ? [{ id: draggedItem.id, category: over.id as string }]
            : undefined;
        }
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex justify-between gap-10 w-full h-full min-h-[500px]">
        <Droppable id={containers.par} label="Par" color={"bg-blue-100"}>
          {items
            .filter((item) => item.container === containers.par)
            .map((item, index) => (
              <Draggable key={index} id={item.id}>
                <div
                  className={`flex flex-col items-center p-2 bg-white rounded-lg shadow ${
                    status === "correct" &&
                    Array.isArray(selectedOption) &&
                    selectedOption.some((opt) => opt.id === item.id)
                      ? "border-2 border-green-500"
                      : status === "wrong" &&
                        Array.isArray(selectedOption) &&
                        selectedOption.some((opt) => opt.id === item.id)
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                >
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
        <Droppable id={containers.impar} label="Impar" color={"bg-rose-100"}>
          {items
            .filter((item) => item.container === containers.impar)
            .map((item, index) => (
              <Draggable key={index} id={item.id}>
                <div
                  className={`flex flex-col items-center p-2 bg-white rounded-lg shadow ${
                    status === "correct" &&
                    Array.isArray(selectedOption) &&
                    selectedOption.some((opt) => opt.id === item.id)
                      ? "border-2 border-green-500"
                      : status === "wrong" &&
                        Array.isArray(selectedOption) &&
                        selectedOption.some((opt) => opt.id === item.id)
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                >
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
