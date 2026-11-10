"use strict";
document.getElementById("exbutton").addEventListener("click", function() {
  var text = document.getElementById("input").value;
  var title = document.getElementById("title").Value;
  var blob = new Blob([text], { type: "text/plain" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = title + ".txt";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
});
