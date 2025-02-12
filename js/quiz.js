import { renderQuestion } from './components/question.js';
import { renderResults } from './components/results.js';
import { updateCounters } from './components/counters.js';
import { shuffleArray } from './utils/shuffle.js';

export function loadQuiz(container, questions, isRandom) {
    if (isRandom) {
        questions = shuffleArray(questions);
    }

    let currentQuestionIndex = 0;
    let score = 0;

    questions.forEach(question => {
        question.options = shuffleArray(question.options);
    });

    function nextQuestion() {
        if (currentQuestionIndex < questions.length) {
            renderQuestion(
                container,
                questions[currentQuestionIndex],
                handleAnswerSubmit
            );
            updateCounters(currentQuestionIndex, questions.length, score);
        } else {
            renderResults(container, score, questions.length);
        }
    }

    function handleAnswerSubmit(isCorrect) {
        if (isCorrect) score++;
        currentQuestionIndex++;
        nextQuestion();
    }

    nextQuestion();
}
