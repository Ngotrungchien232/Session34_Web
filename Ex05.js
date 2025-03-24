// Khởi tạo danh sách nhân viên
let employees = [];

// Hàm hiển thị danh sách nhân viên
function displayEmployees() {
  const employeeList = document.getElementById("employee-list");
  employeeList.innerHTML = ""; // Xóa danh sách cũ

  employees.forEach((employee, index) => {
    const row = document.createElement("tr");

    // Cột STT
    const sttCell = document.createElement("td");
    sttCell.textContent = index + 1;
    row.appendChild(sttCell);

    // Cột Tên
    const nameCell = document.createElement("td");
    nameCell.textContent = employee.name;
    row.appendChild(nameCell);

    // Cột Chức vụ
    const positionCell = document.createElement("td");
    positionCell.textContent = employee.position;
    row.appendChild(positionCell);

    employeeList.appendChild(row);
  });
}

// Hàm thêm nhân viên mới
function addEmployee() {
  const nameInput = document.getElementById("employee-name").value.trim();
  const positionInput = document
    .getElementById("employee-position")
    .value.trim();

  if (nameInput === "" || positionInput === "") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Thêm nhân viên mới vào danh sách
  employees.push({ name: nameInput, position: positionInput });

  // Xóa nội dung nhập liệu
  document.getElementById("employee-name").value = "";
  document.getElementById("employee-position").value = "";

  // Hiển thị lại danh sách
  displayEmployees();
}
