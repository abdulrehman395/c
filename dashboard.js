const rollNo = sessionStorage.getItem("studentRoll");
const password = sessionStorage.getItem("studentPassword");
const cls = sessionStorage.getItem("studentClass");
const group = sessionStorage.getItem("studentGroup");


if (!rollNo && !password && !cls && !group) {
  window.location.href = "index.html";
}

fetch("students.json")
  .then(res => res.json())
  .then(data => {
    const student = data.find(s => s.rollNo === rollNo && s.password === password && s.class === cls && s.group === group);
    if (!student) return;

    showStudentInfo(student);
    showRemainingFees(student);
    showLatestAttendance(student);
    showLastResult(student);
  });


// Student Header
function showStudentInfo(student) {
  document.getElementById("studentName").textContent =
    "Welcome, " + student.name + " 👋";

  document.getElementById("studentInfo").textContent =
    "Class: " + student.class + " | Roll No: " + student.rollNo;
}

// Card 1: Fees
function showRemainingFees(student) {
  const status = student.feestatus;
  document.getElementById("feesCard").textContent = status;
}

// Card 2: Attendance
function showLatestAttendance(student) {
  const latest = student.attendance.at(-1);
  document.getElementById("attendanceCard").textContent =
    latest.month + " – " + latest.percentage + "%";
}

// Card 3: Result
function showLastResult(student) {
  const last = student.termresult.at(-1);
  document.getElementById("resultCard").textContent =
    last.exam + " – " + " Marks: " + last.marks + " - " + " Grade: " + last.grade ;
}
