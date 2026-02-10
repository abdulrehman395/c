const rollNo = sessionStorage.getItem("studentRoll");
const password = sessionStorage.getItem("studentPassword");
const cls = sessionStorage.getItem("studentClass");
const group = sessionStorage.getItem("studentGroup");

let currentStudent = null;

fetch("students.json")
.then(function(res){
  return res.json();
})
.then(function(data){

  currentStudent = data.find(function(s){
    return s.rollNo === rollNo &&
           s.password === password &&
           s.class === cls &&
           s.group === group;
  });

  if(!currentStudent) return;

  document.getElementById("studentName").innerText =
    "Welcome " + currentStudent.name;

  document.getElementById("studentInfo").innerText =
    "Class " + currentStudent.class + " | Roll " + currentStudent.rollNo;

  loadTerm();   // Load Term 1 by default
});

function loadTerm(){

  const term = document.getElementById("termSelect").value;
  const table = document.getElementById("resultTable");
  table.innerHTML = "";

  const data = currentStudent.results[term];

  for(let i=0;i<data.length;i++){

    const row = document.createElement("tr");

    row.innerHTML =
      "<td>"+(i+1)+"</td>"+
      "<td>"+data[i][0]+"</td>"+
      "<td>"+data[i][1]+"</td>"+
      "<td>"+data[i][2]+"</td>"+
      "<td class='"+data[i][3].toLowerCase()+"'>"+data[i][3]+"</td>";

    table.appendChild(row);
  }
}
