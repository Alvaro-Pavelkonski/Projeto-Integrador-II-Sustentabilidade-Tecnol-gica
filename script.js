document.addEventListener('DOMContentLoaded', () => {

  // 1. NAVEGAÇÃO MOBILE E ACESSIBILIDADE
  const menuButton = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-links a');

  if (menuButton && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.contains('open');
      navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', !isOpen);
    };

    menuButton.addEventListener('click', toggleMenu);

    links.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // 2. HIGHLIGHT DE LINK ATIVO AO ROLAR (SCROLLSPY)
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  // 3. ANIMAÇÃO DE ENTRADA (INTERSECTION OBSERVER)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .card-animate').forEach(element => {
    observer.observe(element);
  });

  // 4. LÓGICA E VALIDAÇÃO DO QUIZ
  const quizForm = document.getElementById('quiz');
  const resultDiv = document.getElementById('result');

  if (quizForm && resultDiv) {
    const selects = quizForm.querySelectorAll('select');

    selects.forEach(select => {
      select.addEventListener('change', () => {
        select.classList.remove('invalid');
      });
    });

    quizForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let hasEmpty = false;
      let score = 0;

      selects.forEach(select => {
        if (!select.value) {
          select.classList.add('invalid');
          hasEmpty = true;
        } else {
          select.classList.remove('invalid');
          score += Number(select.value);
        }
      });

      if (hasEmpty) {
        resultDiv.textContent = '⚠️ Por favor, responda a todas as perguntas antes de continuar.';
        resultDiv.style.color = 'var(--error)';
        resultDiv.classList.add('active');
        return;
      }

      resultDiv.style.color = 'var(--green2)';
      resultDiv.classList.add('active');

      if (score === 3) {
        resultDiv.textContent = '🌱 Guardião da Tecnologia — Você já pensa no ciclo completo antes de descartar!';
      } else if (score === 2) {
        resultDiv.textContent = '♻️ Usuário Consciente — Você está no caminho certo. Falta pouco para fechar o ciclo!';
      } else if (score === 1) {
        resultDiv.textContent = '🔎 Explorador do Ciclo — Uma pequena mudança de hábito já fará grande diferença.';
      } else {
        resultDiv.textContent = '🚀 Começo de Jornada — Agora que conhece a campanha, você sabe por onde começar!';
      }
    });
  }
});