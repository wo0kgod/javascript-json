class ArrayParser {
    constructor() {
    }

    tokenizer(str) {
        let changedStr = '';
        let index = 0
        while (index < str.length) {
            if (str[index] === '[') {
                changedStr += '[' + ',';
            } else if (str[index] === ']') {
                changedStr += ',' + ']';
            } else if (str[index] === '{') {
                changedStr += '{' +  ',';
            }else if (str[index] === '}') {
                changedStr += ',' + '}';
            }else if (str[index] === ':') {
                changedStr += ':' + ',';
            }else {
                changedStr += str[index];
            }
            index++;
        }
        this.tokenizedData = changedStr.split(',').map((val) => val.replace(/\s/g,''));
    }

    lexer(arr) {
        arr = arr.map((el) => {
            const obj = {};
            obj.type = this.checkDataType(el);
            obj.value = el;
            return obj
        })
        this.lexedData = arr;
    }

    parser(arr) {
        const resultObj = {
            type: 'array',
            child: []
        };
        arr.forEach((val) => {
            if (Array.isArray(val)) { return resultObj.child.push(this.parser(val)); }
            const obj = {};
            obj.type = this.checkDataType(val);
            obj.value = this.changeDataType(val);
            obj.child = [];
            resultObj.child.push(obj);
        });
        return resultObj
    }

    checkDataType(val) {
        let isString = null;
        if (val[0] === "'") { isString = !val.slice(1, val.length - 1).split('').some((el) => el === "'"); }
        if (val === 'true' || val === 'false') { return 'boolean' }
        if (val === 'null') { return 'null' }
        if (isString) { return 'string' }
        if (!isNaN(val)) { return 'number' }
        if (val[val.length - 1] === ':') { return 'key' }
        if (val === '[') { return 'openSquareBracket' }
        if (val === ']') { return 'closeSquareBracket' }
        if (val === '{') { return 'openCurlyBracket'}
        if (val === '}') { return 'closeCurlyBracket'}
    }

    changeDataType(val) {
        if (val === 'true') { return true }
        if (val === 'false') { return false }
        if (val === 'null') { return null }
        if (!isNaN(val)) { return Number(val) }
        return val
    }

    executeParser(data) {
        this.tokenizer(data);
        this.lexer(this.tokenizedData);
        return this.parser(this.lexedData);
    }
}

const arrayParser = new ArrayParser();
console.log(arrayParser.executeParser("['1a3',[null,false,['11',[112233],112],55, '99'],33, true]"));
