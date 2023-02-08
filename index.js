const express = require('express')
// import bodyParser from 'body-parser';
const bodyParser = require('body-parser')
const name = ["Aarav", "Aryan", "Aditi", "Aishwarya", "Amit", "Amrita", "Ananya", "Anika", "Anjali", "Arjun", "Arnav", "Aryan", "Ashok", "Bharat", "Bindiya", "Chaitanya", "Chandni", "Chetan", "Darshan", "Devanshi", "Dhruv", "Diya", "Ganesh", "Garima", "Gaurav", "Gayatri", "Gitanjali", "Hari", "Hema", "Isha", "Ishan", "Jasmine", "Jayant", "Jhanvi", "Jigar", "Karan", "Kavita", "Khushi", "Kiran", "Lakshmi", "Madhuri", "Mahi", "Manav", "Meera", "Megha", "Mohit", "Mukesh", "Naveen", "Neha", "Nidhi", "Pallavi", "Parineeti", "Parth", "Pooja", "Pradeep", "Prakash", "Priya", "Rajesh", "Rajni", "Rakesh", "Raman", "Ravi", "Rekha", "Rhea", "Rohit", "Roshni", "Rupal", "Sachin", "Sakshi", "Samar", "Sarika", "Shivani", "Shivansh", "Shruti", "Shweta", "Simran", "Sohan", "Sourav", "Sridhar", "Srinivas", "Sudhir", "Sukanta", "Supriya", "Suresh", "Swathi", "Tanuja", "Tanya", "Tarun", "Tripti", "Uma", "Urvashi", "Vasudev", "Vidya", "Vikrant", "Vinay", "Vineet", "Vishal", "Vivek", "Yogesh", "Zoya"];


const course  = ["Biomedical Engineering","Computational Linguistics","Information Technology","Big Data","Construction Management" ,"Electrical Engineering","Drone Technology","Data Analytics and Business Intelligence","Environmental Management.","Library Studies.","International Development.","International relations."]
const gender = ['M','F']


// const connectDB = require('./conn/connection')
const conn = require('./conn/connectDB');

PORT = 5000;

// conn();

const app = express();

// app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set("view engine", "ejs")



async function getallEmployee() {
    app.get('/get-data', (req, res) => {

        conn.query("SELECT * FROM Espark.Student Limit 10", (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.render("data", { data: result })

            }
        })

    })

}
getallEmployee();
app.get("/get-data/:id", (req, res) => {
    console.log(req.params.id);
    const id = req.params.id
    var query = `SELECT * FROM Espark.Student WHERE id = ${id}`;
    conn.query(query, (err, ans) => {
        if (err) return console.log("None");
        console.log(ans);
        res.render("data", { data: ans });

    })
})




app.post('/addemployee', (req, res) => {
    console.log(req.body);
    const { name, course, gender } = req.body
    conn.query(`INSERT INTO Espark.Student (name,course,gender) values ('${name}','${course}','${gender}')`, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.send("Data has been submitted to database")
        }
    })

})

app.get('/insert-data', (req, res) => {
    res.render("insert")
})




function updateEmployee() {
    app.post(`/updateEmployee/:id`, (req, res) => {
        let idData = req.params.id
        console.log(req.body);
        const { id, name } = req.body

        conn.query(`UPDATE Espark.Student SET name='${name}' WHERE id = ${idData}`, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.send("Data has been Updated to database")
            }
        })

    })

}
updateEmployee();


app.get("/update-form/:id", (req, res) => {
    console.log(req.params.id);
    const id = req.params.id
    var query = `SELECT * FROM Espark.Student WHERE id = ${id}`;
    conn.query(query, (err, ans) => {
        if (err) return console.log("None");
        console.log(ans);
        res.render("update",{data:ans});

    })
})



function deleteEmployee() {
    app.delete('/deleteEmployee', (req, res) => {


        const { id } = req.body

        conn.query(`DELETE from Espark.Student WHERE id = ${id}`, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.status(200).json({
                    status: 'Deleted successfully',

                })
            }
        })

    })

}
deleteEmployee();

async function insertAll(){
    app.get('/addemployee-many',(req,res)=>{

        for(let jigar = 0 ; jigar < 1500 ; jigar++){
    
            let randomName = Math.floor(Math.random() * name.length);
            let courseName = Math.floor(Math.random() * course.length);
            let genderI = Math.floor(Math.random() * gender.length);
    
            conn.query(`INSERT INTO Espark.Student (name,course,gender) values ('${name[randomName]}','${course[courseName]}','${gender[genderI]}')`,(err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(result);
                }
           
            })
        }
    
    })
}

//insertAll()

app.get('/get-things/:id', (req, res) => {

    conn.query("SELECT * FROM Espark.Student Limit 20", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("things", { data: result })
        }
    })

})

app.listen(PORT, console.log(`Server start on port ${PORT}`));