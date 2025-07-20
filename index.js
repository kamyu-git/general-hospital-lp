// DOM要素の取得
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// モバイルメニューの切り替え
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// ナビゲーションリンクのクリック時にモバイルメニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// スクロール時のヘッダー背景変更
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// スムーズスクロールの実装（古いブラウザ対応）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// スクロール時のアニメーション
const observeElements = () => {
    const elements = document.querySelectorAll('.department-card, .doctor-card, .contact-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(element => {
        element.classList.add('scroll-fade');
        observer.observe(element);
    });
};

// カウントアップアニメーション（数値表示用）
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);

        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
};

// ヒーローセクションのタイピングエフェクト
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';

    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// パーティクルエフェクト（ヒーローセクション用）
const createParticles = () => {
    const hero = document.querySelector('.hero');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }

    // パーティクルのアニメーションCSSを動的に追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
};

// カードのホバーエフェクト強化
const enhanceCardEffects = () => {
    const cards = document.querySelectorAll('.department-card, .doctor-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            e.target.style.setProperty('--mouse-x', x + 'px');
            e.target.style.setProperty('--mouse-y', y + 'px');
        });
    });
};

// スクロール進捗バーの追加
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// 診療科目カードのクリックイベント
const addDepartmentClickEvents = () => {
    const departmentCards = document.querySelectorAll('.department-card');

    departmentCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').textContent;

            // カード選択のビジュアルフィードバック
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);

            // 実際のアプリケーションでは、ここで詳細ページへの遷移や
            // モーダルの表示などを行う
            console.log(`${title}の詳細を表示`);
        });
    });
};

// フォームバリデーション（お問い合わせフォームが追加された場合用）
const setupFormValidation = () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // バリデーションロジック
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4757';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (isValid) {
                // フォーム送信処理
                showNotification('お問い合わせを受け付けました', 'success');
            } else {
                showNotification('必須項目をご入力ください', 'error');
            }
        });
    });
};

// 通知システム
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // アニメーション
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // 自動削除
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};

// 電話番号クリック時の処理
const setupPhoneClick = () => {
    const phoneElements = document.querySelectorAll('[href^="tel:"]');

    phoneElements.forEach(element => {
        element.addEventListener('click', () => {
            showNotification('電話アプリを起動しています...', 'info');
        });
    });
};

// 年末年始・祝日の診療時間表示
const updateHolidayInfo = () => {
    const now = new Date();
    const isHoliday = now.getDay() === 0 || now.getDay() === 6; // 土日

    if (isHoliday) {
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            const holidayNotice = document.createElement('div');
            holidayNotice.style.cssText = `
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 2rem;
                text-align: center;
                color: #856404;
            `;
            holidayNotice.innerHTML = `
                <i class="fas fa-info-circle"></i>
                本日は休診日です。緊急の場合は救急外来をご利用ください。
            `;
            contactSection.querySelector('.container').insertBefore(
                holidayNotice,
                contactSection.querySelector('.contact-content')
            );
        }
    }
};

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // 基本機能の初期化
    observeElements();
    enhanceCardEffects();
    createScrollProgress();
    addDepartmentClickEvents();
    setupFormValidation();
    setupPhoneClick();
    updateHolidayInfo();

    // パーティクルエフェクト（パフォーマンスを考慮して条件付き）
    if (window.innerWidth > 768) {
        createParticles();
    }

    // ページ読み込み完了後の処理
    window.addEventListener('load', () => {
        // ローディングアニメーションの終了（必要に応じて）
        document.body.classList.add('loaded');

        // 初期スクロール位置の調整
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    });
});

// ウィンドウリサイズ時の処理
window.addEventListener('resize', () => {
    // モバイルメニューのリセット
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// パフォーマンス監視（開発時用）
if (window.performance && window.performance.mark) {
    window.performance.mark('script-end');
    window.performance.measure('script-execution', 'script-start', 'script-end');
}
