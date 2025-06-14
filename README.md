# week 07 - MongoDB Aggregation Framework - Pilates Analysis

## Description
To master MongoDB’s **Aggregation Framework** using `$lookup`, `$group`, and other operators for performing **Pilates Class**. This project includes MongoDB Compass pipeline design, Node.js API integration, Postman testing, and a dashboard.

## Prerequisites

- Aggregation Pipeline: : $match, $lookup, $unwind, $group, $project
- Multi-Collection Joins: Combine user and ride data using $lookup
- Compass Visualization: Build and debug pipelines visually
- Node.js Integration: Export pipelines from Compass to code
- MongoDB (running locally on default port 27017)
- Postman - [Download here](https://www.postman.com/downloads/) for API testing

## Install Dependecies

1. Clone the repository:
```bash
git clone [your-repo-url]
cd [repo-name]
Install dependencies:
```

```bash
npm install 
``` 

2. Run the index.js
bash
```
node index.js
```

3. Start MongoDB
Ensuring MongoDB is running locally on mongodb://localhost:27017

## 1. Data Preparation 
multiple sample document being inserted by using the script or manually inserted into the ...... collections 

## 2. Pipeline Design in MongoDB Compass
- The aggregation pipeline was built in MongoDB Compass using $lookup, $unwind, $group, and $project to view the bookings, classes and member

## 3. Node.js Implementation 
- The API endpoint was created by implementing GET /analytics/members endpoint based on the aggregation pipeline designed earlier in MongoDB Compass.

## 4. Postman Testing
- Postman was tested by creating a GET request to http://localhost:3000/analytics/members

## 5. Analytic Dashboard
- All the Postman APIs was exported including members analytic and a professional dashboard was created with charts, figures, and tables to illustrate the data.

## Troubleshooting

### Common Issues
1. Aggregation Returns Empty Array
- The (bookings) collection might be empty or (user _id) doesn't match (bookings.userId).
- Ensured the sample data was correctly inserted with matching (userId) references.
- The $lookup and $unwind stages was double-checked in MongoDB Compass.

2. Postman Returns 500 Internal Server Error
- The terminal/console logs was checked for the specific error.
- The route GET /analytics/members was ensured correctly defined.
- The collections and fields were ensured exist (bookings, classes, member, etc).

3. GET Request Works, But Data Looks Wrong
- GET Request Works, But Data Looks Wrong
- Possible Causes:
- Missing or incorrect values in fare or distance fields.
- Typos in aggregation stage field names.
- $unwind may be skipping users without rides — handle optional $unwind with preserveNullAndEmptyArrays.

4. MongoDB connection
- Ensure MongoDB is running:
```bash
mongod
Check connection URL in index.js (default: mongodb://localhost:27017)
```
```bash
## Project Structure
├── data/
│ └── sample_bookings_and_classes.js # Sample insert scripts
│
├── routes/
│ └── analytics.js # GET /analytics/members endpoint
│
├── app.js # Express app entry point
├── README.md 
└── package.json
```

 ## License
This project is for educational purposes only
