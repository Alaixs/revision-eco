export function updateCounters(currentQuestionIndex, totalQuestions, score) {
    const counterContainer = document.getElementById('question-counter');
    const correctCounterContainer = document.getElementById('correct-counter');

    if (counterContainer && correctCounterContainer) {
        counterContainer.textContent = `Question ${currentQuestionIndex + 1} sur ${totalQuestions}`;
        correctCounterContainer.textContent = `Correctes : ${score}`;
    }
}
