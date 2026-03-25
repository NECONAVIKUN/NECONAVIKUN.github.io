"use strict";
var pwInput = document.getElementById("pw");
document.getElementById("go").addEventListener("click", function() {
  if (pwInput.value) {
    window.location.href = "/secret/" + pwInput.value + "/";
  } else {
    alert("パスワードを入れてね！");
  }
});
