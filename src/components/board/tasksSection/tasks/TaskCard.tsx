import { useSearchParams } from 'react-router-dom';

import ProgressBar from '@components/progressBar/ProgressBar';

import { ITask, ITaskStatus } from '@common/interfaces/ITask';
import { getPriorityIcon } from '@common/helpers/taskHelper';

import * as S from './TaskCard.styled';
import { SyntheticEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({
  title,
  description,
  status = ITaskStatus.TO_DO,
  priority,
  taskId,
  columnId,
}: ITask): JSX.Element => {
  const [_, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskId,
    data: { sortable: { containerId: columnId } },
  });

  const handleOpenTask = (event: SyntheticEvent) => {
    newSearchParams.set('taskId', String(taskId));
    setSearchParams(newSearchParams);
  };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <S.TaskWrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(event: SyntheticEvent): void => handleOpenTask(event)}
    >
      <S.TaskTitle>{title}</S.TaskTitle>
      <S.PriorityIconWrapper>
        {getPriorityIcon(priority, 22)}
      </S.PriorityIconWrapper>
      <S.TaskDescription>{description}</S.TaskDescription>
      <S.TaskBottomSection>
        {/* здесь будут дочерние задачи */}
        <ProgressBar status={status} />
      </S.TaskBottomSection>
    </S.TaskWrapper>
  );
};

export default TaskCard;
