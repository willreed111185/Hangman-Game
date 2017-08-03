//declare variables
var userGuess; //this will collect the user's input
var usedArray = []; //this will hold all of the wrong letters
var letterTest; //this will be used to test if the letter is in the arrayGameWord (-1 means "no", a number is it's place in the array)
var usedTest;//this will be used to test if the letter is in the usedArray
var letterTestWon;//this will be used to test if the letter was already used and scored
var usedLettersStr = "";//this will append the wrong guesses to a string to display in the html
var lossCtr = 0;//this will be used to count the wrong guesses
var gameWon = 0;
var gameLost = 0;
var displayStr = " ";
var randomIndex;
var GameWord;
var arrayGameWord;
var wordLength;
var displayArray=[];
//create a list of words to choose from
var words = ['jack','ripper','dahmer','gacy','zodiac','bundy','cullen'];

  function gameSetUp(){
    displayStr = " ";
    lossCtr = 0;
    displayStr = " ";
    displayArray=[];
    usedLettersStr = "";
    document.getElementById("usedDisp").innerHTML = "";
    //create a random number to choose from the words array
    randomIndex = Math.floor(Math.random() * words.length);
    //select the game word with the random number
    GameWord = words[randomIndex];
    //turn the word into an array
    arrayGameWord = GameWord.split("");
    //variabalize the length of the chosen word-array
    wordLength = arrayGameWord.length; //this it the length of the word the game chose
    //---------------------------------------------
    //creates a blank array to display on the screen. indexOf(guessedLetter) >-1 can be used 
    //as a positive match and a way to reveal the positive letter by pushing correct letter to
    //that index position
    displayArray=[];//this array will display the word in play (dashes to start)

    for (var i = 0; i < wordLength; i++) { //this for loop will place a dash for each letter of the word
        displayArray.push("_ "); //push addes each dash to the display array at the current index (i)
      }
      displayArray.unshift("<h1>")//we add the h1 tag to the beginning
      displayArray.push("</h1>");//we hadd the h1 ending tag    <h1>_ _ _ _ _ </h1>
    displayStr = displayArray.toString();
    var displayStrNew = displayStr.replace(/,/g,"");
    document.getElementById("wordDisp").innerHTML = displayStrNew;
  }

function imageChange(wordStr){
  var imageURL = "<img src=images/" + wordStr + ".png alt='images/hangman.png' style='width:304px;height:228px;'>"
  document.getElementById("hangmanImage").innerHTML = imageURL;
}
gameSetUp();
imageChange(lossCtr)
 //The game will go on for 6 missed letters, then you die
  //---------------------------------------------
  //check for keypress and if it's alpha only, proceed after assigning it to the userGuess
document.onkeyup = function(event) {
  if(lossCtr < 6){
    imageChange(lossCtr)
    userGuess = event.key; //key pressed is saved to the variable userGuess
    userGuess = userGuess.toLowerCase(); //userGuess is assured to be lower case only (capsLock?)
    //if alpha key is pressed key is tested against the usedArray, wordArray, and displayArray
    if (event.keyCode >= 65 && event.keyCode <= 90){ //this assures alpha only are recognized for the game
      letterTest = arrayGameWord.indexOf(userGuess);//index of the guess in the game word is tested
      usedTest = usedArray.indexOf(userGuess);//index of guess is tested to see if it's been used
      letterTestWon = displayArray.indexOf(userGuess);//index of the guess is tested to see if it's already been scored
      
      //if letter hasn't been used and isn't in the gameWord, add it to used words if it hasn't been used
      if ((letterTest == -1)&&(usedTest == -1)&&(letterTestWon == -1)){ //hence testing for index of -1
        usedArray.push(userGuess);//adds the wrong guess to the used array
        usedLettersStr = usedLettersStr +"  " + userGuess; //adds the letter to the display string for the used letters
        lossCtr++; //increments the losses to make sure we kill the dude at the right time
        //--------------------------------------
        //animate something for the death of the man
        imageChange(lossCtr)
        //--------------------------------------
      }
        //if letter is in the game word, fill it in as many times as it appears and remove it from 
        //the gameWordArray so it can be tested null in the next keystroke
      else if (letterTest > -1){ //if the guess was a correct guess
        while (letterTest > -1){ //while we have correct letters in the game word (repetitious letters), two L's in Billy
          displayArray[letterTest+1] = userGuess;//we add our correct guess to the display (+1 to account for h1 tag)
          arrayGameWord[letterTest] = "@";//we remove the letter from the game word to avoid duplicates
          letterTest = arrayGameWord.indexOf(userGuess);//we test again so we repeat for multiple same letters
        
          displayStr = displayArray.toString().replace(/,/g,"");
          //console.log(displayStr);
          document.getElementById("wordDisp").innerHTML = displayStr;
        }
      }
      //console.log("Letter Test: ",letterTest);
      //console.log("Used Test: ",usedTest);
      //console.log("Won Test: ",letterTestWon);
      //console.log("Missed Letters: ", lossCtr);
      //console.log("used letters: ", usedArray);
      //console.log("used letter string: ", usedLettersStr);
      //console.log(arrayGameWord);
      //console.log(wordLength);
      //console.log(displayArray);
      //console.log(userGuess);
      //display the status to the screen/html
      document.getElementById("usedDisp").innerHTML = usedLettersStr;
    } //end if alpha letter pressed
  } //end if lossCtr<6
  if (lossCtr == 6){ //if the man is dead
    //-------------------------------
    //animate something for when you die
    //-------------------------------
    //console.log("GameOver");
    // document.getElementById("wordDisp").innerHTML = "You're Dead!";
    // document.getElementById("usedDisp").innerHTML = "FOREVER";
    imageChange(lossCtr)
    document.body.style.backgroundImage = "url('images/lossBackground.jpg')";
   // alert("You LOOSE");
    gameSetUp();
  }
  gameWon=displayArray.indexOf("_ ");
  //console.log("gameWon: ",gameWon);
  if(gameWon == -1){
    // document.getElementById("wordDisp").innerHTML = "You Won The Game";
    // document.getElementById("usedDisp").innerHTML = "Live to See Another Day!";
    imageChange("won")
    document.body.style.backgroundImage = "url('images/winningBackground.jpg')";
    //alert("You WIN");
    gameSetUp();
  }
} //end function(event)
