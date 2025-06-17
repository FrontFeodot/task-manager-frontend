import { darken, lighten } from 'polished';
import styled from 'styled-components';

import { MOBILE } from '@common/utils/mediaHelper';

import { Text } from '@components/text/TextCommon.styled';

export const Container = styled.div<{ $isCreateTask?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-x: auto;
  position: relative;

  .description-toolbar {
    background: inherit;
    border: ${({ theme }) => theme.borderCommon};
    border-radius: 4px;
    color: ${({ theme }) => theme.textPrimary};
    fill: ${({ theme }) => theme.textPrimary};
  }

  .description-toolbar .rdw-option-wrapper {
    box-shadow: none;
    height: 24px;
  }

  :has(div:focus) .rdw-option-wrapper:hover {
    box-shadow: 1px 1px 0px ${({ theme }) => theme.toolbarBoxShadow};
  }

  :has(div:focus) .rdw-option-active {
    box-shadow: 1px 1px 0px ${({ theme }) => theme.toolbarBoxShadow};
  }

  .rdw-dropdown-carettoclose {
    border-bottom-color: ${({ theme }) => theme.textPrimary};
  }

  .rdw-dropdown-carettoopen {
    border-top-color: ${({ theme }) => theme.textPrimary};
  }

  .rdw-option-wrapper,
  .rdw-dropdown-wrapper,
  .rdw-dropdown-optionwrapper,
  .rdw-emoji-modal,
  .rdw-image-modal,
  .rdw-image-modal input,
  .rdw-link-modal,
  .rdw-colorpicker-modal,
  .rdw-suggestion-dropdown,
  .rdw-link-modal input,
  .rdw-image-alignment-options-popup,
  .rdw-option-wrapper:hover,
  .rdw-dropdown-optionwrapper:hover {
    color: ${({ theme }) => theme.textPrimary};
    border: ${({ theme }) => theme.borderCommon};
    background: ${({ theme }) => theme.bgTertiary};
  }

  .rdw-suggestion-option {
    border-bottom: ${({ theme }) => theme.borderCommon};
  }

  .rdw-mention-link {
    color: ${({ theme }) => theme.textSecondary};
    background-color: ${({ theme }) => theme.disabledBg};
  }

  .rdw-image-alignment-option {
    border: none;
    width: 88px;
  }

  .rdw-colorpicker-modal,
  .rdw-emoji-modal {
    height: 200px;
  }

  .rdw-link-modal {
    height: auto;
  }

  .rdw-dropdownoption-active {
    background: ${({ theme }) => theme.successColor};
  }

  .rdw-dropdownoption-highlighted,
  .rdw-suggestion-option-active {
    background: ${({ theme }) => theme.buttonBg};
  }

  .rdw-dropdown-wrapper:hover {
    background: inherit;
    box-shadow: none;
  }

  .rdw-image-modal-header-label-highlighted {
    border-color: ${({ theme }) => theme.textSecondary};
    background: none;
  }

  .rdw-image-modal-btn,
  .rdw-link-modal-btn {
    background: ${({ theme }) => theme.buttonBg};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
    gap: 4px;

    ${({ theme }) => theme.shadow};

    :not(:disabled):hover {
      background: ${({ theme }) => lighten(0.1, theme.buttonBg)};
    }

    :not(:disabled):focus {
      outline: none;
      box-shadow: 0 0 10px ${({ theme }) => theme.buttonBg};
    }

    :not(:disabled):active {
      transform: scale(0.95);
      background: ${({ theme }) => darken(0.1, theme.buttonBg)};
    }
  }

  .description-wrapper {
    display: flex;
    flex-direction: column;

    height: 100%;
    ${({ $isCreateTask }) => (!$isCreateTask ? 'margin-bottom: 32px' : '')};
  }

  .public-DraftEditor-content {
    min-height: 184px;
  }

  .description-editor,
  .description-toolbar {
    cursor: pointer;

    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }

  :has(div:focus) .description-editor,
  :has(div:focus) .description-toolbar {
    border: ${({ theme }) => theme.inputBorder};
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
    cursor: text;
  }

  .description-editor {
    height: calc(100% - 72px);
    overflow: auto;
    background-color: ${(props) => props.theme.inputBg};
    border: ${({ theme }) => theme.borderCommon};
    color: ${(props) => props.theme.textPrimary};
    padding: 8px;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.fontMD};
    word-wrap: break-word;
    white-space: pre-wrap;

    & img {
      max-width: 100%;
      max-height: 100%;
    }

    & pre {
      background: ${(props) => props.theme.bgTertiary};
    }
  }

  @media (${MOBILE}) {
    .description-editor {
      height: calc(100% - 152px);
    }
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const Label = styled(Text)`
  font-size: ${(props) => props.theme.fontSM};
  color: ${(props) => props.theme.textDisabled};
`;

export const ChangedDataModal = styled.div`
  position: absolute;
  right: 16px;
  bottom: 6px;

  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 112px;
  height: 32px;
`;

export const PasteModal = styled.div`
  position: absolute;
  left: 16px;
  bottom: 6px;
  z-index: 1000;

  display: flex;
  flex-direction: row;
  align-items: center;
  width: 256px;
  height: 32px;
  padding: 4px;
  gap: 8px;

  & button {
    padding: 4px 8px;
  }

  & span {
    margin-right: 8px;
  }

  & .button_label {
    font-size: ${(props) => props.theme.fontXS};
  }
`;
