export function renderResults(container, score, totalQuestions) {
    container.innerHTML = `
        <h2>Résultats</h2>
        <p>Vous avez obtenu ${score} sur ${totalQuestions}.</p>
        <button onclick="window.location.reload()">Rejouer</button>
    `;
}
