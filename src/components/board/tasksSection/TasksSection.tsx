import { filter, map } from 'lodash';
import * as S from './TasksSection.styled';
import { ITasksSection } from './TasksSection.types';
import Task from './tasks/Task';
import CreateTask from './tasks/CreateTask';

const TasksSection = ({ taskSection }: ITasksSection): JSX.Element => {
  return (
    <S.TasksSectionWrapper>
      <S.TaskSection>
        {map(taskSection, (task) => {
          console.log(task);
          return <Task {...task} />;
        })}
      </S.TaskSection>
    </S.TasksSectionWrapper>
  );
};

export default TasksSection;
