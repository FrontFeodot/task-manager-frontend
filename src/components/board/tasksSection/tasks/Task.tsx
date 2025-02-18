import { ITask, ITaskStatus } from '@common/interfaces/ITask';
import * as S from './Task.styled';
import { ITaskProps } from './Task.types';
import ProgressBar from '@components/progressBar/ProgressBar';
import { FcLowPriority } from 'react-icons/fc';
import { getPriorityIcon } from '@common/helpers/taskHelper';

const Task = ({
  name,
  description,
  status = ITaskStatus.DEFAULT,
  priority,
}: ITask): JSX.Element => {
  return (
    <S.TaskWrapper>
      <S.TaskTitle>{name}</S.TaskTitle>
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

export default Task;
