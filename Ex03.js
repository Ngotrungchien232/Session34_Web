function login() {
  // Lấy giá trị từ các trường input
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  // Lấy phần hiển thị lỗi
  const emailError = document.getElementById("login-email-error");
  const passwordError = document.getElementById("login-password-error");

  // Xóa thông báo lỗi trước đó
  emailError.textContent = "";
  passwordError.textContent = "";

  let isValid = true;

  // Kiểm tra email không được để trống
  if (!email) {
    emailError.textContent = "Email không được để trống";
    isValid = false;
  }

  // Kiểm tra mật khẩu không được để trống
  if (!password) {
    passwordError.textContent = "Mật khẩu không được để trống";
    isValid = false;
  }

  if (isValid) {
    // Lấy dữ liệu người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm tài khoản khớp với email và mật khẩu
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Chuyển hướng tới trang chủ nếu đăng nhập thành công
      alert("Đăng nhập thành công!");
      window.location.href = "home.html"; // Cập nhật URL trang chủ của bạn
    } else {
      // Thông báo lỗi nếu email hoặc mật khẩu không khớp
      passwordError.textContent = "Email hoặc mật khẩu không đúng";
    }
  }
}
