const express = require('express')
// import bodyParser from 'body-parser';
const bodyParser = require('body-parser')
const name = ["Aarav", "Aryan", "Aditi", "Aishwarya", "Amit", "Amrita", "Ananya", "Anika", "Anjali", "Arjun", "Arnav", "Aryan", "Ashok", "Bharat", "Bindiya", "Chaitanya", "Chandni", "Chetan", "Darshan", "Devanshi", "Dhruv", "Diya", "Ganesh", "Garima", "Gaurav", "Gayatri", "Gitanjali", "Hari", "Hema", "Isha", "Ishan", "Jasmine", "Jayant", "Jhanvi", "Jigar", "Karan", "Kavita", "Khushi", "Kiran", "Lakshmi", "Madhuri", "Mahi", "Manav", "Meera", "Megha", "Mohit", "Mukesh", "Naveen", "Neha", "Nidhi", "Pallavi", "Parineeti", "Parth", "Pooja", "Pradeep", "Prakash", "Priya", "Rajesh", "Rajni", "Rakesh", "Raman", "Ravi", "Rekha", "Rhea", "Rohit", "Roshni", "Rupal", "Sachin", "Sakshi", "Samar", "Sarika", "Shivani", "Shivansh", "Shruti", "Shweta", "Simran", "Sohan", "Sourav", "Sridhar", "Srinivas", "Sudhir", "Sukanta", "Supriya", "Suresh", "Swathi", "Tanuja", "Tanya", "Tarun", "Tripti", "Uma", "Urvashi", "Vasudev", "Vidya", "Vikrant", "Vinay", "Vineet", "Vishal", "Vivek", "Yogesh", "Zoya"];


const course = ["Biomedical Engineering", "Computational Linguistics", "Information Technology", "Big Data", "Construction Management", "Electrical Engineering", "Drone Technology", "Data Analytics and Business Intelligence", "Environmental Management.", "Library Studies.", "International Development.", "International relations."]
const gender = ['M', 'F']


// const connectDB = require('./conn/connection')
const conn = require('./conn/connectDB');
const { off } = require('./conn/connectDB');
const e = require('express');

PORT = 5005;

// conn();

const app = express();

// app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set("view engine", "ejs")


app.get('/all', (req, res) => {
    conn.query(`select * from Espark.Student_Express`, (err, result1) => {
        if (err) return err.message
        else {
            res.render('search', { data: result1 ,currStr:''})
        }
    })
})



app.post('/all', (req, res) => {
    let name = "";
    let arr = ['^', '$', '&'];
    let currStr = req.body.search_query;

    console.log(currStr);

    var count = 0;
    for (let i = 0; i < currStr.length; i++) {
        if (arr.includes(currStr[i])) {
            name += " " + currStr[i];
            count++;
        }
        else {
            name += currStr[i];
        }
    }




    let currname = name.split(" ")

    let queryStr = ``;
    currname.forEach(name => {
        if (name[0] == '^') {
            count--;

            if(count)
            queryStr += `First_Name LIKE '${name.slice(1)}%' AND `
            else {
                queryStr += `First_Name LIKE '${name.slice(1)}%'`
            }
        }
      


        if (name[0] == '$') {
            count--
            if(count){
                queryStr += `Last_Name Like '${name.slice(1)}%' AND `

            }
            else {
                queryStr += `Last_Name Like '${name.slice(1)}%' `
            }
            
        }
       
        if (name[0] == '&') {
            
            count--;
            if(count){
                queryStr += `CITY Like '${name.slice(1)}%' AND `
            }
            else {
                queryStr += `CITY Like '${name.slice(1)}%'`
            }

        }
       

    })
    console.log(currStr);

    conn.query(`select * from Espark.Student_Express where ${queryStr}`, (err, result) => {
        if (err) return err.message
        else {
            res.render('search', { data: result, currStr })
        }
    })



})



app.listen(PORT, console.log(`Server start on port ${PORT}`));