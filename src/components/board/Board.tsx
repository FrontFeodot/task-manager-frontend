import filter from 'lodash/filter';
import map from 'lodash/map';
import toUpper from 'lodash/toUpper';

import * as S from './Board.styled';
import { IBoardProps } from './Board.types';
import TasksSection from './tasksSection/TasksSection';
import CreateTask from './tasksSection/tasks/CreateTaskCard';

const Board = ({ boardData }: IBoardProps): JSX.Element => {
  return (
    <S.BoardWrapper>
      <S.ColumnWrapper>
        {map(boardData.columns, (columnName, index) => {
          const currentTaskSection = filter(boardData.tasks, [
            'column',
            columnName,
          ]);

          return (
            <S.Column key={index} className="column">
              <S.ColumnLabel>
                <S.ColumnText>{toUpper(columnName)}</S.ColumnText>
              </S.ColumnLabel>
              {currentTaskSection.length ? (
                <TasksSection taskSection={currentTaskSection} />
              ) : null}
              <CreateTask columnName={columnName} />
            </S.Column>
          );
        })}
      </S.ColumnWrapper>
    </S.BoardWrapper>
  );
};

export default Board;
