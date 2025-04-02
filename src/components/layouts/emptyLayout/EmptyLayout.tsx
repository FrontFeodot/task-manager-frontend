import { getEmptyLayoutContent } from './getEmptyLayoutContent';

import { IEmptyLayout, IEmptyLayoutType } from './EmptyLayout.types';
import * as S from './EmptyLayout.styled';

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
