export interface IIcon {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

interface IIconListItem {
  viewbox: string;
  path: Record<string, string>[];
  style?: Record<string, string>;
  g?: {
    fill?: string;
    path?: Record<string, string>[];
    circle?: Record<string, string>[];
  };
}

export type IIconList = Record<string, IIconListItem>;
