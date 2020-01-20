import 'bootstrap/dist/css/bootstrap.css';

/*
import jokes from "./jokes";

//----------------------------------------------------------------------
//Opgave 1


const allJokes = jokes.getJokes().map(joke => "<li>"+joke+"</li>");
document.getElementById("jokes").innerHTML = allJokes.join("");



document.getElementById("getJoke").onclick = function(){
  
    var jokeid = document.getElementById("getJokeInput").value-1;
    var joke = jokes.getJokeById(jokeid);
    if(isNaN(jokeId) || joke == undefined){
      document.getElementById("joke").innerHTML = "Joke not found";
  }else{
      document.getElementById("joke").innerHTML = joke;
  }
}

document.getElementById("addJoke").onclick = function(){
  var newJoke = document.getElementById("addJokeInput").value;
  if(newJoke == undefined){
      document.getElementById("joke").innerHTML = "Not a joke";
  }else{
      jokes.addJoke(newJoke);
      document.getElementById("addJokeParagraph").innerHTML = jokes.getJokes().map(joke => "<li>"+joke+"</li>").join("\n");
  }
}
*/
//---------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------
//Opgave 2

// 2. Small application to display a quote of the hour
function getQuote(){
  fetch("https://studypoints.info/jokes/api/jokes/period/hour")
  .then(function(response){
      return response.json();
  })
  .then(function(data){
      document.getElementById("quote").innerHTML = "ID: " + data.id + "<br>Quote: " + data.joke + "<br>Reference: " + data.reference;
  })
  .catch(err => {
      if(err.status){
        err.fullError.then(e=> console.log(e.detail))
      }
      else{console.log("Network error"); }
   });
}

document.getElementById("getQuote").addEventListener("click", getQuote);
