import draftToHtml from 'draftjs-to-html';
import { useSearchParams } from 'react-router-dom';

import {
  getPriorityIcon,
  getRawDescriptionContent,
} from '@common/helpers/taskHelper';
import { ITask } from '@common/interfaces/ITask';

import TaskGradientBar from '@components/taskGradientBar/TaskGradientBar';

import * as S from './TaskCard.styled';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({
  title,
  description,
  priority,
  taskId,
  columnId,
  isDone,
}: ITask): JSX.Element => {
  const [_, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams();

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
    data: { sortable: { containerId: columnId } },
  });

  const handleOpenTask = () => {
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
      onClick={(): void => handleOpenTask()}
    >
      <S.TaskCardTop>
        <S.TaskCardId>{`Id: ${taskId}`}</S.TaskCardId>
      </S.TaskCardTop>
      <S.TaskTitle>{title}</S.TaskTitle>
      <S.PriorityIconWrapper>
        {getPriorityIcon(priority, 22)}
      </S.PriorityIconWrapper>
      <S.TaskDescription
        dangerouslySetInnerHTML={{ __html: parsedDescription }}
      />
      <S.TaskBottomSection>
        <TaskGradientBar priority={priority} isDone={isDone} />
      </S.TaskBottomSection>
    </S.TaskWrapper>
  );
};

export default TaskCard;
