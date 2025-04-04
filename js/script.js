class Calculator {
    constructor(){
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = false;
    }

    sum(n1,n2){
        return n1 + n2;
    }

    sub(n1,n2){
        return n1 - n2;
    }

    divide(n1,n2){
        try {
            if(n2 === 0){
                throw new Error('Divisão por zero');
            }
            return n1 / n2;
        }catch (error) {
            return `Erro: ${error.message}`;
        }
    }

    multiplication(n1,n2){
        return n1 * n2;
    }

    clearValues(){
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
        this.reset = false;
    }

    resolve(expression){
        const tokens = expression.replace(/x/g,'*').match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
        if(!tokens) {
            return 'Erro';
        }
        let stack = [];

        for (let i = 0; i < tokens.length; i++){
            let token = tokens[i];

            if(token === '*' || token === '/'){
                const n1 = parseFloat(stack.pop());
                const n2 = parseFloat(tokens[++i]);

                let result = token === '*' ? this.multiplication(n1, n2) : this.divide(n1, n2);

                if(typeof result === 'string') return result;
                stack.push(result);
            } else {
                stack.push(token);
            }
        }

        let result = parseFloat(stack[0]);
        for(let i = 1; i < stack.length; i += 2){
            const operator = stack[i];
            const num = parseFloat(stack[i + 1]);
            if (operator === '+') result = this.sum(result, num);
            if (operator === '-') result = this.sub(result, num);
        }
        alert(result);
        return result;
    }

    btnPress = (event) => {
       
        const input = event.target.textContent;
        let currentExpression = this.upperValue.textContent;

        //Limpa
        if (input === 'AC') {
            this.clearValues();
            return;
        }

        if (input === '='){
            alert('teste2');
            const result = this.resolve(currentExpression);
            this.resultValue.textContent = result;
            this.upperValue.textContent = currentExpression;
            this.reset = true;
            return;
        }

        if (this.reset && /^\d+$/.test(input)){
            currentExpression = '0';
            this.reset = false;
        } 
        
        if (currentExpression === '0' && /^\d+$/.test(input)) {
            currentExpression = input;
        } else {
            currentExpression += input;
        }

        this.upperValue.textContent = currentExpression;
    }
}

//instanciar a classe
const calc = new Calculator();

/*let resultado;

//chamando metodo de soma
resultado = calc.sum(5,3);
console.log(resultado);
//chamando metodo de subtração
resultado = calc.sub(5,3);
console.log(resultado);
//chamando metodo de divisão
resultado = calc.divide(10, 0);
console.log(resultado);
//chamando metodo de multiplicação
resultado = calc.multiplication(10, 2);
console.log(resultado);
document.querySelector('#upper-number').textContent = '5 x 6 =';
document.querySelector('#result-number').textContent = resultado;
*/
//captura dos botões
let button = document.querySelectorAll('.btn');

for(let i=0; button.length > i; i++){
    button[i].addEventListener('click', calc.btnPress);
}