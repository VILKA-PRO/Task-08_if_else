let money = '12'; //= document.querySelector('#str');
var price;
var rub, kop;
var litera = sotny = desatky = edinicy = minus = "";
var k = 0, i, j;

const validBtnConst = document.querySelector('#validBtn');

let minValue;
let maxValue;
let minValueUser;
let maxValueUser;


let answerNumber;
let answerNumberText;

let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const answerNumberField = document.getElementById('str');

const cardBody = document.getElementById('cardBody');

validBtnConst.addEventListener('click', valid);


// ФУНКЦИЯ ПРОВЕРКИ ===================
// ====================================

function valid (event){

    // Задаем и проверяем минимальное значение
    if (document.getElementById('inputMin').value == 0){
        minValue = 0;
        } else {
            minValue = parseInt(document.getElementById('inputMin').value) || (document.    getElementById('minWrong').innerHTML = `Я просил число, а не вашу Абра-Када-бру \u{1F926}. Значит будет по дефолту 5`, 5 );
        };

    minValue = (minValue > 999) ? 
    (document.getElementById('minWrong').innerHTML = `Ну просил же, не больше 999 \u{1F926}. Значит будет 999`, 999 ) : 
        (minValue < -999) ? 
        (document.getElementById('minWrong').innerHTML = `Ну просил же, не меньше -999 \u{1F926}. Значит будет -999`, -999): 
        minValue;
    
    // Задаем и проверяем Максимальное значение

    if (document.getElementById('inputMax').value == 0){
        maxValue = 0;
        } else {
            maxValue = parseInt(document.getElementById('inputMax').value) || (document.getElementById('maxWrong').innerHTML = `Я просил число, а не вашу Абра-Када-бру \u{1F926}. Значит будет по дефолту 10`, 10 );
        };

    maxValue = (maxValue > 999) ? 
        (document.getElementById('maxWrong').innerHTML = `Ну просил же, не больше 999 \u{1F926}. Значит будет 999`, 999 ) : 
        (maxValue < -999) ? 
        (document.getElementById('maxWrong').innerHTML = `Ну просил же, не меньше -999 \u{1F926}. Значит будет -999`, -999): 
        maxValue;

  
    
    (minValue == maxValue) ? 
        document.getElementById('textToStart').innerHTML="<strong class='fillText'>Ну короче, мы имеем числа <span class='fillNumb'>" + minValue + "</span> и <span class='fillNumb'>" + maxValue + "</span></strong><br><p class='subText'>Хотя, я считаю странным брать одинаковые числа, но как хотите</p>" :

        document.getElementById('textToStart').innerHTML="<strong class='fillText'>Ну короче, мы имеем числа <span class='fillNumb'>" + minValue + "</span> и <span class='fillNumb'>" + maxValue + "</span></strong><br><p class='subText'>Теперь загадайте любое целое число между ними и я удивлю вас своей дедукцией</p>";

    textToStart.classList.add('lead');
    event.preventDefault();
        console.log(`функция проверки valid: minValue=${minValue}, maxValu=${maxValue}`);
};

//  ================= /ФУНКЦИЯ ПРОВЕРКИ



// Скрытие и показ блоков ===================
// ==========================================

