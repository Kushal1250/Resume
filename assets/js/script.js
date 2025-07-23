
        // Global variables
        let isLoading = true;
        let currentTheme = 'dark';
        let particleCount = 0;
        let searchIndex = [];

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
        });

        function initializeApp() {
            // Simulate loading time
            setTimeout(() => {
                hideLoadingScreen();
                initializeParticles();
                setupEventListeners();
                initializeTypingAnimation();
                animateSkillBars();
                updateProgressBar();
                setupScrollEffects();
                initializeStats();
            }, 2000);
        }

        function hideLoadingScreen() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                isLoading = false;
            }, 500);
        }

        function initializeParticles() {
            const container = document.getElementById('particlesContainer');
            for (let i = 0; i < 50; i++) {
                createParticle(container);
            }
        }

        function createParticle(container) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 30000);
        }

        function setupEventListeners() {
            // Theme toggle
            const themeToggle = document.getElementById('themeToggle');
            themeToggle.addEventListener('click', toggleTheme);

            // Back to top button
            const backToTop = document.getElementById('backToTop');
            backToTop.addEventListener('click', scrollToTop);

            // Contact form
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', handleFormSubmit);

            // Modal
            const modal = document.getElementById('modal');
            const closeModal = document.getElementById('closeModal');
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Scroll event for progress bar and back to top
            window.addEventListener('scroll', handleScroll);

            // Continuous particle generation
            setInterval(() => {
                const container = document.getElementById('particlesContainer');
                if (container.children.length < 50) {
                    createParticle(container);
                }
            }, 1000);

            // Sidebar download button
            document.getElementById('sidebarDownloadCV').addEventListener('click', function(e) {
                e.preventDefault();
                downloadResume();
            });
        }

        function toggleTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (currentTheme === 'dark') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.classList.add('active');
        currentTheme = 'light';
        showFlashNotification('Switched to Light Mode', 'info');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.classList.remove('active');
        currentTheme = 'dark';
        showFlashNotification('Switched to Dark Mode', 'info');
    }
    
    // Flash effect for theme transition
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = currentTheme === 'dark' ? 'white' : 'black';
    flash.style.opacity = '0.5';
    flash.style.zIndex = '10000';
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.transition = 'opacity 0.5s ease';
        flash.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 500);
    }, 100);
}

        function handleEmailClick() {
    const email = 'KUSHALPATEL.ict22@adaniuni.ac.in';
    copyToClipboard(email);
    showFlashNotification('Email copied to clipboard', 'success');
}

        function handlePhoneClick() {
    const phone = '+919016261380';
    copyToClipboard(phone);
    showFlashNotification('Phone number copied to clipboard', 'success');
}

        function showFlashNotification(message, type = 'info') {
    const flashNotification = document.getElementById('flashNotification');
    flashNotification.textContent = message;
    flashNotification.className = `flash-notification ${type} show`;
    
    // Remove after animation completes
    setTimeout(() => {
        flashNotification.classList.remove('show');
    }, 3000);
}

        function printResume() {
            window.print();
        }

       function downloadResume() {
    //function downloadResume() {
    // Create a download link for the resume
    const link = document.createElement('a');
    link.href = './Kushal-Resume.pdf';
    link.download = 'Kushal_Patel_Resume.pdf';
    link.click();
    showFlashNotification('Resume download started', 'success');
}

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            e.target.reset();
        }

        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            // Update progress bar
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = scrollPercent + '%';
            
            // Show/hide back to top button
            const backToTop = document.getElementById('backToTop');
            if (scrollTop > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        }

        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.classList.remove('section-visible');
                section.classList.add('section-hidden');
            });
            
            // Show selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.remove('section-hidden');
                targetSection.classList.add('section-visible');
            }
            
            // Update navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            event.target.classList.add('active');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function initializeTypingAnimation() {
            const typingText = document.querySelector('.typing-text');
            const texts = [
                'Crafting digital experiences with passion...',
                'Building the future with AI and ML...',
                'Creating scalable web applications...',
                'Transforming ideas into reality...'
            ];
            
            let currentTextIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            
            function type() {
                const currentText = texts[currentTextIndex];
                
                if (isDeleting) {
                    typingText.textContent = currentText.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                } else {
                    typingText.textContent = currentText.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                }
                
                if (!isDeleting && currentCharIndex === currentText.length) {
                    setTimeout(() => {
                        isDeleting = true;
                    }, 2000);
                } else if (isDeleting && currentCharIndex === 0) {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                }
                
                setTimeout(type, isDeleting ? 50 : 100);
            }
            
            type();
        }

        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }

        function updateProgressBar() {
            // This is handled in the scroll event
        }

        function setupScrollEffects() {
            // Add intersection observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                    }
                });
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.card-hover').forEach(card => {
                observer.observe(card);
            });
        }

        function initializeStats() {
            const stats = [
                { id: 'projectsCount', value: 15, suffix: '+' },
                { id: 'experienceYears', value: 0, suffix: '' },
                { id: 'certificationsCount', value: 12, suffix: '+' },
                { id: 'technologiesCount', value: 20, suffix: '+' }
            ];

            stats.forEach(stat => {
                animateNumber(stat.id, stat.value, stat.suffix);
            });
        }

        function animateNumber(elementId, targetValue, suffix = '') {
            const element = document.getElementById(elementId);
            let currentValue = 0;
            const increment = targetValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    clearInterval(timer);
                    element.textContent = targetValue + suffix;
                } else {
                    element.textContent = Math.floor(currentValue) + suffix;
                }
            }, 20);
        }

        function showNotification(message, type) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text);
            showNotification('Copied to clipboard!', 'success');
        }
        function showDownloadMessage(message) {
    showFlashNotification(message, 'success');
}
   
