var board;
var score=0;
var rows=4;
var coloumn=4;

//when the window page loades the setgame function will run 
window.onload= function() {
    setGame();
}

function setGame(){
   // board=[
      //    [2,2,2,2],
    //      [2,2,2,2],
       //   [4,4,8,8],
     //     [4,4,8,8]
   //]

   board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
   ]

    for(let r=0;r<rows;r++){
        for(let c=0;c<coloumn;c++){
            let tile=document.createElement("div");
            tile.id= r.toString()+ "-"+c.toString();
            let num=board[r][c];//num is the varible where the exact position of the tile is stored
            console.log(num);
            upadattile(tile,num)
            document.getElementById("board").append(tile)
        }
    }
    setTwo()
    setTwo()
}

//now when the game starts the tiles are empty when the move somewhere then the tiles fill up slowly slowly 
//randomly and then slowly slowly you sipe so we are gonna write the logic for the same
//everytime you move the tile tup down right left there should be tile created at random that is the number 2 tile
//there fore there is a function added to keyups that is the settwo()

function hasemptytile(){
    for (let r =0; r < rows;r++){
        for(let c =0; c < coloumn;c++){
          if ( board[r][c] == 0) {
            return true;
          }
         return false;
    }

}
}

function setTwo(){
    if(!hasemptytile()){
        return;
    }

    let found=false;
    while (!found) {
        let r= Math.floor(Math.random() * rows);
        let c= Math.floor(Math.random() * coloumn);
        

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile=document.getElementById(r.toString() + "-" + c.toString());
            tile.innerHTML="2";
            tile.classList.add("t2");
            found= true;
        }
    }
}

function upadattile(tile,num){
   tile.innerText="";//this when load the tiles should look empty
   tile.classList.value="";//clear the class and it won't have the same vLUE like x2 x4 x8 at the same time
   tile.classList.add("tiles");//dic is stored in the tile and then a class from the style.css is added to that div using classlist.add("tiles")
   if(num>0){
     tile.innerText=num;
    if (num <=2048){
        tile.classList.add("t"+num.toString())
    }
    else{
      tile.classList.add("t4096")
    }
   }
}

//sliding buttons
document.addEventListener("keyup", (e) =>{
    if(e.code == "ArrowLeft"){
        slideleft(score);
        setTwo(score);
        
    }
    else if(e.code == "ArrowRight"){
        slideright(score);
        setTwo(score);
        
    }
    else if(e.code == "ArrowUp"){
        slideup(score);
        setTwo(score);
        
    }
    else{
        slidedown(score);
        setTwo(score);
        
    }
})

function fliterzero(row){
    return row.filter(num => num != 0)// a copy of the main array following the conditon of num!=0
}

function slide(row,score){
   //clearing all the zeros
   row= fliterzero(row)// getting rid of zeros

   //sliding
   for(let i=0; i<row.length-1 ; i++){
    if(row[i] == row[i+1]){
    row[i] *= 2
    row[i+1] = 0
    score = row[i];
   }
   }

   row= fliterzero(row)
   //adding all the zeros back
   while(row.length <coloumn){
    row.push(0);
   }
   return row;

}
function slideleft(){
    //when slided to left or right we are gonna slide into the previous
    //row of the things we have to itterate the rows
    for(let r=0; r<rows; r++){
        let row=board[r]
        console.log(row);
        row= slide(row);
        board[r]=row;

        // all of these is javascript code it will not refelct in the html so lets do that
        for(let c=0;c<coloumn;c++){
            let tile=document.getElementById(r.toString()+ "-"+c.toString())
            let num=board[r][c]
            upadattile(tile,num)
        }
    }
}

function slideright(){
    //when slided to left or right we are gonna slide into the previous
    //row of the things we have to itterate the rows
    for(let r=0; r<rows; r++){
        let row=board[r]
        row.reverse()
        console.log(row);
        row= slide(row);
        row.reverse();
        board[r]=row;

        // all of these is javascript code it will not refelct in the html so lets do that
        for(let c=0;c<coloumn;c++){
            let tile=document.getElementById(r.toString()+ "-"+c.toString())
            let num=board[r][c]
            upadattile(tile,num)
        }
    }
}

function slideup(){
    for(c=0; c<coloumn ;c++){
        let row=[board[0][c],board[1][c],board[2][c],board[3][c]]
        row = slide(row);
        board[0][c]=row[0];
        board[1][c]=row[1];
        board[2][c]=row[2];
        board[3][c]=row[3];

        for(let r=0; r<rows; r++){
            let tile=document.getElementById(r.toString()+ "-"+c.toString())
            let num=board[r][c]
            upadattile(tile,num)
        }
    }
}

function  slidedown(){
    for(c=0; c<coloumn ;c++){
        let row=[board[0][c],board[1][c],board[2][c],board[3][c]]
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c]=row[0];
        board[1][c]=row[1];
        board[2][c]=row[2];
        board[3][c]=row[3];

        for(let r=0; r<rows; r++){
            let tile=document.getElementById(r.toString()+ "-"+c.toString())
            let num=board[r][c]
            upadattile(tile,num)
        }
    }
}