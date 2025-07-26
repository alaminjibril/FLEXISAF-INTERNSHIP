const sentences = [
  "Tim Horton was a hockey player but is the name of a coffee chain, which means my dream of a goat sanctuary being my legacy is not unrealistic",
  "I started a sensory deprivation chamber business - it involves really dark curtains, ear plugs, and a sleeping mask",
  "Do we make money or does money make us? Chezwich",
  "Pantone is a colour but also the singular version of pants",
  "Logan Ipsum will loop at some point",
  "Thank you for using my words in your work",
  "You should \"listen to my mixtape\" (check out the rest of my portfolio)",
  "I have never known a Jack that was in good enough shape to name bodybuilding after him",
  "Twitter is the rice of social media",
  "INjuries always keep you OUT of things. Visticula",
  "For the name of an act as serious as killing someone, assassination literally translates to buttbuttination",
  "Why don't we call glasses duocles",
  "If you wake up with a giant zit, you are really facing your fears when you look in the mirror",
  "Cemeteries are just garbage dumps filled with humans",
  "I have a moral code, but I haven't figured out how to read it yet",
  "I bet most serial killers play the drums",
  "To Catch A Predator would have been a great name for a Steve Irwin show. Mintslavicia",
  "If the word kerning is kerned poorly, it kind of looks like learning - which is appropriate because both are important",
  "North America should be called Russia since people are always moving so fast. Gralitica",
  "I don't need a big house, just a two-floor condo - you could say I have lofty expectations"
];

function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function getRandomWord() {
  const words = getRandomSentence().split(/\s+/);
  return words[Math.floor(Math.random() * words.length)];
}

function generate() {
  const amount = parseInt(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  let output = "";

  if (type === "words") {
    for (let i = 0; i < amount; i++) {
      output += getRandomWord() + " ";
    }
  } else if (type === "sentences") {
    for (let i = 0; i < amount; i++) {
      output += getRandomSentence() + " ";
    }
  } else if (type === "paragraphs") {
    for (let i = 0; i < amount; i++) {
      let para = "";
      for (let j = 0; j < 4; j++) {
        para += getRandomSentence() + " ";
      }
      output += para.trim() + "\n\n";
    }
  }

  document.getElementById("output").textContent = output.trim();
}
