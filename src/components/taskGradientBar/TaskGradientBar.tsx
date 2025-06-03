import * as S from './TaskGradientBar.styled';
import { ITaskGradientBar } from './TaskGradientBar.types';

const TaskGradientBar = ({
  priority,
  isDone,
}: ITaskGradientBar): JSX.Element => {
  return <S.ProgressBarContainer className={isDone ? 'done' : priority} />;
};

export default TaskGradientBar;
