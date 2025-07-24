const apiKey = '3b102c6150fd45778a812aed2c1624e2';
const searchBtn = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    resultDiv.innerHTML = "<p>Please enter a game name.</p>";
    return;
  }

  fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      const game = data.results[0];
      if (game) {
        resultDiv.innerHTML = `
          <h2>${game.name}</h2>
          <img src="${game.background_image}" alt="${game.name}">
          <p><strong>Released:</strong> ${game.released}</p>
          <p><strong>Rating:</strong> ${game.rating} / 5</p>
          <p><strong>Platforms:</strong> ${game.platforms.map(p => p.platform.name).join(', ')}</p>
        `;
        localStorage.setItem("lastSearch", query); // store last search
      } else {
        resultDiv.innerHTML = "<p>No results found!</p>";
      }
    })
    .catch(err => {
      resultDiv.innerHTML = "<p>Error fetching game data.</p>";
      console.error(err);
    });
});
