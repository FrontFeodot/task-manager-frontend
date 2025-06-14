import map from 'lodash/map';
import find from 'lodash/find';

import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';
import BoardEditorInput from '@components/inputs/boardEditorInput/BoardEditorInput';

import { DATE_UP_TO_MINUTES } from '@common/utils/dateFormats';
import { formatDate } from '@common/helpers/dateHelper';
import Icon from '@common/icons/Icon';

import * as S from './BoardEditor.styled';
import { IBoardEditor } from './BoardEditor.types';
import { useBoardEditorHandlers } from './useBoardEditorHandlers';
import { isBoardOwner } from '@common/helpers/boardHelper';

const BoardEditor = ({
  editorData,
  newField,
  setUpdatedData,
}: IBoardEditor): JSX.Element => {
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

  const {
    loading,
    isSelectModeActive,
    handleListClick,
    saveButtonHandler,
    onButtonsAction,
    closeEditMode,
    toggleSelectMode,
  } = useBoardEditorHandlers({
    setUpdatedData,
    boardId,
    editorData,
  });

  const doneColumnTitle =
    find(columns, (column) => column.columnId === doneColumn)?.title || null;

  return (
    <S.BoardEditorWrapper>
      <S.BoardEditorFieldsList>
        <S.TitleWrapper>
          <S.FieldLabel $isTitle>Title</S.FieldLabel>
          <BoardEditorInput
            saveButtonHandler={saveButtonHandler}
            fieldName={`title_${newField === 'board' ? 'create' : 'update'}`}
            currentValue={title}
            closeEditMode={closeEditMode}
          />
        </S.TitleWrapper>
        {columns.length > 1 ? (
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
            $doneColumn={loading ? null : doneColumnTitle}
          >
            <S.FieldLabel>Columns</S.FieldLabel>
            {columns?.length
              ? map(columns, ({ title, columnId }, index) => {
                  return (
                    <BoardEditorInput
                      saveButtonHandler={saveButtonHandler}
                      fieldName={`column_${index + 1}`}
                      currentValue={title}
                      key={index}
                      columnId={columnId}
                      boardId={boardId}
                      closeEditMode={closeEditMode}
                    />
                  );
                })
              : null}
            <BoardEditorInput
              saveButtonHandler={saveButtonHandler}
              fieldName="column_create"
              boardId={boardId}
              autofocus={newField === 'column'}
              closeEditMode={closeEditMode}
            />
          </S.ColumnList>
        ) : null}
      </S.BoardEditorFieldsList>
      {isOwner && newField !== 'board' ? (
        <BoardEditorInput
          saveButtonHandler={saveButtonHandler}
          fieldName="share_board"
          boardId={boardId}
          closeEditMode={closeEditMode}
        />
      ) : null}

      {members?.length ? (
        <S.BoardMembersList>
          <S.MemberListTitle>Members list</S.MemberListTitle>
          {map(members, (member) => (
            <S.MemberlistItem>
              <S.MemberListEmail> {member} </S.MemberListEmail>
              {isOwner ? <StyledButton
                label={`Kick user`}
                buttonColor={IButtonColor.RED}
                onClick={() => onButtonsAction('kick')}
              /> : null}
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
            onClick={() => onButtonsAction(isOwner ? 'delete' : 'leave')}
          />
        </S.DeleteBoardButton>
      ) : null}
    </S.BoardEditorWrapper>
  );
};

export default BoardEditor;
