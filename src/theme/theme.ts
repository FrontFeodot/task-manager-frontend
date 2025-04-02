export interface IFontSize {
  fontH1: string;
  fontH2: string;
  fontH3: string;
  fontXXL: string;
  fontXL: string;
  fontLG: string;
  fontMD: string;
  fontSM: string;
  fontXS: string;
}

export interface ITheme {
  bgPrimary: string; //  (background)
  bgSecondary: string;
  bgTertiary: string; //  (board), box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5); border-radius: 8px;

  buttonBg: string; //?
  textPrimary: string; // (Check rgba(255, 255, 255, 0.87))
  textAccent: string; // '#27AE60' .
  textButton: string; // ?
  link: string;
  shadow: string; //board ???
  flexbox: string;
  errorBg: string; // Фон тултипа ошибки
  errorText: string; // Текст ошибки
  collapsedText: string;
}

const fonts: IFontSize = {
  fontH1: '5rem',
  fontH2: '4rem',
  fontH3: '3rem',
  fontXXL: '1.5rem',
  fontXL: '1.25rem',
  fontLG: '1.125rem',
  fontMD: '1rem',
  fontSM: '0.875rem',
  fontXS: '0.75rem',
};

const theme: ITheme & IFontSize = {
  bgPrimary: '#18191a',
  bgSecondary: '#000000',
  bgTertiary: '#242526',

  buttonBg: '#9B51E0',
  textPrimary: '#F5F6F7',
  textAccent: '#9B51E0',
  textButton: '#F5F6F7',
  link: '#09d3ac',
  errorBg: '#FF4D4F',
  errorText: '#FFFFFF',

  shadow: 'box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5); border-radius: 8px;',
  flexbox: 'display: flex; justify-content: center; align-items: center;',
  collapsedText: `
    text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  `,

  ...fonts,
};
export type ThemeType = typeof theme;

export default theme;
