import * as S from './StyledButton.styled';
import { IButtonColor, IStyledButton } from './StyledButton.types';

const StyledButton = ({
  label,
  buttonColor = IButtonColor.default,
  onClick,
  type,
}: IStyledButton): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Button $buttonColor={buttonColor} onClick={onClick} type={type}>
        {label}
      </S.Button>
    </S.Wrapper>
  );
};

export default StyledButton;
