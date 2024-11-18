import { ThemeConfig } from 'antd';

import { ThemeColorPresets } from '#/enum';
/**
 * Antd theme editor: https://ant.design/theme-editor-cn
 */
const customThemeTokenConfig: ThemeConfig['token'] = {
  colorSuccess: '#22c55e',
  colorWarning: '#ff7849',
  colorError: '#ff5630',
  colorInfo: '#00b8d9',
  colorPrimary: '#7635DC',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',

  wireframe: false,

  borderRadiusSM: 2,
  borderRadius: 4,
  borderRadiusLG: 8,
};

const customComponentConfig: ThemeConfig['components'] = {
  Breadcrumb: {
    fontSize: 12,
    separatorMargin: 4,
  },
  Menu: {
    fontSize: 14,
    colorFillAlter: 'transparent',
    itemColor: 'rgb(145, 158, 171)',
    motionDurationMid: '0.125s',
    motionDurationSlow: '0.125s',
  },
};

const colorPrimarys: {
  [k in ThemeColorPresets]: string;
} = {
  default: '#fff',
  cyan: '#078DEE',
  purple: '#7635DC',
  blue: '#2065D1',
  orange: '#FDA92D',
  red: '#FF3030',
};

const themeModeToken: Record<'dark' | 'light', ThemeConfig> = {
  dark: {
    token: {
      colorBgBase: '#fff',
      colorBgContainer: '#fff',
      colorBgElevated: '#161c24',
      colorBorder: '#ccc',
      colorText: '#111827',
      colorTextPlaceholder: '#979797',
      paddingLG: 12,
    },
    components: {
      Modal: {
        headerBg: '#212b36',
        contentBg: '#212b36',
        footerBg: '#212b36',
      },
      Notification: {},
      Input: {
        activeBorderColor: '#ccc',
      },
    },
  },
  light: {
    token: {
      colorBgBase: '#fff',
      colorBgContainer: '#fff',

      colorBorder: '#ccc',
      colorText: '#111827',
      colorTextPlaceholder: '#979797',
      paddingLG: 12,
    },
    components: {
      Pagination: {
        /* here is your component tokens */
        itemSize: 42,
        itemActiveBg: "#7635DC",
      },
    },
  },
};

export { customThemeTokenConfig, customComponentConfig, colorPrimarys, themeModeToken };
