Introduction

In this assignment, you will write an Express app that provides GET endpoints to perform CRUD operations against MongoDB. You will program the assignment using Mongoose. You will also add a middleware function to maintain and print certain statistics.

**Note**: To complete this assignment, you need to know material covered in Modules 6 and 7 (in addition to material covered in earlier modules).

Learning Outcomes

- How to write asynchronous JavaScript programs using promises? (Module 6, CLO 2)
- How to write asynchronous JavaScript programs using the await and async keywords? (Module 6, CLO 3)
- How is the concept of modules supported in JavaScript? (Module 6, CLO 4)
- What is Express middleware and what are its uses? (Module 6, CLO 5)
- What are database management systems (DBMSs)? (Module 7, MLO 1)
- What is MongoDB? (Module 7, MLO 2)
- What is Mongoose? (Module 7, MLO 4)
- How can we perform CRUD operations using Mongoose? (Module 7, MLO 5)

Instructions

Write a web app that models a user as described below and provides the operations listed below.

User

Here are the properties of a User. 

|**Property**|**Data Type**|**Required?**|
| :- | :- | :- |
|name|String|Yes|
|age|Number|Yes|
|email|String|Yes|
|phoneNumber|Number|No|
CRUD Operations

- These will be supported via GET requests.
- The request data will be provided as query parameters.
- The URL’s must be /create, /retrieve, /update and /delete.

Create

A user will be created by sending a GET request for the path /create.

Request Parameters for Create

Here are the query parameters for the request:

|**Name**|**Always present?**|**Notes**|
| :- | :- | :- |
|name|Yes||
|age|Yes||
|email|Yes||
|phoneNumber|No|phoneNumber will only have the numeric characters 0 through 9, and will not contain any spaces, hyphens or non-numeric characters.|
Response Body for Create

The response body will be JSON object for the document created in MongoDB.

Example

Request:

http://localhost:3000/create?name=Cher Gray&age=27&email=cher@example.com&phoneNumber=8114482

