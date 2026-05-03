const tableBody = document.getElementById("careTable");

const data = {
  "2026-05-01": ["green", "orange", "red", "green"],
  "2026-05-02": ["green", "orange", "red", "green"]
};

function createCell(color) {
  const td = document.createElement("td");
  const span = document.createElement("span");

  span.className = "status " + color;
  //span.textContent = color;

  td.appendChild(span);
  return td;
}

const start = new Date("2026-05-01");
const end = new Date("2026-06-30");

let current = new Date(start);

while (current <= end) {
  const key = current.toISOString().split("T")[0];
  const row = document.createElement("tr");

  const values = data[key] || ["grey", "grey", "grey", "grey"];

  values.forEach(color => {
    row.appendChild(createCell(color));
  });

  tableBody.appendChild(row);
  current.setDate(current.getDate() + 1);
}