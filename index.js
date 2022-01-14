const express = require('express');
const jsforce = require('jsforce');
require('dotenv').config();
const app = express();
const PORT = 3001;

const {SF_LOGIN_URL,SF_USERNAME,SF_PASSWORD,SF_TOKEN} = process.env;
const connect = new jsforce.Connection({
    loginUrl : SF_LOGIN_URL
})

connect.login(SF_USERNAME,SF_PASSWORD+SF_TOKEN, (err,userInfo)=>{
    if(err){
        console.error(err)
    } else{
        console.log("User Id : "+ userInfo.id)
        console.log("Org Id : "+ userInfo.organizationId)
    }
} );

app.get('/', (req, res)=>{
    connect.query("Select ID, Name FROM Account", (err, result) =>{
        if(err){
            res.send(err);
        }else{
            console.log("Totale recods "+ result.totalSize);
            res.json(result.records);
        }
    })

})

app.listen(PORT, ()=>{
    console.log(`Serveur is running at http://localhost:${PORT}`);
})

