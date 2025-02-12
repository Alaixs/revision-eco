export function renderQuestion(container, question, onSubmit) {
    container.innerHTML = `
        <div id="quiz-content">
            <h2 class="question-title">${question.question}</h2>
            ${question.code ? `<pre class="code"><code class="language-kotlin">${question.code}</code></pre>` : ''}
            <form id="quiz-form">
                ${question.options
                    .map(
                        (option, index) => `
                    <label class="question">
                        <p>${option.text}</p>
                        <input type="${question.type === 'single' ? 'radio' : 'checkbox'}" name="answer" value="${index}">
                    </label>
                `
                    )
                    .join('')}
                <button id="form-button" type="submit">Valider</button>
            </form>
        </div>
    `;

    if (question.code) {
        hljs.highlightAll();
        console.log('highlighted');
    }

    const labels = document.querySelectorAll('.question');
    labels.forEach((label) => {
        label.addEventListener('click', () => {
            if (question.type === 'single') {
                labels.forEach((lbl) => lbl.classList.remove('selected'));
                label.classList.add('selected');
            } else {
                const input = label.querySelector('input[name="answer"]');
                if (input.checked) {
                    label.classList.add('selected');
                } else {
                    label.classList.remove('selected');
                }
            }
        });
    });

    const form = document.getElementById('quiz-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedAnswers = Array.from(
            document.querySelectorAll('input[name="answer"]:checked')
        ).map((input) => parseInt(input.value));

        const correctAnswers = question.options
            .map((option, index) => (option.correct ? index : -1))
            .filter((index) => index !== -1);

        const isCorrect =
            JSON.stringify(selectedAnswers.sort()) ===
            JSON.stringify(correctAnswers.sort());

        question.options.forEach((option, index) => {
            const label = document.querySelector(`input[value="${index}"]`).parentElement;
            if (correctAnswers.includes(index)) label.classList.add('correct');
            if (selectedAnswers.includes(index) && !correctAnswers.includes(index))
                label.classList.add('incorrect');
        });

        labels.forEach((lbl) => lbl.classList.remove('selected'));
        const button = document.getElementById('form-button');
        button.textContent = 'Suivant';
        button.type = 'button';
        button.addEventListener('click', () => {
            onSubmit(isCorrect);
        });
    });
}