$( document ).ready(function(){

    $( "#startBtn" ).click(function(){ 
        // $( '#startDiv' ).toggleClass( 'btn-hidden' );

        $( "#title" ).fadeOut( { 
        duration: 400, // продолжительность анимации
        complete: function(){ // callback
        $("#inputs").fadeIn('slow');
    
        },
        queue: false // не ставим в очередь
        });
    });

    $( "#validBtn" ).click(function(){ // задаем функцию при нажатиии на элемент с # validBtn
      $( "#validBtn" ).fadeOut( { // плавно изменяя прозрачность скрывааем элемент #inputs в документе
        duration: 10, // продолжительность анимации
        complete: function(){ // callback
          $("#goBtn").fadeIn();
            
        },
        queue: false // не ставим в очередь
      });
    });

    $( ".goBtn" ).click(function(event){ // 
        $( "#inputs" ).fadeOut( { 
            
          duration: 800, 
          easing: "linear", 
          complete: function(){ 
            $("#game").fadeIn();
            
          },
          queue: false 
        });
        event.preventDefault();
        firstStep (); // запускаем расчет игры
      }); 

    $( "#btnRetry" ).click(function(event){ // Нажимаем заново
        $( ".goBtn" ).fadeOut({  // Меняем кнопки
            duration: 10,
          });
        $( "#validBtn" ).fadeIn({ 
            duration: 10
          });
        $("#game").fadeOut({ 
            duration: 500,
            queue: true,
            complete: function(){ 
                $("#inputs").fadeIn('slow');
            },
        });
       
        
        event.preventDefault();
          
        firstStep (); // запускаем расчет игры
        document.getElementById('textToStart').innerHTML="<strong class='fillText'>Ну теперь все заново</strong> <br> Правила те же: не меньше -999 и не больше 999!";
        textToStart.classList.remove('lead');
        document.getElementById('maxWrong').innerHTML = '';
        document.getElementById('minWrong').innerHTML = '';
        document.getElementById('inputMin').value = '';
        document.getElementById('inputMax').value = '';
    });

});

// =================== Скрытие и показ блоков 


// Кнопка заново ============================
document.getElementById('btnRetry').addEventListener('click', firstStep); 


// ПЕРВЫЙ РАСЧЕТ ИГРЫ =======================
// ==========================================
function firstStep () {
    cardBody.style.display = "block";
    // minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    // maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
    // alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    minValueUser = minValue;
    maxValueUser = maxValue;
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    money = answerNumber + "";
        console.log(`firstStep перед num2str: minValue=${minValue}, maxValu=${maxValue}, orderNumber=${orderNumber}, answerNumber= ${answerNumber }, money= ${money} (${typeof(money)}), answerNumberText= ${answerNumberText}`);
    num2str (money);
    changeOrderNumber ();
    // orderNumberField.innerText = `${orderNumber} \n Вы задали числа ${minValueUser} и ${maxValueUser}`; удалить в конце
    answerNumberField.innerText = `${answerNumberText}?`;
    answerField.innerText = `Вы загадали число \n`;
    
        console.log(`Функция firstStep конец: minValue=${minValue}, maxValu=${maxValue}, orderNumber=${orderNumber}, answerNumber= ${answerNumber }, money= ${money} (${typeof(money)}), answerNumberText= ${answerNumberText}`);
}
// ====================== /ПЕРВЫЙ РАСЧЕТ ИГРЫ 


function changeOrderNumber () {
    orderNumberField.innerText = `${orderNumber} \n Вы задали числа ${minValueUser} и ${maxValueUser}`;
};


document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue)
            {wrongAnswers();
            
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            money = answerNumber + "";
            num2str (money);
            changeOrderNumber ();
            answerField.innerText = guessAnswers(); 
             
                console.log(`После нажатия кнопки больше: minValue=${minValue}, maxValu=${maxValue}, orderNumber=${orderNumber}, answerNumber= ${answerNumber }`);
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){wrongAnswers();

        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            money = answerNumber + "";
            num2str (money); 
            changeOrderNumber ();
            answerField.innerText = guessAnswers();//`Вы загадали число ${answerNumber }?`;
            
            console.log(`После нажатия кнопки меньше: minValue=${minValue}, maxValu=${maxValue}, orderNumber=${orderNumber}, answerNumber= ${answerNumber }`);
        }
    }
})


document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){winAnswers ();
    }
})









