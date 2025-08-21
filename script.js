window.onload = function() {
  const merrywrap = document.querySelector(".merrywrap");
  const giftbox = merrywrap.querySelector(".giftbox");
  let step = 1;

  function addStep() {
    merrywrap.classList.add(`step-${step}`);
    if(step < 4) {
      step++;
      setTimeout(addStep, 1000); 
    } else {
      showFinalMessage();
    }
  }

  function showFinalMessage() {
    const letter = document.querySelector(".letter");
    const text = letter ? letter.textContent : "შენი საბოლოო მესიჯი ❤️";

    const finalMessage = document.createElement("div");
    finalMessage.id = "final-message";
    finalMessage.textContent = text;
    document.body.appendChild(finalMessage);

    setTimeout(() => finalMessage.classList.add("show"), 100); 
  }

  giftbox.addEventListener("click", function handler() {
    addStep();
    giftbox.removeEventListener("click", handler);
  });
};
