// BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;            
        },

        
        addItem1: function(type, des, val) {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID

                if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

        
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element

            return newItem;        
        },

        save: function(){
            var DOM = UIController.getDOMstrings();
            $(DOM.saveBtn).click(function(){
               
                var income = document.querySelector(DOM.incomeLabel).textContent;
                var expense = document.querySelector(DOM.expensesLabel).textContent;
                var budget = document.querySelector(DOM.budgetLabel).textContent;
                var expLabel = document.querySelector(DOM.percentageLabel).textContent;
                var getItems = data.allItems;
                var itemInc, itemExp;
                itemInc=getItems.inc.length;
                itemExp=getItems.exp.length;        
                var persExp = [];
                var desExp = [];
                var valExp = [];
                var desInc = [];
                var valInc = [];
                get+=getItems;
                for(var i=0; i<itemExp;i++){
                        persExp.push(getItems.exp[i].percentage);
                        desExp.push(getItems.exp[i].description);
                        valExp.push(getItems.exp[i].value);
                }
                for(var i=0; i<itemInc;i++){
                    desInc.push(getItems.inc[i].description);
                    valInc.push(getItems.inc[i].value);
            }
                    if(income && expense && budget && getItems.exp && expLabel && persExp && getItems.inc && valExp && desExp && valInc && desInc){
                            chrome.storage.sync.set({"income": income, "expense": expense, "budget": budget, "incItem": getItems.inc,"expItem": getItems.exp,
                             "label": expLabel, "persanteges": persExp, "valuesExp": valExp, "descriptionsExp": desExp, "descriptionsInc": desInc, "valuesInc": valInc}, function(){
                                });
                                
                    }
                    alert("Saved!");
            });
        },

        load: function(){
            var DOM = UIController.getDOMstrings();
            $(DOM.loadBtn).click(function(){

                var load0 = UIController.getDOMstrings();
                var load1 = "income";
                var load2 = "expense";
                var load3 = "budget";
                var load4 = "incId";
                var load5 = "incItem";
                var load6 = "expItem";
                var load7 = "label";
                var load8 = "persanteges";
                var loadDESexp = "descriptionsExp";
                var loadVALexp = "valuesExp";
                var loadDESinc = "descriptionsInc";
                var loadVALinc = "valuesInc";

                
                    chrome.storage.sync.get(load1, function(val1){
                       document.querySelector(load0.incomeLabel).textContent = val1.income;
                    });
                    chrome.storage.sync.get(load2, function(val2){
                        document.querySelector(load0.expensesLabel).textContent = val2.expense;
                    });
                    chrome.storage.sync.get(load3, function(val3){
                        document.querySelector(load0.budgetLabel).textContent = val3.budget;
                    });
                    chrome.storage.sync.get(load4, function(val4){
                        document.querySelector(load0.incomeContainer).textContent = val4.incomeArea;
                    });
                    chrome.storage.sync.get(load7, function(val7){
                        document.querySelector(load0.percentageLabel).textContent = val7.label;
                    });
                    chrome.storage.sync.get(load5, function(val5){
                        chrome.storage.sync.get(loadDESinc, function(val9){
                            chrome.storage.sync.get(loadVALinc, function(val13){
                                for(var i=0; i<val5.incItem.length; i++){
                                    UIController.addListItem(val5.incItem[i], 'inc');
                                    budgetController.addItem('inc', val9.descriptionsInc[i], val13.valuesInc[i]);                                            
                                } 
                            });
                        });
                    });
                    chrome.storage.sync.get(load6, function(val6){ 
                        chrome.storage.sync.get(loadDESexp, function(val11){ 
                            chrome.storage.sync.get(loadVALexp, function(val12){                   
                                for(var i=0; i<val6.expItem.length; i++){
                                    UIController.addListItem(val6.expItem[i], 'exp');
                                    budgetController.addItem('exp', val11.descriptionsExp[i], val12.valuesExp[i]);
                                }
                            });
                        });                    
                    });
                    chrome.storage.sync.get(load8, function(val8){
                        UIController.displayPercentages(val8.persanteges);
                    });
            });
        },
        
        deleteItem: function(type, id) {
            var ids, index;
            
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        
        calculateBudget: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }            
            
            // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
        },
        
        calculatePercentages: function() {
            
            /*
            a=20
            b=10
            c=40
            income = 100
            a=20/100=20%
            b=10/100=10%
            c=40/100=40%
            */
            
            data.allItems.exp.forEach(function(cur) {
               cur.calcPercentage(data.totals.inc);
            });
        },
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },
        
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        testing: function() {
            console.log(data);
        }
    };
    
})();




