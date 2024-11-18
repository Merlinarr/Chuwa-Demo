export enum BasicStatus {
  DISABLE,
  ENABLE,
}

export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
}

export enum StorageEnum {
  User = 'user',
  Token = 'token',
  Settings = 'settings',
  I18N = 'i18nextLng',
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeLayout {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Mini = 'mini',
}

export enum ThemeColorPresets {
  Default = 'default',
  Cyan = 'cyan',
  Purple = 'purple',
  Blue = 'blue',
  Orange = 'orange',
  Red = 'red',
}

export enum LocalEnum {
  en_US = 'en_US',
  zh_CN = 'zh_CN',
}



export enum PermissionType {
  CATALOGUE,
  MENU,
  BUTTON,
}

export enum LoginOptions {
  SIGNIN="SIGNIN",
  SIGNUP="SIGNUP",
  RESET_PASSWORD="RESET_PASSWORD",
  SEND_EMAIL="SEND_EMAIL",
}
export enum UserRole {
  ADMIN="admin",
  USER="user",
}
export enum SearchOrder {
  LAST_ADD="LAST_ADD",
  PRICE_ASC="PRICE_ASC",
  PRICE_DESC="PRICE_DESC",
}
