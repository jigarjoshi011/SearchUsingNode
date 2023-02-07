
// var mysql = require('mysql2');

// const connectDB = async () => {
//     try {
//         var conn = mysql.createConnection({
//             host: "localhost",
//             user: "root",
//             password: "root",
//             database:"Espark",
//             insecureAuth : true,
//             port:3306
//         })


//         conn.connect((err)=>{
//             {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else{
//                     console.log(`Database connected`);
//                 }
//             }

//         })
//     } catch (error) {
//       console.error(`Error: ${error.message}`);
//       process.exit();
//     }
//   };

//   module.exports = connectDB;


// module.exports ={conn}


const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Espark",
});

conn.connect((err) => {
    {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Database connected`);
        }
    }

})

module.exports = conn;