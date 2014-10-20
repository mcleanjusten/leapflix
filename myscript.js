
console.log("Hello Netflix"); 

var hand = false;
var row = 0;
var pos = 0 ;
var maxRow = 0 ;
var maxPos = 0;
var y;
var x;
var direction = null;
var scrolling = false;

var titleWidth = getTitleWidth();
var sliderWidth = getSliderWidth();

var previousFrame = null;
var previousFingersExtended = null;
var highlighted = null;

Leap.loop({enableGestures: true}, function(frame){
  
  if (frame.pointables.length > 0) {
	//Reset the number of pointables
    var fingersExtended = 0;
	
	//Counts the number of pointables in the frame
    for (var i = 0; i < frame.pointables.length; i++) {
      var pointable = frame.pointables[i];
      if(pointable.extended){
        fingersExtended++;
      }
    }
	//Starts a title after the user opens then closes their hand
	if(fingersExtended==0&&previousFingersExtended==5){
		
		
		}
	
	//Checks to see if the script should be scrolling content
    if(scrolling == true){
	  //if an item is highlighted it removes the border before continuing 
	  if(highlighted != null){
		highlighted.style.border = "0px";
	  }
	  
      console.log("if(scrolling == true) + previousFingersExtended = "+previousFingersExtended);
	  //Checks for 5 fingers to stop scrolling
     if (fingersExtended == 5 && previousFingersExtended == 5) {
        console.log("fingersExtended = "+fingersExtended);
        console.log("Scrolling set to false");
        scrolling = false;
		hover();
      }
      else{
        console.log("calling scroll");
        console.log("fingersExtended = "+ fingersExtended);
        previousFingersExtended = fingersExtended;
        if(direction!="null"){
			scroll(direction);
		}
		else{
			scroll("left");
		}
      }
      previousFingersExtended = fingersExtended;
    }
	//Logs the number of fingers extended after a change
    if(previousFingersExtended != fingersExtended){
     console.log("PointablesExtended "+fingersExtended);
    }


    
  } 
 
    frame.hands.forEach(function(hand, index) {
   
     // hover();
     
  
  });

  if(scrolling == false && frame.valid && frame.gestures.length > 0 ){
  
      frame.gestures.forEach(function(gesture){

        switch (gesture.type){
          case "circle":
              console.log("Circle Gesture");
			        //document.getElementById("hd").style.backgroundColor="red";
			        //hover();
              //normal();
              //nextPos();
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
			  if(fingersExtended == 1){
				if(highlighted!=null){
					console.log("Keytap, highlighted not null");
					var p = highlighted.getElementsByTagName("a");
					p[0].click();
				}
			  }
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;  
          case "swipe":
              console.log("Swipe Gesture " + gesture.state);

              if(fingersExtended == 2 ){
                console.log("Two finger swipe");
                
				if(gesture.direction[0]>0){
					scrolling = true;
					console.log("direction >");
					scroll("left");
				}
				else {
					scrolling = true;
					console.log("direction >");
					scroll("right");
				}
              }
              //normal();
              //pos=0;
              //nextRow();
              //nextRow();
              //document.body.style.backgroundColor="black";
              //document.getElementById("hd").style.backgroundColor="black";
              break;
        }
    }); 
  }

  // Store frame for motion functions
  previousFrame = frame;
  previousFingersExtended = fingersExtended;
});

//Scrolls a row of titles
function scroll(dir){
	direction = dir;

  if(direction == "left"){		
	pos = pos-5;
  }
  else{
	pos = pos+5;
  }
  var f = document.getElementsByClassName("agMovieSet");
  f[row].style.left = pos+"px" ;
  
  if(Math.abs(pos)>=sliderWidth){
	pos = 0;
	f[row].style.left = pos+"px" ;
	}
	


}
//Starts the title
function playTitle(){

}

//Moves the box down a row
function nextRow(){
  if(row<maxRow){
    console.log("row value is: "+row);
    row++;

  }
  else{
    row = 0;
  }
  hover();
}

//Moves the box to the next title
function nextPos(){
  
    console.log("pos value is: "+pos);
    pos = pos-15;
    var f = document.getElementsByClassName("agMovieSet");
    f[row].style.left = pos+"px" ;
    console.log("pos value is: "+pos);

 // hover();
}


//Creates a border around a title
function hover(){
  console.log("var pos = "+pos);
  console.log("var titleWidth = "+titleWidth);
  
  var a = (Math.abs(pos)%titleWidth);
  console.log("var a = "+a);
  
  var c = (titleWidth*(0.55));
  console.log("var c = "+c);
  
  var b = ((Math.abs(pos)-a)/titleWidth);
  
  console.log("var b = "+b);
  
  
  x = document.getElementsByClassName("agMovieSet");
  y = x[row].getElementsByClassName("agMovie");
  if(a>=c){
	highlighted = y[b+1];
  }
  else{
	highlighted = y[b];
  }
  highlighted.style.border = "blue solid 5px";


  
}

function getSliderWidth(){
	 x = document.getElementsByClassName("agMovieSet");
     y = x[row].getElementsByClassName("agMovie");
	 var z = y.length * getTitleWidth();
	
	console.log("number of titles "+y.length);
	console.log("sliderWidth Approx: "+z+"px ");
	return z;
	}

function getTitleWidth(){
	x = document.getElementsByClassName("agMovie");
	var width = x[1].offsetWidth;
	console.log("title width: "+width);
	return width;
	}



// This allows us to move the cat even whilst in an iFrame.
//Leap.loopController.setBackground(true)