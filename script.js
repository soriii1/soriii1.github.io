const Start = document.getElementById("button");
const HomeScreen = document.getElementById("home");
const Game = document.getElementById("game_board");
const messageBox = document.getElementById("message");

Start.addEventListener("click", () => {
  HomeScreen.style.display = "none";
  Game.style.display = "grid";

  startGame();
});

function startGame() {
  const emojis = ["🍓", "🍇", "🍋", "🍉", "🍒", "🥝","🫐", "🍌", "🍅"];
  let cardsData = [...emojis, ...emojis];
  cardsData = shuffle(cardsData);

  Game.innerHTML = '';
  messageBox.innerHTML = '';

  let flippedCards = [];
  let matchedCount = 0;
  let wrongCount = 0;
  let lockBoard = true;

  // 버튼 만들기
  const homeBtn = document.createElement('button');
  homeBtn.innerHTML = '<span style="color: red;">★</span> 돌아가기';
  homeBtn.classList.add('button');
  homeBtn.onclick = () => location.reload();

  const retryBtn = document.createElement('button');
  retryBtn.innerHTML = '<span style="color: red;">★</span> 다시하기';
  retryBtn.classList.add('button');
  retryBtn.onclick = () => {
    messageBox.innerHTML = '';
    Game.innerHTML = '';
    startGame();
  };


  cardsData.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="inner">
        <div class="front">${emoji}</div>
        <div class="back"></div>
      </div>
    `;
    Game.appendChild(card);
  });

  const allCards = document.querySelectorAll(".card");
  allCards.forEach(card => card.classList.add("flip"));

  setTimeout(() => {
    allCards.forEach(card => card.classList.remove("flip"));
    lockBoard = false;
  }, 3000);

  allCards.forEach(card => {
    card.addEventListener("click", () => {
      if (lockBoard || card.classList.contains("flip")) return;

      card.classList.add("flip");
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkForMatch();
      }
    });
  });

  function checkForMatch() {
    lockBoard = true;
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector(".front").textContent;
    const emoji2 = card2.querySelector(".front").textContent;

    if (emoji1 === emoji2) {
      matchedCount += 2;
      flippedCards = [];
      lockBoard = false;

      if (matchedCount === cardsData.length) {
        messageBox.textContent = "🎉 축하합니다! 모든 카드를 맞췄어요!";
        messageBox.appendChild(homeBtn);
        messageBox.appendChild(retryBtn);
      }
    } else {
      wrongCount++;
      setTimeout(() => {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        flippedCards = [];
        lockBoard = false;

        if (wrongCount >= 4) {
          messageBox.innerHTML = "<p>💥 Game over! 💥</p>";
        
          const btnWrapper = document.createElement("div");
          btnWrapper.style.marginTop = "15px";
        
          btnWrapper.appendChild(homeBtn);
          btnWrapper.appendChild(retryBtn);
        
          messageBox.appendChild(btnWrapper);
          lockBoard = true;
        }
      }, 1000);
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}





  