import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import find from 'lodash/find';

import EmptyLayout from '@components/layouts/emptyLayout/EmptyLayout';
import { IEmptyLayoutType } from '@components/layouts/emptyLayout/EmptyLayout.types';
import TaskComponent from '@components/task/taskComponent/TaskComponent';
import CloseModalIcon from '@components/modals/closeModalIcon/CloseModalIcon';

import { getCurrentBoardId } from '@common/helpers/boardHelper';
import { useBoardState } from '@common/providers/boardProvider/useBoardState';
import { getColumnTitles } from '@common/helpers/columnHelper';
import { closeTaskModal } from '@common/helpers/taskHelper';

import * as S from './TaskModal.styled';
import Loader from '@components/layouts/loader/Loader';
import { openModal } from '@common/providers/appProvider/useAppState';
import { IModal } from '@common/providers/appProvider/types';

const TaskModal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = Number(searchParams.get('taskId'));
  const boardId = getCurrentBoardId();
  const selectedBoard = useBoardState((s) => s.boardList?.[boardId || '']);
  const loading = useBoardState((s) => s.loading);
  const columnListTitles = getColumnTitles();

  const currentTask = find(
    selectedBoard?.tasks,
    (task) => task.taskId === taskId
  );

  const handleClose = () => {
    if (!hasUnsavedChanges) {
      closeTaskModal(setSearchParams);
      return;
    }

    openModal({
      name: IModal.CONFIRM_MODAL,
      data: {
        title: 'Are you sure want to close the task?',
        message:
          'The task contains unsaved changes, you will lost them if confirm',
        args: [setSearchParams],
        callback: closeTaskModal,
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <S.TaskModalWrapper ref={ref}>
      <CloseModalIcon closeHandler={handleClose} />
      {!currentTask || !selectedBoard ? (
        <EmptyLayout type={IEmptyLayoutType.TASK} />
      ) : (
        <TaskComponent
          setHasUnsavedChanges={setHasUnsavedChanges}
          closeTask={handleClose}
          task={currentTask}
          columnList={columnListTitles}
        />
      )}
    </S.TaskModalWrapper>
  );
};

export default TaskModal;
