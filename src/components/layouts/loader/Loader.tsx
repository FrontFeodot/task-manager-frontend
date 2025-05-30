import * as S from './Loader.styled';

interface ILoader {
  isRelative?: boolean;
  isOpaque?: boolean;
  size?: 'lg' | 'sm';
}

const Loader = ({
  isRelative = false,
  isOpaque = false,
  size = 'lg',
}: ILoader): JSX.Element => {
  return (
    <S.LoaderWrapper $isRelative={isRelative} $isTransparent={!isOpaque}>
      <S.LoaderSpinner $size={size} />
    </S.LoaderWrapper>
  );
};

export default Loader;
