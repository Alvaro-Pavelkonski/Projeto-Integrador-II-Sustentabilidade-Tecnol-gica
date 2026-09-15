const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.getElementById('quiz').addEventListener('submit', (event) => {
  event.preventDefault();

  const answers = [...event.target.querySelectorAll('select')].map(select => select.value);
  const score = answers.reduce((total, answer) => total + Number(answer), 0);
  const result = document.getElementById('result');

  if (score === 3) {
    result.textContent = '🌱 Guardião da Tecnologia — você já pensa no ciclo antes de descartar.';
  } else if (score === 2) {
    result.textContent = '♻️ Usuário Consciente — você está no caminho. Falta pouco para fechar o ciclo.';
  } else if (score === 1) {
    result.textContent = '🔎 Explorador do Ciclo — uma mudança de hábito já pode fazer diferença.';
  } else {
    result.textContent = '🚀 Começo de Jornada — agora você já sabe por onde começar.';
  }
});
