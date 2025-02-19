// Load data from data.json and handle search functionality
document.addEventListener('DOMContentLoaded', function() {
  // Fetch data from data.json
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const searchButton = document.getElementById('searchButton');
      const searchInput = document.getElementById('searchInput');
      const resultsDiv = document.getElementById('results');

      // Search button click handler
      searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        resultsDiv.innerHTML = ''; // Clear previous results

        if (query.trim() === '') {
          resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
          return;
        }

        // Filter data based on query
        const filteredData = data.filter(item => {
          return (
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
          );
        });

        // Display results
        if (filteredData.length > 0) {
          filteredData.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
              <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
              <p>${item.description}</p>
              <p><strong>Category:</strong> ${item.category}</p>
            `;
            resultsDiv.appendChild(resultItem);
          });
        } else {
          resultsDiv.innerHTML = '<p>No results found.</p>';
        }
      });

      // Optional: Enable search on pressing "Enter" key
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          searchButton.click();
        }
      });
    })
    .catch(error => {
      console.error('Error loading data:', error);
      resultsDiv.innerHTML = '<p>Failed to load resources. Please try again later.</p>';
    });
});