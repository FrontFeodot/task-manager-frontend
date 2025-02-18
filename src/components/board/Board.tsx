import { filter, map, toUpper } from 'lodash';
import * as S from './Board.styled';
import { IBoardProps } from './Board.types';
import TasksSection from './tasksSection/TasksSection';
import CreateTask from './tasksSection/tasks/CreateTask';

const Board = ({ boardData }: IBoardProps): JSX.Element => {
  return (
    <S.BoardWrapper>
      <S.ColumnWrapper>
        {map(boardData.items, (columnName, index) => {
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
              <CreateTask />
            </S.Column>
          );
        })}
      </S.ColumnWrapper>
    </S.BoardWrapper>
  );
};

export default Board;
