// CV Personal Website - JavaScript
// Author: Generated for Personal CV Website
// Description: Interactive functionality for personal CV website

// ==================== GLOBAL VARIABLES ====================
let currentTheme = 'light';
let isScrolling = false;

// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ==================== INITIALIZATION ====================
function initializeWebsite() {
    // Ẩn loading screen sau khi tải xong
    setTimeout(hideLoadingScreen, 1500);
    
    // Khởi tạo các chức năng
    initializeNavigation();
    initializeScrollEffects();
    initializeTypingEffect();
    initializeSkillBars();
    initializeProfileImage();
    initializeContactForm();
    initializeTheme();
    
    // Thêm event listeners
    addEventListeners();
    
    console.log('Website initialized successfully!');
}

// ==================== LOADING SCREEN ====================
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// ==================== NAVIGATION ====================
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    // Sticky navigation on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // Mobile navigation toggle
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                smoothScrollTo(targetSection);
                
                // Update active nav link
                updateActiveNavLink(this);
                
                // Close mobile navigation
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function smoothScrollTo(element) {
    const offsetTop = element.offsetTop - 80;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// ==================== SCROLL EFFECTS ====================
function initializeScrollEffects() {
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const personalSection = document.getElementById('personal');
            if (personalSection) {
                smoothScrollTo(personalSection);
            }
        });
    }
    
    // Parallax effect for banner
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const banner = document.querySelector('.banner');
        
        if (banner && scrolled < window.innerHeight) {
            banner.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Show/hide scroll to top button
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            if (scrolled > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }
        
        // Update active navigation based on scroll position
        updateNavigationOnScroll();
    });
    
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function updateNavigationOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ==================== TYPING EFFECT ====================
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Nguyễn Văn An',
        'Web Developer',
        'IT Student',
        'Tech Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseTime = 2000;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let nextTimeout = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            nextTimeout = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, nextTimeout);
    }
    
    // Start typing effect
    setTimeout(typeText, 1000);
}

// ==================== SKILL BARS ANIMATION ====================
function initializeSkillBars() {
    // Initialize skill bars (set width to 0 initially)
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// ==================== PROFILE IMAGE ====================
function initializeProfileImage() {
    const profileImg = document.getElementById('profileImg');
    const imageOverlay = document.querySelector('.image-overlay');
    
    if (!profileImg || !imageOverlay) return;
    
    // Double click to change profile image
    profileImg.addEventListener('dblclick', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImg.src = e.target.result;
                    showNotification('Ảnh profile đã được cập nhật!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
        
        input.click();
    });
    
    // Show overlay on hover
    const profileContainer = document.querySelector('.profile-image-container');
    if (profileContainer) {
        profileContainer.addEventListener('mouseenter', function() {
            imageOverlay.style.opacity = '1';
        });
        
        profileContainer.addEventListener('mouseleave', function() {
            imageOverlay.style.opacity = '0';
        });
    }
}

// ==================== CONTACT FORM ====================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                // Simulate form submission
                submitContactForm(data);
            }
        });
    }
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Vui lòng nhập họ tên hợp lệ');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Vui lòng nhập email hợp lệ');
    }
    
    if (!data.subject || data.subject.trim().length < 5) {
        errors.push('Vui lòng nhập chủ đề (ít nhất 5 ký tự)');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Vui lòng nhập tin nhắn (ít nhất 10 ký tự)');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitContactForm(data) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Tin nhắn đã được gửi thành công! Tôi sẽ liên hệ lại sớm.', 'success');
        
        console.log('Contact form submitted:', data);
    }, 2000);
}

