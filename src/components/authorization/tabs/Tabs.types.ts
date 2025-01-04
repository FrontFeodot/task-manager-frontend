import { Dispatch, SetStateAction } from 'react';

export enum IAuthTabs {
  REGISTRATION = 'REGISTRATION',
  LOGIN = 'LOGIN',
}

export interface ITabsProps<T> {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<T>>;
  tabs: string[];
}
