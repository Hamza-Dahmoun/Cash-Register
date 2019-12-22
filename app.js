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
    // Here is your change, ma'am.
    getEntries();
    //How To?
    //0- change = cash - price
    //1- If sum of all values in 'cid' is less than 'change' then return {status: "INSUFFICIENT_FUNDS", change: []}
    //2- If there is no 'cid' combination equal to 'change' then return {status: "INSUFFICIENT_FUNDS", change: []}
    //3- If sum of al 'cid' is equal to 'change' then return {status: "CLOSED", change: [cid]} 
    //4- else, return {status: "OPEN", change: ['cid' combination equal to 'change']}
    let cidsum = cidSum(cid);
    if (cidsum < change) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    else if(cidsum == change){
        
        return {status: "CLOSED", change: removeZero_fromCid(cid)}
    }
    return change;
    
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

function removeZero_fromCid(cid){
    //this function takes 'cid' array and returns a copy of it but without items that have 'value' == 0
    let copy =[...cid];
    return copy.filter(elt => elt[1]>0);
}
