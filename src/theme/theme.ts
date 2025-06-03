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
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgGradient: string;
  disabledBg: string;

  modalBg: string;

  buttonBg: string;
  buttonBorderColor: string;
  buttonDisabledBorderColor: string;
  buttonDisabledText: string;

  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  textButton: string;

  iconColor: string;
  toolbarIcon: string;
  toolbarBoxShadow: string;

  errorBg: string;
  errorText: string;
  successColor: string;

  borderCommon: string;

  inputBg: string;
  inputBorder: string;

  link: string;
  shadow: string;
  flexbox: string;
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
  bgTertiary: '#202124',
  bgGradient: 'linear-gradient(145deg, #2a2b2e, #202124)',
  disabledBg: '#3a3b3c',

  modalBg: '#2f303d',

  buttonBg: '#9B51E0',
  buttonBorderColor: '#9B51E0',
  buttonDisabledBorderColor: '#3a3b3c',
  buttonDisabledText: '#6f7275',

  textPrimary: '#F5F6F7',
  textSecondary: '#8ab4f8',
  textDisabled: '#a0a0a0',
  textButton: '#F5F6F7',

  iconColor: '#F5F6F7',
  toolbarIcon: '#F5F6F7',
  toolbarBoxShadow: '#9B51E0',

  link: '#09d3ac',
  errorBg: '#FF4D4F',
  errorText: '#FFFFFF',
  successColor: '#00bfa6',

  borderCommon: '1px solid #3a3b3c',

  inputBg: '#252627',
  inputBorder: '1px solid #1e90ff',

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
