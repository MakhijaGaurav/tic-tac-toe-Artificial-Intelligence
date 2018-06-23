var winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
var availablePositions=[];
var Positions=['e','e','e','e','e','e','e','e','e'];
var clickCount=0;
var Xcount=0;
var Ocount=0;
var positionsOfX=[];
var positionsOfO=[];

function play(id){
    if(clickCount%2==0){//Decides who will play
        if(document.getElementById(id).innerHTML=="")
            {
                document.getElementById(id).innerHTML='X';
                //window.alert(id+Xcount)
                positionsOfX[Xcount++]=id;
                clickCount = clickCount+2;
                Positions[id]='X';
                
            }
    }
    else{
        getBestMove();
    }
}
/**************SORTING AVAILABLE POSTIONS*************/
function sortAvailablePositions(){
    var j=0;
    window.alert(Positions.length);
    for(var i=0;i<Positions.length;i++){
        if(Positions[i]!='X'||Positions[i]!='O'){
            while(availablePositions[j]!=""){
                j++;
            }availablePositions[j]=i;
        }
    }
}

/***************GETTING BEST MOVE***********/
function getBestMove(){
    
}