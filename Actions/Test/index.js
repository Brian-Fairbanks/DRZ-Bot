// logic for randomized rolls, and formating results
function rollLogic(number, dice) {

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

  let shunted = shunting(results);
  console.log(shunted);

  let final = postFix(shunted);
  console.log(final);

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
  // console.log("tokens = " + tokens);


  tokens.forEach(function (char, idx) {
    if (isDigit(char)) { result.push(new Token("Literal", char)); }
    else if (isLetter(char)) { result.push(new Token("Function", char)); }
    else if (isDecimal(char)) { result.push(new Token("Decimal", char)); }
    else if (isOperator(char)) { result.push(new Token("Operator", char)); }
    else if (isLeftParenthesis(char)) { result.push(new Token("Left Parenthesis", char)); }
    else if (isRightParenthesis(char)) { result.push(new Token("Right Parenthesis", char)); }
    else if (isComma(char)) { result.push(new Token("Function Argument Separator", char)); }
  });

  return result;
}

function getTokens(str) {
  var tokens = [];
  var nextToken = "";
  var lastToken = "";
  for (x = 0; x < str.length; x++) {

    if (isDigit(str[x]) || isDecimal(str[x])) {
      nextToken += str[x];
      if (lastToken !== '') { tokens.push(lastToken); lastToken = ''; }
    }

    if (isLetter(str[x])) {
      tokens.push(nextToken);
      nextToken = '';
      lastToken += str[x];
    }

    if (isOperator(str[x])) {
      if (nextToken !== '') { tokens.push(nextToken); nextToken = ''; }
      if (lastToken !== '') { tokens.push(lastToken); lastToken = ''; }
      tokens.push(str[x]);
    }

    if (isLeftParenthesis(str[x])) {
      if (nextToken !== '') { tokens.push(nextToken); nextToken = ''; tokens.push("*") }
      if (lastToken !== '') { tokens.push(lastToken); lastToken = ''; }
      tokens.push(str[x]);
    }

    if (isRightParenthesis(str[x])) {
      if (nextToken !== '') { tokens.push(nextToken); nextToken = ''; }
      if (lastToken !== '') { tokens.push(lastToken); lastToken = ''; }
      tokens.push(str[x]);
    }

    if (isComma(str[x])) {
      if (nextToken !== '') { tokens.push(nextToken); nextToken = ''; }
      if (lastToken !== '') { tokens.push(lastToken); lastToken = ''; }
      tokens.push(str[x]);
    }


    if (x == str.length - 1) {
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


function shunting(arr) {
  let output = [];
  let ops = [];

  arr.forEach(token => {
    let rops = [...ops];

    if (token.type === 'Literal') {
      output.push(token.value)
    }

    else if (token.type === 'Function') {
      ops.push(token.value)
    }

    else if (token.type === 'Operator') {
      while ((ops.length > 0 && isOperator(ops[(ops.length - 1)]))//((there is a operator at the top of the operator stack)
        && (getStats(ops[ops.length - 1]).prec > getStats(token.value).prec//((the operator at the top of the operator stack has greater precedence)
          || (getStats(ops[ops.length - 1]).prec === getStats(token.value).prec && getStats(token.value).assoc == 'L')//(the operator at the top of the operator stack has equal precedence and the token is left associative))
        )
        && (ops[ops.length - 1] !== '(')//(the operator at the top of the operator stack is not a left parenthesis)):
      ){
        output.push(ops.pop()) //pop operators from the operator stack onto the output queue.
      }

      ops.push(token.value) //push it onto the operator stack.
    }

    else if (token.type === 'Left Parenthesis') {
      ops.push(token.value)
    }

    else if (token.type === 'Right Parenthesis') {
      while (ops.length > 0 && ops[ops.length - 1] !== '('){
        output.push(ops.pop())
      }
      ops.pop();
      if(ops.length > 0 && !isOperator(ops[ops.length - 1])){
        output.push(ops.pop())
      }
    }

    // show step
    // console.log(`${output} : ${rops.reverse().join(" ")}`)

  })
  while(ops.length > 0){
    output.push(ops.pop());
  }

  return output;
}

function getStats(char) {
  switch (char) {
    case '-':
      return { prec: 2, assoc: 'L' }
    case '+':
      return { prec: 2, assoc: 'L' }
    case '/':
      return { prec: 3, assoc: 'L' }
    case '*':
      return { prec: 3, assoc: 'L' }
    case '^':
      return { prec: 4, assoc: 'R' }
  }
}

function postFix(eval){
  let result = [];
  eval.forEach(token => {
    if (isDigit(token)){
      result.push(token)
    }

    else if(isOperator(token)){
      let x2 = parseFloat(result.pop());
      let x1 = parseFloat(result.pop());
      switch (token){
        case "+":
          result.push(x1+x2);
          break;
        case "-":
          result.push(x1-x2);
          break;
        case "/":
          result.push(x1/x2);
          break;
        case "*":
          result.push(x1*x2);
          break;
        case "^":
          result.push(x1^x2);
          break;
      }
    }
    console.log(result);
  })
  return result;
}




module.exports = {
  process: process,
  //init: init
}