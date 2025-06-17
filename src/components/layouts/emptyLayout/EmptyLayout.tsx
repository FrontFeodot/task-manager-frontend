import * as S from './EmptyLayout.styled';
import { IEmptyLayout } from './EmptyLayout.types';
import { getEmptyLayoutContent } from './getEmptyLayoutContent';

const EmptyLayout = ({ type }: IEmptyLayout): JSX.Element => {
  const { textContent, textLink, callback } = getEmptyLayoutContent(type);

  return (
    <S.EmptyLayoutWrapper>
      <S.EmptyLayoutLabel>
        {textContent}
        <S.CreateBoardLink onClick={callback}>{textLink}</S.CreateBoardLink>
      </S.EmptyLayoutLabel>
    </S.EmptyLayoutWrapper>
  );
};

export default EmptyLayout;
