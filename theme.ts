export interface ISize {
  f1: string;
}

export interface IColor {
  main: string;
  secondary: string;
}

export interface ITheme {
  size: ISize;
  color: IColor;
}

export const theme: ITheme = {
  size: {
    f1: '16px',
  },
  color: {
    main: '#404040',
    secondary: '#ff5c5c',
  },
};
