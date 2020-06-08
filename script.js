
let wordsList = null;


const resetWordsList = () => {
  wordsList = [];

  for (let i in paronyms) {
    wordsList = wordsList.concat(
      Object.keys(paronyms[i]).map(
        (word) => ([i, word])
      )
    );
  }

  uploadToStorage();
};


const init = () => {
  wordsList = JSON.parse(localStorage.getItem("paronyms"));
};


const uploadToStorage = () => {
  localStorage.setItem("paronyms", JSON.stringify(wordsList));
};


const nextWord = () => {
  if (wordsList.length > 0) {
    let paronym_index = Math.floor(wordsList.length * Math.random());
    let [ index, word_right ] = wordsList[paronym_index];
    let meaning = paronyms[index][word_right];

    meaningBox.innerHTML = Object.keys(meaning).join("<br>");
    answersList.innerHTML = "";

    for (let word in paronyms[index]) {
      let onclick = () => {
        if (word == word_right) {
          showModal(word_right, paronyms[index], true);
          wordsList.splice(paronym_index, 1);
          uploadToStorage();
        } else {
          showModal(word_right, paronyms[index], false);
        }
        nextWord();
      };

      let item = Object.assign(document.createElement("li"), {
        innerHTML: word,
        onclick,
      });

      answersList.appendChild(item);
    }
  } else {
    resetWordsList();
    nextWord();
  }
};


const showModal = (word_right, paronym, is_right) => {
  modalBG.style.display = "flex";

  modalHeading.style.color = is_right ? "green" : "red";
  modalHeading.innerHTML = is_right ? "Верно!" : "Неправильно!";

  modalWords.innerHTML = "";
  for (let word in paronym) {
    modalWords.innerHTML += `<dt${(word == word_right) ? " class='right'" : ""}>${word}</dt>`;
    modalWords.innerHTML += "<dd>" + Object.keys(paronym[word]).map(meaning => `${meaning} <i>${paronym[word][meaning]}</i>`).join("<br>") + "</dd>";
  }
};


// ---

let meaningBox = document.getElementById("meaning");
let answersList = document.getElementById("answers_list");

let modalBG = document.getElementById("modal-bg");
let modalHeading = document.getElementById("modal-heading");
let modalWords = document.getElementById("modal-words");


document.addEventListener("click", (event) => {
  if (event.target == modalBG) {
    modalBG.style.display = "none";
  }
});


if (localStorage.getItem("paronyms") === null) {
  resetWordsList();
}


init();

nextWord();
