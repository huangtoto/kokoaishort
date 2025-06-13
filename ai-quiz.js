// AI 知識問答遊戲主程式
// 需先引入 ai-quiz-data.js

document.addEventListener("DOMContentLoaded", function () {
  const quizSection = document.getElementById("ai-quiz-section");
  if (!quizSection) return;

  const questions = window.aiQuizQuestions;
  let current = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const q = questions[current];
    quizSection.innerHTML = `
      <div class="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
        <h2 class="text-2xl font-bold mb-6 text-primary">AI 知識問答遊戲</h2>
        <div class="text-lg font-semibold mb-4">第 ${current + 1} 題 / ${questions.length}</div>
        <div class="text-xl mb-8">${q.question}</div>
        <div class="grid gap-4">
          ${q.options
            .map(
              (opt, i) => `
                <button class="option-btn px-6 py-3 rounded-xl border border-primary text-primary font-bold bg-white hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" data-idx="${i}">${opt}</button>
              `
            )
            .join("")}
        </div>
        <div class="mt-8 text-gray-500 text-sm">答對越多，越懂 AI！</div>
      </div>
    `;
    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", handleAnswer);
    });
    answered = false;
  }

  function handleAnswer(e) {
    if (answered) return;
    answered = true;
    const idx = parseInt(e.target.dataset.idx);
    const q = questions[current];
    const isCorrect = idx === q.answer;
    if (isCorrect) score++;
    // 動畫效果
    e.target.classList.add(isCorrect ? "bg-green-400" : "bg-red-400", "text-white", "scale-105");
    e.target.classList.remove("bg-white", "text-primary");
    // 顯示正確答案
    document.querySelectorAll(".option-btn").forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) {
        btn.classList.add("ring-4", "ring-green-300");
      }
    });
    setTimeout(() => {
      current++;
      if (current < questions.length) {
        renderQuestion();
      } else {
        renderResult();
      }
    }, 1200);
  }

  function renderResult() {
    quizSection.innerHTML = `
      <div class="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
        <h2 class="text-2xl font-bold mb-6 text-primary">遊戲結束！</h2>
        <div class="text-3xl font-extrabold mb-4">你答對了 <span class="text-primary">${score}</span> / ${questions.length} 題</div>
        <div class="mb-8 text-lg">${score === questions.length ? "AI 達人！" : score >= 3 ? "不錯唷，繼續加油！" : "再多學一點 AI 吧！"}</div>
        <button id="restart-quiz" class="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all duration-300">再玩一次</button>
      </div>
    `;
    document.getElementById("restart-quiz").addEventListener("click", () => {
      current = 0;
      score = 0;
      renderQuestion();
    });
  }

  // 動畫 keyframes
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(30px) scale(0.98); }
      to { opacity: 1; transform: none; }
    }
    .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,2,.6,1) both; }
  `;
  document.head.appendChild(style);

  renderQuestion();
});
