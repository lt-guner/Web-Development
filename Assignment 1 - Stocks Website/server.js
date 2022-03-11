'use strict';

// NOTE: Don't change the port number
const PORT = 3000;

// The variable stocks has the same value as the variable stocks in the file `stocks.js`
const stocks = require('./stock.js').stocks;

// setup the express server
const express = require("express");
const app = express();

app.use(express.urlencoded({
    extended: true
}));

// Add your code here, use static allows to host static html files under the public directory
app.use(express.static('public'));

// this function finds the highest or lowest price based on the user response
function findStockByPrice(passedprice){
    // variables to be used in the finding the highest or lowest
    let pricecheck = stocks[0].price;
    let stockreturn = "";

    // if this pricechoice was selected as highest, then use a for loop and if statement to iterate through the price of strocks and save the stock that has the lowest price
    if (passedprice === "highest"){
        for (let x = 0; x < stocks.length-1; x++){
            let i = x+1
            if (parseFloat(pricecheck) < parseFloat(stocks[i].price)){
                stockreturn = stocks[parseInt(x)+1]
                pricecheck = stocks[parseInt(x)+1].price
            };
        };   
    };
    // if this pricechoice was selected as lowest, then use a for loop and if statement to iterate through the price of strocks and save the stock that has the lowest price
    if (passedprice === "lowest"){
        for (let x = 0; x < stocks.length-1; x++){
            let i = x+1
            if (parseFloat(pricecheck) > parseFloat(stocks[i].price)){
                stockreturn = stocks[parseInt(x)+1]
                pricecheck = stocks[parseInt(x)+1].price
            };
        };   
    };
    // return the stock with highest or lowest price
    return stockreturn
};

// dynamically generated post page to capture and return the order data of the stock
app.post("/stocks-ordered", (req, res) => {
    const capture_data = (req.body); // save the response request
    console.log(capture_data); // show the captured dare in the console lod
    let total = 0;
    let price = 0;
    let companyname = "";
    // for loop and if statement for search stocks from variable stock to find the ticker that mat
    for (let x = 0; x < stocks.length; x++) {
        if (stocks[x].symbol === capture_data.stockticker) {
            total = parseFloat(stocks[x].price) * parseFloat(capture_data.stockquantity);
            price = parseFloat(stocks[x].price);
            companyname = stocks[x].company;
        };
    };
    // send a response over to the user to let them know the stock they purchased and how much
    res.send(`You purchased ${capture_data.stockquantity} shares of ${companyname} at $${price} per share for a total of $${total}`);
});

// this sets a post method to generate a dynamic page to let us know the highest or lowest stock price
app.post("/stocks-result", (req, res) => {
    const capture_data = (req.body); // save the response request, sent in body not as query
    const result = findStockByPrice(capture_data.pricechoice)  // find the result based on highest or lowest entered in the response
    console.log(capture_data) // show the response in the console log
    res.send(result); // return the stock 
});

// lets us know that the server is now listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});