// <![CDATA[
/* ----------------------------
 Сумма прописью на JavaScript
 Author: Mad Max 2005
 ---------------------------- */
 
 N = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
     "", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать",
     "", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто",
     "", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот",
     "тысяч", "тысяча", "тысячи", "тысячи", "тысячи", "тысяч", "тысяч", "тысяч", "тысяч", "тысяч",
     "миллионов", "миллион", "миллиона", "миллиона", "миллиона", "миллионов", "миллионов", "миллионов", "миллионов", "миллионов",
     "миллиардов", "миллиард", "миллиарда", "миллиарда", "миллиарда", "миллиардов", "миллиардов", "миллиардов", "миллиардов", "миллиардов"];
 var M = new Array(10);
 for (j = 0; j < 10; ++j)
     M[j] = new Array(N.length);
 for (i = 0; i < N.length; i++)
     for (j = 0; j < 10; j++)
         M[j][i] = N[k++]
 var R = new Array("", "", "", "", "", "", "", "", "", "");
 var K = new Array("копеек", "копейка", "копейки", "копейки", "копейки", "копеек", "копеек", "копеек", "копеек", "копеек");

 function num2str(money) {
    // console.log(money, price);

     rub = "", kop = "";
     money = money.replace(",", ".");
     if (isNaN(money)) {
         document.getElementById('str').innerHTML = "Не числовое значение";
         return
     }
     if (money.substr(0, 1) == "-") {
         money = money.substr(1);
         minus = "минус "
     }
     else minus = "";
     money = Math.round(money * 100) / 100 + "";
     if (money.indexOf(".") != -1) {
         rub = money.substr(0, money.indexOf("."));
         kop = money.substr(money.indexOf(".") + 1);
         if (kop.length == 1) kop += "0";
     }
     else rub = money;
     if (rub.length > 12) {
         document.getElementById('str').innerHTML = "Слишком большое число";
         return
     }
     ru = propis(price = rub, R);
     ko = propis(price = kop, K);
     ko != "" ? res = ru : res = ru;
     ru == "Ноль " && ko != "" ? res = ko : 0;
     answerNumberText = 0;

        console.log(`num2str: minValue=${minValue}, maxValu=${maxValue}, orderNumber=${orderNumber}, answerNumber= ${answerNumber }, money= ${money} (${typeof(money)}), answerNumberText= ${answerNumberText}`);

        console.log(`num2str Резалт: (${minus} + ${res}).substr(0, 1).toUpperCase() + ${(minus + res).substr(1)}`);
        console.log(`num2str Резалт:`, (minus + res).substr(0, 1).toUpperCase() + (minus + res).substr(1));

     answerNumberText = document.getElementById('str').innerHTML = (minus + res).substr(0, 1).toUpperCase() + (minus + res).substr(1);
    //  answerNumberText = document.getElementById('str').innerHTML = (minus + res).substr(0, 1).toUpperCase() + (minus + res).substr(1);
     
        console.log('Результат перевода в текст ', money, answerNumberText);
     
    //  document.getElementById('str2').innerHTML = (minus + res).substr(0, 1).toUpperCase() + (minus + res).substr(1);;


 }

 function propis(price, D) {
     litera = "";
     for (i = 0; i < price.length; i += 3) {
         sotny = desatky = edinicy = "";
         if (n(i + 2, 2) > 10 && n(i + 2, 2) < 20) {
             edinicy = " " + M[n(i + 1, 1)][1] + " " + M[0][i / 3 + 3];
             i == 0 ? edinicy += D[0] : 0;
         }
         else {
             edinicy = M[n(i + 1, 1)][0];
             (edinicy == "один" && (i == 3 || D == K)) ? edinicy = "одна" : 0;
             (edinicy == "два" && (i == 3 || D == K)) ? edinicy = "две" : 0;
             i == 0 && edinicy != "" ? 0 : edinicy += " " + M[n(i + 1, 1)][i / 3 + 3];
             edinicy == " " ? edinicy = "" : (edinicy == " " + M[n(i + 1, 1)][i / 3 + 3]) ? 0 : edinicy = " " + edinicy;
             i == 0 ? edinicy += " " + D[n(i + 1, 1)] : 0;
             (desatky = M[n(i + 2, 1)][2]) != "" ? desatky = " " + desatky : 0;
         }
         (sotny = M[n(i + 3, 1)][3]) != "" ? sotny = " " + sotny : 0;
         if (price.substr(price.length - i - 3, 3) == "000" && edinicy == " " + M[0][i / 3 + 3]) edinicy = "";
         litera = sotny + desatky + edinicy + litera;
     }
     if (litera == " " + R[0]) return "ноль" + litera;
     else return litera.substr(1);
 }
 function n(start, len) {
     if (start > price.length) return 0;
     else return Number(price.substr(price.length - start, len));
 }
 // ]]>

