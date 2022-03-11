import * as customers from './customer_model.mjs';
import express from 'express';
const app = express();

const PORT = 3000;

/*
an anonymous middleware function that records the count of retrieves and logs it to console for every retrieve pass
it will log total retrieves, retrieves with no parameters, and retrieves with parameters
*/

// three variables to track all retrieves, retrieves with no params, and retrieves with params
let totalReceives = 0;
let noParameterRecieves = 0;
let parameterReceives = 0;

// the anonymous middleware
app.use("/retrieve", (req, res, next) =>{

    // incremenet this count everytime a search is done
    totalReceives += 1;
    
    // check if any of the queries were used and increment parameterReceives, else increment noParamterRecieves
    if (req.query.name !== undefined){
        parameterReceives += 1;
    }
    else if (req.query.age !== undefined){
        parameterReceives += 1;
    }
    else if (req.query.email !== undefined){
        parameterReceives += 1;
    }
    else if (req.query.phoneNumber !== undefined){
        parameterReceives += 1;
    }
    else if (req.query._id !== undefined){
        parameterReceives += 1;
    }
    else{
        noParameterRecieves += 1;
    }

    // print to the console the statistics every ten retrieve calls
    if (totalReceives % 10 === 0){
        console.log(`Total Retrieve Requests: ${totalReceives}`);
        console.log(`Retrieve Requests With No Query Parameter: ${noParameterRecieves}`);
        console.log(`Retrieve Requests With One Query Parameter: ${parameterReceives}`);
    }
    next()
});

/*
  Create a new customer with the name, age, email, and phone number (optional) provided in the query parameters.
  The request uses a get method to retrieve the query parameters and sends a promise. Then is used to send the customer customer
  query back to the user, and catch is used to log errors if the the get fails. It will fail if the required parameters are
  not passed (name, age, and email)
*/
 app.get("/create", (req, res) => {
    customers.createCustomer(req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
        .then(customer => {
            res.send(customer);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

/*
 retrieves a query from the user and sends back a json object with a list of customers based on the query parameters
*/
 app.get("/retrieve", (req, res) => {
    // pulls all query parameters at once and uses what is passed as a filter
    const filter = req.query;
    customers.findCustomer(filter, '', 0)
        .then(customer => {
            res.send(customer);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

/*
 updates the Customer with the parameters that are passed and fails if the id is invalid
 */
 app.get("/update", (req, res) => {
    customers.replaceCustomer(req.query._id, req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
        .then(updateCount => {
            if (updateCount === null){
                res.send({updateCount});
            }
            else{
                res.send({ updateCount: updateCount });
            }
        })
        .catch(error => {
            res.send({ error: 'Not found' });
        });
});

/**
 * Delete the customer based on query parameters passed by the user
 */
 app.get("/delete", (req, res) => {
    //console.log(req.query);
    customers.deleteCustomer(req.query._id, req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
        .then(deletedCount => {
            //console.log(deletedCount);
            res.send({ deletedCount: deletedCount });
        })
        .catch(error => {
            //console.error(error);
            res.send({ error: 'Request failed' });
        });
});


// listener for local host
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});