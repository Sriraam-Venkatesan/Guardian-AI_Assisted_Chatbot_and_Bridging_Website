document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('messages-container');
    const settingsModal = document.getElementById('settings-modal');
    const settingsBtn = document.getElementById('settings-btn');
    const closeBtn = document.querySelector('.close-btn');
    const themeLightBtn = document.getElementById('theme-light');
    const themeDarkBtn = document.getElementById('theme-dark');
    const speedDetailedBtn = document.getElementById('speed-detailed');
    const speedFastBtn = document.getElementById('speed-fast');
    const apiKeyGroup = document.getElementById('api-key-group');
    const apiKeyInput = document.getElementById('api-key-input');
    const showDisclaimerCheckbox = document.getElementById('show-disclaimer');
    const resetBtn = document.getElementById('reset-btn');

    // State
    let currentSettings = {
        theme: 'light',
        speed: 'Detailed',
        apiKey: '',
        showDisclaimer: true
    };

    // --- Initialization ---
    loadSettings();
    applySettings();

    // --- Auto-resize Textarea ---
    chatInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // --- Keyboard Shortcuts ---
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // --- Event Listeners ---
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (settingsBtn) settingsBtn.addEventListener('click', () => settingsModal.style.display = 'block');
    if (closeBtn) closeBtn.addEventListener('click', () => settingsModal.style.display = 'none');
    if (resetBtn) resetBtn.addEventListener('click', () => {
        if (confirm('Clear current view?')) {
            messagesContainer.innerHTML = '';
            addWelcomeMessage();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target == settingsModal) settingsModal.style.display = 'none';
    });

    // --- Settings Logic ---
    window.setTheme = function (theme) {
        currentSettings.theme = theme;
        updateSettingsUI();
    };

    window.setSpeed = function (speed) {
        currentSettings.speed = speed;
        updateSettingsUI();
    };

    window.saveSettings = function () {
        currentSettings.apiKey = apiKeyInput.value;
        currentSettings.showDisclaimer = showDisclaimerCheckbox.checked;
        localStorage.setItem('guardianSettings', JSON.stringify(currentSettings));
        applySettings();
        settingsModal.style.display = 'none';
    };

    function loadSettings() {
        const saved = localStorage.getItem('guardianSettings');
        if (saved) {
            currentSettings = JSON.parse(saved);
            if (apiKeyInput) apiKeyInput.value = currentSettings.apiKey;
            if (showDisclaimerCheckbox) showDisclaimerCheckbox.checked = currentSettings.showDisclaimer;
        }
        updateSettingsUI();
    }

    function applySettings() {
        document.body.setAttribute('data-theme', currentSettings.theme);
    }

    function updateSettingsUI() {
        if (themeLightBtn) themeLightBtn.classList.toggle('active', currentSettings.theme === 'light');
        if (themeDarkBtn) themeDarkBtn.classList.toggle('active', currentSettings.theme === 'dark');

        if (speedDetailedBtn) speedDetailedBtn.classList.toggle('active', currentSettings.speed === 'Detailed');
        if (speedFastBtn) speedFastBtn.classList.toggle('active', currentSettings.speed === 'Fast');

        if (apiKeyGroup) apiKeyGroup.style.display = currentSettings.speed === 'Fast' ? 'block' : 'none';
    }

    // --- Chat Logic ---
    function addWelcomeMessage() {
        addMessage("Hello! I am Guardian, your legal AI assistant. How can I help you with Indian Law today?", 'bot');
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        let formattedText = text.replace(/\n/g, '<br>');
        if (sender === 'bot' && currentSettings.showDisclaimer) {
            formattedText += '<br><br><em style="font-size:0.8em; color:gray;">Disclaimer: This response is for informational purposes only and should not be considered legal advice.</em>';
        }

        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="content">${formattedText}</div>
                <div class="avatar"><div>VP</div></div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="avatar"><img src="/chatbot/Guardian.png" alt="Bot"></div>
                <div class="content">${formattedText}</div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        chatInput.value = '';
        chatInput.style.height = 'auto';
        addMessage(message, 'user');

        // Loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot-message';
        loadingDiv.innerHTML = `
            <div class="avatar"><img src="/static/Guardian.png" alt="Bot"></div>
            <div class="content">Thinking...</div>
        `;
        messagesContainer.appendChild(loadingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    speed: currentSettings.speed,
                    api_key: currentSettings.apiKey
                }),
            });
            const data = await response.json();
            messagesContainer.removeChild(loadingDiv);
            addMessage(data.reply, 'bot');
        } catch (error) {

            if (loadingDiv.parentNode) messagesContainer.removeChild(loadingDiv);
            addMessage("Sorry, I encountered an error. Please try again.", 'bot');
        }
    }

    // --- History Logic ---
    window.loadHistory = function (userMsg, botMsg) {
        messagesContainer.innerHTML = '';
        addMessage(userMsg, 'user');
        addMessage(botMsg, 'bot');
    };

    window.clearHistory = function () {
        if (confirm('Clear all session history?')) {
            fetch('/clear_history', { method: 'POST' }).then(() => location.reload());
        }
    };
    // --- Personalization ---
    const getCookie = (name) => {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    };

    const userStr = getCookie('guardianUser') || localStorage.getItem('guardianUser');
    if (userStr) {
        const userData = JSON.parse(userStr);
        const profileName = document.querySelector('.profile-info h4');
        const profileIcon = document.querySelector('.profile-icon');
        if (profileName) profileName.textContent = userData.name;
        if (profileIcon) profileIcon.textContent = userData.name.substring(0, 2).toUpperCase();


        // Update user message avatar name
        const userAvatars = document.querySelectorAll('.user-message .avatar div');
        userAvatars.forEach(av => av.textContent = userData.name.substring(0, 2).toUpperCase());
    }
});

