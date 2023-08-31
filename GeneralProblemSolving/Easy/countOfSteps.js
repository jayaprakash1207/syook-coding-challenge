function countOfStepsTillOne(num) {
    if(num <= 0) {
        return "Invalid Input";
    }
    let countOfSteps = 0;
    while(num !== 1) {
        if(num % 2 === 0) {
            num /= 2;
        } else {
            num = 3 * num + 1;
        }
        countOfSteps++;
    }
    return countOfSteps;
}

console.log(countOfStepsTillOne(12));