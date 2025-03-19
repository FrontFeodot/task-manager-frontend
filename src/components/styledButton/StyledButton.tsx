import * as S from './StyledButton.styled';
import { IButtonColor, IStyledButton } from './StyledButton.types';

const StyledButton = ({
  label,
  buttonColor = IButtonColor.default,
  ...buttonProps
}: IStyledButton): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Button buttonColor={buttonColor} {...buttonProps}>{label}</S.Button>
    </S.Wrapper>
  );
};

export default StyledButton;
