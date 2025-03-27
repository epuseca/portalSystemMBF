function notification_(notice, color) {
    if (notice && notice !== 'undefined') {
        const toast = document.createElement("div");
        toast.innerText = notice;
        toast.style.position = "fixed";
        toast.style.top = "-50px"; // Bắt đầu từ trên
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = color;
        toast.style.color = "white";
        toast.style.padding = "15px 30px";
        toast.style.borderRadius = "5px";
        toast.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
        toast.style.fontSize = "16px";
        toast.style.fontWeight = "bold";
        toast.style.textAlign = "center";
        toast.style.zIndex = "1000";
        toast.style.opacity = "0"; // Bắt đầu ẩn
        toast.style.transition = "top 0.5s ease-out, opacity 0.5s ease-out"; // Thêm hiệu ứng trượt

        document.body.appendChild(toast);

        // Hiển thị trượt xuống sau 100ms
        setTimeout(() => {
            toast.style.top = "20px";
            toast.style.opacity = "1";
        }, 100);

        // Ẩn từ từ sau 3 giây (trượt lên và mờ dần)
        setTimeout(() => {
            toast.style.top = "-50px"; // Trượt lên trên
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500);
        }, 1200);
    }

}
document.addEventListener("DOMContentLoaded", function () {
    const messages = [
        { text: document.body.getAttribute("data-success"), color: "#2b7dcf" },  // Màu xanh
        { text: document.body.getAttribute("data-error"), color: "#FE2020" },    // Màu đỏ
        { text: document.body.getAttribute("data-logout"), color: "#FF8C00" }    // Màu cam
    ];

    messages.forEach(msg => {
        if (msg.text && msg.text !== 'undefined') {
            notification_(msg.text, msg.color);
        }
    });
});
