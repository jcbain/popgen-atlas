const colors = {
    blacks: {
        black1: '#000000',
        black2: '#303030'
    },
    whites: {
        white1: '#ffffff',
        white2: '#fffff7'
    },
    grays: {
        gray1: '#e0e0e0'
    },
    purples: {
        purple1: '#5d0096', 
        purple2: '#9538f2',
        purple3: '#a751fc',
        purple4: '#682CFE'
    },
    blues: {
        blue1: '#0082e6', 
        blue2: '#026dd9'
    },
    yellows: {
        yellow1: '#ffd000'
    },
    reds: {
        red1: '#eb4034'
    }
}

const lightTheme = {
    maxGreaterZeroColor: colors.reds.red1,
    minGreaterZeroColor: colors.yellows.yellow1,
    minLessZeroColor: colors.purples.purple1,
    maxLessZeroColor: colors.blues.blue1,
    zeroColor: colors.whites.white1,
    nonFocusColor: colors.grays.gray1,
    lineColor: colors.purples.purple3,
    dropDownArrowColor: colors.blacks.black2,
    dropDownItemsColor: colors.whites.white1,
    dropDownItemsBorder: colors.blacks.black2,
    dropDownHighLightGradient1: colors.purples.purple3,
    dropDownHighLightGradient2: colors.purples.purple2
 
}

export default lightTheme;