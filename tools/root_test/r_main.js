let quiz1 = "";
let quiz2 = "";
let q1 = "";
let q2 = "";
const button1 = document.getElementById('m_button');
const button2 = document.getElementById('<button');
const button3 = document.getElementById('>button');
function t (){  document.getElementById('quiz').innerHTML = `      <h2 id="text1">おめでとう！</h2>
      <h2 id="text2">　</h2>`
  button1.hidden = false;
  button2.hidden = true;
  button3.hidden = true;
  button1.textContent = "次の問題へ"
  alert("正解！");
}
function f (){
  document.getElementById('quiz').innerHTML = `      <h2 id="text1">残念</h2>
      <h2 id="text2">　</h2>`
  button1.hidden = false;
  button2.hidden = true;
  button3.hidden = true;
  button1.textContent = "次の問題へ"
  alert("不正解！")
}

function create_quiz (){
  var rdm1 = Math.round(Math.random());
  var rdm5 = Math.round(Math.random());
  var rdm3 = Math.round(Math.random());
  var rdm6 = Math.round(Math.random());
  if (rdm1 == "1"){
    if (rdm5 == "1"){
      var rdm2 = Number(Math.floor( Math.random() * 99) + 1);
       quiz1 = "-√" + rdm2;
       q1 = Number(-1*rdm2);
    }else{
      var rdm2 = Number(Math.floor( Math.random() * 99) + 1);
      quiz1 = "√" + rdm2;
      q1 = Number(rdm2);
    };
  } else {
    var rdm2 = Number(Math.floor( Math.random() * 99) + 1);
    quiz1 = rdm2;
    q1 = Number(rdm2*rdm2);
  };
  if (rdm3 == "1"){
    if (rdm6 == "1"){
      var rdm4 = Number(Math.floor( Math.random() * 99) + 1);
      quiz2 = "-√" + rdm4;
      q2 = Number(-1*rdm4);
    }else{
      var rdm4 = Number(Math.floor( Math.random() * 99) + 1);
      quiz2 = "√" + rdm4;
      q2 = Number(rdm4);
    }
  }else {
    var rdm4 = Number(Math.floor( Math.random() * 99) + 1);
    quiz2 = rdm4;
    q2 = Number(rdm4*rdm4);
  };
};
function button_push1 (){
  if (button1.textContent == "スタート！"){
    button1.hidden = true;
    button2.hidden = false;
    button3.hidden = false;
    create_quiz();
    document.getElementById('quiz').innerHTML = `      <h2 id="text1">どっちが大きい?</h2>
      <h2 id="text2">${quiz1}　${quiz2}</h2>`
  }else if(button1.textContent == "次の問題へ"){    
    button1.hidden = true;
    button2.hidden = false;
    button3.hidden = false;
    create_quiz();
    document.getElementById('quiz').innerHTML = `      <h2 id="text1">どっちが大きい?</h2>
      <h2 id="text2">${quiz1}　${quiz2}</h2>`
  };
};
function button_push2 (){
  if (q1 < q2){
    t();
  }else{
    f();
    };
  };
function button_push3 (){
  if (q1 > q2){
    t();
  }else{
    f();
    };
  };
button1.addEventListener("click",button_push1);
button2.addEventListener("click",button_push2);
button3.addEventListener("click",button_push3);