function guessAnswers () {
    const guessRandom = Math.round( Math.random() * 3);
    var guessPhrase = '';
    // answerNumberField.innerText = `${answerNumberText}?`;
   
    switch (guessRandom) {
        case 0:
        guessPhrase = `Вы загадали число \n`;
        break;
        case 1:
        guessPhrase = `Да ну полюбас это число \n`;
        break;
        case 2:
        guessPhrase = `Наверно это число \n`;
        break;
        default:
        guessPhrase = `Зуб даю ты гадал число \n`;
        }
    
        console.log(`Функция guessAnswers: guessRandom=${guessRandom}, guessPhrase=${guessPhrase}, answerNumber= ${answerNumber }`);
        //answerField.innerText = guessPhrase;
    return guessPhrase;
}

function wrongAnswers (){
    const phraseRandom = Math.round( Math.random() * 3);
            var answerPhrase = '';
            answerNumberField.innerText = "";

                switch (phraseRandom) {
                    case 0:
                    answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
                    break;
                    case 1:
                    answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
                    break;
                    case 2:
                    answerPhrase = `Я так больше не играю`;
                    break;
                    default:
                    answerPhrase = `Ну и играй сам, если жульничаешь`;
                    }
            
            console.log(`Сравнялись при меньше phraseRandom=${phraseRandom}, answerPhrase=${answerPhrase}, answerNumber= ${answerNumber }`);
            answerField.innerText = answerPhrase;
            cardBody.style.display = "none";

            gameRun = false;
}

function winAnswers (){
    const phraseRandom = Math.round( Math.random() * 3);
            var answerPhrase = '';
            answerNumberField.innerText = "";
                switch (phraseRandom) {
                    case 0:
                    answerPhrase = `Я всегда угадываю\n\u{1F60E}`;
                    break;
                    case 1:
                    answerPhrase = `Это было не просто, но я справился`;
                    break;
                    case 2:
                    answerPhrase = `Ееее, Бро! Это и мое любимое число тоже`;
                    break;
                    default:
                    answerPhrase = `Кто молодец? Я молодец!`;
                    }
            
            console.log(`Сравнялись при меньше phraseRandom=${phraseRandom}, answerPhrase=${answerPhrase}, answerNumber= ${answerNumber }`);
            answerField.innerText = answerPhrase;
            cardBody.style.display = "none";

            gameRun = false;
}



// ФУНКЦИЯ ПЕРВОГО РАСЧЕТА ИГРЫ =========== удалить 
// ========================================
/*
function gameStarts (){
    minValue = minValueUser;
    maxValue = maxValueUser;
answerNumber  = Math.floor((minValue + maxValue) / 2);
money = answerNumber + "";
num2str ();
orderNumberField.innerText =  `${orderNumber} \n Вы задали числа ${minValueUser} и ${maxValueUser}`;
answerField.innerText = `Вы загадали число \n${answerNumberText}?`;

console.log(`После старта minValue=${minValue}, maxValu=${maxValue}, orderNumber=${orderNumber}, answerNumber= ${answerNumber }`);
}
*/
// =========== /ФУНКЦИЯ ПЕРВОГОРАСЧЕТА ИГРЫ 





 // // Проверка не работала так как ффункция вызывалась после выполнения расчетов, так как они были в теле кода 
