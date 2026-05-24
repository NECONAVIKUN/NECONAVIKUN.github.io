"use strict";
var quiz1;
var quiz2;
var q1;
var q2;
var quizHTML = document.getElementById("quiz").innerHTML;
var button1 = document.getElementById("m_button");
var button2 = document.getElementById("<button");
var button3 = document.getElementById(">button");
var button4 = document.getElementById("e_button");
function correct () {
  quizHTML = `      <div class="main_text">
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
  quizHTML = `      <div class="main_text">
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
function create_quiz () {
  var rand1 = null;
  var rand2 = null;
  var rand3 = null;
  var rand4 = null;
  var rand5 = null;
  var rand6 = null;
  if (window.crypto) {
    rand1 = window.crypto.getRandomValues(new Uint8Array(1))[0] & 1;
    rand3 = window.crypto.getRandomValues(new Uint8Array(1))[0] & 1;
    rand5 = window.crypto.getRandomValues(new Uint8Array(1))[0] & 1;
    rand6 = window.crypto.getRandomValues(new Uint8Array(1))[0] & 1;
    if (rand1 === "1") {
      if (rand5 === "1") {
        rand2 = (window.crypto.getRandomValues(new Uint32Array(1))[0] % 99) + 1;
        quiz1 = "-√" + rand2;
        q1 = -1 * rand2;
      } else {
        rand2 = (window.crypto.getRandomValues(new Uint32Array(1))[0] % 99) + 1;
        quiz1 = "√" + rand2;
        q1 = rand2;
      }
    } else if (rand5 === "1") {
      rand2 = (window.crypto.getRandomValues(new Uint32Array(1))[0] % 99) + 1;
      quiz1 = "-" + rand2;
      q1 = -1 * rand2 * rand2;
    } else {
      rand2 = (window.crypto.getRandomValues(new Uint32Array(1))[0] % 99) + 1;
      quiz1 = rand2;
      q1 = rand2 * rand2;
    } else if (rand3 === "1") {
      if (rand6 === "1") {
        rand4 = (window.crypto.getRandomValues(new Uint32Array(1))[0] % 99) + 1;
        quiz2 = "-√" + rand4;
        q2 = -1 * rand4;
      } else {
        rand4 = (window.crypto.getRandomValues(new Uint32Array(1))[0] % 99) + 1;
        quiz2 = "√" + rand4;
        q2 = rand4;
      }
    } else if (rand6 === "1") {
      rand4 = (window.crypto.getRandomValues(new Uint32Array(1))[0] % 99) + 1;
      quiz2 = "-" + rand4;
      q2 = -1 * rand4 * rand4;
    } else {
      rand4 = (window.crypto.getRandomValues(new Uint32Array(1))[0] % 99) + 1;
      quiz2 = rand4;
      q2 = rand4 * rand4;
    }
  } else {
    rand1 = Math.round(Math.random());
    rand3 = Math.round(Math.random());
    rand5 = Math.round(Math.random());
    rand6 = Math.round(Math.random());
    if (rand1 === "1") {
      if (rand5 === "1") {
        rand2 = Math.floor(Math.random() * 99) + 1;
        quiz1 = "-√" + rand2;
        q1 = -1 * rand2;
      } else {
        rand2 = Math.floor(Math.random() * 99) + 1;
        quiz1 = "√" + rand2;
        q1 = rand2;
      }
    } else if (rand5 === "1") {
      rand2 = Math.floor(Math.random() * 99) + 1;
      quiz1 = "-" + rand2;
      q1 = -1 * rand2 * rand2;
    } else {
      rand2 = Math.floor(Math.random() * 99) + 1;
      quiz1 = rand2;
      q1 = rand2 * rand2;
    } else if (rand3 === "1") {
      if (rand6 === "1") {
        rand4 = Math.floor(Math.random() * 99) + 1;
        quiz2 = "-√" + rand4;
        q2 = -1 * rand4;
      } else {
        rand4 = Math.floor(Math.random() * 99) + 1;
        quiz2 = "√" + rand4;
        q2 = rand4;
      }
    } else if (rand6 === "1") {
      rand4 = Math.floor(Math.random() * 99) + 1;
      quiz2 = "-" + rand4;
      q2 = -1 * rand4 * rand4;
    } else {
      rand4 = Math.floor(Math.random() * 99) + 1;
      quiz2 = rand4;
      q2 = rand4 * rand4;
    }
  }
}
button1.addEventListener("click", function() {
  if (button1.textContent == "スタート！"){
    button1.setAttribute("class", "hidden");
    button2.removeAttribute("class");
    button3.removeAttribute("class");
    button4.setAttribute("class", "hidden");
    create_quiz();
    quizHTML = `            <div class="main_text">
                <h2 id="text1">どっちが大きい?</h2>
                <h2 id="text2">${quiz1}　${quiz2}</h2>
    </div>`;
  } else if (button1.textContent == "次の問題へ") {    
    button1.setAttribute("class", "hidden");
    button2.removeAttribute("class");
    button3.removeAttribute("class");
    button4.setAttribute("class", "hidden");
    create_quiz();
    quizHTML = `        <div class="main_text">
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
  quizHTML = `      <div class="main_text">
            <h2 id="text1">JavaScript式√どっちが大きい?</h2>
            <h2 id="text2">スタートボタンを押してね！</h2>
      </div>`;
});
