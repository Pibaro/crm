// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// app.use(bodyParser.json());
// const path = require('path');
// const db = require('./db');
//
// app.get('/', (req, res)=>{
//   res.sendFile('input.html', { root: 'C:/Users/barak/Desktop/crm' });
// })
//
// app.get('/getProspects',(req,res)=> {
//   db.getDB().collection(prospects).find({}).toArray((err,documents)=>{
//     if(err)
//       console.log(err);
//     else {
//       console.log(documents);
//       res.json(documents);
//     }
//   });
// });
//
// db.connect ((err) => {
//   if (err) {
//     console.log("unable to connect to database");
//     process.exit1;
//   } else {
//     app.listen (3000,() => {
//       console.log("connection successful. App listening on port 3000");
//     });
//   }
// })
//
//
// //
// // const collection =
// // collection.insertOne(
// //   {
// //     firstname: "Roger",
// //     lastname: "Baseme",
// //     email: "baraka@pilipili.io",
// //     phone: "2330506378473",
// //     organization: "MEST Africa",
// //     address: "20 Goma, DR Congo",
// //     interest: 7,
// //     purchases: 19,
// //     notes: "very interested"
// //
// // })
