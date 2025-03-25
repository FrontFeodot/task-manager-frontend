import {
  closeModal,
  useAppState,
} from '@common/providers/appProvider/useAppState';
import * as S from './ConfirmModal.styled';
import { IButtonColor } from '@components/styledButton/StyledButton.types';
import StyledButton from '@components/styledButton/StyledButton';
import useOutsideClick from '@common/hooks/useOutSideClick';
import { useRef } from 'react';

const ConfirmModal = (): JSX.Element => {
  const modalRef = useRef(null);
  const modalData = useAppState((s) => s.currentModal?.data);
  const { title, message, args, callback } = modalData as {
    title: string;
    message?: string;
    args: string[];
    callback: (...props: any) => void;
  };

  const onSubmit = async () => {
    await callback(...args);
    onClose();
  };

  const onClose = (): void => {
    closeModal();
  };

  useOutsideClick(modalRef, onClose);

  return (
    <S.ConfirmModalWrapper ref={modalRef}>
      <S.ConfirmTitle>{title}</S.ConfirmTitle>
      {message ? <S.ConfirmMessage>{message}</S.ConfirmMessage> : null}
      <S.ButtonsWrapper>
        <S.ConfirmButtonWrapper>
          <StyledButton
            label="Confirm"
            buttonColor={IButtonColor.GREEN}
            onClick={onSubmit}
          />
        </S.ConfirmButtonWrapper>

        <S.ConfirmButtonWrapper>
          <StyledButton
            label="Cancel"
            buttonColor={IButtonColor.RED}
            onClick={onClose}
          />
        </S.ConfirmButtonWrapper>
      </S.ButtonsWrapper>
    </S.ConfirmModalWrapper>
  );
};

export default ConfirmModal;
