"use client";

import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumns;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const [deleteTask] = useBoardStore((state) => [state.deleteTask]);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo?.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo?.image!);
        setImageUrl(url ? url?.toString() : null);
      };

      fetchImage();
    }
  }, [todo]);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between items-center p-5">
        <p className="">{todo?.title}</p>

        <button
          className="text-red-500 hover:text-red-600"
          onClick={() => {
            deleteTask(index, todo, id);
          }}
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
          {/* {""} */}
        </button>
      </div>

      {imageUrl && (
        <div className="relative h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
}

export default TodoCard;
