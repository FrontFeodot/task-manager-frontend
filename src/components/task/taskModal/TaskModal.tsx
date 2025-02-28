import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import find from 'lodash/find';

import useOutSideClick from '@common/hooks/useOutSideClick';
import { getCurrentBoard } from '@common/helpers/boardHelper';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import * as S from './TaskModal.styled';

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

  return <S.TaskModalWrapper ref={ref}>{/* Task */}</S.TaskModalWrapper>;
};

export default TaskModal;
