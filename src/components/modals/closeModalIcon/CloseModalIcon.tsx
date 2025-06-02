import { closeModal } from '@common/providers/appProvider/useAppState';
import Icon from '@common/icons/Icon';

import * as S from './CloseModalIcon.styled';

const CloseModalIcon = (): JSX.Element => {
  return (
    <S.AccessibilityWrapper onClick={closeModal}>
      <Icon name="cross" size={18} />
    </S.AccessibilityWrapper>
  );
};

export default CloseModalIcon;
