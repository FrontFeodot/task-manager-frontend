import map from 'lodash/map';

import * as S from './Tabs.styled';
import { ITabsProps } from './Tabs.types';

const Tabs = <T,>({
  currentTab,
  setCurrentTab,
  tabs,
}: ITabsProps<T>): JSX.Element => {
  return (
    <S.Wrapper>
      {map(tabs, (tab, index) => (
        <S.Tab
          key={index}
          onClick={() => setCurrentTab(tab as T)}
          $isActive={currentTab === tab}
        >
          {`${tab}`}
        </S.Tab>
      ))}
    </S.Wrapper>
  );
};

export default Tabs;
