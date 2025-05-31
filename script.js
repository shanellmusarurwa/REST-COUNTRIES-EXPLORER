 const container = document.getElementById('countries-container');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');
    const themeToggle = document.getElementById('theme-toggle');

    async function fetchCountries() {
      const res = await fetch('https://restcountries.com/v3.1/all');
      return await res.json();
    }

    function displayCountries(countries) {
      container.innerHTML = countries.map(country => `
        <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="card h-100">
            <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} flag">
            <div class="card-body">
              <h5 class="card-title">${country.name.common}</h5>
              <p class="card-text">
                <strong>Population:</strong> ${country.population.toLocaleString()}<br>
                <strong>Region:</strong> ${country.region}<br>
                <strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      `).join('');

      // Apply dark theme to cards if active
      if (document.body.classList.contains('dark')) {
        document.querySelectorAll('.card').forEach(card => card.classList.add('dark'));
      }
    }

    function filterCountries(countries, searchTerm, region) {
      return countries.filter(c =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!region || c.region === region)
      );
    }

    async function init() {
      const countries = await fetchCountries();

      const update = () => {
        const filtered = filterCountries(countries, searchInput.value, regionFilter.value);
        displayCountries(filtered);
      };

      searchInput.addEventListener('input', update);
      regionFilter.addEventListener('change', update);
      update();
    }

    // Theme toggle logic
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      document.querySelectorAll('.card').forEach(card => card.classList.toggle('dark'));
    });

    init();