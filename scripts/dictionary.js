// Function to handle the dictionary lookup
document.getElementById('dictionaryForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
  
    const word = document.getElementById('wordInput').value.trim(); // Get word input
    if (word) {
      fetchWordDetails(word); // Fetch word details if input is valid
    }
  });
  
  // Function to fetch the word details using the dictionary API
  function fetchWordDetails(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  
    // Clear previous results or error messages
    clearResults();
  
    // Fetch data using the Promise API
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Word not found');
        }
        return response.json();
      })
      .then(data => displayWordDetails(data[0])) // Display word details
      .catch(error => displayError(error.message)); // Handle error
  }
  
  // Function to display the word details
  function displayWordDetails(data) {
    const wordTitle = document.getElementById('wordTitle');
    const phonetics = document.getElementById('phonetics');
    const definition = document.getElementById('definition');
    const wordDetailsDiv = document.getElementById('wordDetails');
  
    // Populate word title and phonetics
    wordTitle.textContent = data.word;
    phonetics.textContent = data.phonetics[0]?.text || '';
  
    // Display definitions
    const definitionsList = document.createElement('ul');
    data.meanings[0]?.definitions.forEach(def => {
      const listItem = document.createElement('li');
      listItem.textContent = def.definition;
      definitionsList.appendChild(listItem);
    });
    definition.appendChild(definitionsList);
  
    // Show the word details
    wordDetailsDiv.style.display = 'block';
  }
  
  // Function to display error messages
  function displayError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }
  
  // Function to clear previous results
  function clearResults() {
    const wordTitle = document.getElementById('wordTitle');
    const phonetics = document.getElementById('phonetics');
    const definition = document.getElementById('definition');
    const errorMessage = document.getElementById('errorMessage');
  
    wordTitle.textContent = '';
    phonetics.textContent = '';
    definition.innerHTML = '';
    errorMessage.style.display = 'none';
  }
  