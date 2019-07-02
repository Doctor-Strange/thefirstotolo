export interface IDirection {
    direction: string,
    textAlign: string,
    font: string,
}

export interface IColors {
    lightBackground: string,
    darkBackground: string,
    mainForeground: string,
    secondForeground: string,
    textMain: string,
    textSecond: string,
    textThird: string,
    extraColor: string;
}

export interface ISpacing {
    fontWeightNormal: string,
    fontWeightBold: string,
    lineHeight: string,
}

export interface ITheme {
    lang: 'fa' | 'en',
    direction: IDirection,
    color: IColors,
    spacing: ISpacing,
}
