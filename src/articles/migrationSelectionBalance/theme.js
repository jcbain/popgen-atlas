const colors = {
    blacks: {
        black1: '#000000',
        black2: '#303030',
        black3: '#4d4d4d'
    },
    whites: {
        white1: '#ffffff',
        white2: '#fffff7'
    },
    grays: {
        gray1: '#e0e0e0',
        gray2: '#9e9e9e',
        gray3: '#6e6e6e'
    },
    purples: {
        purple1: '#5d0096', 
        purple2: '#9538f2',
        purple3: '#a751fc',
        purple4: '#682CFE',
        purple5: '#fafbff'
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

const msTheme = {
    hotSideColor: hexToRGB(colors.reds.red1, 0.1),
    coldSideColor: hexToRGB(colors.blues.blue1, 0.1),
    progressBarColor: colors.grays.gray1,
    progressHighlight: colors.blues.blue2,
    playPauseColor: colors.blacks.black2,
    spanColor: colors.blues.blue2,
    modalTitleColor: colors.blacks.black2,
    modalContentColor: colors.grays.gray3,
    
}

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export default msTheme;

