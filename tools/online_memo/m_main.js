document.getElementById('exbutton').addEventListener("click",()=> {
  const text = document.getElementById('input').value;
  const title = document.getElementById('title').Value;
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = title+'.txt';
  a.click();
  URL.revokeObjectURL(url);
});
