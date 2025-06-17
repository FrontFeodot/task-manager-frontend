import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  Modifier,
  RawDraftContentState,
  SelectionState,
} from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import isObject from 'lodash/isObject';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useTheme } from 'styled-components';

import {
  getRawDescriptionContent,
  isDescriptionChanged,
} from '@common/helpers/taskHelper';
import Icon from '@common/icons/Icon';

import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';
import { TextInline } from '@components/text/TextCommon.styled';

import { generateToolbarConfig, toolbarOptions } from './editorConfig';
import useToolbarStyling from './hooks/useToolbarStyling';
import * as S from './TaskDescription.styled';
import { IEditorRef, ITaskDescription } from './TaskDescription.types';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TaskDescriptionInput = ({
  setValue,
  watch,
  setIsFormChanged,
}: ITaskDescription) => {
  const editorRef = useRef<IEditorRef | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toolbarIcon } = useTheme();

  const initialRawRef = useRef<RawDraftContentState | null>(null);

  const [editorState, setEditorState] = useState<EditorState>();
  const [isConfirmModal, toggleConfirmModal] = useState(false);
  const [pasteModal, setPasteModal] = useState<{
    visible: boolean;
    html?: string;
    text?: string;
    originalSelection?: SelectionState;
    insertedLength?: number;
  }>({
    visible: false,
  });

  const isCreateTask = !setIsFormChanged;
  const currentRaw = getRawDescriptionContent(watch('description') || '');
  const toolbar = useMemo(
    () => generateToolbarConfig(toolbarOptions, toolbarIcon),
    []
  );

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

  const handlePastedText = (text: string, html: string | undefined) => {
    if (html && html !== text) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();

      if (rect && editorState) {
        setPasteModal({
          visible: true,
          html,
          text,
          originalSelection: editorState.getSelection(),
          insertedLength: text.length,
        });
      }
    }
    return false;
  };

  const handlePasteChoice = (useHtml: boolean) => {
    if (!pasteModal.html || !editorState || !pasteModal.originalSelection)
      return;

    const contentState = editorState.getCurrentContent();
    const selection = pasteModal.originalSelection;

    const deletionSelection = selection.merge({
      focusOffset:
        selection.getStartOffset() + (pasteModal.insertedLength || 0),
    }) as SelectionState;

    let newContentState = Modifier.removeRange(
      contentState,
      selection,
      'backward'
    );

    if (useHtml) {
      newContentState = Modifier.removeRange(
        contentState,
        deletionSelection,
        'forward'
      );
      try {
        const { contentBlocks, entityMap } = htmlToDraft(pasteModal.html);
        const htmlContentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );

        newContentState = Modifier.replaceWithFragment(
          newContentState,
          newContentState.getSelectionAfter(),
          htmlContentState.getBlockMap()
        );
      } catch (e) {
        console.error('HTML conversion error:', e);
        newContentState = Modifier.insertText(
          newContentState,
          newContentState.getSelectionAfter(),
          pasteModal.text || ''
        );
      }
    }

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      useHtml ? 'insert-fragment' : 'insert-characters'
    );

    setEditorState(newEditorState);
    setPasteModal({ ...pasteModal, visible: false });
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
        toolbar={toolbar}
        handlePastedText={handlePastedText}
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
      {pasteModal.visible && (
        <S.PasteModal>
          <TextInline>Paste</TextInline>
          <StyledButton
            buttonColor={IButtonColor.GREY}
            label="as html"
            onClick={() => handlePasteChoice(true)}
          ></StyledButton>
          <StyledButton
            buttonColor={IButtonColor.GREY}
            label="as text"
            onClick={() => handlePasteChoice(false)}
          ></StyledButton>
        </S.PasteModal>
      )}
      {isConfirmModal ? (
        <S.ChangedDataModal>
          <StyledButton
            buttonColor={IButtonColor.GREY}
            Icon={<Icon name="checkmark" />}
            onClick={finalizeEdit}
          />
          <StyledButton
            buttonColor={IButtonColor.GREY}
            Icon={<Icon name="cross" />}
            onClick={setInitialData}
          />
        </S.ChangedDataModal>
      ) : null}
    </S.Container>
  );
};

export default TaskDescriptionInput;
