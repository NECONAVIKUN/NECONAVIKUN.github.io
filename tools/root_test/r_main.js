"use strict";
var quiz1;
var quiz2;
var q1;
var q2;
var button1 = document.getElementById("m_button");
var button2 = document.getElementById("<button");
var button3 = document.getElementById(">button");
var button4 = document.getElementById("e_button");
function correct () {  document.getElementById("quiz").innerHTML = `      <div class="main_text">
            <h2 id="text1">おめでとう！</h2>
            <h2 id="text2">　</h2>
      </div>`;
  button1.disabled = false;
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = false;
  button1.textContent = "次の問題へ";
  alert("正解！");
}
function incorrect() {
  document.getElementById("quiz").innerHTML = `      <div class="main_text">
            <h2 id="text1">残念</h2>
            <h2 id="text2">　</h2>
      </div>`;
  button1.disabled = false;
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = false;
  button1.textContent = "次の問題へ";
  alert("不正解！");
}
function create_quiz () {
  var rand1 = Math.round(Math.random());
  var rand2;
  var rand3 = Math.round(Math.random());
  var rand4;
  var rand5 = Math.round(Math.random());
  var rand6 = Math.round(Math.random());
  if (rand1 === "1") {
    if (rand5 === "1") {
      rand2 = Number(Math.floor(Math.random() * 99) + 1);
      quiz1 = "-√" + rand2;
      q1 = Number(-1 * rand2);
    } else {
      rand2 = Number(Math.floor(Math.random() * 99) + 1);
      quiz1 = "√" + rand2;
      q1 = Number(rand2);
    }
  } else {
    if (rand5 === "1") {
      rand2 = Number(Math.floor(Math.random() * 99) + 1);
      quiz1 = "-" + rand2;
      q1 = Number(-1 * rand2 * rand2);
    } else {
      rand2 = Number(Math.floor(Math.random() * 99) + 1);
      quiz1 = rand2;
      q1 = Number(rand2 * rand2);
    }
  }
  if (rand3 === "1") {
    if (rand6 === "1") {
      rand4 = Number(Math.floor(Math.random() * 99) + 1);
      quiz2 = "-√" + rand4;
      q2 = Number(-1 * rand4);
    } else {
      rand4 = Number(Math.floor(Math.random() * 99) + 1);
      quiz2 = "√" + rand4;
      q2 = Number(rand4);
    }
  } else {
    if (rand6 === "1") {
      rand4 = Number(Math.floor(Math.random() * 99) + 1);
      quiz2 = "-" + rand4;
      q2 = Number(-1 * rand4 * rand4);
    } else {
      rand4 = Number(Math.floor(Math.random() * 99) + 1);
      quiz2 = rand4;
      q2 = Number(rand4 * rand4);
    }
  }
}
button1.addEventListener("click", function() {
  if (button1.textContent == "スタート！"){
    button1.disabled = true;
    button2.disabled = false;
    button3.disabled = false;
    button4.disabled = true;
    create_quiz();
    document.getElementById('quiz').innerHTML = `            <div class="main_text">
                <h2 id="text1">どっちが大きい?</h2>
                <h2 id="text2">${quiz1}　${quiz2}</h2>
    </div>`;
  } else if (button1.textContent == "次の問題へ") {    
    button1.disabled = true;
    button2.disabled = false;
    button3.disabled = false;
    button4.disabled = true;
    create_quiz();
    document.getElementById('quiz').innerHTML = `        <div class="main_text">
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
  button1.disabled = false;
  button2.disabled = true;
  button3.disabled = true;
  button4.disabled = true;
  button1.textContent = "スタート！"
  document.getElementById('quiz').innerHTML = `      <div class="main_text">
            <h2 id="text1">JavaScript式√どっちが大きい?</h2>
            <h2 id="text2">スタートボタンを押してね！</h2>
      </div>`;
});
