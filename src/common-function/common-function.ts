export function generateOtp() {
    // Tạo một số ngẫu nhiên từ 0 đến 999999
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Chuyển đổi số thành chuỗi và thêm các số 0 vào đầu nếu cần thiết
    const paddedNumber = String(randomNumber).padStart(6, '0');

    return paddedNumber;
  }