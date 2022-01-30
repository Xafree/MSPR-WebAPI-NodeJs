const express = require('express');
const jsforce = require('jsforce');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = 3001;
// prueba
const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN } = process.env;
const connect = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connect.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
    if (err) {
        console.error(err)
    } else {
        console.log("User Id : " + userInfo.id)
        console.log("Org Id : " + userInfo.organizationId)
    }
});


app.get('/prospects', (req, res) => {
    connect.query("Select First_Name__c, Email__c, Name FROM Prospect__c", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            console.log("Totale recods " + result.totalSize);
            res.json(result.records);
        }
    })
})


app.post('/prospect', (req, res) => {
    connect.sobject('Prospect__c').create({
        'First_Name__c': req.body.firstName,
        'Email__c': req.body.email
    }).then((result) => {
        res.status(201).send(result);
    }).catch((err) => {
        res.status(422).send(err);
    })
})




app.listen(PORT, () => {
    console.log(`Serveur is running at http://localhost:${PORT}`);
})

