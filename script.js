
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


// ---

if (localStorage.getItem("paronyms") === null) {
  resetWordsList();
}


init();
