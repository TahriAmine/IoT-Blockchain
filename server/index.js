
const express = require('express')
const app = express()
const bodyParser = require('body-parser') 

const mysql = require('mysql')
const cors =  require('cors')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud_db',
    multipleStatements: true
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/api/getUser/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    const sql='select * from users where id = ?';
    db.query(sql,id,(err,result)=>{
        if(err) console.log(err)
        console.log(result)
        res.send(result)
    })
})
app.get('/api/getU',(req,res)=>{
    sql='select * from users where email = ? and password = ?'
    db.query(sql,[req.query.email, req.query.password],(err,result)=>{
        if(err) console.log(err)
        res.send(result)
    })
})

app.get('/api/getDataIoT',(req,res)=>{
   // sql='select * from `data-iot`'
    sql = 'SELECT avg (ROUND(air, 2)) as AVGA , max (air) MAXA ,min(air) as MINA FROM `data-iot`; SELECT avg (ROUND(humidite, 2)) as AVGH , max (humidite) MAXH ,min(humidite) as MINH FROM `data-iot` ; SELECT avg (ROUND(temperature, 2)) as AVGT, max(temperature) as MAXT,min(temperature)as MINT FROM `data-iot`;'     
    db.query(sql,(err,result)=>{
        if(err) console.log(err)
        res.send(result)
    })
})

app.get('/api/getDataIoT2',(req,res)=>{
     sql = 'SELECT avg (air) as AVGA , max (air) MAXA ,min(air) as MINA FROM `data-iot` ;'+
           'SELECT avg (humidite) as AVGH , max (humidite) MAXH ,min(humidite) as MINH FROM `data-iot` ;'+
           'SELECT avg (temperature) as AVGT, max(temperature) as MAXT,min(temperature)as MINT FROM `data-iot`;'     
     db.query(sql,(err,result)=>{
         if(err) console.log(err)
         res.send(result)
     })
 })

app.get('/api/getData',(req,res)=>{
   //sql ="DELETE FROM `data-iot` WHERE humidite < 10;"
     sql='select temperature from `data-iot` limit 80 ;'+
         'select humidite from `data-iot` limit 80 ;'+
         'select air from `data-iot` limit 80;'
     db.query(sql,(err,result)=>{
         if(err) console.log(err)
         res.send(result)
     })
 })
 
app.get('/api/getData2',(req,res)=>{
   
      sql='select temperature from `data-iot` limit 80,80 ;'+
          'select humidite from `data-iot` limit 80,80 ;'+
          'select air from `data-iot` limit 80,80;'
      db.query(sql,(err,result)=>{
          if(err) console.log(err)
          res.send(result)
      })
  })
  
  

app.get('/api/get',(req,res)=>{
    //sql='select * from users'
    sql='select id,first_name,last_name,email,password,tel,date from users;'
    db.query(sql,(err,result)=>{
        if(err) console.log(err)
        res.send(result)
       
    })
})

app.put("/api/editUser/",(req,res)=>{
    const id    = req.body.id
    const fname = req.body.fname
    const lname = req.body.lname 
    const email = req.body.email
    const password = req.body.password
    const tel      = req.body.tel
    const date     = req.body.date
  
    const sql = "UPDATE users set first_name = ?, last_name= ?, email=?, password=?, tel=? ,date =? where id=?";
    db.query(sql,[fname,lname,email,password,tel,date,id],(err,result)=>{
        if(err)console.log(err)
        console.log(result)
    })
})
app.delete('/api/delete/:id',(req,res)=>{
    const id = req.params.id
    const sql = 'DELETE FROM users where id = ?';
    db.query(sql,id,(err,result)=>{
        if (err) console.log(err)
        console.log(result)
    })
})

app.post('/api/insert',(req,res)=>{
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const password = req.body.password
    const tel = req.body.tel
    const date = req.body.date
    console.log(date)
    const sql ='insert into users (first_name,last_name,email,password,tel,date) values (?,?,?,?,?,?)';
    db.query(sql,[fname,lname,email,password,tel,date],(err,result)=>{
        if (err) console.log(err)
        res.send(result)
    })
})
app.listen(3001,()=>{
    console.log('running !!')
})