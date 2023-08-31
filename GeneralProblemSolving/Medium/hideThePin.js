function pinToTexts(pin) {
    if(pin <= 0) {
        return "Invalid Input";
    }
    const binaryOfPin = pin.toString(2);
    const reversed = binaryOfPin.split('').reverse();
    const texts = [];
    for(let i = 0; i < binaryOfPin.length; i++) {
        const digit = reversed[i];

        if (digit === '1') {
            if (i === 0) {
                texts.push("pop");
            } else if (i === 1) {
                texts.push("double rip");
            } else if (i === 2) {
                texts.push("hide your mints");
            } else if (i === 3) {
                texts.push("fall");
            } else if (i === 4) {
                texts.reverse();
            }
        }
    }

    return texts;
    
}

console.log(pinToTexts(3));
console.log(pinToTexts(19));