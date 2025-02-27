

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    var navbar = document.getElementById("navbar");
    var sidenav = document.getElementById("sidenav");

    // Khi cuộn lên
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
        // Đặt sidenav ở vị trí phù hợp bên dưới navbar, ví dụ 68px
        sidenav.style.top = "0px";
    } else {
        // Khi cuộn xuống, ẩn navbar và sidenav
        navbar.style.top = "-64px";
        sidenav.style.top = "-64px";
    }
    prevScrollpos = currentScrollPos;
}

var currentTagTarget = "create"; // mặc định cho create

// Hàm mở modal chọn tag; target là "create" hoặc "edit"
function openTagModal(target) {
    currentTagTarget = target;
    if (target === "edit") {
        var selected = document.getElementById('editTagNv').value.split(',').map(s => s.trim()).filter(s => s !== "");
        document.querySelectorAll('.tag-checkbox').forEach(function (cb) {
            cb.checked = selected.indexOf(cb.value) !== -1;
        });
    } else {
        // Nếu là create, reset tất cả checkbox
        document.querySelectorAll('.tag-checkbox').forEach(function (cb) {
            cb.checked = false;
        });
    }
    document.getElementById('tagModal').style.display = 'block';
}


// Hàm đóng modal chọn tag
function closeTagModal() {
    document.getElementById('tagModal').style.display = 'none';
}

// Hàm xác nhận lựa chọn tag
function confirmTagSelection() {
    const checkboxes = document.querySelectorAll('.tag-checkbox');
    let selectedTagIds = [];
    let selectedTagNames = [];
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedTagIds.push(checkbox.value);
            const label = document.querySelector('label[for="' + checkbox.id + '"]');
            if (label) {
                selectedTagNames.push(label.innerText);
            }
        }
    });
    // Cập nhật dữ liệu vào input ẩn và hiển thị tên tag dựa theo target
    if (currentTagTarget === "edit") {
        document.getElementById('editTagNv').value = selectedTagIds.join(',');
        document.getElementById('selectedEditTags').innerText = "Tag đã chọn: " + selectedTagNames.join(', ');
    } else {
        document.getElementById('tagNv').value = selectedTagIds.join(',');
        document.getElementById('selectedTags').innerText = "Tag đã chọn: " + selectedTagNames.join(', ');
    }
    closeTagModal();
}

// Khi người dùng click bên ngoài modal, đóng modal
window.onclick = function (event) {
    var tagModal = document.getElementById('tagModal');
    if (event.target == tagModal) {
        tagModal.style.display = "none";
    }
};

