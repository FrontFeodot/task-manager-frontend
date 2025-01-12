import * as S from './StyledButton.styled';
import { IStyledButton } from './StyledButton.types';

const StyledButton = ({
  label,
  ...buttonProps
}: IStyledButton): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Button {...buttonProps}>{label}</S.Button>
    </S.Wrapper>
  );
};

export default StyledButton;
