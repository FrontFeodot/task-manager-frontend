import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import find from 'lodash/find';

import EmptyLayout from '@components/layouts/emptyLayout/EmptyLayout';
import { IEmptyLayoutType } from '@components/layouts/emptyLayout/EmptyLayout.types';
import TaskComponent from '@components/task/taskComponent/TaskComponent';
import CloseModalIcon from '@components/modals/closeModalIcon/CloseModalIcon';

import useOutSideClick from '@common/hooks/useOutSideClick';
import { getCurrentBoardTitle } from '@common/helpers/boardHelper';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { getColumnTitles } from '@common/helpers/columnHelper';
import { closeTaskModal } from '@common/helpers/taskHelper';

import * as S from './TaskModal.styled';
import Loader from '@components/layouts/loader/Loader';

const TaskModal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = Number(searchParams.get('taskId'));
  const selectedBoardName = getCurrentBoardTitle();
  const boardList = useBoardState((s) => s.boardList);
  const loading = useBoardState((s) => s.loading);
  const selectedBoard = boardList?.[selectedBoardName || ''];

  const columnListTitles = getColumnTitles();

  const currentTask = find(
    selectedBoard?.tasks,
    (task) => task.taskId === taskId
  );

  const handleClose = () => {
    closeTaskModal(setSearchParams);
  };

  useEffect(() => {
    return () => {
      if (boardList) {
        handleClose();
      }
    };
  }, []);

  useOutSideClick(ref, handleClose);

  if (loading) {
    return <Loader />;
  }

  return (
    <S.TaskModalWrapper ref={ref}>
      <CloseModalIcon />
      {!currentTask || !selectedBoard ? (
        <EmptyLayout type={IEmptyLayoutType.TASK} />
      ) : (
        <TaskComponent
          closeTask={handleClose}
          task={currentTask}
          columnList={columnListTitles}
        />
      )}
    </S.TaskModalWrapper>
  );
};

export default TaskModal;
