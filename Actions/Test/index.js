// logic for randomized rolls, and formating results
function rollLogic(number, dice) {

}


function parse(args) {

}

function process(room, user, guild, args) {
  args = args.splice(1);
  console.log(args);
  args = args.join("");
  var results = tokenize(args);
  console.log(results);

}

function Token(type, value) { 
  this.type = type; this.value = value 
}


function tokenize(str) {
  var result = []; //array of tokens    
  str.replace(/\s+/g, ""); // remove spaces
  // convert to array of characters
  str=str.split("");
  var tokens = getTokens(str);
  console.log("tokens = "+tokens);

  tokens.forEach(function (char, idx) {
    if (isDigit(char)) { result.push(new Token("Literal", char)); }
    else if (isLetter(char)) { result.push(new Token("Variable", char)); }
    else if (isOperator(char)) { result.push(new Token("Operator", char)); }
    else if (isLeftParenthesis(char)) { result.push(new Token("Left Parenthesis", char)); }
    else if (isRightParenthesis(char)) { result.push(new Token("Right Parenthesis", char)); }
    else if (isComma(char)) { result.push(new Token("Function Argument Separator", char)); }
  });

  return result;
}

function getTokens(str){
  var tokens = [];
  var nextToken = "";
  for (x=0; x<str.length; x++){
    nextToken+=str[x];
    console.log(tokens+ nextToken);

    // look ahead
    if(x<str.length && !isDigit(str[x+1]) && !isLetter(str[x+1]) ){
      tokens.push(nextToken);
      nextToken = '';
    }
    else if(!isDigit(str[x]) && !isLetter(str[x])){
      tokens.push(nextToken);
      nextToken = '';
    }
    
    if (x == str.length-1){
      tokens.push(nextToken);
      nextToken = '';
    }
  }
  return tokens;
}

function isComma(ch) { return (ch === ",");}
function isDigit(ch) { return /\d/.test(ch);}
function isLetter(ch) { return /[a-z]/i.test(ch);}
function isOperator(ch) { return /\+|-|\*|\/|\^/.test(ch);}
function isLeftParenthesis(ch) { return (ch === "(");}
function isRightParenthesis(ch) { return (ch == ")");}







module.exports = {
  process: process,
  //init: init
}