const express = require('express'); //Import the express dependency
const port = 7777;                  //Save the port number where your server will be listening
const app = express();//Instantiate an express app, the main work horse of this server

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const router = express.Router();
var times=0;
var board=[[0,0,0],[0,0,0],[0,0,0]];

router.get('/',function(req,res){
  times++;
  res.render("index", {
  player:times});
});
let lastMove={};
router.get('/GetLast',function(req,res){
  res.send(lastMove);
});
router.get('/GetMove/:p/:c',function(req,res){
  let p=Number(req.params.p);
  let c=Number(req.params.c);
  lastMove.player=p;
  lastMove.cell=c;
  c--;
  board[Math.floor(c/3)][c%3]=p;
  console.log(board);
  if(IsFinished()){
    console.log("FINISHED")
  }
  res.send(lastMove);
});


//add the router
app.use('/', router);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

function IsFinished(){
  console.log("IsFinished");
  let mainDiagFlag=true;
  let secDiagFlag=true;
  for(let r=0;r<3;r++){
    if(board[0][0]!=0){
        if(board[r][r]!=board[0][0]){
          mainDiagFlag=false;
        }
    }
    if(board[2][0]!=0){
        if(board[r][2-r]!=board[2][0]){
          secDiagFlag=false;
        }
    }
    //rows
    if(board[r][0]!=0){
      flag=true;
      for (let c=1;c<3;c++){
        if(board[r][0]!=board[r][c]){
          flag=false;
          break;
        }
      }
      if(flag){return true;}
    }
    //cols
    if(board[0][r]!=0){
      flag=true;
      for (let c=1;c<3;c++){
        if(board[0][r]!=board[c][r]){
          flag=false;
          break;
        }
      }
      if(flag){return true;}
    }
  }
  if(mainDiagFlag || secDiagFlag){return true;}
  return false;
}