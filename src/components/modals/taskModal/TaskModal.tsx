import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import find from 'lodash/find';
import { MdOutlineClose } from 'react-icons/md';

import EmptyLayout from '@components/layouts/emptyLayout/EmptyLayout';
import { IEmptyLayoutType } from '@components/layouts/emptyLayout/EmptyLayout.types';

import useOutSideClick from '@common/hooks/useOutSideClick';
import { getCurrentBoardTitle } from '@common/helpers/boardHelper';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';

import * as S from './TaskModal.styled';
import TaskComponent from '../../task/taskComponent/TaskComponent';
import { getColumnTitles } from '@common/helpers/columnHelper';
import { closeTaskModal } from '@common/helpers/taskHelper';
import { useTheme } from 'styled-components';
import CloseModalIcon from '../closeModalIcon/CloseModalIcon';

const TaskModal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = Number(searchParams.get('taskId'));
  const selectedBoardName = getCurrentBoardTitle();
  const boardList = useBoardState((s) => s.boardList);
  const { textPrimary } = useTheme();
  const selectedBoard = boardList?.[selectedBoardName || ''];

  const columnListTitles = getColumnTitles();

  const currentTask = find(
    selectedBoard?.tasks,
    (task) => task.taskId === taskId
  );

  const handleClose = () => {
    closeTaskModal(setSearchParams);
  };

  //debugger
  useEffect(() => {
    return () => {
      if (boardList) {
        handleClose();
      }
    };
  }, []);

  useOutSideClick(ref, handleClose);

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
