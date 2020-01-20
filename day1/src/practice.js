//1) Using existing functions that takes a callback as an argument
/*
a) Using the filter method:
Declare a JavaScript array and initialize it with some names (Lars, Jan, Peter, Bo, Frederik etc.). 
Use the filter method to create a new array with only names that contains the letter ‘a’.
*/
let names = ["Lars","Jan","Peter","Bo"];
console.log(names);

function contains(name){
    if(name != undefined && name.includes("a")){
        return name;
    }
}
const namesFiltered = names.filter(name => contains(name));
console.log (namesFiltered);

/*
b) Using the map method:
Use the names-array created above, and, using its map method, create a new array with all names reversed.
*/

function reverseArray(name){
    if(name != undefined) return name.split("").reverse().join("");
}
const reversedArray = names.map(str => reverseArray(str));
console.log(reversedArray);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
2) Implement user defined functions that take callbacks as an argument
Now, assume the array did not offer these two methods. Then we would have to implement them by our self. 
a) Implement a function: myFilter(array, callback)that takes an array as the first argument, 
and a callback as the second and returns a new (filtered) array according to the code provided in the callback 
(this method should provide the same behaviour as the original filter method).
*/

function myFilter(array, callback){
    let result = [];

    array.forEach(arrObj => {
        if(arrObj != undefined && (callback(arrObj)) != undefined) result.push(callback(arrObj));
    });

    return result;
}

console.log(myFilter(names,contains));

/*
b) Implement a function: myMap(array, callback)that, provided an array and a callback, provides the same functionality as calling the existing map method on an array.
Test the method with the same array and callback as in the example with the original map method.
*/
function myMap (array, callback){
    let result = [];
    array.forEach(arrObj => {
        if(arrObj != undefined) result.push(callback(arrObj));
    });
    return result;
}

console.log(myMap(names, reverseArray));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
3) Using the Prototype property to add new functionality to existing objects
Every JavaScript function has a prototype property (this property is empty by default), 
and you can attach properties and methods on this prototype property. 
You add methods and properties on an object’s prototype property to make those methods and properties available to all instances of that Object. 
You can even implement (classless) inheritance hierarchies with this property.
The problem with our two user defined functions above (myFilter and myMap) is that they are not really attached to the Array Object. 
They are just functions, where we have to pass in both the array and the callback.
Create a new version of the two functions (without the array argument) 
which you should add to the Array prototype property so they can be called on any array as sketched below:
var names = ["Lars", "Peter", "Jan", "Bo"];
var newArray = names.myFilter(function(name) {…});
*/

Array.prototype.myFilter2 = function(callback){
    let result = [];

    this.forEach(arrObj => {
        if(arrObj != undefined && (callback(arrObj)) != undefined) result.push(callback(arrObj));
    });

    return result;
}
console.log(names.myFilter2(contains));

Array.prototype.myMap2 = function (callback){
    let result = [];
    this.forEach(arrObj => {
        if(arrObj != undefined) result.push(callback(arrObj));
    });
    return result;
}

console.log(names.myMap2(reverseArray));

/*
4) Getting really comfortable with filter and map
a) Given this array: var numbers = [1, 3, 5, 10, 11];
Use map + a sufficient callback to map numbers into this array:
var result = [4,8,15,21,11];
*/
var numbers = [1, 3, 5, 10, 11];
let numbers2 = numbers.map(function(num, index){
    if(numbers[index + 1] == undefined){
        return num;
    }else{
        return num + numbers[index + 1];
    }
});
console.log(numbers2);

/*
b) Use map() to create the <a>’s for a navigation set and eventually a string like below (use join() to get the string of <a>’s):
<nav>
  <a href=””>Lars</a>
  <a href=””>Peter</a>
  <a href=””>Jan</a>
  <a href=””>Bo</a>
</nav>
*/

function createNav(array){
    let result = "<nav>\n";
    result += array.map(obj => "<a href=\"\">"+obj+"</a>").join("\n");
    return result + "\n</nav>";
}
console.log(createNav(names));

