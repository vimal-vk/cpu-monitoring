const socket = new WebSocket("ws://localhost:3000");
socket.addEventListener('open', () => {
  console.log('connected to WS server')
})

socket.addEventListener('message', (event) => {
  //console.log(JSON.parse(event.data))
  var message = JSON.parse(event.data)
  document.getElementById("memory-final").innerHTML = Math.round(parseFloat(message['totalMem'])*1e-9)+" GB";
  changeColorAndStatus('memory', ((parseFloat(message['totalMem']) - parseFloat(message['freeMem'])) / parseFloat(message['totalMem'])) * 100)
  document.getElementById("disk-final").innerHTML = Math.round(parseFloat(message['totalDisk'])*1e-9)+" GB";
  changeColorAndStatus('disk',((parseFloat(message['totalDisk'])-parseFloat(message['freeDisk']))/parseFloat(message['totalDisk']))*100)
})


function changeColorAndStatus(tag, percentage) {
  percentage = Math.round(percentage)
  document.getElementById(tag).style.width = percentage + '%';
  if (document.getElementById(tag).classList.length == 2) {
    document.getElementById(tag).classList.remove(document.getElementById(tag).classList[1])
    document.getElementById(tag + "-status").innerHTML = ""
    document.getElementById(tag+"-percentage").innerHTML=""
  }
  document.getElementById(tag+"-percentage").innerHTML=percentage+"%"
  if (percentage > 80) {
    document.getElementById(tag).classList.add("red")
    document.getElementById(tag + "-status").innerHTML = "Bad"
  }
  else if (percentage > 50) {
    document.getElementById(tag).classList.add("green")
    document.getElementById(tag + "-status").innerHTML = "Normal"
  }
  else {
    document.getElementById(tag).classList.add("blue")
    document.getElementById(tag + "-status").innerHTML = "Good"
  }
}