import { useAppState } from '@common/providers/appProvider/useAppState';

import * as S from './Loader.styled';

interface ILoader {
  isRelative?: boolean;
  isOpaque?: boolean;
  size?: 'lg' | 'sm';
  isAppLoading?: boolean;
}

const Loader = ({
  isRelative = false,
  isOpaque = false,
  size = 'lg',
  isAppLoading = false,
}: ILoader): JSX.Element => {
  const appError = useAppState((s) => s.appError);

  const appLoadingText =
    appError ||
    'Trying to connect to the server. This may take up to a minute.';

  return (
    <S.LoaderWrapper
      $isAppLoading={isAppLoading}
      $isRelative={isRelative}
      $isTransparent={!isOpaque}
    >
      {!isAppLoading || (isAppLoading && !appError) ? (
        <S.LoaderSpinner $size={size} />
      ) : null}
      {isAppLoading ? <S.LoaderText>{appLoadingText}</S.LoaderText> : null}
    </S.LoaderWrapper>
  );
};

export default Loader;
