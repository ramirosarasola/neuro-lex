"use client";

import type React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: number | string;
  children: React.ReactNode;
  label: string;
  color?: string;
}

export function Droppable({ id, children, label, color }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-[400px] flex flex-col items-center justify-start p-4 rounded-lg ${color} ${
        isOver ? "border-2 border-green-500" : ""
      }`}
    >
      <h3 className="text-lg font-bold mb-4">{label}</h3>
      <div className="flex flex-wrap gap-4 justify-center">{children}</div>
    </div>
  );
}
