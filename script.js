let students = [];

fetch("students.json")
  .then(res => res.json())
  .then(data => students = data);

function login() {
  const cls = document.getElementById("class").value;
  const group = document.getElementById("group").value;
  const rollNo = document.getElementById("rollNo").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  const student = students.find(s => s.rollNo === rollNo && s.password === password && s.class === cls && s.group === group);

  if (student) {

  // Save student data for dashboard
  sessionStorage.setItem("studentName", student.name);
  sessionStorage.setItem("studentClass", student.class);
  sessionStorage.setItem("studentRoll", student.rollNo);
  sessionStorage.setItem("studentPassword", student.password);
  sessionStorage.setItem("studentGroup", student.group);

  // Redirect to dashboard
  window.location.href = "dashboard.html";

} else {
  error.textContent = "Invalid login details";
}
}
