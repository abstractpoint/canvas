export const randomRange = (fromNum, toNum) => {
    const diff = toNum - fromNum;
    return fromNum + (Math.random() * diff);
};

export const scaleToF = ([x, y, z]) => {
    const f = 100;
    const multiplier = f / (f + z);
    return [x * multiplier, y * multiplier];
};