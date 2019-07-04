export interface IDirection {
    direction: string,
    textAlign: string,
    font: string,
}

export interface IColors {
    whiteBackground: string;
    lightBackground: string,
    darkBackground: string,
    mainForeground: string,
    secondForeground: string,
    textMain: string,
    textMainAlter: string,
    textSecond: string,
    textSecondAlter: string,
    textThird: string,
    extraColor: string,
    cardLabels: string,
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
