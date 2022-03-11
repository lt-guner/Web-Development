// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database customer_db in the MongoDB server running locally on port 27017
mongoose.connect(
    'mongodb://localhost:27017/customer_db',
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

// Tell mongoose to create indexes, which help with faster querying
mongoose.set('useCreateIndex', true);

//Define the schema for customer
const customerSchema = mongoose.Schema({
    name: { type: String, required: true,  },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: false}
});

//Compile the model from the schema
const Customer = mongoose.model("Customer", customerSchema);

/**
 * Create a customer
 * @param {String} name 
 * @param {Number} age 
 * @param {String} email
 * @param {Number} phoneNumber
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createCustomer = async (name, age, email, phoneNumber) => {
    // Call the constructor to create an instance of the model class customer
    const customer = new Customer({ name: name, age: age, email: email, phoneNumber: phoneNumber });
    // Call save to persist this object as a document in MongoDB
    return customer.save();
}

/**
 * Retrieves a customer based on a filter. If there is no filter, then everything is retrieved. If one query parameter is passed, then only documents with that parameter are pulled, etc.
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
const findCustomer = async (filter, projection, limit) => {
    const query = Customer.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Replace the name, age, email, and phoneNumber properties of the customer with the id value provided.
 * @param {String} _id 
 * @param {String} name 
 * @param {Number} age 
 * @param {String} email
 * @param {Number} phoneNumber
 * @returns A promise. Resolves to the number of documents modified.
 */
const replaceCustomer = async (_id, name, age, email, phoneNumber) => {
    let result = 0;
    
    result = await Customer.findById(_id)
    if (result === null) {
        return error
    }

    // it will update only parameters that are passed and not undefined, as well as valid _id needs to be passed
    if (name !== undefined){
        result = await Customer.updateMany({ _id: _id },
            {name: name});
    }
    if (age !== undefined){
        result = await Customer.updateMany({ _id: _id },
            {age: age});
    }
    if (email !== undefined){
        result = await Customer.updateMany({ _id: _id },
            {email: email});
    }  
    if (phoneNumber !== undefined){
        result = await Customer.updateMany({ _id: _id },
            {phoneNumber: phoneNumber});
    } 
    return result.nModified;
}

/**
 * deletes the object based on parameters passed in the query
 * @param {String} _id 
 * @param {String} name
 * @param {Number} age
 * @param {String} email
 * @param {Number} phoneNumber
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteCustomer = async (_id, name, age, email, phoneNumber) => {
    let result = 0;
    
    // it will delete record based on what parameter is passed
    if (_id !== undefined){
        result = await Customer.deleteMany({ _id: _id});
    }
    else if (name !== undefined){
        result = await Customer.deleteMany({name: name})
    }
    else if (age !== undefined){
        result = await Customer.deleteMany({age: age})
    }
    else if (email !== undefined){
        result = await Customer.deleteMany({email: email})
    }
    else if (phoneNumber !== undefined){
        result = await Customer.deleteMany({phoneNumber: phoneNumber})
    }

    // return count of deletes
    return result.deletedCount;
}

// export the functions
export { createCustomer, findCustomer, replaceCustomer, deleteCustomer };