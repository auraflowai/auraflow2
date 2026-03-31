document.addEventListener('DOMContentLoaded', () => {

    /* --- Global Cursor Glow --- */
    const cursorGlow = document.getElementById('globalCursorGlow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    });

    /* --- Service & Portfolio Cards Cursor Follow Light Effect --- */
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* --- Scroll Reveal Animations --- */
    const reveals = document.querySelectorAll('.fade-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active'); 
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(reveal => revealObserver.observe(reveal));

    /* --- Live Dashboard Simulation --- */
    const countAuto = document.getElementById('db-automations');
    const countUsers = document.getElementById('db-users');
    const chartContainer = document.getElementById('db-chart');

    // Dynamic Numbers
    setInterval(() => {
        let currentAuto = parseInt(countAuto.innerText.replace(',', ''));
        countAuto.innerText = (currentAuto + Math.floor(Math.random() * 2)).toLocaleString();
        
        let currentUsers = parseInt(countUsers.innerText);
        let change = Math.floor(Math.random() * 7) - 3; 
        countUsers.innerText = Math.max(10, currentUsers + change);
    }, 3000);

    // Dynamic Chart Bars
    setInterval(() => {
        chartContainer.innerHTML = '';
        for(let i=0; i<8; i++) {
            let height = Math.floor(Math.random() * 60) + 30; 
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${height}%`;
            chartContainer.appendChild(bar);
        }
    }, 2500);

    // Initial Bars setup
    for(let i=0; i<8; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${Math.floor(Math.random() * 60) + 30}%`;
        chartContainer.appendChild(bar);
    }

    /* --- Toast Notification System --- */
    const toastContainer = document.getElementById('toastContainer');
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 4500);
    }

    setTimeout(() => showToast("🚀 New automation deployed"), 2000);
    setInterval(() => showToast("New client connected"), 12000);

    /* --- 5s Lead Capture Popup --- */
    const leadPopup = document.getElementById('leadPopup');
    const closeLeadPopup = document.getElementById('closeLeadPopup');
    setTimeout(() => {
        leadPopup.classList.add('show');
    }, 5000);
    closeLeadPopup.addEventListener('click', () => {
        leadPopup.classList.remove('show');
    });

    /* --- AI Chatbot Logic --- */
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    let hasOpenedChat = false;

    // Initial bot greeting setup
    const initialGreeting = "Hi 👋 I’m the AI assistant of AuraFlow AI.\nI can help you with website development, AI automation, chatbots, and landing pages.\nTell me what you want to build.";

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if(!hasOpenedChat) {
            hasOpenedChat = true;
            setTimeout(() => botReply(initialGreeting), 500);
        }
    });
    chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        
        if(sender === 'bot') {
            msgDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            setTimeout(() => {
                msgDiv.innerHTML = ''; // Remove typing dots
                let i = 0;
                let typingInterval = setInterval(() => {
                    // Use textContent to preserve \n as line breaks due to white-space: pre-wrap
                    msgDiv.textContent += text.charAt(i);
                    i++;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    if(i >= text.length) clearInterval(typingInterval);
                }, 30); 
            }, 1200); 
        } else {
            msgDiv.innerText = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function botReply(text) {
        appendMessage('bot', text);
    }

    function handleUserInput() {
        const text = chatInput.value.trim();
        if(!text) return;
        
        appendMessage('user', text);
        chatInput.value = '';
        
        let lower = text.toLowerCase();
        
        // Default reply
        let reply = "I understand. Could you share more details? You can also click the WhatsApp button to chat directly with Shivam.";
        
        // Business logic keyword detection
        if (lower.includes('price') || lower.includes('cost') || lower.includes('charge') || lower.includes('fee') || lower.includes('budget')) {
            reply = "Price depends on project requirements.\n\nBasic Website: ₹5,000 – ₹15,000\nProfessional Website: ₹15,000 – ₹40,000\nAI Automation System: ₹10,000 – ₹50,000+\n\nTell me:\n• type of project\n• features needed\n• timeline\n\nI can give exact estimate.";
        } else if (lower.includes('time') || lower.includes('days') || lower.includes('how long') || lower.includes('duration')) {
            reply = "Typical timeline:\n\nSimple website: 2 – 4 days\nProfessional website: 5 – 10 days\nAI automation: 7 – 14 days\n\nTimeline depends on features.";
        } else if (lower.includes('demo') || lower.includes('portfolio') || lower.includes('example') || lower.includes('work')) {
            reply = "You can view demo projects in the Portfolio section of this website.\n\nIf you want a custom demo, tell me your business type.";
        } else if (lower.includes('contact') || lower.includes('reach') || lower.includes('call') || lower.includes('whatsapp') || lower.includes('phone')) {
            reply = "You can contact easily:\n\n• fill the contact form\n• click WhatsApp button\n• describe your project idea\n\nResponse time: within 24 hours.";
        } else if (lower.includes('what do you do') || lower.includes('about') || lower.includes('services')) {
            reply = "AuraFlow AI creates modern websites and AI automation systems that help businesses get more customers and save time.";
        } else if (lower.includes('build') || lower.includes('make') || lower.includes('need') || lower.includes('want') || lower.includes('website') || lower.includes('automation') || lower.includes('bot')) {
            reply = "Great! To help you better, please tell me:\n\n• What type of website or automation do you need?\n• What is your business type?\n• What features do you want?\n• When do you need it completed?";
        } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
            reply = initialGreeting;
        }
        
        botReply(reply);
    }

    chatSend.addEventListener('click', handleUserInput);
    chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleUserInput();
    });

    /* --- Strict Form Validation & WA Submission --- */
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fName = document.getElementById('fname');
        const fPhone = document.getElementById('fphone');
        const fEmail = document.getElementById('femail');
        const fMessage = document.getElementById('fmessage');
        
        let isValid = true;

        document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));

        // Name Validation
        if(fName.value.trim().length < 3) {
            fName.parentElement.classList.add('error');
            isValid = false;
        }

        // Phone Validation
        const cleanPhone = fPhone.value.replace(/\D/g, ''); 
        if(cleanPhone.length !== 10) {
            fPhone.parentElement.classList.add('error');
            isValid = false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(fEmail.value.trim())) {
            fEmail.parentElement.classList.add('error');
            isValid = false;
        }

        // Message Validation
        if(fMessage.value.trim().length < 10) {
            fMessage.parentElement.classList.add('error');
            isValid = false;
        }

        // Submission Logic
        if(isValid) {
            const waText = `Hello Shivam,\nMy name is ${fName.value.trim()}\nPhone: ${cleanPhone}\nEmail: ${fEmail.value.trim()}\nProject Details:\n${fMessage.value.trim()}`;
            const encodedText = encodeURIComponent(waText);
            const waUrl = `https://wa.me/919369968586?text=${encodedText}`;
            window.open(waUrl, '_blank');
        }
    });

    // Auto format phone input to numbers only while typing
    document.getElementById('fphone').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').substring(0,10);
    });
});
