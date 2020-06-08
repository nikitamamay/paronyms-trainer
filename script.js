
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

    for (let word of Object.keys(paronyms[index])) {
      let onclick = () => {
        if (word == word_right) {
          console.log("right!");
        } else {
          wordsList.slice(paronym_index, 1);
          console.log("wrong!")
        }
        uploadToStorage();
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


// ---

let meaningBox = document.getElementById("meaning");
let answersList = document.getElementById("answers_list");


if (localStorage.getItem("paronyms") === null) {
  resetWordsList();
}


init();

nextWord();
