function register() {
  // Lấy giá trị từ các trường input
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirm-password")
    .value.trim();

  // Lấy các phần tử để hiển thị lỗi
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById(
    "confirm-password-error"
  );

  // Xóa thông báo lỗi trước đó
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  // Kiểm tra các điều kiện
  let isValid = true;

  // Kiểm tra email không được để trống
  if (!email) {
    emailError.textContent = "Email không được để trống";
    isValid = false;
  }

  // Kiểm tra password không được để trống
  if (!password) {
    passwordError.textContent = "Mật khẩu không được để trống";
    isValid = false;
  }

  // Kiểm tra confirm password trùng với password
  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Mật khẩu xác nhận không khớp";
    isValid = false;
  }

  // Nếu các điều kiện đều hợp lệ, tiến hành kiểm tra email và lưu vào localStorage
  if (isValid) {
    // Lấy danh sách tài khoản từ localStorage (nếu có)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra xem email đã tồn tại chưa
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      emailError.textContent = "Email đã được đăng ký";
      return;
    }

    // Thêm tài khoản mới vào danh sách
    users.push({ email, password });

    // Lưu lại vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Thông báo đăng ký thành công
    alert("Đăng ký thành công!");

    // Reset form
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm-password").value = "";
  }
}
