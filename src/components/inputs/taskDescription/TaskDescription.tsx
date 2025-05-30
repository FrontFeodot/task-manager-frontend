import { useEffect, useRef, useState } from 'react';
import {
  EditorState,
  RawDraftContentState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import isObject from 'lodash/isObject';
import { IoMdCheckmark } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';

import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';

import {
  getRawDescriptionContent,
  isDescriptionChanged,
} from '@common/helpers/taskHelper';

import * as S from './TaskDescription.styled';
import { IEditorRef, ITaskDescription } from './TaskDescription.types';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import useToolbarStyling from './hooks/useToolbarStyling';

const TaskDescriptionInput = ({
  setValue,
  watch,
  setIsFormChanged,
}: ITaskDescription) => {
  const editorRef = useRef<IEditorRef | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isCreateTask = !setIsFormChanged;

  const initialRawRef = useRef<RawDraftContentState | null>(null);

  const [editorState, setEditorState] = useState<EditorState>();
  const [isConfirmModal, toggleConfirmModal] = useState(false);

  const currentRaw = getRawDescriptionContent(watch('description') || '');

  useToolbarStyling(containerRef);

  useEffect(() => {
    setInitialData();

    const toolbar = document.querySelector('.rdw-editor-toolbar');
    toolbar?.addEventListener('mousedown', onMouseDown);

    return () => toolbar?.removeEventListener('mousedown', onMouseDown);
  }, []);

  const finalizeEdit = (): void => {
    const contentState = editorState!.getCurrentContent();
    const currentRaw = convertToRaw(contentState);

    const content = JSON.stringify(currentRaw);
    setValue('description', content, { shouldValidate: true });

    if (!isCreateTask) {
      setIsFormChanged(
        isDescriptionChanged(currentRaw, initialRawRef.current!)
      );
      toggleConfirmModal(false);
    }
  };

  const setInitialData = () => {
    if (currentRaw) {
      if (currentRaw && isObject(currentRaw)) {
        initialRawRef.current = currentRaw;
        const contentState = convertFromRaw(currentRaw);
        const state = EditorState.createWithContent(contentState);
        setEditorState(state);

        if (isConfirmModal) {
          toggleConfirmModal(false);
        }
      }
    }
  };

  const onMouseDown = () => {
    editorRef.current?.focus();
  };

  const setEditorStateHandler = (newState: EditorState): void => {
    if (!isCreateTask && currentRaw) {
      const newStateRaw = convertToRaw(newState.getCurrentContent());
      toggleConfirmModal(isDescriptionChanged(newStateRaw, currentRaw));
    }
    setEditorState(newState);
  };

  return (
    <S.Container
      onBlur={isCreateTask ? finalizeEdit : undefined}
      ref={containerRef}
      $isCreateTask={isCreateTask}
    >
      <S.TopSection>
        <S.Label>Description</S.Label>
      </S.TopSection>
      <Editor
        editorRef={(instance) => {
          editorRef.current = instance as IEditorRef;
        }}
        editorState={editorState}
        onEditorStateChange={setEditorStateHandler}
        wrapperClassName="description-wrapper"
        editorClassName="description-editor"
        toolbarClassName="description-toolbar"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'colorPicker',
            'link',
            'emoji',
            'image',
            'remove',
            'history',
          ],
          inline: {
            options: [
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'superscript',
              'subscript',
            ],
          },
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            { text: 'APPLE', value: 'apple', url: '/' },
            { text: 'BANANA', value: 'banana', url: '/' },
            { text: 'CHERRY', value: 'cherry', url: '/' },
            { text: 'DURIAN', value: 'durian', url: '/' },
            { text: 'EGGFRUIT', value: 'eggfruit', url: '/' },
            { text: 'FIG', value: 'fig', url: '/' },
            { text: 'GRAPEFRUIT', value: 'grapefruit', url: '/' },
            { text: 'HONEYDEW', value: 'honeydew', url: '/' },
          ],
        }}
      />
      {isConfirmModal ? (
        <S.ChangedDataModal>
          <StyledButton
            buttonColor={IButtonColor.GREY}
            Icon={<IoMdCheckmark fill="#F5F6F7" />}
            onClick={finalizeEdit}
          />
          <StyledButton
            buttonColor={IButtonColor.GREY}
            Icon={<MdOutlineClose fill="#F5F6F7" />}
            onClick={setInitialData}
          />
        </S.ChangedDataModal>
      ) : null}
    </S.Container>
  );
};

export default TaskDescriptionInput;
