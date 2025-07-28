// Script principal pour le site Kali Linux
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des fonctionnalités
    initNavigation();
    initTypingEffect();
    initScrollEffects();
    initToolsFilter();
    initAnimations();
    initParallax();
});

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Menu hamburger pour mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fermer le menu mobile quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navigation active selon la section
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Effet de transparence de la navbar
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Scroll fluide pour les liens d'ancrage
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== EFFET DE FRAPPE =====
function initTypingEffect() {
    const typedText = document.getElementById('typed-text');
    const commands = [
        'apt update && apt upgrade',
        'nmap -sS -O target.com',
        'msfconsole',
        'use exploit/multi/handler',
        'set payload windows/meterpreter/reverse_tcp',
        'run',
        'sessions -l',
        'whoami',
        'Welcome to Kali Linux!'
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentCommand = commands[commandIndex];

        if (isDeleting) {
            typedText.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentCommand.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
        }

        setTimeout(type, typingSpeed);
    }

    if (typedText) {
        type();
    }
}

// ===== EFFETS DE SCROLL =====
function initScrollEffects() {
    // Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Animations spécifiques par type d'élément
                if (entry.target.classList.contains('qqoqcp-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 300);
                }

                if (entry.target.classList.contains('tool-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 200);
                }
            }
        });
    }, observerOptions);

    // Éléments à observer
    const elementsToObserve = document.querySelectorAll(
        '.qqoqcp-card, .tool-card, .advantage-card, .warning-card, .recommendation-card, .section-title'
    );

    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Parallax pour le hero (désactivé pour éviter les conflits)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        // Réduire l'effet parallax pour éviter les chevauchements
        if (hero && scrolled < window.innerHeight) {
            const parallaxSpeed = 0.2;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===== FILTRE DES OUTILS =====
function initToolsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mise à jour des boutons actifs
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-category');

            // Animation de sortie
            toolCards.forEach(card => {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
            });

            // Filtrage après l'animation
            setTimeout(() => {
                toolCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            }, 300);
        });
    });
}

// ===== ANIMATIONS AVANCÉES =====
function initAnimations() {
    // Animation des statistiques du hero
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;

                if (finalValue.includes('+')) {
                    animateNumber(target, 0, parseInt(finalValue), 2000, '+');
                } else if (finalValue.includes('%')) {
                    animateNumber(target, 0, parseInt(finalValue), 1500, '%');
                } else {
                    animateNumber(target, 2010, parseInt(finalValue), 1000);
                }

                statsObserver.unobserve(target);
            }
        });
    });

    stats.forEach(stat => statsObserver.observe(stat));

    // Animation des cartes au hover
    const cards = document.querySelectorAll('.qqoqcp-card, .tool-card, .advantage-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    // Effet de glitch sur le titre principal
    const title = document.querySelector('.hero-title');
    if (title) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% de chance
                title.style.textShadow = `
                    2px 0 #ff0040,
                    -2px 0 #00d4ff,
                    0 0 30px rgba(0, 255, 65, 0.5)
                `;
                setTimeout(() => {
                    title.style.textShadow = '0 0 30px rgba(0, 255, 65, 0.5)';
                }, 100);
            }
        }, 3000);
    }
}

// ===== PARALLAX ET EFFETS 3D =====
function initParallax() {
    // Effet de parallax sur les particules
    const particles = document.getElementById('particles');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        if (particles) {
            particles.style.transform = `translateY(${rate}px)`;
        }
    });

    // Effet de mouvement de la souris sur les cartes
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.tool-card, .qqoqcp-card');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = (rect.left + rect.width / 2) / window.innerWidth;
            const cardY = (rect.top + rect.height / 2) / window.innerHeight;

            const deltaX = x - cardX;
            const deltaY = y - cardY;

            const rotateX = deltaY * 10;
            const rotateY = deltaX * -10;

            if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    });
}

// ===== FONCTIONS UTILITAIRES =====
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * easeOutQuart(progress));
        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// ===== EASTER EGGS =====
// Konami Code Easter Egg
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateMatrixMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateMatrixMode() {
    // Créer l'effet Matrix
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.id = 'matrix-bg';
    matrixCanvas.style.position = 'fixed';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.width = '100%';
    matrixCanvas.style.height = '100%';
    matrixCanvas.style.zIndex = '-1';
    matrixCanvas.style.opacity = '0.3';
    document.body.appendChild(matrixCanvas);

    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const matrixInterval = setInterval(drawMatrix, 50);

    // Afficher un message
    setTimeout(() => {
        alert('🎯 Mode Matrix activé ! Bienvenue dans la matrice, hacker !');
    }, 1000);

    // Désactiver après 30 secondes
    setTimeout(() => {
        clearInterval(matrixInterval);
        matrixCanvas.remove();
    }, 30000);
}

// ===== GESTION DES ERREURS ET PERFORMANCE =====
// Gestion des erreurs JavaScript
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
});

// Optimisation des performances
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Mise à jour des animations ici
    ticking = false;
}

// Debounce pour les événements de resize
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

