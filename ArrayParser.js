class Node {
    constructor(type, value) {
        this.type = type;
        this.value = value;
        this.child = []
    }
}

class Tokenizer {
    tokenize() { }
}

class Lexer {
    lex() { }
}

class ArrayParser {
    constructor(tokenizer, lexer) {
        this.tokenizer = tokenizer;
        this.lexer = lexer;
    }
    arrayParse() { }
}

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser(tokenizer, lexer);

const str = "[123, 22, 33]";
const result = arrayParser.arrayParse(str);
console.log(JSON.stringify(result, null, 2)); 