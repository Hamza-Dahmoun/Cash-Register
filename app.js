//*************************************** Cash Register
/*
 Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price),
 payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order,
as the value of the change key. 
 */

var price, cash, cid = [];
function checkCashRegister() {
    var change;
    cid = [];
    // Here is your change, ma'am.
    getEntries();
    //How To?
    //0- change = cash - price
    //1- If sum of all values in 'cid' is less than 'change' then return {status: "INSUFFICIENT_FUNDS", change: []}
    //2- If there is no 'cid' combination equal to 'change' then return {status: "INSUFFICIENT_FUNDS", change: []}
    //3- If sum of all 'cid' is equal to 'change' then return {status: "CLOSED", change: [cid]} 
    //4- else, return {status: "OPEN", change: ['cid' combination equal to 'change']}
    let cidsum = cidSum(cid);
    console.log(cid);
    if (cidsum < change) {
        //1-
        console.log({ status: "INSUFFICIENT_FUNDS", change: [] });
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    else if (cidsum == change) {
        //3-
        console.log({ status: "CLOSED", change: removeZero_fromCid(cid) });
        return { status: "CLOSED", change: removeZero_fromCid(cid) }
    }
    else{
        let result = getCombination(cash-price, cid)
        console.log(result);
        return result;
    }
    //return change;

}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]); 

function getEntries() {
    //get price and parse it
    price = parseFloat(document.getElementById("priceInput").value);
    //get cash and parse it
    cash = parseFloat(document.getElementById("cashInput").value);

    //get an array of input tags located in the table
    let tableInputs = document.querySelectorAll("table input");
    //for each input tag we'll take its id and make it upperCase and its value, and push id & value into cid array
    for (let i = 0; i < tableInputs.length; i++) {
        //'id' we'll be uppsercasen and for id='one_hundred' we'll replace underscore by white space
        let currencyUnit = tableInputs[i].id.toString().toUpperCase().replace("_", " ");
        //get the value and parse it, if there is no data then we'll consider it 0
        let value = parseFloat(tableInputs[i].value);
        //console.log(currencyUnit);
        //console.log(value);
        cid.push([currencyUnit, value]);
    }
    //cid Example:
    /*
    [[ "PENNY", 0.01 ],
    [ "NICKEL", 0.05 ],
    [ "DIME", 0.1 ],
    [ "QUARTER", 4.25 ],
    [ "DOLLAR", 5 ],
    [ "FIVE", 35 ],
    [ "TEN", 70 ],
    [ "TWENTY", 60 ],
    [ "ONE HUNDRED", 300 ]]
    */
}

function cidSum(cid) {
    //this function returns the sum of available amount of all currency units in 'cid' array

    //lets not modify our 'cid' array, lets make a copy of it to work on it
    let copy = [...cid];
    let sum = 0;
    //lets calculate the sum of all elements in 'copy' array
    copy.map(elt => sum = sum + elt[1]);
    return sum;
}

function removeZero_fromCid(cid) {
    //this function takes 'cid' array and returns a copy of it but without items that have 'value' == 0
    let copy = [...cid];
    return copy.filter(elt => elt[1] > 0);
}

function getCombination(change, cid){
    //this function takes a cid array and check if there is a combination of currencies equal to 'change' or not, 
    //return the combination if it exists,
    //return false if the combination doesn't exist

    //How To?

    //Example1: change = 7, 
    //change = change % 100 = 7
    //change = change % 20 = 7
    //change = change % 10 = 10
    //change = change % 5 = 2
    //change = change % 1 = 0 
    //So the last modulo result is zero, Return combination [["FIVE", 5],["DOLLAR", 2]]

    //Example2: change = 23.58
    //change = change % 100 = 23.58
    //change = change % 20 = 3.58
    //change = change % 10 = 3.58
    //change = change % 5 = 3.58
    //change = change % 1 = 0.58
    //change = change % 0.25 = 0.08
    //change = change % 0.1 = 0.08
    //change = change % 0.05 = 0.03
    //change = change % 0.01 = 0
    //So the last modulo result is zero, Return combination [["TWENTY", 20],["DOLLAR", 3], ["QUARTER", 0.5], ["NICKEL", 0.05], ["PENNY", 0.03]]

    //Example3: change = 13.6001
    //change = change % 100 = 13.6001
    //change = change % 20 = 13.6001
    //change = change % 10 = 3.6001
    //change = change % 5 = 3.6001
    //change = change % 1 = 0.6001
    //change = change % 0.25 = 0.1001
    //change = change % 0.1 = 0.0001
    //change = change % 0.05 = 0.0001
    //change = change % 0.01 = 0.0001
    //So the last modulo result is not zero, Return false


    let combination = [];//Example: [["FIVE", 5],["DOLLAR", 2]]
    let currencyValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    for(let i=cid.length-1; i>=0; i--){
        if(change != 0){
            if(change == change % currencyValues[i]){
                //so the modulo is equal to the origin 'change', it means change is less than currencyValues[i]
                //lets do nothing, and just move to the next 'currency'
            }        
            else{
                //so the modulo is different than the origin 'change'
                let currency = cid[i][0];
                let amountNeededFromCurrency = Math.floor(change/currencyValues[i])*currencyValues[i];
                //now lets check if 'cid' has enough amount from this currency
                if(amountNeededFromCurrency > cid[i][1]){
                    //we see that what we need from this 'currency' cant be done, bcuz this currency doesn't have enough money
                    //so lets just take the whole amount of this 'currency'
                    amountNeededFromCurrency = cid[i][1];
                    change = Math.round((change - amountNeededFromCurrency)*100)/100 ;
                    combination.push([currency, amountNeededFromCurrency]);
                }
                else{
                    //we don't have enough money from this currency, so just move forward to the next currency
                    //so we see that this 'currency' has enough money to reply to our need, lets take the needed amount
                    //amountNeededFromCurrency = cid[i][1];
                    change = Math.round((change - amountNeededFromCurrency)*100)/100;
                    combination.push([currency, amountNeededFromCurrency]);
                }
            }
        }
        /*else{
            //so the 'change' is fully paid
            return {status: "OPEN", change: combination};
        }        */
    }
    if(change==0){
        if(cidNotEmpty(cid, combination)){
            //so we still have more cash in the 'cid'
            return {status: "OPEN", change: combination};
        }
        else{
            //so we don't have more chas in the 'cid'
            return {status: "CLOSED", change: combination};
        }        
    }
    else{
        //so 'change' is not fully paid
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }        
}

function cidNotEmpty(cid, comb){
    //'cid' is considered empty if the sum of money in there equal the sum of money in 'combination'
    if(cid.length == comb.length){
     for(let i=0; i<cid.length; i++){
         if(cid[i][1] == comb[i][1]){
             //do nothing, let check the next currency
         }
         else{
             //so this currency seems to have more in 'cid' than in 'comb'.. lets return true
          return true;   
         }
     }
        return false;
    }
}
