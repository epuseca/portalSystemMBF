document.addEventListener("DOMContentLoaded", function () {
    showSlides(slideIndex);
    autoSlide(); // Bắt đầu tự động chuyển slide
});

let slideIndex = 1;
let slideInterval;

// Chuyển đổi slide khi nhấn nút Previous hoặc Next
function plusSlides(n) {
    clearInterval(slideInterval); // Dừng auto slide khi người dùng thao tác
    showSlides(slideIndex += n);
    autoSlide(); // Khởi động lại auto slide
}

// Chuyển trực tiếp đến slide số n khi nhấn vào dot
function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    autoSlide();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Tự động chuyển slide sau mỗi 2 giây
function autoSlide() {
    slideInterval = setInterval(function () {
        plusSlides(1);
    }, 2000);
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}