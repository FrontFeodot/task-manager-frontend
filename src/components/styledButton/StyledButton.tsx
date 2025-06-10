import Loader from '@components/layouts/loader/Loader';

import * as S from './StyledButton.styled';
import { IButtonColor, IStyledButton } from './StyledButton.types';

const StyledButton = ({
  label,
  buttonColor = IButtonColor.default,
  onClick,
  type = 'button',
  Icon,
  className,
  isLoading,
  disabled,
}: IStyledButton): JSX.Element => {
  return (
    <S.Wrapper className="button_wrapper">
      <S.Button
        className={`${className || ''}`}
        $buttonColor={buttonColor}
        onClick={onClick}
        type={type}
        disabled={disabled || isLoading}
        $isLoading={!!isLoading}
      >
        {isLoading ? (
          <Loader size="sm" isRelative />
        ) : (
          <>
            <S.ButtonLabel className={'button_label'}>{label}</S.ButtonLabel>
            {Icon || null}
          </>
        )}
      </S.Button>
    </S.Wrapper>
  );
};

export default StyledButton;