Note: URLs containing certain special characters such as spaces need to be encoded. This is called percent-encoding or URL encoding and was discussed in [Module 3 Exploration - HTML Forms](https://canvas.oregonstate.edu/courses/1822080/pages/exploration-html-forms "Exploration — HTML Forms"). Most browsers do the encoding for you, so you are able to type a URL with spaces in it and the browser does the necessary encoding when sending the HTTP request. But be aware of this in case you use a tool for sending HTTP request that does not perform percent-encoding.

Response:

Note that the property "\_v" is a version number added by Mongoose. It is OK to include this property in the response, but this is your choice and you can also decide to exclude it from the response.

{  
`  `"phoneNumber": 8114482,  
`  `"\_id": "60e435e0e2d67f620c534a84",  
`  `"name": "Cher Gray",  
`  `"age": 27,  
`  `"email": "cher@example.com",  
`   `"\_\_v": 0 
}

Retrieve

Users will be retrieved by sending a GET request for the path /retrieve.

Request Parameters for Retrieve

Here are the query parameters for the request:

|**Name**|**Always present?**|
| :- | :- |
|name|No|
|age|No|
|email|No|
|phoneNumber|No|
|\_id|No|
A retrieve request can contain zero or one query parameters.

- If the request has no query parameters, then all the documents should be returned.
- If the request has one query parameter, then only the documents matching that query parameter should be returned.

Response Body for Retrieve

An array of JSON objects corresponding to the documents matching the query parameters.

Example

Request:

http://localhost:3000/retrieve?\_id=60e435e0e2d67f620c534a84

Response:

[  
`  `{  
`   `"phoneNumber": 8114482,
`   `"\_id": "60e435e0e2d67f620c534a84",  
`   `"name": "Cher Gray",  
`   `"age": 27,
`   `"email": "cher@example.com",  
`   `"\_\_v": 0  
`  `} 
]

Update

A user will be updated by sending a GET request for the path /update.

Request Parameters for Update

Here are the query parameters for the request:

|**Name**|**Always present?**|
| :- | :- |
|name|No|
|age|No|
|email|No|
|phoneNumber|No|
|\_id|Yes|
- Every request for /update will always contain \_id as a request parameter.
- In addition to \_id, a request will contain at least one other query parameter. However, a request may contain more than one query parameter.
  - For example, a request may contain the query parameters \_id, name, phoneNumber.
- The required behavior is that if any property is not specified in the query parameters, then the value of that property must not be updated.
  - For example, if a request contains the query parameters \_id, age, phoneNumber, the app must
    - Find the document with this specified value of \_id,
    - Set the age property of the document to the value in the query parameter,
    - Set the phoneNumber to the value in the query parameter, regardless of whether or not the document previously had a value for this property.
    - Leave name and email properties of the document unmodified.

Response Body for Update

On success: An JSON object with the count of documents that have been updated. This value will be 1 whenever the update is successful.

{  "updateCount": 1 }

On failure: If no document exists with the specified value of \_id, the response must contain the following JSON message:

{ "Error" : "Not found"}

Example

Request:

http://localhost:3000/update?\_id=60e435e0e2d67f620c534a84&age=28&phoneNumber=12193456

Response:

{  "updateCount": 1 }

Delete

A user will be deleted by sending a GET request for the path /delete.

Here are the query parameters for the request:

|**Name**|**Always present?**|
| :- | :- |
|name|No|
|age|No|
|email|No|
|phoneNumber|No|
|\_id|No|
A delete request will have exactly one of the above query parameters.

For example:

- If the request has the \_id query parameter and there is a document with this \_id value, it should be deleted.
- If the request has the name query parameter, you should delete all the documents in which the value of the name property is exactly the same as the value in the query parameter.
- Similarly, if the request has the query parameter email, age or phoneNumber, then all documents matching the value of email, age or phoneNumber must be removed.

Response Body for Delete

An JSON object specifying how many rows were deleted as shown below:

{ "numDeleted" : 2}

Example

Request:

http://localhost:3000/delete?age=27

Response:

{  "deleteCount": 3 }

Middleware to Print Statistics

Write a middleware function that maintains statistics about retrieve requests and prints these statistics to the console.

- This middleware function must maintain a count of retrieve requests received from the time the server was started.
  - In other words, keep the statistics in memory. You don't need to persist them to the database.
- The following statistics need to be maintained (you can choose to maintain any 2 of these 3 statistics, because the 3rd value can be computed from the other 2)
  - Total retrieve requests
  - Retrieve requests with 0 query parameters
  - Retrieve requests with 1 query parameter
- The statistics must be printed to the console after the 10th retrieve request and then after every 10 retrieve requests
  - i.e., after 10 retrieve requests are received, then after a total of 20 retrieve requests, then after 30, and so on.
- The maintenance and printing of the statistics must be done solely by this middleware function, and not by any of the app.METHOD route handlers.

Example: Printing Statistics

Total retrieve requests: 20

Retrieve requests with 0 query parameters: 12

Retrieve requests with 1 query parameter: 8

Separate Model Code from Controller Code

- Your model code must be separate from your controller code.
- Your model code can be in as many files as you want.
- Similarly, your controller code can be in as many files as you want.
- However, the model code and the controller code must be in separate files.

Hints

- To delete multiple users that match a filter, you can use the method [deleteMany (Links to an external site.)](https://mongoosejs.com/docs/api.html#model_Model.deleteMany).
- When you are updating a user, the request may not specify values for all the properties. However, for this case it is required that the value of the properties that are not in the request, must remain unchanged. You can handle this as follows:
  - First query to get the document for that user from the database.
  - For any property for which the request does not contain a query parameter, use the current value of the property in the document from the database.
  - When calling the replaceOne method, set the value of every property, using either the value from the query parameter or from the document from the database.

What to Turn In?

**Note (added July 23, 2021)** If your assignment uses an instance of MongoDB that is not on the localhost or it uses a port other than 27017, then add a comment with your Canvas submission specifying the MongoDB URL you are using, along with the name(s) of the file(s) in your submitted code in which the MongoDB URL is being used.

- Submit a single zip file with your code.
- This zip file must be named youronid\_assignment3.zip where youronid should be replaced by your own ONID.
  - E.g., if chaudhrn was submitting the assignment, the file must be named chaudhrn\_assignment3.zip.
  - When you resubmit a file in Canvas, Canvas can attach a suffix to the file, e.g., the file name may become chaudhrn\_assignment3-1.zip. Don’t worry about this name change as no points will be deducted because of this.
- In the zip file, you must include all the code for your application, except the node\_modules directory.
- The grader will unzip your file, go to the root directory, run npm install and then run npm start to start your application and test it.

