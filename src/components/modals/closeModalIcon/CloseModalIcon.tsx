import Icon from '@common/icons/Icon';

import * as S from './CloseModalIcon.styled';

const CloseModalIcon = ({
  closeHandler,
}: {
  closeHandler: () => void;
}): JSX.Element => {
  return (
    <S.AccessibilityWrapper onClick={closeHandler}>
      <Icon name="cross" size={18} />
    </S.AccessibilityWrapper>
  );
};

export default CloseModalIcon;
