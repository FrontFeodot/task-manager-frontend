import map from 'lodash/map';

import * as S from './TasksSection.styled';
import { ITasksSection } from './TasksSection.types';
import TaskCard from './tasks/TaskCard';

const TasksSection = ({ taskSection }: ITasksSection): JSX.Element => {
  return (
    <S.TasksSectionWrapper>
      <S.TaskSection>
        {map(taskSection, (task) => {
          return <TaskCard key={task.taskId} {...task} />;
        })}
      </S.TaskSection>
    </S.TasksSectionWrapper>
  );
};

export default TasksSection;