/*
C) Use map()+(join + ..) to create a string, representing a two column table, for the data given below:
var names = [{name:"Lars",phone:"1234567"}, {name: "Peter",phone: "675843"}, {name: "Jan", phone: "98547"},{name: "Bo", phone: "79345"}];
*/
var cNames = [{name:"Lars",phone:"1234567"}, {name: "Peter",phone: "675843"}, {name: "Jan", phone: "98547"},{name: "Bo", phone: "79345"}];

function createTable(array){
    let result = "<table>\n<tr>\n<th>name</th>\n<th>phone</th>\n</tr>\n";
    result += array.map(obj => "<tr>\n<td>" + obj.name + "</td>\n<td>" + obj.phone + "</td>\n</tr>").join("\n");
    return result + "\n</table>";
}
console.log(createTable(cNames));

/*
d) Create a single html-file and test the two examples given above.
Hint: add a single div with an id=names, and use DOM-manipulation (document.getElementById.innerHTML = theString) to add the nav or table.
*/
//document.getElementById("names").innerHTML = createNav(names) + "\n" + createTable(cNames);

/*
e) Add a button with a click-handler and use the filter method to find only names containing the letter ‘a’. 
Update the table to represent the filtered data.
*/

/*document.getElementById("button").onclick = function(){
    const cNamesFiltered = cNames.filter(obj => obj.name.includes("a"));
    document.getElementById("names").innerHTML = createNav(names) + "\n" + createTable(cNamesFiltered);
}*/

/*
5. reduce
reduce is used to reduce an array into a single item (a number, string, object, etc). This is a very common problem in all languages, 
for specific problems, so common, that the Array actually has a specific “reduce” method called join,  
which can reduce an array into a string separated by whatever we choose.
var all= ["Lars", "Peter", "Jan", "Bo"];
a) Use join to create a single string from all, with names: comma-, space. and  # - separated.
*/

var all= ["Lars", "Peter", "Jan", "Bo"];
console.log(all.join(","));
console.log(all.join(" "));
console.log(all.join("#"));

/*
b) Given this array: var numbers = [2, 3, 67, 33]; 
Create a reducer callback that, with reduce(..),  will return the sum (105) of all values in numbers
*/
var bNumbers = [2, 3, 67, 33];

function addNumbers(sum, num){
    return sum + num;
}
console.log(bNumbers.reduce(addNumbers));

/*
c) Given this array:
var members = [
 {name : "Peter", age: 18},
 {name : "Jan", age: 35},
 {name : "Janne", age: 25},
 {name : "Martin", age: 22}]
Create a reducer callback that, using the Array’s  reduce() method,  will return the average age of all members (25 for the provided array).
Hint: The reduce callback takes two additional arguments as sketched below:
var reducer = function(accumulator, member,index,arr ){
Index is the current index for which the value (member) are passed in, and arr is the array.
Use this to return different values from your reduce-function,  according to whether you have reached the last element or not.
*/

var members = [
    {name : "Peter", age: 18},
    {name : "Jan", age: 35},
    {name : "Janne", age: 25},
    {name : "Martin", age: 22}];

function getAvgAge(sum, member, currentIndex, array){
    if(currentIndex == array.length-1) return (sum+member.age) / array.length;
    return sum + member.age;
}
console.log(members.reduce(getAvgAge, 0));

/*
d) Imagine you were to create a system that could count votes for the presidential election in USA.
Given this array of votes: 
var votes = [ "Clinton","Trump","Clinton","Clinton","Trump","Trump","Trump","None"];
Create a reduce function that will return a single object like {Clinton: 3, Trump: 4, None: 1 }
Hints: You can check whether a property exists in a Javascript object, and add new properties as sketched below:
var a = {}
if (a["clinton"])
 console.log("I Will Not Print")
a["clinton"] = 1;
console.log("You will see me")
console.log("Value of clinton "+ a["clinton"]);
*/

var votes = [ "Clinton","Trump","Clinton","Clinton","Trump","Trump","Trump","None"];
function countVotes(votes, candidates){

}



