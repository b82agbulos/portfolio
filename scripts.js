// Smooth scrolling effect
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Add event listener for the links in the Contact section
  document.querySelectorAll('#contact ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      alert('You clicked a contact link!');
    });
  });
  
  window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('scrolled', window.scrollY > 0);
  });
  
// Function to fetch and display the last song played from Last.fm API
function fetchLastSong() {
    const apiKey = 'efb001211a1a43834081d3889119e0b9'; // Replace with your Last.fm API key
    const sharedSecret = 'befcd32168535ff2ec7d991b363b2967'; // Replace with your Last.fm shared secret
    const username = 'bagbulos82'; // Replace with your Last.fm username
  
    // Last.fm API endpoint to get recent tracks for a user
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;
  
    // Generate the API signature
    const apiSig = md5(`api_key${apiKey}methoduser.getrecenttracksusername${username}${sharedSecret}`);
  
    // Append the API signature to the API URL
    const apiUrlWithSig = `${apiUrl}&api_sig=${apiSig}`;
  
    // Make a GET request to the Last.fm API using fetch()
    fetch(apiUrlWithSig)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching last song:', response.status);
        }
        return response.json();
      })
      .then(data => {
        // Handle the API response and display the last song played on the page
        const lastSong = data.recenttracks.track[0];
        const lastSongContainer = document.getElementById('last-song-container');
  
        // Create HTML elements to display the last song played
        const songInfo = document.createElement('div');
        songInfo.classList.add('song-info');
        const songName = document.createElement('p');
        songName.textContent = lastSong.name;
        const artistName = document.createElement('p');
        artistName.textContent = lastSong.artist['#text'];
        songInfo.append(songName, artistName);
  
        // Append the song info to the container
        lastSongContainer.appendChild(songInfo);
      })
      .catch(error => {
        console.error('Error fetching last song:', error);
      });
  }
  
  // Call the fetchLastSong function to retrieve and display the last song played
  fetchLastSong();
  