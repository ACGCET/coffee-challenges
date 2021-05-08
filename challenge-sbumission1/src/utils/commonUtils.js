// method to convert hex color to rgba
export const hexToRgbA = (hex) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        let color = 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.7)';
        return getTextColor(color)
    }
    throw new Error('Bad Hex');
}

export const getTextColor = (rgba) => {
    rgba = rgba.match(/\d+/g);
    if ((rgba[0] * 0.299) + (rgba[1] * 0.587) + (rgba[2] * 0.114) > 186) {
        return 'black';
    } else {
        return 'white';
    }
}

export const isValidColor = (str) => {
    return str.match(/^#[a-f0-9]{6}$/i) !== null;
}

export const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}