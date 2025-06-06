import { closeModal } from '@common/providers/appProvider/useAppState';
import * as S from './ConfirmModal.styled';
import { IButtonColor } from '@components/styledButton/StyledButton.types';
import StyledButton from '@components/styledButton/StyledButton';
import useOutsideClick from '@common/hooks/useOutSideClick';
import { useRef } from 'react';
import { IConfirmModal } from './ConfirmModalProps.types';
import { IModal } from '@common/providers/appProvider/types';
import { getCurrentModal } from '@common/helpers/appHelper';

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
