const express = require('express'); //Import the express dependency
const port = 7777;                  //Save the port number where your server will be listening
const app = express();//Instantiate an express app, the main work horse of this server

const path = require('path');
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const router = express.Router();
var times=0;
router.get('/',function(req,res){
  times++;
  res.render("index", {
  player:times});
});
let lastMove={"player":1,"cell":5}
router.get('/GetLast',function(req,res){
  res.send(lastMove);
});


//add the router
app.use('/', router);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

