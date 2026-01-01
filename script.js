document.addEventListener('DOMContentLoaded', () => { 

    // ==========================================
    // 0. PRELOADER (HILANG SETELAH LOAD)
    // ==========================================
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if(preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    }, 1500);
    
    // ==========================================
    // 1. DATA PROJECT (3 Project: Motor, EA, Web)
    // ==========================================
    const projects = {
        'motor': {
            title: "Industrial Motor Overhaul Project",
            img: "img/siap.jpg", 
            tech: ["Diagnostics", "Mechanical Repair", "Rewinding", "Quality Control"],
            desc: "A showcase of on-field technical execution. This image displays a heavy-duty industrial electric motor (Unit P 8312 B) following a complete refurbishment process. My role involved comprehensive diagnostics, mechanical repair, and final restoration to ensure the critical asset returns to peak operational performance in a demanding environment."
        },
        'ea': {
            title: "Scalper EA Forex (MQL5)",
            img: "img/ea.jpg", 
            tech: ["MQL5", "C++", "Algo Trading", "Risk Management"],
            desc: "Saya mengembangkan algoritma trading otomatis (Expert Advisor) khusus untuk pasar XAUUSD. Bot ini menggunakan strategi Scalping berbasis Price Action dengan fitur keamanan ganda: Auto-Lot berdasarkan equity, Trailing Stop dinamis, dan News Filter."
        },
        'web': {
            title: "Interactive Portfolio Web",
            img: "img/web.jpg",
            tech: ["HTML5", "CSS3 Glassmorphism", "JavaScript", "Responsive"],
            desc: "Website portofolio modern dengan konsep 'Single Page Dashboard'. Didesain responsif untuk HP dan PC. Fitur unggulan meliputi: Chatbot interaktif, sistem navigasi Tab yang mulus, dan animasi partikel ringan."
        }
    };

    // LOGIC BUKA POP-UP
    window.openModal = function(id) {
        const modal = document.getElementById('project-modal');
        const data = projects[id];
        
        // Safety check: Kalau data gak ada, berhenti (biar gak error)
        if (!data) {
            console.error("Data project tidak ditemukan untuk ID:", id);
            return;
        }

        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-desc').innerText = data.desc;
        document.getElementById('modal-img').src = data.img;
        
        // Render Tags
        const techBox = document.getElementById('modal-tech');
        techBox.innerHTML = '';
        data.tech.forEach(t => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            // Styling inline biar aman
            span.style.cssText = "display:inline-block; border:1px solid #38bdf8; color:#38bdf8; padding:4px 10px; border-radius:4px; font-size:0.75rem; margin-right:5px; margin-top:10px;";
            span.innerText = t;
            techBox.appendChild(span);
        });

        modal.classList.add('show');
    };

    window.closeModal = function() {
        const modal = document.getElementById('project-modal');
        if (modal) modal.classList.remove('show');
    };

    window.onclick = function(e) {
        const modal = document.getElementById('project-modal');
        if (e.target === modal) closeModal();
    };


    // ==========================================
    // 2. EFEK NGETIK
    // ==========================================
    const roles = ["Electro-Mechanical Tech", "Market Analyst", "Junior Programmer"];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const roleElement = document.getElementById('role-text');

    function typeEffect() {
        if (!roleElement) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();


    // ==========================================
    // 3. LOGIKA PINDAH TAB
    // ==========================================
    window.openTab = function(tabName) {
        const contents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < contents.length; i++) {
            contents[i].style.display = "none";
            contents[i].classList.remove("active");
        }
        const btns = document.getElementsByClassName("nav-btn");
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove("active");
        }
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.style.display = "block";
            setTimeout(() => { targetTab.classList.add("active"); }, 10);
        }
        if (event && event.currentTarget) {
            event.currentTarget.classList.add("active");
        }
    }


    // ==========================================
    // 4. BACKGROUND
    // ==========================================
    if (window.particlesJS) {
        const isMobile = window.innerWidth < 768;
        window.particlesJS("particles-js", {
            "particles": { "number": { "value": isMobile ? 20 : 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#38bdf8" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5 }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.3, "width": 1 }, "move": { "enable": true, "speed": 2 } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": !isMobile, "mode": "grab" } } }, "retina_detect": false
        });
    }


    setTimeout(() => { 
        if(chatMessages) addMessage("Halo! 👋 Saya AI Erry.\nKetik: Skill, Pengalaman, atau Kontak.", 'bot-msg'); 
    }, 1500);

    let isChatOpen = false;
    function toggleChat() {
        if (!chatBox) return;
        if (!isChatOpen) { 
            chatBox.classList.add('active'); 
            if(userInput) userInput.focus(); 
            isChatOpen = true; 
        } else { 
            chatBox.classList.remove('active'); 
            isChatOpen = false; 
        }
    }
    
    if(chatToggle) chatToggle.addEventListener('click', toggleChat);
    if(closeChat) closeChat.addEventListener('click', toggleChat);

    function getBotReply(msg) {
        msg = msg.toLowerCase();
        if (msg.includes('halo') || msg.includes('hi')) return "Halo! Ada yang bisa saya bantu?";
        else if (msg.includes('skill') || msg.includes('bisa')) return "Keahlian:\n- Mekanik (Dinamo & Gearbox)\n- Trading Forex & MQL5\n- Web Dev";
        else if (msg.includes('pengalaman')) return "Saya punya 6 tahun pengalaman teknis lapangan dan 1 tahun sebagai trader profesional.";
        else if (msg.includes('kontak')) return "Silakan klik menu Contact untuk WhatsApp atau Email.";
        else return "Maaf, coba tanya: 'Skill', 'Pengalaman', atau 'Kontak'.";
    }

    function sendMessage() {
        if (!userInput) return;
        const text = userInput.value.trim();
        if (text === "") return;
        
        addMessage(text, 'user-msg');
        userInput.value = '';

        setTimeout(() => {
            const reply = getBotReply(text);
            addMessage(reply, 'bot-msg');
        }, 400);
    }

    function addMessage(text, className) {
        if (!chatMessages) return;
        const div = document.createElement('div');
        div.classList.add('message', className);
        div.innerHTML = text.replace(/\n/g, "<br>");
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if(sendBtn) sendBtn.addEventListener('click', sendMessage);
    if(userInput) userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    // ==========================================
    // 6. KEAMANAN TAMBAHAN (ANTI INSPECT)
    // ==========================================
    
    // Matikan Klik Kanan
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert("🔒 Protected by Trinerry Security System.");
    });

    // Matikan Tombol F12, Ctrl+Shift+I, Ctrl+U (View Source)
    document.onkeydown = function(e) {
        if(event.keyCode == 123) { // F12
            return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { // Inspect
            return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { // Inspect
            return false;
        }
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { // Console
            return false;
        }
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { // View Source
            return false;
        }
    }
    // Update Tahun Otomatis
    document.getElementById('year').textContent = new Date().getFullYear();
    // ==========================================
    // 6. SISTEM KEAMANAN (ANTI INSPECT)
    // ==========================================
    
    // 1. Matikan Klik Kanan
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        // alert("🔒 Protected by Trinerry Security."); // Nyalakan ini kalau mau ada peringatan
    });

    // 2. Matikan Tombol Keyboard (F12, Ctrl+U, Ctrl+Shift+I)
    document.onkeydown = function(e) {
        // F12
        if(e.keyCode == 123) {
            return false;
        }
        // Ctrl+Shift+I (Inspect)
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        // Ctrl+Shift+J (Console)
        if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        // Ctrl+U (View Source)
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
        // Ctrl+S (Save Page)
        if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
            return false;
        }
    }
   
}); // 