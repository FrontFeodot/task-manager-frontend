import map from 'lodash/map';

import * as S from './Tabs.styled';
import { ITabsProps } from './Tabs.types';
import { keys } from 'lodash';

const Tabs = ({ currentTab, setCurrentTab, tabs }: ITabsProps): JSX.Element => {
  return (
    <S.Wrapper>
      {map(keys(tabs), (tab, index) => (
        <S.Tab
          key={index}
          onClick={() => setCurrentTab(tabs[tab])}
          $isActive={currentTab === tabs[tab]}
        >
          {`${tab}`}
        </S.Tab>
      ))}
    </S.Wrapper>
  );
};

export default Tabs;
