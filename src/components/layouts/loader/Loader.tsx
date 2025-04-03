import * as S from './Loader.styled';

const Loader = ({ isRelative = false, isOpaque = false }): JSX.Element => {
  return (
    <S.LoaderWrapper $isRelative={isRelative} $isTransparent={!isOpaque}>
      <S.LoaderSpinner />
    </S.LoaderWrapper>
  );
};

export default Loader;
