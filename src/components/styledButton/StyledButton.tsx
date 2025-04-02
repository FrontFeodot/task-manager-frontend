import * as S from './StyledButton.styled';
import { IButtonColor, IStyledButton } from './StyledButton.types';

const StyledButton = ({
  label,
  buttonColor = IButtonColor.default,
  onClick,
  type,
  Icon,
  className,
}: IStyledButton): JSX.Element => {
  return (
    <S.Wrapper>
      <S.Button
        className={`${className || ''}`}
        $buttonColor={buttonColor}
        onClick={onClick}
        type={type}
      >
        <S.ButtonLabel className={'button_label'}>{label}</S.ButtonLabel>
        {Icon || null}
      </S.Button>
    </S.Wrapper>
  );
};

export default StyledButton;
