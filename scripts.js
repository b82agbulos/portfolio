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
  
// Function to capitalize the first letter of each word in a string
function titleCase(str) {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  
// Function to fetch and display the last song played from Last.fm API
function fetchLastSong() {
    const apiKey = 'efb001211a1a43834081d3889119e0b9'; // Replace with your Last.fm API key
    const username = 'bagbulos82'; // Replace with your Last.fm username
  
    // Last.fm API endpoint to get recent tracks for a user
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;
  
    // Make a GET request to the Last.fm API using fetch()
    fetch(apiUrl)
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
  
        const title = document.createElement('span');
        title.textContent = "Title: ";
        const songName = document.createElement('span');
        songName.textContent = titleCase(lastSong.name);
        title.append(songName);
  
        const titleBreak = document.createElement('br');
  
        const artistLabel = document.createElement('span');
        artistLabel.textContent = "Artist: ";
        const artistName = document.createElement('span');
        artistName.textContent = titleCase(lastSong.artist['#text']);
        artistLabel.append(artistName);
  
        const breakLine = document.createElement('br');
  
        const albumLabel = document.createElement('span');
        albumLabel.textContent = "Album: ";
        const albumName = document.createElement('span');
        albumName.textContent = titleCase(lastSong.album['#text']);
        albumLabel.append(albumName);
  
        const albumImage = document.createElement('img');
        albumImage.src = lastSong.image[2]['#text']; // Assumes medium-sized image is available, change the index as needed
        albumImage.alt = "Album Art";
  
        const playButton = document.createElement('button');
        playButton.textContent = "Play";
        playButton.addEventListener('click', () => {
          // Open a new tab or window to play the song using your preferred music player or service
          window.open(lastSong.url, '_blank');
        });
  
        songInfo.append(title, titleBreak, artistLabel, breakLine, albumLabel, albumImage, playButton);
  
        // Append the song info to the container
        lastSongContainer.appendChild(songInfo);
      })
      .catch(error => {
        console.error('Error fetching last song:', error);
      });
  }
  
  // Call the fetchLastSong function to retrieve and display the last song played
  fetchLastSong();
  