// Dictionary mapping for the application languages seen in Screenshot (2883).jpg
const translations = {
    "en": {
        "title": "RICHARD'S ACADEMY",
        "welcome": "WELCOME BACK, STUDENT",
        "profiles": "Profiles",
        "appearance": "Appearance",
        "language": "Language",
        "logout": "Log Out",
        "select_lang": "SELECT APPLICATION LANGUAGE"
    },
    "tl": { // Tagalog
        "title": "AKADEMYA NI RICHARD",
        "welcome": "MALIGAYANG PAGBABALIK, ESTUDYANTE",
        "profiles": "Mga Profil",
        "appearance": "Itsura",
        "language": "Wika",
        "logout": "Mag-log Out",
        "select_lang": "PILIIN ANG WIKA NG APLESYON"
    },
    "ceb": { // Bisaya / Cebuano
        "title": "AKADEMYA NI RICHARD",
        "welcome": "MAAYONG PAGBALIK, ESTUDYANTE",
        "profiles": "Mga Profile",
        "appearance": "Panagway",
        "language": "Pinulongan",
        "logout": "Gawas sa Account",
        "select_lang": "PILI-A ANG PINULONGAN SA APPLIKASYON"
    },
    "es": { // Español
        "title": "ACADEMIA DE RICHARD",
        "welcome": "BIENVENIDO DE NUEVO, ESTUDIANTE",
        "profiles": "Perfiles",
        "appearance": "Apariencia",
        "language": "Idioma",
        "logout": "Cerrar Sesión",
        "select_lang": "SELECCIONAR IDIOMA DE LA APLICACIÓN"
    },
    "zh": { // 中文
        "title": "理查德学院",
        "welcome": "欢迎回来，学生",
        "profiles": "个人资料",
        "appearance": "外观",
        "language": "语言",
        "logout": "登出",
        "select_lang": "选择应用语言"
    },
    "ja": { // 日本語
        "title": "リチャーズ アカデミー",
        "welcome": "おかえりなさい、学生",
        "profiles": "プロフィール",
        "appearance": "外観",
        "language": "言語",
        "logout": "ログアウト",
        "select_lang": "アプリケーション言語の選択"
    }
};

// Function to change the application layout language
function setLanguage(langCode) {
    if (!translations[langCode]) return;
    
    // Find all HTML elements with the data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[langCode][key]) {
            element.textContent = translations[langCode][key];
        }
    });

    // Persist choice
    localStorage.setItem('preferredLanguage', langCode);
}

// Hook up the dropdown selector from Screenshot (2883).jpg
document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('langSelect') || document.querySelector('.language-select-dropdown');
    
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    // Load saved preference or default to English
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    if (langSelect) langSelect.value = savedLang;
    setLanguage(savedLang);
});