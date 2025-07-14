    // =============== Main Scroll Event Handler ===============
    function handlePageScroll() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const navLinks = document.querySelectorAll('nav a');
    const sectionMap = new Map();

    navLinks.forEach(link => {
        if (!link.hash) return;
        const section = document.querySelector(link.hash);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        sectionMap.set(link, visibleHeight);
    });

    // หาลิงก์ที่ชี้ไปยัง section ที่แสดงผลสูงสุด
    let maxVisibleLink = null;
    let maxVisibleHeight = 0;

    sectionMap.forEach((height, link) => {
        if (height > maxVisibleHeight) {
        maxVisibleHeight = height;
        maxVisibleLink = link;
        }
    });

    // เคลียร์ active ทุกลิงก์
    navLinks.forEach(link => link.classList.remove('active'));
    if (maxVisibleLink) {
        maxVisibleLink.classList.add('active');
    }
    }

    // =============== Section Reveal & Scroll Arrow ===============
    function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    // About section fade-in
    const aboutSection = document.querySelector('.about-me');
    if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        aboutSection.classList.toggle('visible', rect.top < triggerBottom);
    }

    // Timeline items fade-in
    document.querySelectorAll('.timeline-item').forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        item.classList.toggle('show', itemTop < triggerBottom);
    });

    // Scroll arrow fade
    const scrollArrow = document.getElementById('scroll-arrow');
    if (scrollArrow) {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        scrollArrow.style.opacity = scrollY > 30 ? 0 : 1;
        scrollArrow.style.pointerEvents = scrollY > 30 ? 'none' : 'auto';
    }

    // Scroll progress bar update
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    }

    // =============== Event Listeners ===============
    window.addEventListener('scroll', () => {
    revealOnScroll();
    handlePageScroll();
    });
    window.addEventListener('load', () => {
    revealOnScroll();
    handlePageScroll();
    });
    window.addEventListener('hashchange', handlePageScroll);
    window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => document.querySelector('.hero-content').classList.add('hero-visible'), 250);
    handlePageScroll();
    });

    // =============== Anchor Click Feedback ===============
    document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
    });

    // =============== Hamburger Menu ===============
    const hamburger = document.getElementById('hamburger-btn');
    const nav = document.getElementById('main-nav');
    hamburger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

    // =============== Timeline Image Slider ===============
    document.querySelectorAll('.timeline-image-slider').forEach(slider => {
    let index = 0;
    const images = slider.querySelectorAll('img');
    images.forEach((img, i) => img.style.display = i === 0 ? 'block' : 'none');
    setInterval(() => {
        images[index].style.display = 'none';
        index = (index + 1) % images.length;
        images[index].style.display = 'block';
    }, 4000);
    });

    // =============== Typed Name Animation ===============
    const names = ['สวัสดีครับ, ผมชื่อ พิพัฒน์', "Hello, I'm Phiphat D."];
    let nameIdx = 0, charIdx = 0, isDeleting = false;
    const el = document.getElementById('typed-name');
    function typeLoop() {
    const current = names[nameIdx];
    if (!isDeleting) {
        el.textContent = current.substring(0, charIdx + 1);
        if (charIdx < current.length) {
        charIdx++;
        setTimeout(typeLoop, 90 + Math.random() * 40);
        } else {
        isDeleting = true;
        setTimeout(typeLoop, 1000);
        }
    } else {
        el.textContent = current.substring(0, charIdx - 1);
        if (charIdx > 0) {
        charIdx--;
        setTimeout(typeLoop, 50);
        } else {
        isDeleting = false;
        nameIdx = (nameIdx + 1) % names.length;
        setTimeout(typeLoop, 300);
        }
    }
    }
    typeLoop();

    // =============== Dark mode toggle ===============
    const modeIcon = document.getElementById("mode-icon");
    let isDark = false;
    function setIconSVG(dark) {
    modeIcon.innerHTML = dark
        ? `<svg viewBox="0 0 32 32" width="26" height="26" fill="none">
            <path d="M26 20.5A12 12 0 0112.5 6c0-.5.4-.9.9-.8A10.5 10.5 0 1026.8 19.6c.1.5-.3.9-.8.9z" fill="#FFD600"/>
            <path d="M26 20.5A12 12 0 0112.5 6c0-.5.4-.9.9-.8A10.5 10.5 0 1026.8 19.6c.1.5-.3.9-.8.9z" fill="#333" fill-opacity="0.15"/>
        </svg>`
        : `<svg viewBox="0 0 32 32" width="26" height="26" fill="none">
            <circle cx="16" cy="16" r="8" fill="#FFD600"/>
            <g stroke="#FFD600" stroke-width="2">
            <line x1="16" y1="2" x2="16" y2="7"/>
            <line x1="16" y1="25" x2="16" y2="30"/>
            <line x1="2" y1="16" x2="7" y2="16"/>
            <line x1="25" y1="16" x2="30" y2="16"/>
            <line x1="6.2" y1="6.2" x2="10" y2="10"/>
            <line x1="22" y1="22" x2="25.8" y2="25.8"/>
            <line x1="22" y1="10" x2="25.8" y2="6.2"/>
            <line x1="10" y1="22" x2="6.2" y2="25.8"/>
            </g>
        </svg>`;
    }
    setIconSVG(isDark);
    modeIcon.addEventListener("click", function() {
    isDark = !isDark;
    document.body.classList.toggle('dark-mode');
    modeIcon.classList.add('rotating');
    setIconSVG(isDark);
    setTimeout(() => modeIcon.classList.remove('rotating'), 450);
    });

    // =============== Canvas Particles BG ===============
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
      });
    }
    class FloatingShape {
      constructor(type, x, y, size, color, dx, dy, rotate, dr) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.rotate = rotate || 0;
        this.dr = dr || 0;
      }
      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate);
        ctx.globalAlpha = 0.23;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        if (this.type === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (this.type === "triangle") {
          ctx.beginPath();
          let h = this.size * Math.sqrt(3) / 2;
          ctx.moveTo(-this.size/2, h/2);
          ctx.lineTo(this.size/2, h/2);
          ctx.lineTo(0, -h/2);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
        ctx.globalAlpha = 1;
      }
      update(canvas) {
        this.x += this.dx;
        this.y += this.dy;
        this.rotate += this.dr;
        if (this.x < -100) this.x = canvas.width+80;
        if (this.x > canvas.width+100) this.x = -80;
        if (this.y < -100) this.y = canvas.height+80;
        if (this.y > canvas.height+100) this.y = -80;
      }
    }

    const shapes = [];
    const shapeColors = ["#7f5af0", "#58a6ff", "#c5caff", "#b1ffe7"];
    for(let i=0; i<6; i++) {
      shapes.push(new FloatingShape(
        "circle",
        Math.random()*canvas.width,
        Math.random()*canvas.height,
        45+Math.random()*30,
        shapeColors[Math.floor(Math.random()*shapeColors.length)],
        (Math.random()-0.5)*0.3, (Math.random()-0.5)*0.3,
        0, (Math.random()-0.5)*0.005
      ));
    }
    for(let i=0; i<4; i++) {
      shapes.push(new FloatingShape(
        "triangle",
        Math.random()*canvas.width,
        Math.random()*canvas.height,
        60+Math.random()*20,
        shapeColors[Math.floor(Math.random()*shapeColors.length)],
        (Math.random()-0.5)*0.22, (Math.random()-0.5)*0.22,
        Math.random()*Math.PI, (Math.random()-0.5)*0.008
      ));
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(shape => shape.draw(ctx));
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(127,90,240,0.4)";
        ctx.fill();
      }
    }
    function update() {
      shapes.forEach(shape => shape.update(canvas));
      for (let p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
    }
    function animate() {
      draw();
      update();
      requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener("mousemove", (e) => {
      for (let p of particles) {
        const dist = Math.hypot(p.x - e.clientX, p.y - e.clientY);
        if (dist < 80) {
          p.dx += (p.x - e.clientX) / 300;
          p.dy += (p.y - e.clientY) / 300;
        }
      }
    });
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    const timelineItems = document.querySelectorAll('.timeline-item');
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const progressBar = document.getElementById('scroll-progress');
      progressBar.style.width = scrollPercent + '%';
    });
    // สมมติมี div.timeline-image-slider และรูปภาพหลายรูป
    const sliders = document.querySelectorAll('.timeline-image-slider');
    sliders.forEach(slider => {
      let index = 0;
      const images = slider.querySelectorAll('img');
      images.forEach((img, i) => img.style.display = (i === 0 ? 'block' : 'none'));

      setInterval(() => {
        images[index].style.display = 'none';
        index = (index + 1) % images.length;
        images[index].style.display = 'block';
      }, 4000);
    });

    document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dark-mode');
    // ถ้ามีปุ่ม toggle และไอคอนที่ต้อง sync:
    const modeIcon = document.getElementById("mode-icon");
    if (modeIcon) {
      modeIcon.classList.add('rotating');
      // สมมุติคุณมีฟังก์ชัน setIconSVG ที่เปลี่ยนไอคอน:
      if (typeof setIconSVG === 'function') {
        setIconSVG(true);
      }
      setTimeout(() => modeIcon.classList.remove('rotating'), 450);
    }
  });