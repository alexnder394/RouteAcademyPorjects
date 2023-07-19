var random,
  prevRandom = -1;
var quotes = [
  {
    quote:
      "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”",
    author: "― Albert Einstein",
  },
  {
    quote:
      "“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”",
    author: "― Bernard M. Baruch",
  },
  {
    quote:
      "“When you want to know how things really work, study them when they're coming apart.”",
    author: "― William Gibson",
  },
  {
    quote:
      '“Without books the development of civilization would have been impossible. They are the engines of change, windows on the world, "Lighthouses" as the poet said "erected in the sea of time." They are companions, teachers, magicians, bankers of the treasures of the mind, Books are humanity in print.”',
    author: "― Arthur Schopenhauer",
  },
  {
    quote:
      "“However [political parties] may now and then answer popular ends, they are likely in the course of time and things, to become potent engines, by which cunning, ambitious, and unprincipled men will be enabled to subvert the power of the people and to usurp for themselves the reins of government, destroying afterwards the very engines which have lifted them to unjust dominion.”",
    author: "― George Washington",
  },
];
function getRandomQuotes() {
  random = Math.floor(Math.random() * quotes.length);
}
function getQuotes() {
  while (prevRandom == random) {
    getRandomQuotes();
  }
  prevRandom = random;
  document.getElementById("quoteParagraph").innerHTML = quotes[random].quote;
  document.getElementById("quoteParagraphAuthor").innerHTML =
    quotes[random].author;
}

