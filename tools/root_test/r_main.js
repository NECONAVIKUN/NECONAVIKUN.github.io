"use strict";
var quiz1;
var quiz2;
var q1;
var q2;
var quizElem = document.getElementById("quiz");
var button1 = document.getElementById("m_button");
var button2 = document.getElementById("<button");
var button3 = document.getElementById(">button");
var button4 = document.getElementById("e_button");
function correct () {
  quizElem.innerHTML = `      <div class="main_text">
            <h2 id="text1">おめでとう！</h2>
            <h2 id="text2">　</h2>
      </div>`;
  button1.removeAttribute("class");
  button2.setAttribute("class", "hidden");
  button3.setAttribute("class", "hidden");
  button4.removeAttribute("class");
  button1.textContent = "次の問題へ";
  alert("正解！");
}
function incorrect() {
  quizElem.innerHTML = `      <div class="main_text">
            <h2 id="text1">残念</h2>
            <h2 id="text2">　</h2>
      </div>`;
  button1.removeAttribute("class");
  button2.setAttribute("class", "hidden");
  button3.setAttribute("class", "hidden");
  button4.removeAttribute("class");
  button1.textContent = "次の問題へ";
  alert("不正解！");
}
function getRandomInt() {
  if (window.crypto) {
    return (window.crypto.getRandomValues(new Uint32Array(1))[0] % 99) + 1;
  } else {
    return Math.floor(Math.random() * 99) + 1;
  }
}
function getRandomBin() {
  if (window.crypto) {
    return window.crypto.getRandomValues(new Uint8Array(1))[0] & 1;
  } else {
    return Math.round(Math.random());
  }
}
function create_quiz () {
  var q1Root = getRandomBin();
  var q1Minus = getRandomBin();
  var q1Num = getRandomInt();
  var q2Root = getRandomBin();
  var q2Minus = getRandomBin();
  var q2Num = getRandomInt();
  if (q1Root === 1) {
    if (q1Minus === 1) {
      quiz1 = "-√" + q1Num;
      q1 = -1 * q1Num;
    } else {
      quiz1 = "√" + q1Num;
      q1 = q1Num;
    }
  } else if (q1Minus === 1) {
    quiz1 = "-" + q1Num;
    q1 = -1 * q1Num * q1Num;
  } else {
    quiz1 = q1Num;
    q1 = q1Num * q1Num;
  }
  if (q2Root === 1) {
    if (q2Minus === 1) {
      quiz2 = "-√" + q2Num;
      q2 = -1 * q2Num;
    } else {
      quiz2 = "√" + q2Num;
      q2 = q2Num;
    }
  } else if (q2Minus === 1) {
    quiz2 = "-" + q2Num;
    q2 = -1 * q2Num * q2Num;
  } else {
    quiz2 = q2Num;
    q2 = q2Num * q2Num;
  }
}
button1.addEventListener("click", function() {
  if (button1.textContent == "スタート！"){
    button1.setAttribute("class", "hidden");
    button2.removeAttribute("class");
    button3.removeAttribute("class");
    button4.setAttribute("class", "hidden");
    create_quiz();
    quizElem.innerHTML = `            <div class="main_text">
                <h2 id="text1">どっちが大きい?</h2>
                <h2 id="text2">${quiz1}　${quiz2}</h2>
    </div>`;
  } else if (button1.textContent == "次の問題へ") {    
    button1.setAttribute("class", "hidden");
    button2.removeAttribute("class");
    button3.removeAttribute("class");
    button4.setAttribute("class", "hidden");
    create_quiz();
    quizElem.innerHTML = `        <div class="main_text">
                <h2 id="text1">どっちが大きい?</h2>
                <h2 id="text2">${quiz1}　${quiz2}</h2>
            </div>`;
  };
});
button2.addEventListener("click", function() {
  if (q1 < q2){
    correct();
  } else {
    incorrect();
  }
});
button3.addEventListener("click", function() {
  if (q1 > q2){
    correct();
  } else {
    incorrect();
  }
});
button4.addEventListener("click", function() {
  button1.removeAttribute("class");
  button2.setAttribute("class", "hidden");
  button3.setAttribute("class", "hidden");
  button4.setAttribute("class", "hidden");
  button1.textContent = "スタート！"
  quizElem.innerHTML = `      <div class="main_text">
            <h2 id="text1">JavaScript式√どっちが大きい?</h2>
            <h2 id="text2">スタートボタンを押してね！</h2>
      </div>`;
});
