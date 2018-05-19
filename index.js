var express = require('express');
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('bloodbanks.json', 'utf8'));
var app = express();
var port = process.env.PORT || 3000;
var city = '';
app.listen(port, () => console.log("running"));

app.get('/',(req,res)=>{
    res.send('This is test');
});

app.get('/api/bloodbanks/', (req, res) => {
    console.log(req.query.city);
    const bloodbank = obj.records;
    city = req.query.city;
    var bloodbankarray = [];
        for (var i = 0; i < bloodbank.length; i++) {
            if (bloodbank[i]._city.toLowerCase() == city.toLowerCase()) {
                var bloodbankobject = new Object();
                bloodbankobject.bloodbankname = bloodbank[i]._blood_bank_name;
                bloodbankobject.mobile = bloodbank[i]._mobile;
                bloodbankobject.address = bloodbank[i]._address;
                bloodbankarray.push(bloodbankobject);
            }
        }
    res.status(200);
    console.log(JSON.stringify(bloodbankarray));
    res.send(JSON.stringify(bloodbankarray));
});