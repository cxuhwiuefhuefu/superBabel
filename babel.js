export const tokenizer = (code) => {
    const tokens = [];

    let current = 0;

    while(current < code.length) {

        const char = code[current];

        // 处理单元字符的语法单元 类似于`;`(``)`等等这种
        if(char === '(' || char === ')') {
            tokens.push({
                type: 'parens',
                value: char,
            })
            current ++;
            continue;
        }

        // 处理标识符 表示符一般以丶_点￥开头的连续字符
        if(/[a-zA-Z\$\_]/.test(char)) {
            let value = '';
            value += char;
            current ++;
            while( /[a-zA-Z0-9\$\_]/.test(code[current]) && current < code.length) {
                value += code[current];
                current ++;
            }
            tokens.push({
                type: "identifier",
                value
            })
            continue;
        }

        // 处理空白字符
        if(/\s/.test(char)) {
            let value = '';
            value += char;
            current ++;
            while(/[\s]/.test(code[current] && current < code.length)) {
                value += code[current];
                current ++;
            }
            tokens.push({
                type: 'whitespace',
                value
            });
            continue;
        }

        // 处理逗号分隔符
        if(/,/.test(char)) {
            tokens.push({
                type: ',',
                value: ','
            });
            current ++;
            continue;
        }

        // 处理运算符
        if(/=|\+|>/.test(char)) {
            let value = '';
            value += char;
            current ++;
            while(/=|\+|>/.test(code[current])) {
                value += code[current];
                current ++;
            }
            if(value === "=>") {
                tokens.push({
                    type: "ArrawFunctionExpression",
                    value
                });
                continue;
            }
            tokens.push({
                type: 'operator',
                value
            })
            continue;
        }

        throw new TypeError('I dont know what this character is: ' + char);
    }
    return tokens;
}