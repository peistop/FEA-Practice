<style scoped>
   .calculator {
     width: 50%;
     padding: 10px;
     border: 1px solid;
     border-radius: 2px;
     border-color: #f2f2f2;
   }
</style>

<template>
  <div class="calculator">
    <div class="col" style="background-color: #ddd">
      <div class="row">
        <calculator-screen class="history" :value="historyShow" :rows="maxHistoryNum"></calculator-screen>
      </div>
      <div class="row">
        <calculator-screen :value="valueShow"></calculator-screen>
      </div>
      <div class="row">
        <calculator-button class="functional-btn" @click="clearAll">{{clearType}}</calculator-button>
        <calculator-button class="functional-btn" @click="togglePMsign">&plusmn;</calculator-button>          
        <calculator-button class="functional-btn" @click="getPercentage">%</calculator-button>
        <calculator-button class="operate-btn" @click="setOperator('/')">&divide;</calculator-button>
        <div class="w-100"></div>
        <calculator-button @click="inputDigit('7')">7</calculator-button>
          <calculator-button @click="inputDigit('8')">8</calculator-button>
          <calculator-button @click="inputDigit('9')">9</calculator-button>
          <calculator-button class="operate-btn" @click="setOperator('*')">&times;</calculator-button>
          <div class="w-100"></div>
          <calculator-button @click="inputDigit('4')">4</calculator-button>
          <calculator-button @click="inputDigit('5')">5</calculator-button>
          <calculator-button @click="inputDigit('6')">6</calculator-button>
          <calculator-button class="operate-btn" @click="setOperator('-')">&ndash;</calculator-button>
          <div class="w-100"></div>
          <calculator-button @click="inputDigit('1')">1</calculator-button>
          <calculator-button @click="inputDigit('2')">2</calculator-button>
          <calculator-button @click="inputDigit('3')">3</calculator-button>
          <calculator-button class="operate-btn" @click="setOperator('+')">+</calculator-button>
          <div class="w-100"></div>
          <calculator-button class="col-md-6" @click="inputDigit('0')">0</calculator-button>
          <calculator-button @click="inputDigit('.')">.</calculator-button>
          <calculator-button class="equal-btn" @click="calculate">=</calculator-button>
        </div>
      </div>
  </div>
</template>

<script>
  import CalculatorButton from './CalculatorButton';
  import CalculatorScreen from './CalculatorScreen';

  const Operators = Object.freeze({
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (b === 0) {
        throw new Error('Infinity');
      }
      return a / b;
    }
  });

  export default {
    name: 'Calculator',
    components: {
      CalculatorButton,
      CalculatorScreen
    },
    props: {
      maxDigitNum: {
        type: Number,
        default: 16,
        validator: function (value) {
          return 1 <= value <= 16;
        }
      },
      maxHistoryNum: {
        type: Number,
        default: 2,
        validator: function (value) {
          return 0 <= value <= 5;
        }
      }
    },
    data() {
      return {
        inputState: 'START_TYPING',
        operator: null,
        previousValue: null,
        currentValueStr: '0',
        history: [],
      };
    },
    computed: {      
      clearType() {
        return this.inputState === 'START_TYPING' ? 'AC' : 'C';
      },  
      historyShow() {    
        let historyItem = [this.previousValue, this.operator]
          .filter(val => {return val !== null;})
          .join('');

        if (this.inputState !== 'START_TYPING') {
          historyItem += this.currentValueStr;
        }
        const historyClone = this.history.slice();
        if (historyItem) {
          historyClone.unshift(historyItem);
        }        
        return historyClone.join('\n'); 
      },
      valueShow() {
        return this.formatValueStr(this.currentValueStr);
      }
    },
    methods: {
      clearAll: function () {
        if (this.inputState === 'START_TYPING') { //AC
          this.currentValueStr = '0';          
          this.previousValue = null;
          this.operator = null;
          this.history = [];
        } else {
          this.currentValueStr = '0';
          this.inputState = 'START_TYPING';
        }
      },
      togglePMsign: function () {
        if (this.currentValueStr !== 0) {
          this.currentValueStr = (-parseFloat(this.currentValueStr)).toString();
        }
      },
      getPercentage: function () {
        if (this.currentValueStr !== 0) {
          this.currentValueStr = (parseFloat(this.currentValueStr) / 100).toString();
        }      
      },
      inputDigit: function (digit) {
        if (this.inputState === 'START_TYPING' || this.currentValueStr === '0') {
          this.currentValueStr = digit;
          this.inputState = 'TYPING';          
          return;
        }
        if (this.currentValueStr.length < this.maxDigitNum) {          
          this.currentValueStr += digit;          
        }
        console.log(this.currentValueStr);
      },
      setOperator: function (operator) {        
        if (this.previousValue === null) {
          this.previousValue = parseFloat(this.currentValueStr);          
          this.inputState = 'START_TYPING';
        } else {    
          this.calculate();
        }        
        this.operator = operator;
      },
      calculate: function () {
        if (this.operator === null || this.previousValue === null) {
          return;
        }

        try {
          const operation = Operators[this.operator];
          const currentValue = parseFloat(this.currentValueStr);
          let result = operation(this.previousValue, currentValue);

          result = this.getPrecisionValue(result);

          if(this.history.length >= this.maxHistoryNum) {
            this.history.pop();
          }
          this.history.unshift(this.getPrecisionValue(this.previousValue) + this.operator + this.currentValueStr + '=' + result);
          
          this.currentValueStr = result.toString();
          this.previousValue = result;
         
          this.inputState = 'START_TYPING';
          this.operator = null;
        }
        catch (err) {
          console.log(err.message)
          this.currentValueStr = err.message;
        }
      },
      formatValueStr: function (valueStr) {
        let parts = valueStr.split('.');
        if (parts[0].length > 3) {
          parts[0] = parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        return parts.join('.');
      },
      getPrecisionValue: function (value) {
        if (value.toString().length > this.maxDigitNum) {
          for (let i = this.maxDigitNum; i > 0; i--) {     
            console.log(this.maxDigitNum)
            const adjustedValue = value.toPrecision(i);
            if (adjustedValue.toString().length <= this.maxDigitNum) {
              return adjustedValue;
            };
          }
        }
        return value;
      }
    }
  };
</script>