// UI CONTROLLER
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
        startRec: '#start-record-btn',
        stopRec: '#pause-record-btn',
        addBtn: '#add__btn'
        incomeText: '.budget__income--text',
        expenseText: '.budget__expenses--text',
        incomeBottom: '.icome__title',
        expenseBottom: '.expenses__title',
        budgetText: '.budget__title'
        saveBtn: '#save__btn',
        loadBtn: '#load__btn'
    };
    
    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };
    
    
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        
        deleteListItem: function(selectorID) {
            
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },
        
        
        clearFields: function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },
        
        
        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            
        },
        
        
        displayPercentages: function(percentages) {
            
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            nodeListForEach(fields, function(current, index) {
                
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
            
        },
        
        displayMonth: function(obj) {
            var now, month, year;
            
            now = new Date();
            //var christmas = new Date(2016, 11, 25);
            
            monthsEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            monthsGer = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            monthsRus = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            monthsUkr = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
            monthsIta=  ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            monthsChi= ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            monthsSpa= ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            monthsFra= ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            month = now.getMonth();
            
            year = now.getFullYear();
            
            if(document.querySelector(DOMstrings.incomeText).textContent == 'Einkommen')
            {
                document.querySelector('.budget__title').textContent = obj + ' ' + monthsGer[month] + ' ' + year;
            }else if(document.querySelector(DOMstrings.incomeText).textContent == 'Доход'){
                document.querySelector('.budget__title').textContent = obj + ' ' + monthsRus[month] + ' ' + year;
            }else if(document.querySelector(DOMstrings.incomeText).textContent == 'Дохід'){
                document.querySelector('.budget__title').textContent = obj + ' ' + monthsUkr[month] + ' ' + year;
            }else if(document.querySelector(DOMstrings.incomeText).textContent == 'Income'){
                document.querySelector('.budget__title').textContent = obj + ' ' + monthsEng[month] + ' ' + year;
            }
            else if(document.querySelector(DOMstrings.incomeText).textContent == 'Reddito'){
                document.querySelector('.budget__title').textContent = obj + ' ' + monthsIta[month] + ' ' + year;
            }
            else if(document.querySelector(DOMstrings.incomeText).textContent == 'Revenu'){
                document.querySelector('.budget__title').textContent = obj + ' ' + monthsFra[month] + ' ' + year;
            }
            else if(document.querySelector(DOMstrings.incomeText).textContent == 'Ingresos'){
                document.querySelector('.budget__title').textContent = obj + ' ' + monthsSpa[month] + ' ' + year;
            }
            
            else if(document.querySelector(DOMstrings.incomeText).textContent == '收入'){
                document.querySelector('.budget__title').textContent = obj + ' ' + monthsChi[month] + ' ' + year;
            }
            else
                document.querySelector(DOMstrings.dateLabel).textContent =obj+' '+ monthsEng[month] + ' ' + year;
        },
        
changedType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
            
            nodeListForEach(fields, function(cur) {
               cur.classList.toggle('red-focus'); 
            });
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
        },
        
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

var SpeechController = (function(){
    var DOM = UIController.getDOMstrings();
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    var noteContent = '';
    recognition.continuous = true;
    recognition.onresult = function(event) {
        var current = event.resultIndex;
        var transcript = event.results[current][0].transcript;
        var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
        if(!mobileRepeatBug) {
            noteContent += transcript;
            description();
        }
    };

    var description = function(){
  
        var splits = noteContent.split(' ');
        console.log(splits);
        
        if(splits[0] == 'описание' && splits[splits.length-1] == 'стоп'){
          delete splits[0];
          delete splits[splits.length-1];
          var splits1 = splits.join(' ');
          document.querySelector(DOM.inputDescription).value = splits1;
          noteContent = '';
        }else if (splits[0] == 'description' && splits[1] == 'is' && splits[splits.length-2] == 'description' && splits[splits.length-1] == 'ends'){
          delete splits[0];
          delete splits[1];
          delete splits[splits.length-2];
          delete splits[splits.length-1];
          var splits1 = splits.join(' ');
          document.querySelector(DOM.inputDescription).value = splits1;
          noteContent = '';
        }else if (noteContent == 'income' || noteContent == 'доход'){
          $(DOM.inputType).val('inc');
          noteContent = "";
        }else if (noteContent == 'expense' || noteContent == 'расход') {
          $(DOM.inputType).val('exp');
          noteContent = ""; 
        }else if(splits[0] == 'Love'|| splits[0] == 'love'|| splits[0] == 'value'|| splits[0] == 'белью' || splits[0] == 'вильнюс' || splits[0] == 'велью' || splits[0] == 'you'|| splits[0] == 'жду'){
            
        delete splits[0];
        var splits2=splits.splice(0,1);
        console.log(splits);
        console.log(splits2);
       // console.log(splits.length);
        var splits3=[];
        for(var i=0; i<splits.length;i++){
         splits3.push(splits[i].toLowerCase());
        }
        console.log(splits3);
        //var splits1 = parseInt(splits.join(' '));          
        var numbers=["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
        var twoNumbers=["twenty","thirty","fourty","fifty","sixty","seventy","eighty","ninety"];
        var x;
        var y;
        var k=0;
        var l=0;
        for(var i=0; i<splits3.length;i++)
         {
            for(var j=0;j<numbers.length;j++)
            {
                if (splits3[i]==numbers[j])
                 {
                    splits3[i]=numbers.indexOf(numbers[j])+1;
                    parseInt(splits3[i]);
                    x=splits3[i];
                    console.log("x:"+x);
                    k++;
                 
                 }
            }
         }

         for(var i=0; i<splits3.length;i++)
         {
            for(var j=0;j<twoNumbers.length;j++)
            {

             if (splits3[i]==twoNumbers[j])
             {
         
            splits3[i]=twoNumbers.indexOf(twoNumbers[j])+2+'0';
            parseInt(splits3[i]);
            y=splits3[i];
            console.log("y:"+y);
            l++;
             }
            }
            
         }
         if(k>0 && k<2 && l>0 && l<2)
                {
                   z=parseInt(y)+parseInt(x);
                   console.log("z:"+z);
                   splits3=z;
                }
                
        console.log(splits3);
        document.querySelector(DOM.inputValue).value = splits3;
        noteContent = '';
        }else if(splits[0] == 'цена'){
          delete splits[0];
          var splits1 = parseInt(splits.join(' '));
          document.querySelector(DOM.inputValue).value = splits1;
          noteContent = '';
        }else if(splits[0] == 'clear' && splits[1] == 'description' || splits[0] == 'очистить' && splits[1] == 'описание') {
          delete splits[0];
          delete splits[1];
          document.querySelector(DOM.inputDescription).value = '';
          noteContent = '';
        }else if(splits[0] == 'clear' && splits[1] == 'value' || splits[0] == 'очистить' && splits[1] == 'цену'){
          delete splits[0];
          delete splits[1];
          document.querySelector(DOM.inputValue).value = '';
          noteContent = '';
        }else if(splits[0] == 'submit' || splits[0] == 'добавить'){
          delete splits[0];
          document.querySelector(DOM.addBtn).click();
          noteContent = '';
        }else{
          noteContent = '';
        }
      };
      return {
          getContent: function(){
              return noteContent;
          },

          getRecognition: function(){
            return recognition;
        }
      }
})();

var langController=(function(){


    var DOMstrings = {
        incomeText: '.budget__income--text',
        expenseText: '.budget__expenses--text',
        incomeBottom: '.icome__title',
        expenseBottom: '.expenses__title',
        budgetText: '.budget__title',
        german: '#german',
        ukrainian: '#ukrainian',
        english: '#english',
        russian: '#russian',
        chinese:'#chinese',
        italian:'#italian',
        french:'#french',
        spanish:'#spanish'
    };

    var Language = function(income, expense, budget, placeholderDescription, placeholderValue)
    {
        this.income = income;
        this.expense = expense;
        this.budget = budget;
        this.placeholderDescription = placeholderDescription;
        this.placeholderValue=placeholderValue;
    };


    var DOMlang= 
    {
     DOMgermany: new Language('Einkommen','Kosten','Verfügbares Budget in','beschreibung hinzufügen','Wert'),
     DOMrussian: new Language('Доход','Расходы','Доступный Бюджет в','добавить описание','значение'),
     DOMenglish: new Language('Income','Expenses','Available Budget in','add description','value'),
     DOMukrainian: new Language('Дохід','Витрати','Доступний бюджет в','додати опис','значення'),
     DOMchinese: new Language('收入','成本','可用預算','添加說明','意'),
     DOMitalian: new Language('Reddito','Costi','Budget disponibile in','aggiungi una descrizione','senso'),
     DOMspanish: new Language('Ingresos', 'Gastos', 'Presupuesto disponible en', 'Agregar descripción', 'Valor'),
     DOMfrench: new Language('Revenu', 'Dépenses', 'Budget disponible dans', 'Ajouter une description', 'Valeur')

    }

return{



     getLang:function(obj)
     {
        document.querySelector(DOMstrings.incomeText).textContent = obj.income;
        document.querySelector(DOMstrings.expenseText).textContent = obj.expense;
        document.querySelector(DOMstrings.incomeBottom).textContent = obj.income;
        document.querySelector(DOMstrings.expenseBottom).textContent = obj.expense;
        document.querySelector(DOMstrings.budgetText).textContent = obj.budget;
        document.getElementsByName('description')[0].placeholder=obj.placeholderDescription;
        document.getElementsByName('value')[0].placeholder=obj.placeholderValue;
       },

  browserLang: function()
  {
        var x;
        x=navigator.language;
       switch(x){

           case'uk':
           langController.getLang(DOMlang.DOMukrainian);
           UIController.displayMonth(DOMlang.DOMukrainian.budget);
           break;
    
           case'ru':
           langController.getLang(DOMlang.DOMrussian);
           UIController.displayMonth(DOMlang.DOMrussian.budget);
           break;

           case'de':
           langController.getLang(DOMlang.DOMgermany);
           UIController.displayMonth(DOMlang.DOMgermany.budget);
           break;
           
           default:
           langController.getLang(DOMlang.DOMenglish);
           UIController.displayMonth(DOMlang.DOMenglish.budget);

       }
    },

    getDOMstringsLang: function() 
    {
        return DOMstrings;
    },

    getLanguages: function()
    {
        return DOMlang;
    }

}
}());



// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl, langCtrl, SpeechCtrl) {
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        var DOM1=langCtrl.getDOMstringsLang();
        var DOM2=langCtrl.getLanguages();
         var getNoteContent = SpeechCtrl.getContent();
    var getRec = SpeechCtrl.getRecognition();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        document.querySelector(DOM.startRec).addEventListener('click', function() {
            if (getNoteContent.length) {
              getNoteContent += ' ';
            }
            getRec.start(); 
        });
          
        document.querySelector(DOM.stopRec).addEventListener('click', function() {
            getRec.stop();
        });
    };
    
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);   

    document.querySelector(DOM1.german).addEventListener('click', function(){
        AddLang(DOM2.DOMgermany, DOM2.DOMgermany.budget);
    });

    document.querySelector(DOM1.english).addEventListener('click', function()
    {
        AddLang(DOM2.DOMenglish, DOM2.DOMenglish.budget);
    });
    
    document.querySelector(DOM1.ukrainian).addEventListener('click', function()
    {
        AddLang(DOM2.DOMukrainian, DOM2.DOMukrainian.budget);
    });

    document.querySelector(DOM1.italian).addEventListener('click', function()
    {
        AddLang(DOM2.DOMitalian, DOM2.DOMitalian.budget);
    });
    
    document.querySelector(DOM1.spanish).addEventListener('click', function()
    {
        AddLang(DOM2.DOMspanish, DOM2.DOMspanish.budget);
    });

    document.querySelector(DOM1.french).addEventListener('click', function()
    {
        AddLang(DOM2.DOMfrench, DOM2.DOMfrench.budget);
    });

    document.querySelector(DOM1.chinese).addEventListener('click', function()
    {
        AddLang(DOM2.DOMchinese, DOM2.DOMchinese.budget);
    });

    document.querySelector(DOM1.russian).addEventListener('click', function()
    {
        AddLang(DOM2.DOMrussian, DOM2.DOMrussian.budget);
    });
    };
  
    var AddLang = function(lang,landBudget){
       
        langCtrl.getLang(lang);
       
        UICtrl.displayMonth(landBudget);

   };

    var updateBudget = function() {
        
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    
    var updatePercentages = function() {
        
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();        
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
            
            // 6. Calculate and update percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and show the new budget
            updateBudget();
            
            // 4. Calculate and update percentages
            updatePercentages();
        }
    };
    
    budgetCtrl.save();
    budgetCtrl.load();
    
    return {
        init: function() {
            console.log('Application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            langController.browserLang();
            setupEventListeners();
            
        }
    };
    
})(budgetController, UIController, SpeechController, langController);

controller.init();