// // ==========================================
/*
validBtn.addEventListener('click', function () {
    // Задаем и проверяем минимальное значение
    minValue = parseInt(document.getElementById('inputMin').value) || (document.getElementById('minWrong').innerHTML = `Я просил число, а не вашу Абра-Када-бру \u{1F926}. Значит будет по дефолту 5`, 5 );

    minValue = (minValue > 999) ? 
    (document.getElementById('minWrong').innerHTML = `Ну просил же, не больше 999 \u{1F926}. Значит будет 999`, 999 ) : 
        (minValue < -999) ? 
        (document.getElementById('minWrong').innerHTML = `Ну просил же, не меньше -999 \u{1F926}. Значит будет -999`, -999): 
        minValue;
    
    // Задаем и проверяем Максимальное значение
    maxValue = parseInt(document.getElementById('inputMax').value) || (document.getElementById('maxWrong').innerHTML = `Я просил число, а не вашу Абра-Када-бру \u{1F926}. Значит будет по дефолту 10`, 10 );

    maxValue = (maxValue > 999) ? 
        (document.getElementById('maxWrong').innerHTML = `Ну просил же, не больше 999 \u{1F926}. Значит будет 999`, 999 ) : 
        (maxValue < -999) ? 
        (document.getElementById('maxWrong').innerHTML = `Ну просил же, не меньше -999 \u{1F926}. Значит будет -999`, -999): 
        maxValue;

    event.preventDefault();
    
    document.getElementById('textToStart').innerHTML=`Ну короче, мы имеем числа ${minValue} и ${maxValue}. Теперь загадайте любое целое число от ${minValue} до ${maxValue} и я удивлю вас своей дедукцией`;
    textToStart.classList.add('lead');
    
    console.log(`функция проверки input minValue=${minValue}, maxValu=${maxValue}`);

  
    
});
*/
// ==========================================
// Проверка не работает =====================




// ALERT option =============================
// ==========================================

// minValue = parseInt(prompt('Минимальное знание числа для игры, но не меньше -999 и не больше 999','0')) || (alert (`Я просил число, а не вашу Абра-Када-бру \u{1F926}. Значит будет по дефолту 5`), 5 );
// minValue = (minValue > 999) ? 
//     (alert (`Ну просил же, не больше 999 \u{1F926}. Значит будет 999`), 999 ) : 
//         (minValue < -999) ? 
//         (alert (`Ну просил же, не меньше -999 \u{1F926}. Значит будет -999`), -999): 
//         minValue;

// maxValue = arseInt(prompt('Максимальное знание числа для игры, но не больше 999','100')) || 10;

// maxValue = (maxValue > 999) ? 
// (alert (`Ну просил же, не больше 999 \u{1F926}. Значит будет 999`), 999 ) : 
//     (maxValue < -999) ? 
//     (alert (`Ну просил же, не меньше -999 \u{1F926}. Значит будет -999`), -999): 
//     maxValue;

// alert(`Ну короче, мы имеем числа ${minValue} и ${maxValue}. Теперь загадайте любое целое число от ${minValue} до ${maxValue} и я удивлю вас своей дедукцией`);
// console.log(`После старта minValue=${minValue}, maxValu=${maxValue}`);




// Изначальный расчет ========================================== 
/*
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const cardBody = document.getElementById('cardBody');

orderNumberField.innerText =  `${orderNumber} \n Вы задали числа ${minValue} и ${maxValue}`;
answerField.innerText = `Вы загадали число ${answerNumber }?`;

console.log(`После старта minValue=${minValue}, maxValu=${maxValue}, orderNumber=${orderNumber}, answerNumber= ${answerNumber }`);
//console.log(guessAnswers());
*/
// ========================================== 
// ============================ /ALERT option  