const debouncedResize = debounce(() => {
    // Recalculer les positions et tailles si nécessaire
    const matrixCanvas = document.getElementById('matrix-bg');
    if (matrixCanvas) {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// ===== EFFETS SUPPLÉMENTAIRES =====
// Effet de scanning sur les cartes
function addScanEffect() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .scan-effect {
            position: relative;
            overflow: hidden;
        }
        
        .scan-effect::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(0, 255, 65, 0.2), 
                transparent);
            transform: translateX(-100%);
            animation: scan 2s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

// Ajouter l'effet de scan aux cartes au clic
document.addEventListener('click', (e) => {
    const card = e.target.closest('.tool-card, .qqoqcp-card, .advantage-card');
    if (card) {
        card.classList.add('scan-effect');
        setTimeout(() => {
            card.classList.remove('scan-effect');
        }, 2000);
    }
});

// ===== SYSTÈME DE NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'warning' ? 'exclamation' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
    `;

    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--primary-color);
        border-radius: 8px;
        padding: 15px 20px;
        color: var(--text-primary);
        font-family: var(--font-primary);
        box-shadow: var(--glow);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Suppression automatique
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== INTERACTIONS AVANCÉES =====
// Double-clic sur les cartes d'outils pour plus d'infos
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('dblclick', () => {
        const toolName = card.querySelector('h3').textContent;
        showNotification(`🔧 ${toolName} - Double-clic détecté ! Consultez la documentation officielle pour plus d'infos.`, 'info');
    });
});

// Clic droit sur les cartes pour des options contextuelles
document.addEventListener('contextmenu', (e) => {
    const card = e.target.closest('.tool-card');
    if (card) {
        e.preventDefault();
        const toolName = card.querySelector('h3').textContent;

        // Créer un menu contextuel simple
        const contextMenu = document.createElement('div');
        contextMenu.innerHTML = `
            <div style="
                position: fixed;
                top: ${e.clientY}px;
                left: ${e.clientX}px;
                background: var(--bg-card);
                border: 1px solid var(--primary-color);
                border-radius: 5px;
                padding: 10px;
                color: var(--text-primary);
                font-family: var(--font-primary);
                font-size: 0.9rem;
                box-shadow: var(--glow);
                z-index: 10000;
            ">
                📖 Documentation de ${toolName}<br>
                🔍 Plus d'informations<br>
                ⚡ Exemples d'utilisation
            </div>
        `;

        document.body.appendChild(contextMenu);

        // Supprimer le menu après 3 secondes ou au clic
        setTimeout(() => contextMenu.remove(), 3000);
        document.addEventListener('click', () => contextMenu.remove(), { once: true });
    }
});

// ===== RACCOURCIS CLAVIER =====
document.addEventListener('keydown', (e) => {
    // Ctrl + / pour afficher les raccourcis
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        showKeyboardShortcuts();
    }

    // Échap pour fermer les modales
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal, .notification');
        modals.forEach(modal => modal.remove());
    }

    // Navigation au clavier
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                e.preventDefault();
                document.getElementById('qqoqcp').scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                e.preventDefault();
                document.getElementById('outils').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

function showKeyboardShortcuts() {
    const shortcuts = `
        <div class="modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div style="
                background: var(--bg-card);
                border: 1px solid var(--primary-color);
                border-radius: 10px;
                padding: 30px;
                color: var(--text-primary);
                font-family: var(--font-primary);
                max-width: 500px;
                box-shadow: var(--glow);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 20px;">
                    ⌨️ Raccourcis clavier
                </h3>
                <div style="line-height: 1.8;">
                    <strong>Ctrl + /</strong> - Afficher les raccourcis<br>
                    <strong>Alt + 1</strong> - Aller à l'introduction<br>
                    <strong>Alt + 2</strong> - Aller au QQOQCP<br>
                    <strong>Alt + 3</strong> - Aller aux outils<br>
                    <strong>Échap</strong> - Fermer les modales<br>
                    <strong>↑↑↓↓←→←→BA</strong> - Easter egg 😉
                </div>
                <button onclick="this.closest('.modal').remove()" style="
                    margin-top: 20px;
                    background: var(--primary-color);
                    color: var(--bg-dark);
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: var(--font-primary);
                ">
                    Fermer
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', shortcuts);
}

// ===== INITIALISATION FINALE =====
// Message de bienvenue dans la console
console.log(`
██╗  ██╗ █████╗ ██╗     ██╗    ██╗     ██╗███╗   ██╗██╗   ██╗██╗  ██╗
██║ ██╔╝██╔══██╗██║     ██║    ██║     ██║████╗  ██║██║   ██║╚██╗██╔╝
█████╔╝ ███████║██║     ██║    ██║     ██║██╔██╗ ██║██║   ██║ ╚███╔╝ 
██╔═██╗ ██╔══██║██║     ██║    ██║     ██║██║╚██╗██║██║   ██║ ██╔██╗ 
██║  ██╗██║  ██║███████╗██║    ███████╗██║██║ ╚████║╚██████╔╝██╔╝ ██╗
╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝    ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝

🎯 Site développé avec passion pour la cybersécurité
🔧 Fonctionnalités Easter Eggs activées !
📚 Utilisez Ctrl + / pour voir les raccourcis clavier
`);

// Message d'accueil pour les développeurs curieux
console.log('%c🕵️ Hacker curieux détecté !', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%cTu inspectes le code ? Excellent réflexe de sécurité ! 🛡️', 'color: #00d4ff;');
console.log('%cCe site est conçu pour sensibiliser à la cybersécurité.', 'color: #ffffff;');
console.log('%cUtilise tes connaissances de façon éthique ! 🎓', 'color: #ffaa00;');

// Affichage des informations système
console.log('🖥️ Informations système:');
console.log(`📱 User Agent: ${navigator.userAgent}`);
console.log(`🌐 Langue: ${navigator.language}`);
console.log(`📺 Résolution: ${screen.width}x${screen.height}`);
console.log(`⚡ Connexion: ${navigator.connection ? navigator.connection.effectiveType : 'inconnue'}`);

// Initialisation des styles CSS personnalisés
addScanEffect();

// Notification de bienvenue
setTimeout(() => {
    showNotification('🚀 Bienvenue sur le site Kali Linux ! Explorez les fonctionnalités.', 'success');
}, 2000);