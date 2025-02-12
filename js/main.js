import { loadQuiz } from './quiz.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    const quizContainer = document.getElementById('quiz-container');

    menuContainer.innerHTML = `
        <div style="text-align: center;">
            <h2>Bienvenue sur le Quiz Eco</h2>
            <p>Choisissez une option pour commencer :</p>
            <button id="ordered">Questions dans l'ordre</button>
            <button id="random">Questions en aléatoire</button>
        </div>
    `;

    document.getElementById('ordered').addEventListener('click', () => startQuiz(false));
    document.getElementById('random').addEventListener('click', () => startQuiz(true));

    function startQuiz(isRandom) {
        menuContainer.style.display = 'none';
        quizContainer.style.display = 'flex';

        fetch('./data/questions.json')
            .then((response) => response.json())
            .then((questions) => {
                loadQuiz(quizContainer, questions, isRandom);
            })
            .catch((error) => {
                console.error('Erreur de chargement des questions :', error);
                quizContainer.innerHTML = `<p>Impossible de charger le quiz. Veuillez réessayer plus tard.</p>`;
            });
    }
});