// ==================== EDIT MODAL ====================
function openEditModal() {
    const modal = document.getElementById('editModal');
    if (!modal) return;
    
    // Populate form with current data
    populateEditForm();
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (!modal) return;
    
    // Animation
    modal.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(0.9)';
    modal.querySelector('.modal-content').style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function populateEditForm() {
    // Get current values from the page
    document.getElementById('editFullName').value = document.getElementById('fullName').textContent;
    document.getElementById('editBirthDate').value = document.getElementById('birthDate').textContent;
    document.getElementById('editGender').value = document.getElementById('gender').textContent;
    document.getElementById('editPhone').value = document.getElementById('phone').textContent;
    document.getElementById('editAddress').value = document.getElementById('address').textContent;
    document.getElementById('editEmail').value = document.getElementById('email').textContent;
    document.getElementById('editSchool').value = document.getElementById('school').textContent;
    document.getElementById('editCareerGoal').value = document.getElementById('careerGoal').textContent;
}

function handleEditFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Update page content
    updatePersonalInfo(data);
    
    // Close modal
    closeEditModal();
    
    // Show success message
    showNotification('Thông tin đã được cập nhật thành công!', 'success');
}

function updatePersonalInfo(data) {
    // Update personal information on the page
    if (data.fullName) {
        document.getElementById('fullName').textContent = data.fullName;
        document.title = `CV Cá Nhân - ${data.fullName}`;
    }
    
    if (data.birthDate) document.getElementById('birthDate').textContent = data.birthDate;
    if (data.gender) document.getElementById('gender').textContent = data.gender;
    if (data.phone) document.getElementById('phone').textContent = data.phone;
    if (data.address) document.getElementById('address').textContent = data.address;
    if (data.email) document.getElementById('email').textContent = data.email;
    if (data.school) document.getElementById('school').textContent = data.school;
    if (data.careerGoal) document.getElementById('careerGoal').textContent = data.careerGoal;
    
    console.log('Personal information updated:', data);
}

// ==================== THEME TOGGLE ====================
function initializeTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('cvTheme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');
        updateThemeIcon();
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
    
    // Save theme preference
    localStorage.setItem('cvTheme', currentTheme);
    
    // Update theme icon
    updateThemeIcon();
    
    // Show notification
    const themeText = currentTheme === 'dark' ? 'tối' : 'sáng';
    showNotification(`Đã chuyển sang chế độ ${themeText}`, 'info');
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ==================== SCROLL TO TOP ====================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// ==================== EVENT LISTENERS ====================
function addEventListeners() {
    // Edit form submission
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditFormSubmit);
    }
    
    // Modal close on backdrop click
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeEditModal();
            }
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Close modal with Escape key
        if (e.key === 'Escape') {
            closeEditModal();
        }
        
        // Theme toggle with Ctrl/Cmd + D
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
        }
        
        // Smooth scroll to top with Home key
        if (e.key === 'Home' && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Social links animation
    const socialLinks = document.querySelectorAll('.social-link, .social-link-card');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Certificate items animation
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Hobby items animation
    const hobbyItems = document.querySelectorAll('.hobby-item');
    hobbyItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// ==================== UTILITY FUNCTIONS ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    updateNavigationOnScroll();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Đã xảy ra lỗi. Vui lòng thử lại!', 'error');
});

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log(`
%c🎉 Welcome to My Personal CV Website! 🎉
%cDeveloped with ❤️ by Nguyễn Văn An
%c
✨ Features:
• Interactive navigation with smooth scrolling
• Dynamic theme switching (light/dark)
• Animated skill bars and typing effects
• Editable personal information
• Responsive design for all devices
• Contact form with validation
• Profile image upload functionality

🔧 Tech Stack: HTML5, CSS3, Vanilla JavaScript
📱 Fully responsive and mobile-friendly
🎨 Modern UI with beautiful animations

Press Ctrl+D (or Cmd+D) to toggle theme!
`, 
'color: #007bff; font-size: 16px; font-weight: bold;',
'color: #28a745; font-size: 14px;',
'color: #6c757d; font-size: 12px;'
);

// ==================== EXPORT FOR TESTING ====================
// Export functions for potential testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updatePersonalInfo,
        validateContactForm,
        isValidEmail,
        toggleTheme,
        showNotification
    };
}