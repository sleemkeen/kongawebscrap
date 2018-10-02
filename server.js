const rp = require('request-promise');
const cheerio = require('cheerio');

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kongadb"
});

con.connect(function (err) {
    if (err) throw err;

});



let product =[];
let counter = 1;
const options ={
    url: `https://www.konga.com/v1/json/search?category_id=5227&from=`+ counter,
    json:true
};

while (counter < 100) {

    rp(options).then((data) => {

        let getProduct = [];
        for (let i of data.data.products) {
            var tabledata = [
                i.fields.name,
                i.fields.price,
                i.fields.original_price,
                i.fields.brand,
                i.fields.seller_seller_phone_number
            ]

            writesql(tabledata);

        }


    });

    counter++
    
}

function writesql(records){


    var sql = "INSERT INTO products (productname, price, originalprice, brand, seller_phone_num) VALUES (?,?,?,?,?)";
        con.query(sql, records,function (err, result) {
            if (err) throw err;
            console.log("1 record inserted, ID: " + result.insertId);
        });
 
}