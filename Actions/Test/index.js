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
  results.forEach(function (token, index) {
    console.log(index + "=> " + token.type + " : " + token.value)
  });

}

function Token(type, value) {
  this.type = type; this.value = value
}


function tokenize(str) {
  var result = []; //array of tokens    
  str.replace(/\s+/g, ""); // remove spaces
  // convert to array of characters
  str = str.split("");
  var tokens = getTokens(str);
  console.log("tokens = " + tokens);


  tokens.forEach(function (char, idx) {
    if (isDigit(char)) { result.push(new Token("Literal", char)); }
    else if (isLetter(char)) { result.push(new Token("Variable", char)); }
    else if (isDecimal(char)) { result.push(new Token("Decimal", char)); }
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
  var lastToken = "";
  for (x=0; x<str.length; x++){

    if(isDigit(str[x]) || isDecimal(str[x]) ){
      nextToken+= str[x];
      if(lastToken !== ''){ tokens.push(lastToken);  lastToken = '';}
    }

    if(isLetter(str[x])){
      tokens.push(nextToken);
      nextToken = '';
      lastToken+= str[x];
    }

    if(isOperator(str[x])){
      if(nextToken !== ''){ tokens.push(nextToken);  nextToken = '';}
      if(lastToken !== ''){ tokens.push(lastToken);  lastToken = '';}
      tokens.push(str[x]);
    }

    if(isLeftParenthesis(str[x])){
      if(lastToken !== ''){ tokens.push(lastToken);  lastToken = '';}
      if(nextToken !== ''){ tokens.push(nextToken);  nextToken = ''; tokens.push("*")}
      tokens.push(str[x]);
    }

    if(isRightParenthesis(str[x])){
      if(lastToken !== ''){ tokens.push(lastToken);  lastToken = '';}
      if(nextToken !== ''){ tokens.push(nextToken);  nextToken = '';}
      tokens.push(str[x]);
    }

    if(isComma(str[x])){
      if(lastToken !== ''){ tokens.push(lastToken);  lastToken = '';}
      if(nextToken !== ''){ tokens.push(nextToken);  nextToken = '';}
      tokens.push(str[x]);
    }


    if (x == str.length-1){
      tokens.push(nextToken);
      nextToken = '';
    }
  }
  return tokens;
}

function isComma(ch) { return (ch === ","); }
function isDigit(ch) { return /\d/.test(ch); }
function isDecimal(ch) { return (ch === "."); }
function isLetter(ch) { return /[a-z]/i.test(ch); }
function isOperator(ch) { return /\+|-|\*|\/|\^/.test(ch); }
function isLeftParenthesis(ch) { return (ch === "("); }
function isRightParenthesis(ch) { return (ch == ")"); }







module.exports = {
  process: process,
  //init: init
}