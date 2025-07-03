import draftToHtml from 'draftjs-to-html';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getRawDescriptionContent } from '@common/helpers/taskHelper';
import { ITask } from '@common/interfaces/ITask';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import TaskCard from './TaskCard';
import * as S from './TaskCard.styled';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCardWrapper = ({
  taskId,
  sectionId,
  boardId,
}: {
  taskId: number;
  sectionId: string;
  boardId: string;
}): JSX.Element => {
  const [_, setSearchParams] = useSearchParams();
  const task = useBoardState(
    (state) => state.boardList?.[boardId]?.tasks[taskId]
  ) as ITask;

  const { title, description, priority, isDone } = task;
  const descriptionRaw = getRawDescriptionContent(description || '');
  const parsedDescription = descriptionRaw ? draftToHtml(descriptionRaw) : '';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskId,
    data: { sortable: { containerId: sectionId } },
  });

  const MemoizedTaskCard = useMemo(
    () => (
      <TaskCard
        taskId={taskId}
        title={title}
        parsedDescription={parsedDescription}
        priority={priority}
        isDone={isDone}
      />
    ),
    [taskId, title, parsedDescription, priority, isDone]
  );

  const handleOpenTask = useCallback(() => {
    const newSearchParams = new URLSearchParams();

    newSearchParams.set('taskId', String(taskId));
    setSearchParams(newSearchParams);
  }, [taskId, setSearchParams]);

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }),
    [transform, transition, isDragging]
  );

  return (
    <S.TaskWrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(): void => handleOpenTask()}
    >
      {MemoizedTaskCard}
    </S.TaskWrapper>
  );
};

export default TaskCardWrapper;
