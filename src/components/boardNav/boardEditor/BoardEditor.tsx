import { keys } from 'lodash';
import map from 'lodash/map';
import { useEffect, useState } from 'react';

import { isBoardOwner } from '@common/helpers/boardHelper';
import { formatDate } from '@common/helpers/dateHelper';
import Icon from '@common/icons/Icon';
import {
  setBoardEditorResult,
  useBoardState,
} from '@common/providers/boardProvider/useBoardState';
import { useUserState } from '@common/providers/userProvider/useUserState';
import { DATE_UP_TO_MINUTES } from '@common/utils/dateFormats';

import BoardEditorInput from '@components/inputs/boardEditorInput/BoardEditorInput';
import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';

import * as S from './BoardEditor.styled';
import { IBoardEditor } from './BoardEditor.types';
import { useBoardEditorHandlers } from './useBoardEditorHandlers';

const BoardEditor = ({
  openedEditor,
  newField,
  result,
}: IBoardEditor): JSX.Element => {
  const editorData =
    useBoardState((state) => state.boardList?.[openedEditor?.data.boardId]) ||
    openedEditor?.data;

  const {
    title,
    columns,
    createdAt,
    boardId,
    doneColumn,
    ownerEmail,
    members,
  } = editorData;
  const isOwner = isBoardOwner(ownerEmail);

  const columnIds = keys(columns);

  const [editableField, setEditableField] = useState<string | null>(
    'title_create'
  );

  const {
    isSelectModeActive,
    handleListClick,
    onButtonsAction,
    toggleSelectMode,
  } = useBoardEditorHandlers({
    boardId,
    editorData,
  });

  useEffect(() => {
    if (!!result) {
      if (result.isSuccess) {
        setEditableField(null);
      }
      setTimeout(() => {
        if (!!result) {
          setBoardEditorResult(null);
        }
      }, 5000);
    }
  }, [result]);

  const onDeleteOrLeaveButton = () => {
    const email = isOwner ? undefined : useUserState.getState().data?.email;
    onButtonsAction(isOwner ? 'delete' : 'leave', isOwner ? undefined : email);
  };

  return (
    <S.BoardEditorWrapper>
      <S.BoardEditorFieldsList>
        <S.TitleWrapper>
          <S.FieldLabel $isTitle>Title</S.FieldLabel>
          <BoardEditorInput
            editableField={editableField}
            setEditableField={setEditableField}
            result={result}
            fieldName={`title_${newField === 'board' ? 'create' : 'update'}`}
            currentValue={title}
            boardId={boardId}
          />
        </S.TitleWrapper>
        {keys(columns).length > 1 ? (
          <S.DoneColumnWrapper>
            <S.DoneColumnContent>
              {doneColumn ? 'Select "Done" column' : 'Change "Done" column'}{' '}
              <Icon name="tooltip" />
            </S.DoneColumnContent>
            <S.SelectDoneColumnButton>
              <StyledButton
                label={isSelectModeActive ? 'Cancel' : 'Select'}
                onClick={toggleSelectMode}
              />
            </S.SelectDoneColumnButton>
          </S.DoneColumnWrapper>
        ) : null}
        {!!title ? (
          <S.ColumnList
            onClick={handleListClick}
            className="settings-column-list"
            $isSelectModeActive={isSelectModeActive}
          >
            <S.FieldLabel>Columns</S.FieldLabel>
            {columnIds?.length
              ? map(columnIds, (columnId, index) => {
                  return (
                    <BoardEditorInput
                      editableField={editableField}
                      setEditableField={setEditableField}
                      result={result}
                      fieldName={`column_${index + 1}`}
                      currentValue={columns[columnId].title}
                      key={index}
                      columnId={columnId}
                      boardId={boardId}
                    />
                  );
                })
              : null}
            <BoardEditorInput
              editableField={editableField}
              setEditableField={setEditableField}
              result={result}
              fieldName="column_create"
              boardId={boardId}
              autofocus={newField === 'column'}
            />
          </S.ColumnList>
        ) : null}
      </S.BoardEditorFieldsList>
      {isOwner && newField !== 'board' ? (
        <BoardEditorInput
          editableField={editableField}
          setEditableField={setEditableField}
          result={result}
          fieldName="share_board"
          boardId={boardId}
        />
      ) : null}

      {members?.length ? (
        <S.BoardMembersList>
          <S.MemberListTitle>Members list</S.MemberListTitle>
          {map(members, (member) => (
            <S.MemberlistItem key={member}>
              <S.MemberListEmail> {member} </S.MemberListEmail>
              {isOwner ? (
                <StyledButton
                  label={`Kick user`}
                  buttonColor={IButtonColor.RED}
                  onClick={() => onButtonsAction('kick', member)}
                />
              ) : null}
            </S.MemberlistItem>
          ))}
        </S.BoardMembersList>
      ) : null}
      {!isOwner && newField !== 'board' ? (
        <S.BoardOwnerField>Board owner: {ownerEmail} </S.BoardOwnerField>
      ) : null}
      {createdAt ? (
        <S.CreatedAtBoard>{`Created at: ${formatDate(createdAt, DATE_UP_TO_MINUTES)}`}</S.CreatedAtBoard>
      ) : null}

      {newField !== 'board' ? (
        <S.DeleteBoardButton>
          <StyledButton
            label={`${isOwner ? 'Delete' : 'Leave'} the board`}
            buttonColor={IButtonColor.RED}
            onClick={onDeleteOrLeaveButton}
          />
        </S.DeleteBoardButton>
      ) : null}
      {result ? (
        <S.ResultContainer $isSuccess={!!result.isSuccess}>
          {result.message}
        </S.ResultContainer>
      ) : null}
    </S.BoardEditorWrapper>
  );
};

export default BoardEditor;
