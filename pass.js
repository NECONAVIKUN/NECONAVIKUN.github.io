"use strict";
document.getElementById("go").addEventListener("click", function() {
  var pwInput = document.getElementById("pw").value;
  if (pwInput) {
    if (["ikura"].includes(pwInput)) {
      window.location.href = "/secret/" + pwInput + "/";
    } else if{ window.location.href = "/secret/" + pwInput + "/";
    } else { alert("パスワードが違う！"); }
  } else { alert("パスワードを入れてね！"); }
});
