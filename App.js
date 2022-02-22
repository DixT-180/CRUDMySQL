const express = require("express");
const app = express();
const mysql = require("./connection").con

app.set("view engine","hbs");
app.set("views","./view");



// app.use (express.urlencoded())
// app.use(express.json)
//routing
app.get("/",(req,res) =>{
    res.render("./index");
});

app.get("/add",(req,res) =>{
    res.render("./add");
});

app.get("/search",(req,res) =>{
    res.render("./search");
});

app.get("/update",(req,res) =>{
    res.render("./update");
});

app.get("/delete",(req,res) =>{
    res.render("delete");
});

app.get("/view",(req,res) =>{
    // res.render("view");
    let qry = "select * from `stock`";
mysql.query(qry,(err,results) =>{
if(err) throw err
else{
    res.render("view",{data:results});
}

}
)});

app.get("/additem",(req,res)=>{
    // res.send("adding data..."); 
    // res.send(req.query);
    const {ItemsId,ItemsName,Categorys,ItemPrices,StockQuantitys,availabilitys} = req.query;

let qry = "select * from `stock` where ItemId=? or ItemName=?";
mysql.query(qry,[ItemsId,ItemsName],(err,results)=>{
    if(err)
    throw err
    else{
       if(results.length>0){
           res.render("add",{checkmesg:true})

       }
       else {
           let qry2 = "insert into `stock` values(?,?,?,?,?,?)";
mysql.query(qry2,[ItemsId,ItemsName,Categorys,ItemPrices,StockQuantitys,availabilitys],(err,results)=>{
    // console.log(results);
    if(err)
    throw err 
    else{
    // res.send(results);
    console.log(ItemsId,ItemsName,Categorys,ItemPrices,StockQuantitys,availabilitys);
    if(results.affectedRows > 0){
        res.render("add",{mesg:true})}
    }
})

       }
    }
})
});



////////////////////////
app.get("/searchitem",(req,res)=>{
    // res.send("adding data..."); 
    // res.send(req.query);
    const {ItemsName} = req.query;

let qry = "select * from `stock` where ItemName=?";
mysql.query(qry,[ItemsName],(err,results)=>{
    console.log(ItemsName);
    if(err)
    throw err
       else {
        if(results.length >0){
            res.render("search",{mesg1:true,mesg2:false,data:results})
            res.send(results);
        }
    else{
        res.render("search",{mesg1:false,mesg2:true});
        
    }}})});
////////////////////
app.get("/updatesearch",(req,res)=>{
     const {ItemsName} = req.query;
     console.log("upd",ItemsName);

let qry = "select * from `stock` where ItemName=?";
mysql.query(qry,[ItemsName],(err,results)=>{
    console.log(ItemsName);
    if(err)
    throw err
       else {

    if(results.length > 0){
         res.render("update",{mesg1:true,mesg2:false,data:results})
    }
    else{
        res.render("update",{mesg1:false,mesg2:true});       
    }
    }
})
}
);
app.get("/updateitem",(req,res)=>{
    const {ItemsId,ItemsName,Categorys,ItemPrices,StockQuantitys,availabilitys} = req.query;
    console.log(ItemsId,ItemsName,Categorys,ItemPrices,StockQuantitys,availabilitys);
let qry = "update `stock` set ItemName=?, category=?, ItemPrice=?,StockQuantity=?,Availability=? where ItemId=?";
    mysql.query(qry,[ItemsName,Categorys,ItemPrices,StockQuantitys,availabilitys,ItemsId],(err,results)=>{
        if (err)
        throw err
        else{
            if(results.affectedRows > 0){
                res.render("update",{umesg:true});
            }
        }

    })
});


app.get("/removeitem",(req,res)=>{
     const {ItemsName} = req.query;
     console.log(ItemsName);

let qry = "Delete from `stock` where ItemName=?";
mysql.query(qry,[ItemsName],(err,results)=>{
    console.log(ItemsName);
    if(err)
    throw err
       else {
        if(results.affectedRows >0){
            res.render("delete",{mesg1:true,mesg2:false,data:results})
            // res.send(results);
        }
    else{
        res.render("delete",{mesg1:false,mesg2:true});
        
    }}})
})


     
           
   



//create server
app.listen(5000, (err)=>{
    if (err)
        throw err
    else 
    console.log("connected at 4000");
});