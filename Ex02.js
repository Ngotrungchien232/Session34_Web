// Lấy phần tử HTML
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const editIdInput = document.getElementById("editId");

// Lấy dữ liệu từ localStorage, nếu không có thì trả về mảng rỗng
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Hàm hiển thị danh sách công việc
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.content}</td>
      <td>${task.dueDate}</td>
      <td>${task.status}</td>
      <td>${task.assignedTo}</td>
      <td>
        <button onclick="editTask(${task.id})">Sửa</button>
        <button onclick="deleteTask(${task.id})">Xóa</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

// Hàm sửa công việc
function editTask(id) {
  // Tìm công việc cần sửa
  const task = tasks.find((task) => task.id === id);
  if (task) {
    // Điền thông tin công việc vào form
    document.getElementById("content").value = task.content;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("status").value = task.status;
    document.getElementById("assignedTo").value = task.assignedTo;
    // Lưu ID của công việc đang sửa vào ô ẩn
    editIdInput.value = id;
  }
}

// Xử lý khi submit form
taskForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn form reload trang

  // Lấy giá trị từ form
  const content = document.getElementById("content").value;
  const dueDate = document.getElementById("dueDate").value;
  const status = document.getElementById("status").value;
  const assignedTo = document.getElementById("assignedTo").value;
  const editId = editIdInput.value; // Lấy ID từ ô ẩn

  if (editId) {
    // Nếu có editId, nghĩa là đang sửa công việc
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(editId));
    if (taskIndex !== -1) {
      // Cập nhật thông tin công việc
      tasks[taskIndex] = {
        id: parseInt(editId),
        content: content,
        dueDate: dueDate,
        status: status,
        assignedTo: assignedTo,
      };
    }
    // Xóa editId sau khi sửa xong
    editIdInput.value = "";
  } else {
    // Nếu không có editId, nghĩa là thêm công việc mới
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
    const newTask = {
      id: newId,
      content: content,
      dueDate: dueDate,
      status: status,
      assignedTo: assignedTo,
    };
    tasks.push(newTask);
  }

  // Lưu vào localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Hiển thị lại danh sách
  displayTasks();

  // Xóa form sau khi thêm/sửa
  taskForm.reset();
});

// Hàm xóa công việc
function deleteTask(id) {
  // Lọc bỏ công việc có id tương ứng
  tasks = tasks.filter((task) => task.id !== id);

  // Cập nhật localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Hiển thị lại danh sách
  displayTasks();
}

// Hiển thị dữ liệu khi trang tải
displayTasks();
