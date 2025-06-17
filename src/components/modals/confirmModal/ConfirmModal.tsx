import { useRef } from 'react';

import { getCurrentModal } from '@common/helpers/appHelper';
import useOutsideClick from '@common/hooks/useOutSideClick';
import { IModal } from '@common/providers/appProvider/types';
import { closeModal } from '@common/providers/appProvider/useAppState';

import StyledButton from '@components/styledButton/StyledButton';
import { IButtonColor } from '@components/styledButton/StyledButton.types';

import * as S from './ConfirmModal.styled';
import { IConfirmModal } from './ConfirmModalProps.types';

const ConfirmModal = (): JSX.Element => {
  const modalRef = useRef(null);
  const modalData = getCurrentModal(IModal.CONFIRM_MODAL)?.data;
  const { title, message, args, callback } = modalData as IConfirmModal;

  const onSubmit = async () => {
    if (callback && args) {
      await callback(...args);
    }
    onClose();
  };

  const onClose = (): void => {
    closeModal(IModal.CONFIRM_MODAL);
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
