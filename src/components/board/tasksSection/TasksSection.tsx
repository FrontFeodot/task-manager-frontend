import { values } from 'lodash';
import map from 'lodash/map';
import React, { useMemo } from 'react';

import { useDndState } from '@common/providers/dndProvider/useDndState';

import TaskCardWrapper from './tasks/TaskCardWrapper';
import * as S from './TasksSection.styled';
import { ITasksSection } from './TasksSection.types';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const TasksSection = ({ columnId, boardId }: ITasksSection): JSX.Element => {
  const tasks = useDndState((state) => state.orderedTasks?.[columnId]);

  const taskSection = useMemo(
    () => (tasks ? values(tasks).sort((a, b) => a.order - b.order) : []),
    [tasks]
  );

  return (
    <SortableContext
      id={columnId}
      items={map(taskSection, (task) => task.taskId)}
      strategy={verticalListSortingStrategy}
    >
      <S.TasksSectionWrapper>
        <S.TaskSection>
          {map(taskSection, (task) => {
            return (
              <TaskCardWrapper
                key={task.taskId}
                taskId={task.taskId as number}
                sectionId={columnId}
                boardId={boardId}
              />
            );
          })}
        </S.TaskSection>
      </S.TasksSectionWrapper>
    </SortableContext>
  );
};

export default React.memo(TasksSection);
