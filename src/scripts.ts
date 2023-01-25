fetch('https://rickandmortyapi.com/api/character')
  .then((response) => response.json())
  .then((data) => createCards(data.results));

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

    container.appendChild(card);

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot: HTMLElement) => {
      if (character.status.toLowerCase() === 'alive') {
        dot.style.backgroundColor = 'green';
      } else if (character.status.toLowerCase() === 'dead') {
        dot.style.backgroundColor = 'red';
      } else if (character.status.toLowerCase() === 'unknown') {
        dot.style.backgroundColor = '#87888a';
      }
    })
  });
}

const button = document.querySelector('button');

const loadNextFetch = () => {
  button.style.display = 'none';
  fetch('https://rickandmortyapi.com/api/character/?page=2')
    .then((response) => response.json())
    .then((data) => createCards(data.results));
}

button.addEventListener('click', loadNextFetch);













