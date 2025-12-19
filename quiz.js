function answerQuestion(qNum, userAnswer) {
    const correctAnswers = {
        1: "phishing",
        2: "valid",
        3: "phishing",
        4: "phishing",
        5: "phishing",
    };

    const correct = correctAnswers[qNum];

    let quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];

    quizResults[qNum - 1] = {
        question: qNum,
        userAnswer,
        correctAnswer: correct,
        isCorrect: userAnswer === correct
    };

    localStorage.setItem("quizResults", JSON.stringify(quizResults));

    const buttons = document.querySelectorAll(".answerBtn");

    buttons.forEach(btn => {
        btn.disabled = true;

        const ans = btn.dataset.answer;

        if (ans === correct) {
            btn.classList.add("correct");
        }

        if (ans === userAnswer && userAnswer !== correct) {
            btn.classList.add("wrong");
        }
    });

    const feedback = document.getElementById("feedback");
    if (feedback) {
        feedback.textContent = userAnswer === correct ? "Correct" : "Wrong";
        feedback.classList.remove("hidden", "correct", "wrong");
        feedback.classList.add(userAnswer === correct ? "correct" : "wrong");
    }

    const nextBtn = document.querySelector(".nextBtn");
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.add("active-next");
    }
}

/* ================= START QUIZ ================= */
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            localStorage.removeItem("quizResults");
            window.location.href = "./quiz-questions/q1.html";
        });
    }
});