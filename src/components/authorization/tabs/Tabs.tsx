import { useState } from 'react';
import * as S from './Tabs.styled';
import { ITabsProps } from './Tabs.types';
import { map } from 'lodash';

const Tabs = <T,>({
  currentTab,
  setCurrentTab,
  tabs,
}: ITabsProps<T>): JSX.Element => {
  console.log(tabs)
  return (
    <S.Wrapper>
      {map(tabs, (tab) => (
        <S.Tab
          onClick={() => setCurrentTab(tab as T)}
          isActive={currentTab === tab}
        >
          {`${tab}`}
        </S.Tab>
      ))}
    </S.Wrapper>
  );
};

export default Tabs;
