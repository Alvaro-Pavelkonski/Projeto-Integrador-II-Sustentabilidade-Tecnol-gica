// 1. Menu Mobile
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// 2. Animação de Entrada ao Rolar a Página (IntersectionObserver)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15 // Dispara quando 15% do elemento estiver visível na tela
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Para de observar após animar uma vez
    }
  });
}, observerOptions);

// Aplica a observação nos elementos com as classes selecionadas
document.querySelectorAll('.fade-in, .card-animate').forEach(element => {
  observer.observe(element);
});

// 3. Lógica do Quiz do Desafio
const quizForm = document.getElementById('quiz');
if (quizForm) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const answers = [...event.target.querySelectorAll('select')].map(select => select.value);
    const score = answers.reduce((total, answer) => total + Number(answer), 0);
    const result = document.getElementById('result');

    if (score === 3) {
      result.textContent = '🌱 Guardião da Tecnologia — Você já pensa no ciclo completo antes de descartar!';
    } else if (score === 2) {
      result.textContent = '♻️ Usuário Consciente — Você está no caminho certo. Falta pouco para fechar o ciclo!';
    } else if (score === 1) {
      result.textContent = '🔎 Explorador do Ciclo — Uma pequena mudança de hábito já fará grande diferença.';
    } else {
      result.textContent = '🚀 Começo de Jornada — Agora que conhece a campanha, você sabe por onde começar!';
    }
  });
}