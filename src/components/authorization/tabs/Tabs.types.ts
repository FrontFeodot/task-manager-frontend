import { Dispatch, SetStateAction } from 'react';

export interface ITabsProps {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  tabs: Record<string, string>;
}
