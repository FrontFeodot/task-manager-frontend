import { useEffect, useState } from 'react';
import unionBy from 'lodash/unionBy';

import EmptyLayout from '@components/layouts/emptyLayout/EmptyLayout';
import { IEmptyLayoutType } from '@components/layouts/emptyLayout/EmptyLayout.types';
import Loader from '@components/layouts/loader/Loader';

import { ITask } from '@common/interfaces/ITask';
import { IBoard, IColumn } from '@common/providers/boardProvider/types';

import { IBoardProps } from './BoardWrapper.types';
import BoardComponent from './boardComponent/BoardComponent';
import useAppParams from '@common/hooks/useAppParams';
import {
  connectSocket,
  disconnectSocket,
  joinBoard,
} from '@common/api/socket/socket';

const BoardWrapper = ({ boardData, loading }: IBoardProps): JSX.Element => {
  const [virtualBoard, setVirtualBoard] = useState<IBoard | null | undefined>(
    boardData
  );
  useAppParams();

  useEffect(() => {
    setVirtualBoard(boardData || null);
  }, [boardData]);

  if (loading || (!!boardData && !virtualBoard)) {
    return <Loader isOpaque isRelative />;
  }

  if (!virtualBoard) {
    return <EmptyLayout type={IEmptyLayoutType.BOARD} />;
  }

  const updateBoardState = (
    updatedData: ITask[] | IColumn[],
    activeItem: 'tasks' | 'columns' | null
  ): void => {
    setVirtualBoard((prev) => {
      if (prev) {
        return {
          ...prev,
          ...(activeItem === 'tasks'
            ? { tasks: unionBy(updatedData as ITask[], prev.tasks, 'taskId') }
            : { columns: updatedData as IColumn[] }),
        };
      }
    });
  };

  return (
    <BoardComponent
      boardData={virtualBoard}
      updateBoardState={updateBoardState}
    />
  );
};

export default BoardWrapper;
