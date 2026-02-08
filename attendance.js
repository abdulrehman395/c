const rollNo = sessionStorage.getItem("studentRoll");
const cls = sessionStorage.getItem("studentClass");
const group = sessionStorage.getItem("studentGroup");
const password = sessionStorage.getItem("studentPassword");

if (!rollNo || !cls || !group || !password) {
  window.location.href = "index.html";
}

fetch("students.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {

    const student = data.find(function(s) {
      return s.rollNo === rollNo &&
             s.class === cls &&
             s.group === group &&
             s.password === password;
    });

    if (!student || !student.attendance) return;

    showStudent(student);
    showAttendance(student.attendance);
  });


// Show student info
function showStudent(student) {
  document.getElementById("studentInfo").textContent =
    "Class: " + student.class + " | Roll No: " + student.rollNo;
}


// Show attendance table
function showAttendance(attendance) {
  const table = document.getElementById("attendanceTable");
  table.innerHTML = "";

  attendance.forEach(function(a) {

    let status = "Good";
    let className = "status-good";

    if (a.percentage < 75) {
      status = "Low";
      className = "status-danger";
    } 
    else if (a.percentage < 85) {
      status = "Average";
      className = "status-warning";
    }

    const row =
      "<tr>" +
        "<td>" + a.month + "</td>" +
        "<td>" + a.percentage + "%</td>" +
        "<td class='" + className + "'>" + status + "</td>" +
      "</tr>";

    table.innerHTML += row;
  });
}
