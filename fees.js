const rollNo = sessionStorage.getItem("studentRoll");
const password = sessionStorage.getItem("studentPassword");
const cls = sessionStorage.getItem("studentClass");
const group = sessionStorage.getItem("studentGroup");

if (!rollNo || !password || !cls || !group) {
  window.location.href = "index.html";
}

fetch("students.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {

    const student = data.find(function(s) {
      return s.rollNo === rollNo &&
             s.password === password &&
             s.class === cls &&
             s.group === group;
    });

    if (!student) return;

    loadFees(student);
  });


function loadFees(student) {

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const tbody = document.getElementById("feesTableBody");
  const totalFee = 4000;

  months.forEach(function(month) {

    const tr = document.createElement("tr");

    const tdMonth = document.createElement("td");
    tdMonth.textContent = month;

    const tdFee = document.createElement("td");
    tdFee.textContent = "Rs. " + totalFee;

    const tdStatus = document.createElement("td");

    if (student.fees && student.fees.paidMonths && student.fees.paidMonths.includes(month)) {
      tdStatus.textContent = "Paid";
      tdStatus.className = "paid";
    } else {
      tdStatus.textContent = "Unpaid";
      tdStatus.className = "unpaid";
    }

    tr.appendChild(tdMonth);
    tr.appendChild(tdFee);
    tr.appendChild(tdStatus);

    tbody.appendChild(tr);
  });

}
