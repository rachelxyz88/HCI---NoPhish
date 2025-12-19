document.addEventListener('DOMContentLoaded', function() {

    const storedResults = localStorage.getItem('quizResults');

    if (!storedResults) {
        document.querySelector('.score-text').textContent = "Hasil Kuis Tidak Ditemukan.";
        return;
    }

    const quizResults = JSON.parse(storedResults);
    let totalCorrect = 0;

    quizResults.forEach(result => {
        if (result?.isCorrect) totalCorrect++;
    });

    const totalQuestions = quizResults.length;

    document.querySelector('.score-text').innerHTML =
        `You got <b>${totalCorrect}/${totalQuestions}</b> questions correct.`;

    const listContainer = document.querySelector('.results-list');
    listContainer.innerHTML = "";

    const questionDescriptions = {
        1: "Fake netflix email",
        2: "Real hoyoverse email",
        3: "Fake facebook Notice",
        4: "Fake dropbox Notice",
        5: "Fake paypal Notice"
    };

    quizResults.forEach(r => {
        const isCorrect = r.isCorrect;
        const cssClass = isCorrect ? "correct" : "incorrect";
        const statusText = isCorrect ? "Correct" : "Incorrect";

        const item = document.createElement("div");
        item.className = `result-item ${cssClass}`;
        item.innerHTML = `
            <span class="q-num">${r.question}/${totalQuestions}</span>
            <span class="q-desc">${questionDescriptions[r.question] || "Question"}</span>
            <span class="status">${statusText}</span>
            <button class="review-btn" data-question="${r.question}">Review</button>
        `;

        listContainer.appendChild(item);
    });

    document.querySelectorAll(".review-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const qNum = this.getAttribute("data-question");
            window.location.href = `q${qNum}-result.html`;
        });
    });

    document.querySelector('.take-quiz-btn').addEventListener("click", () => {
        localStorage.removeItem("quizResults");
        window.location.href = "../quiz.html";
    });
});