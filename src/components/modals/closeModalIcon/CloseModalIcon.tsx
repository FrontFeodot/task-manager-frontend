import { MdOutlineClose } from 'react-icons/md';

import * as S from './CloseModalIcon.styled';
import { useTheme } from 'styled-components';
import { closeModal } from '@common/providers/appProvider/useAppState';

const CloseModalIcon = (): JSX.Element => {
  const { textPrimary } = useTheme();

  return (
    <S.AccessibilityWrapper onClick={closeModal}>
      <MdOutlineClose size={18} fill={textPrimary} />
    </S.AccessibilityWrapper>
  );
};

export default CloseModalIcon;
