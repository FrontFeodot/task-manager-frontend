import map from 'lodash/map';

import * as S from './TasksSection.styled';
import { ITasksSection } from './TasksSection.types';
import TaskCard from './tasks/TaskCard';
import { filter } from 'lodash';
import { ITask } from '@common/interfaces/ITask';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

const TasksSection = ({
  taskSection,
  columnId,
}: ITasksSection): JSX.Element => {
  const { setNodeRef } = useDroppable({
    id: columnId,
  });

  return (
    <SortableContext
      id={columnId}
      items={map(taskSection, (task) => task.taskId)}
      strategy={verticalListSortingStrategy}
    >
      <S.TasksSectionWrapper ref={setNodeRef}>
        <S.TaskSection>
          {map(taskSection, (task) => {
            return <TaskCard key={task.taskId} {...task} />;
          })}
        </S.TaskSection>
      </S.TasksSectionWrapper>
    </SortableContext>
  );
};

export default TasksSection;
