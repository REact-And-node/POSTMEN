let express = require("express");
let fs = require("fs");
let readline = require("readline-sync");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin",'*');
res.header(
"Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
let testServer ="https://repo-8qu2.onrender.com/studentServer";
let axios = require("axios");
const { json } = require("stream/consumers");
let filename = "STUDENT.json";
let STUDENT={}

app.get("/testServer/getToken",async function (req, res) {
    try{
    let response=await axios.get(`${testServer}/getToken`)
    STUDENT.push({method:"GET",URL:`${testServer}/getToken`,body:null})
    let data = JSON.stringify(STUDENT);
    let data1 =  fs.promises.writeFile(filename,data);
    console.log(response.data);
    console.log(STUDENT);
    
     res.send(response.data+"");
}
catch{(function (error) {
if (error.response) {
let {status, statusText} = error.response; 
console.log(status, statusText); 
res.status(status).send(statusText); } 
else res.status (404).send(error);
});}
});

   



app.get("/testServer/students",async function (req, res) { 
    let token = req.header("authorization") || "dummyvalue"; 

    axios
.get(testServer + "/students", { headers: { authorization: token } })
    .then(function (response) { 
        console.log(response.data);
         res.send(response.data);
    })
    .catch(function (error) {
    if (error.response) {
    let { status, statusText } = error.response;
     console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
    });
    }); 
app.get("/testServer/students/:id", function (req, res) { 
    let { id} = req.params; 

    let token = req.header("authorization") || "dummyvalue"; 
    axios
.get(`${testServer}/students/${id}`, { headers: { authorization: token } })
    .then(function (response) { 
        console.log(response.data);
         res.send(response.data);
    })
    .catch(function (error) {
    if (error.response) {
    let { status, statusText } = error.response;
     console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
    });
    }); 
app.get("/testServer/students/course/:name", function (req, res) { 
    let { name} = req.params; 
    let token = req.header("authorization") || "dummyvalue";

    axios
.get(`${testServer}/students/course/${name}`, { headers: { authorization: token } })
    .then(function (response) { 
        console.log(response.data);
         res.send(response.data);
    })
    .catch(function (error) {
    if (error.response) {
    let { status, statusText } = error.response;
     console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(error);
    });
    }); 

    
    
    app.post("/testServer/students",async function (req, res) {
     
        let token = req.header("authorization");
        if (!token) res.status(401).send("No token found. Provide a valid token");
         else {
        let body = req.body;
        axios
        .post(testServer + "/students", body.body, { headers: { authorization: body.headerValue1} })
.then(function (response) { 
    console.log(response);
     res.send(response.data);
})
.catch(function (error) {
if (error.response) {
let {status, statusText} = error.response; 
console.log(status, statusText); 
res.status(status).send(statusText); } 
else res.status (404).send(error);
});
         }
});
    app.put("/testServer/students/:id", function (req, res) {
         let body = req.body;
           let { id} = req.params; 

      
        let token = req.header("authorization");
        if (!token) res.status(401).send("No token found. Provide a valid token");
         else {
       
        axios
        .put(`${testServer}/students/${id}`, body, { headers: { authorization: token } })
.then(function (response) { 
    console.log(response);
     res.send(response.data);
})
.catch(function (error) {
if (error.response) {
let {status, statusText} = error.response; 
console.log(status, statusText); 
res.status(status).send(statusText); } 
else res.status (404).send(error);
});
         }
});
    app.delete("/testServer/students/:id",async function (req, res) {
       let {id} = req.params; 
        let token = req.header("authorization"); 
         STUDENT.push({method:"DELETE",URL:`${testServer}/testServer/students/${id}`,body:null})
        let data = JSON.stringify(STUDENT);
        let data1 =  fs.promises.writeFile(filename,data);
        console.log(STUDENT);
       
        if (!token) res.status(401).send("No token found. Provide a valid token");
         else {
 
        axios
        .delete(`${testServer}/students/${id}`, { headers: { authorization: token } })
.then(function (response) { 
    console.log(response);
     res.send(response.data);
})
.catch(function (error) {
if (error.response) {
let {status, statusText} = error.response; 
console.log(status, statusText); 
res.status(status).send(statusText); } 
else res.status (404).send(error);
});
         }
});

// app.post("/searchdata",async function (req, res) {
//  let body = req.body;
//  STUDENT=(body)
//  let data = JSON.stringify(STUDENT);
//  let data1 =  fs.promises.writeFile(filename,data);
//  console.log(STUDENT)
//  let token = req.header("authorization") || "dummyvalue";
// if(body.method==="GET" && body.url==="https://repo-8qu2.onrender.com/studentServer/getToken"){
//     app.get("/testServer/getToken",async function (req, res) {
//         try{
//         let response=await axios.get(body.url)
//         STUDENT.push({method:"GET",URL:`body.url`,body:null})
//         let data = JSON.stringify(STUDENT);
//         let data1 =  fs.promises.writeFile(filename,data);
//         console.log(response.data);
//         console.log(STUDENT);
        
//          res.send(response.data+"");
//     }
//     catch{(function (error) {
//         if (error.response) {
//         let {status, statusText} = error.response; 
//         console.log(status, statusText); 
//         res.status(status).send(statusText); } 
//         else res.status (404).send(error);
//         });}
//         });
// }
// else{


//  axios
// .get(body.url, { headers: { authorization: token } })
//  .then(function (response) { 
//      console.log(response.data);
//       res.send(response.data);
//  })
//  .catch(function (error) {
//  if (error.response) {
//  let { status, statusText } = error.response;
//   console.log(status, statusText);
//    res.status(status).send(statusText);
//  } else res.status(404).send(error);
//  });

// }
// });
app.post("/searchdata",async function (req, res) {
    let body= req.body;
    console.log(body)
    STUDENT=body
 
    try{
          let token = req.header("authorization") ||req.body.headerValue1||req.body.headerValue2||req.body.headerValue3||"dummyvalue";
          if (!token) res.status(401).send("No token found. Provide a valid token");
          else {
          let response=body.method==="GET"?await axios.get(body.url,{ headers: { authorization: token } }):
    body.method==="DELETE"?await axios.delete(body.url,{ headers: { authorization: token } }):
    body.method==="PUT" ?await axios.put(`${body.url}`  , body.body , { headers: { authorization: token } }):
    body.method==="POST" ?
    await axios.post(`${body.url}`,  body.body , { headers: { authorization: token } })
    :""

        console.log("response",response);
        console.log("token",token);
        console.log("token",body.body);
    res.send(JSON.stringify(response.data)) 
    }}
    catch (error) {
        if (error.response) {
        let {status, statusText} = error.response; 
        console.log(status, statusText); 
        res.status(status).send(statusText); } 
        else res.status (404).send(error);
        }
       
    });