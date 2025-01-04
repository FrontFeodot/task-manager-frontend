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
  focusRing: string; // Цвет обводки при фокусе
  hoverBg: string;  // Цвет кнопки при наведении
  activeBg: string; // Цвет кнопки при нажатии
}

const theme: ITheme = {
  bgPrimary: '#18191a',
  bgSecondary: '#000000',
  bgTertiary: '#242526',

  buttonBg: '#9B51E0',
  textPrimary: '#F5F6F7',
  textAccent: '#9B51E0',
  textButton: '#F5F6F7',
  link: '#09d3ac',
  shadow: 'box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5); border-radius: 8px;',
  flexbox: 'display: flex; justify-content: center; align-items: center;',

  focusRing: '#FF7F50',
  hoverBg: '#AB63E5',
  activeBg: '#7A34B3',
};

export default theme;
