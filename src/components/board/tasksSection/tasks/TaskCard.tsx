import { useSearchParams } from 'react-router-dom';

import ProgressBar from '@components/progressBar/ProgressBar';

import { ITask, ITaskStatus } from '@common/interfaces/ITask';
import { getPriorityIcon } from '@common/helpers/taskHelper';

import * as S from './TaskCard.styled';
import { SyntheticEvent } from 'react';

const TaskCard = ({
  title,
  description,
  status = ITaskStatus.TO_DO,
  priority,
  taskId,
}: ITask): JSX.Element => {
  const [_, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams();

  const handleOpenTask = (event: SyntheticEvent) => {
    newSearchParams.set('taskId', String(taskId));
    setSearchParams(newSearchParams);
  };
  return (
    <S.TaskWrapper
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
