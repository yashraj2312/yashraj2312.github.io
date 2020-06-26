var reminderText = document.getElementById('reminderText');
function reminder() {
  reminderText.style.transition= '0.3s';
  reminderText.style.borderBottom = 'thick solid white';
}

function reminderOff() {
  reminderText.style.borderBottom = 'none';
}

function highlightCode(codeId) {
  document.getElementById(codeId + '_code').style.color = 'white';
  document.getElementById(codeId + '_code').style.transition= '0.3s';
}

function removeHighlight(codeId) {
  document.getElementById(codeId + '_code').style.color = 'black';
}
