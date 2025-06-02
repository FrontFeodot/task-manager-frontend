import { svgToDataUri } from '@common/helpers/iconHelper';
import Icon from '@common/icons/Icon';

export const toolbarOptions = {
  inline: [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'superscript',
    'subscript',
  ],
  blockType: [
    'Normal',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'Blockquote',
    'Code',
  ],
  fontSize: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
  list: ['unordered', 'ordered', 'indent', 'outdent'],
  /*   textAlign: ['left', 'center', 'right', 'justify'], */
  colorPicker: [],
  link: ['link', 'unlink'],
  emoji: [],
  image: [],
  remove: [],
  history: ['undo', 'redo'],
};

const colorPickerColors = [
  'rgb(97,189,109)',
  'rgb(26,188,156)',
  'rgb(84,172,210)',
  'rgb(44,130,201)',
  'rgb(147,101,184)',
  'rgb(71,85,119)',
  'rgb(204,204,204)',
  'rgb(65,168,95)',
  'rgb(0,168,133)',
  'rgb(61,142,185)',
  'rgb(41,105,176)',
  'rgb(85,57,130)',
  'rgb(40,50,78)',
  'rgb(0,0,0)',
  'rgb(247,218,100)',
  'rgb(251,160,38)',
  'rgb(235,107,86)',
  'rgb(226,80,65)',
  'rgb(163,143,132)',
  'rgb(239,239,239)',
  'rgb(255,255,255)',
  'rgb(250,197,28)',
  'rgb(243,121,52)',
  'rgb(209,72,65)',
  'rgb(184,49,47)',
  'rgb(124,112,107)',
  'rgb(209,213,216)',
];

const createBaseGroupConfig = (group: string | number, iconColor: string) => {
  const config: Record<string, unknown> = {
    icon: createIcon(group, iconColor),
  };

  if (group === 'colorPicker') {
    config.colors = colorPickerColors;
  }

  return config;
};

const createOptionsGroupConfig = (
  group: string | number,
  options: Array<string | number>,
  iconColor: string
) => {
  const config: Record<string, unknown> = { options };

  if (group !== 'blockType' && group !== 'fontSize') {
    for (const option of options) {
      config[option] = { icon: createIcon(option, iconColor) };
    }
  }

  return config;
};

const createIcon = (name: string | number, color: string) =>
  svgToDataUri(<Icon size={20} name={String(name)} color={color} />);

export const generateToolbarConfig = <
  Opts extends Record<string, Array<string | number>>,
>(
  toolbarOptions: Opts,
  iconColor: string
) => {
  const groups = Object.keys(toolbarOptions) as (keyof Opts)[];
  const config: Record<string, unknown> = { options: groups };

  for (const group of groups) {
    const options = toolbarOptions[group];

    if (options.length === 0) {
      config[group as string] = createBaseGroupConfig(
        group as string,
        iconColor
      );
    } else {
      config[group as string] = createOptionsGroupConfig(
        group as string,
        options,
        iconColor
      );
    }
  }

  return config;
};
