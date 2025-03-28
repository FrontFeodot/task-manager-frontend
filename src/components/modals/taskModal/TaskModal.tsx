import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import find from 'lodash/find';

import useOutSideClick from '@common/hooks/useOutSideClick';
import { getCurrentBoardTitle } from '@common/helpers/boardHelper';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import * as S from './TaskModal.styled';
import TaskComponent from '../../task/taskComponent/TaskComponent';
import { filter, map } from 'lodash';
import { getColumnTitles } from '@common/helpers/columnHelper';
import { closeTaskModal } from '@common/helpers/taskHelper';

const TaskModal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = Number(searchParams.get('taskId'));
  const selectedBoardName = getCurrentBoardTitle();
  const boardList = useBoardState((s) => s.boardList);

  const selectedBoard = boardList?.[selectedBoardName || ''];

  const columnListTitles = getColumnTitles();

  const currentTask = find(
    selectedBoard?.tasks,
    (task) => task.taskId === taskId
  );

  const handleClose = () => {
    closeTaskModal(setSearchParams);
  };

  useOutSideClick(ref, handleClose);

  if (!currentTask || !selectedBoard) {
    return <>Task not exist</>;
  }

  return (
    <S.TaskModalWrapper ref={ref}>
      <TaskComponent
        closeTask={handleClose}
        task={currentTask}
        columnList={columnListTitles}
      />
    </S.TaskModalWrapper>
  );
};

export default TaskModal;
