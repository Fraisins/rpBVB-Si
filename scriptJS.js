let textP = document.createElement('p');

function getInfo(){
    let bonusDice = parseInt(document.getElementById('abilityBonus').value);
    let implantDice = parseInt(document.getElementById('implantBonus').value);
    let difficulty = parseInt(document.getElementById('difficulty').value)
    
    let throwRes = throwWithReplaceDices(3 + bonusDice, 12, implantDice, 20);
    let result = checkSuccess(throwRes, difficulty)
    result = resultString(result)

    textP.innerHTML = 'Результат: ' + throwRes + '. ' + result;
    document.getElementById('resultparent').appendChild(textP);
}

function resultString(res){
    switch(res){
        case 0:
            return 'Критический провал!';
        
        case 1:
            return 'Провал!'
        
        case 2:
            return 'Успех!'
        
        default:
            return 'ОШИБКА!'
    }
}

function throwDice(dice){
    return getRandomInt(1, dice)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function throwWithReplaceDices(numDiceToThrow, dice, numReplaceDice, replaceDice){
    let arr = Array.from({length: numDiceToThrow - numReplaceDice}, () => throwDice(dice));

    for(i = 0; i < numReplaceDice; i++){
        arr.push(throwDice(replaceDice))
    }

    return arr
}

function checkSuccess(arrThrow, difficulty){
    let success = 0, successCount = 0;
    arrThrow.forEach(element => {
        if(element >= difficulty){
            successCount++;
            success = 1;
        }
    });
    success = success == 0? 0 : successCount >= 3? 2 : 1;
    return success;
}

a = throwWithReplaceDices(5, 12, 2, 20);
console.log(a);
console.log(checkSuccess(a, 10));