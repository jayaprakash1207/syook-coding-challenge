function isPerfect(num) {
    if(num <= 0) {
        return "Invalid Input";
    }
    let sumOfFactors = 1;
    for(let i = 2; i <= Math.sqrt(num); i++) {
        if(num % i === 0) {
            sumOfFactors += i;
            if(i !== num / i) {
                sumOfFactors += num / i;
            }
        }
    }
    if(sumOfFactors === num) {
        return "Perfect";
    } else if(sumOfFactors > num) {
        return "Abundant";
    } else {
        return "Deficient";
    }
}

console.log(isPerfect(6));
console.log(isPerfect(12));
console.log(isPerfect(8));
