const container = document.getElementById('pokemon-container');
let todosOsPokemons = [];

async function carregarPokemons() {
  for (let i = 1; i <= 151; i++) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const dados = await resposta.json();

    const pokemon = {
      nome: dados.name,
      id: dados.id,
      imagem: dados.sprites.front_default,
      tipos: dados.types.map(t => t.type.name).join(', ')
    };

    todosOsPokemons.push(pokemon);
    exibirPokemon(pokemon);
  }
}

function exibirPokemon(pokemon) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-nome', pokemon.nome);

  card.innerHTML = `
    <h3>#${pokemon.id} ${pokemon.nome.toUpperCase()}</h3>
    <img src="${pokemon.imagem}" alt="${pokemon.nome}">
    <p><strong>Tipo:</strong> ${pokemon.tipos}</p>
  `;

  container.appendChild(card);
}

function filtrarPokemon() {
  const termo = document.getElementById('search').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const nome = card.getAttribute('data-nome');
    card.style.display = nome.includes(termo) ? 'block' : 'none';
  });
}

carregarPokemons();
