const express = require('express');
// const RoutesHandler = require('./Routes.js')
const fs = require('fs');
const bodyParser = require('body-parser');


const app= express();

app.use(bodyParser.urlencoded({extended:false}));


app.get('/login',(req,res)=>{
    const html = `
    <!DOCTYPE html>
    <html>cls
    <body>
        <form id="myForm" action="/user" method="POST">
            <input type="text" name="username" id="username" placeholder="Enter the username">
            <button type="submit">Login</button>
        </form>
        
        <script>
            document.getElementById('myForm').addEventListener('submit', function(event) {
                event.preventDefault(); 
                
              
                const username = document.getElementById('username').value;
                
             
                localStorage.setItem('username', username);
              
                this.submit();
            });
        </script>
    </body>
    </html>
    `;

  res.send(html);
})

app.post('/user',(req,res)=>{
    console.log(req.body);
    fs.appendFile('message.txt',`${req.body.username}:`,(err)=>{
        res.redirect('/');
    });
})
app.post('/message',(req,res)=>{
    console.log(req.body);
    fs.appendFile('message.txt',req.body.message,(err)=>{
        res.redirect('/');
    })
})



app.get('/',(req,res)=>{
    // res.send('<body><form action="/message" method="POST"><input type="text" name ="username" placeholder="Enter the username"> <button type="submit">Send</button></body>')
    const data = fs.readFileSync('message.txt',{encoding: 'utf8'});
    let msg="";
    if(data){
        msg=data;
    }else{
        msg ="No chats exits"
    }
    const html = `
    <!DOCTYPE html>
    <html>
    <body>
    <p>${msg}</p>
        <form action="/message" method="POST">
            <input type="text" name="message" placeholder="Enter the message">
            <button type="submit">Send</button>
        </form>
        
      
    </body>
    </html>
    `;
    res.send(html);
})


app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not Found</h1>')
})



app.listen(4000,()=>{
    console.log("listening at 4000");
});