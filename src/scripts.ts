fetch('https://rickandmortyapi.com/api/character')
  .then((response) => response.json())
  .then((data) => createCards(data.results));
  let numberOfPages = 0;

  interface Results {
    image: URL; 
    name: string;
    status: string;
    species: string;
    url: URL;
    origin: Origin;
    location: Location;
  }

  interface Origin {
    name: string;
    url: URL;
  }

  interface Location {
    name: string;
    url: URL;
  }

function createCards(results: Results[]) {
  const container = document.querySelector('.container');


  results.forEach((character: Results) => {

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML =     `<img src="${character.image}" alt="${character.name}">
    <div class="cardtext">
        <h1>${character.name}</h1>
        <h4>
          <span class="dot">
          </span>
          ${character.status} - ${character.species}</h4>
        <br>
        <br>
        <p>
            <span class="greytext">
                Last known location:
            </span>
            <br>
            <a class="links" href="${character.url}">${character.location.name}</a>
        </p>
        <br>
        <p>
        <span class="greytext">
            First seen in:
        </span>
        <br>
        <a class="links" href="${character.origin.url}">${character.origin.name}</a>
    </p>
    </div>
    `;

    const dots = card.querySelectorAll('.dot');
    dots.forEach((dot: HTMLElement) => {
      if (character.status.toLowerCase() === 'alive') {
        dot.style.backgroundColor = 'green';
      } else if (character.status.toLowerCase() === 'dead') {
        dot.style.backgroundColor = 'red';
      } else if (character.status.toLowerCase() === 'unknown') {
        dot.style.backgroundColor = '#87888a';
      }
    })

    container.appendChild(card);
  });
}

const button = document.querySelector('button');

const loadNextFetch = () => {
  numberOfPages += 1;
  fetch(`https://rickandmortyapi.com/api/character/?page=${numberOfPages}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.info.next) {
        fetch(data.info.next)
          .then((response) => response.json())
          .then((data) => createCards(data.results));
      }
      if (!data.info.next) {
        button.style.display = 'none'
      }
    });
}

button.addEventListener('click', loadNextFetch);














