const express = require('express')

// const connectDB = require('./conn/connection')
const conn = require('./conn/connectDB')
PORT = 5000;

// conn();

const app = express();
app.use(express.json())


// app.get("/", (req, res) => {
//     res.send("API is Running.......");
//   });



async function getallEmployee(){
    app.get('/', (req,res)=>{
        
      conn.query("SELECT * FROM Espark.Student ",(err , result )=>{
            if(err){
                console.log(err);
            }
            else{
               res.status(200).json({
                status: 'success',
                length: result?.length,
                result: result
               })
            }
        })
       
    })

}
getallEmployee();



function insertEmployee(){
    app.post('/addemployee',(req,res)=>{


        const { id , name , course , gender} = req.body
       
        conn.query(`INSERT INTO Espark.Student (id,name,course,gender) values (${id},'${name}','${course}','${gender}')`,(err , result)=>{
            if(err){
                    console.log(err);
            }
            else{
                res.status(200).json({
                    status: 'success',
                   
                })
            }
        })

    })

}


  
insertEmployee();




app.listen(PORT, console.log(`Server start on port ${PORT}`));