import { getPriorityIcon } from '@common/helpers/taskHelper';

import TaskGradientBar from '@components/taskGradientBar/TaskGradientBar';

import * as S from './TaskCard.styled';
import { ITaskCardProps } from './TaskCard.types';

const TaskCard: React.FC<ITaskCardProps> = ({
  taskId,
  title,
  parsedDescription,
  priority,
  isDone,
}) => {
  return (
    <>
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
    </>
  );
};

export default TaskCard;
