
let wordsList = null;


const resetWordsList = () => {
  let random_pairs = [];

  for (let i in paronyms) {
    random_pairs = random_pairs.concat(
      Object.keys(paronyms[i]).map(
        (word) => ([i, word])
      )
    );
  }

  random_pairs.sort(() => Math.random() - 0.5);

  wordsList = random_pairs;

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
    let [ index, word_right ] = wordsList[0];
    let meaning = paronyms[index][word_right];

    meaningBox.innerHTML = Object.keys(meaning).join("<br>");
    answersList.innerHTML = "";

    for (let word of Object.keys(paronyms[index])) {
      let onclick = () => {
        let last = wordsList.shift();
        if (word == word_right) {
          console.log("right!");
        } else {
          wordsList.push(last);
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
