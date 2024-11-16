const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      // Flip the card by adding the 'turned' class
      card.classList.add('turned');
      memoryGame.pickedCards.push(card);

      // Check if two cards have been picked
      if (memoryGame.pickedCards.length === 2) {
        const [card1, card2] = memoryGame.pickedCards;
        const card1Name = card1.getAttribute('data-card-name');
        const card2Name = card2.getAttribute('data-card-name');

        // Increment pairsClicked and update the score display
        memoryGame.pairsClicked++;
        document.getElementById('pairs-clicked').innerText = memoryGame.pairsClicked;

        // Check if they are a matching pair
        if (memoryGame.checkIfPair(card1Name, card2Name)) {
          // Keep the cards flipped if they match by adding 'blocked' class
          card1.classList.add('blocked');
          card2.classList.add('blocked');
          

          
          // Increment pairsGuessed and update the score display
          memoryGame.pairsGuessed++;
          document.getElementById('pairs-guessed').innerText = memoryGame.pairsGuessed;

          memoryGame.pickedCards = [];

          // Check if the game is finished (all pairs guessed)
          if (memoryGame.pairsGuessed === 24) {
            alert('You won!');
          }
        } else {
          // Flip the cards back over after a short delay if they don't match
          setTimeout(() => {
            card1.classList.remove('turned');
            card2.classList.remove('turned');
            memoryGame.pickedCards = [];
          }, 1000);
        }
      }
    });
  });
});
