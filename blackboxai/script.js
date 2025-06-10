// Data representing personal information
let personalData = {
  fullName: "Nguyễn Văn An",
  birthDate: "15/03/2002",
  gender: "Nam",
  address: "TP. Hồ Chí Minh",
  phone: "0123.456.789",
  email: "nguyenvanan@gmail.com",
  careerGoal:
    "Trở thành một lập trình viên Full-stack chuyên nghiệp, có khả năng phát triển các ứng dụng web hiện đại và đóng góp vào các dự án công nghệ có tác động tích cực đến cộng đồng.",
};

// Open modal and fill form fields with current data
function openEditModal() {
  const modal = document.getElementById("editModal");
  modal.setAttribute("aria-hidden", "false");

  document.getElementById("editFullName").value = personalData.fullName;
  document.getElementById("editBirthDate").value = personalData.birthDate;
  document.getElementById("editGender").value = personalData.gender;
  document.getElementById("editAddress").value = personalData.address;
  document.getElementById("editPhone").value = personalData.phone;
  document.getElementById("editEmail").value = personalData.email;
  document.getElementById("editCareerGoal").value = personalData.careerGoal;

  // Trap focus inside modal for accessibility
  trapFocus(modal);
}

// Close modal
function closeEditModal() {
  const modal = document.getElementById("editModal");
  modal.setAttribute("aria-hidden", "true");
  // Return focus to Edit button after close
  document.querySelector(".btn.cta-btn").focus();
}

// Update visible personal data on the page
function updateDisplay() {
  document.getElementById("fullName").textContent = personalData.fullName;
  document.getElementById("birthDate").textContent = personalData.birthDate;
  document.getElementById("gender").textContent = personalData.gender;
  document.getElementById("address").textContent = personalData.address;
  document.getElementById("phone").textContent = personalData.phone;
  document.getElementById("email").textContent = personalData.email;
  document.getElementById("careerGoal").textContent = personalData.careerGoal;
}

// Show temporary notification message
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.setAttribute("role", "alert");
  notification.innerHTML = `<i class="fas fa-check-circle" aria-hidden="true"></i> ${message}`;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease forwards";
    notification.addEventListener("animationend", () => {
      if (notification.parentNode)
        notification.parentNode.removeChild(notification);
    });
  }, 3000);
}

// Handle form submission to save edited info
document.getElementById("editForm").addEventListener("submit", (e) => {
  e.preventDefault();

  personalData.fullName = document.getElementById("editFullName").value.trim();
  personalData.birthDate = document
    .getElementById("editBirthDate")
    .value.trim();
  personalData.gender = document.getElementById("editGender").value;
  personalData.address = document.getElementById("editAddress").value.trim();
  personalData.phone = document.getElementById("editPhone").value.trim();
  personalData.email = document.getElementById("editEmail").value.trim();
  personalData.careerGoal = document
    .getElementById("editCareerGoal")
    .value.trim();

  updateDisplay();
  closeEditModal();
  showNotification("Thông tin đã được cập nhật thành công!");
});

// Smooth scrolling for nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    const offsetTop =
      target.offsetTop - document.querySelector(".navbar").offsetHeight;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
});

// Highlight active nav link on scroll
window.addEventListener("scroll", () => {
  const sections = Array.from(
    document.querySelectorAll("section.section, section.hero")
  );
  const scrollPos = window.scrollY + window.innerHeight / 4;

  let currentId = "";
  for (const section of sections) {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href").substring(1) === currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Profile image double-click: cycle through images
const profileImages = [
  "assets/images/profile.jpg",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=200&h=200&fit=crop&crop=face",
];
let currentImgIdx = 0;
document.getElementById("profileImg").addEventListener("dblclick", () => {
  currentImgIdx = (currentImgIdx + 1) % profileImages.length;
  const imgEl = document.getElementById("profileImg");
  imgEl.src = profileImages[currentImgIdx];
  showNotification("Ảnh đại diện đã được thay đổi!");
});

// Trap keyboard focus inside modal for accessibility
function trapFocus(element) {
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
  const focusableElements = element.querySelectorAll(focusableElementsString);
  const firstFocusableEl = focusableElements[0];
  const lastFocusableEl = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function trap(e) {
    const isTabPressed = e.key === "Tab" || e.keyCode === 9;
    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });

  // Focus first
  firstFocusableEl.focus();
}

// Close modal on clicking outside modal content
window.addEventListener("click", (e) => {
  const modal = document.getElementById("editModal");
  if (e.target === modal) {
    closeEditModal();
  }
});

// Keyboard accessibility: close modal on Escape key
window.addEventListener("keydown", (e) => {
  const modal = document.getElementById("editModal");
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeEditModal();
  }
});

// Animate skill bars on page load
window.addEventListener("load", () => {
  document.querySelectorAll(".skill-progress").forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
});
