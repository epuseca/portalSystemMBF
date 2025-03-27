require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const dbState = [
  { value: 0, label: "Disconnected" },
  { value: 1, label: "Connected" },
  { value: 2, label: "Connecting" },
  { value: 3, label: "Disconnecting" }
];

// docker
const connection = async () => {
  try {
    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    const DB_HOST = process.env.NODE_ENV === "development"
      ? "mongodb://root:123456@localhost:27018/?authSource=admin"  // Sử dụng tên container thay vì localhost
      : "mongodb://root:123456@mongodb:27017/?authSource=admin";

    await mongoose.connect(DB_HOST, options);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value === state).label, "to database");
  } catch (error) {
    console.log("??? Error connecting to DB", error);
  }
};

// // No docker
// const connection = async () => {
//   try {
//     const options = {
//       user: process.env.DB_USER,
//       pass: process.env.DB_PASSWORD,
//       dbName: process.env.DB_NAME
//     }
//     await mongoose.connect(process.env.DB_HOST, options);
//     const state = Number(mongoose.connection.readyState);
//     console.log(dbState.find(f => f.value === state).label, "to database");
//   } catch (error) {
//     console.log("??? Error connection DB", error)
//   }
// }



module.exports = connection