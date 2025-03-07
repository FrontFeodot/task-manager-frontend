import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import find from 'lodash/find';

import useOutSideClick from '@common/hooks/useOutSideClick';
import { getCurrentBoard } from '@common/helpers/boardHelper';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import * as S from './TaskModal.styled';
import TaskComponent from '../taskComponent/TaskComponent';

const TaskModal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = Number(searchParams.get('taskId'));
  const selectedBoardName = getCurrentBoard();
  const boardList = useBoardState((s) => s.boardList);

  const selectedBoard = boardList?.[selectedBoardName];

  const currentTask = find(
    selectedBoard?.tasks,
    (task) => task.taskId === taskId
  );

  const newSearchParams = new URLSearchParams();

  const handleClose = () => {
    newSearchParams.delete('taskId');
    setSearchParams(newSearchParams);
  };

  useOutSideClick(ref, handleClose);

  /*   useEffect(() => {
    return () => {
      handleClose()
    }
  }, [])
 */
  if (!currentTask || !selectedBoard) {
    return <>Task not exist</>;
  }

  return (
    <S.TaskModalWrapper ref={ref}>
      <TaskComponent
        closeTask={handleClose}
        task={currentTask}
        columnList={selectedBoard.columns}
      />
    </S.TaskModalWrapper>
  );
};

export default TaskModal;
