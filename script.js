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

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if(!hasOpenedChat) {
            hasOpenedChat = true;
            setTimeout(() => botReply("Hi 👋 Need automation for your business?"), 500);
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
                msgDiv.innerHTML = '';
                let i = 0;
                let typingInterval = setInterval(() => {
                    msgDiv.innerHTML += text.charAt(i);
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
        let reply = "I can guide you! Shivam specializes in this. Want to hop on a call?";
        
        if(lower.includes('hello') || lower.includes('hi ')) reply = "Hello there! How can we scale your business today?";
        else if(lower.includes('price') || lower.includes('cost')) reply = "Pricing depends on the scope of the systems. Starter plans begin around custom strategy discussions to ensure high ROI.";
        else if(lower.includes('ai') || lower.includes('automation')) reply = "AuraFlow creates AI agents that automate your redundant tasks, support, and internal workflows seamlessly.";
        else if(lower.includes('website') || lower.includes('web')) reply = "We engineer high-conversion websites designed purely to turn visitors into paying clients.";
        
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

        if(fName.value.trim().length < 3) {
            fName.parentElement.classList.add('error');
            isValid = false;
        }

        const cleanPhone = fPhone.value.replace(/\D/g, ''); 
        if(cleanPhone.length !== 10) {
            fPhone.parentElement.classList.add('error');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(fEmail.value.trim())) {
            fEmail.parentElement.classList.add('error');
            isValid = false;
        }

        if(fMessage.value.trim().length < 10) {
            fMessage.parentElement.classList.add('error');
            isValid = false;
        }

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
