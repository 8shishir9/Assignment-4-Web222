/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Shisir Bastakoti
 *      Student ID: 139758221
 *      Date:       2023-11-15
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

window.onload = function () {
  const menuElement = document.getElementById("menu");
  window.artists.forEach((artist) => {
    const button = document.createElement("button");
    button.textContent = artist.name;
    button.id = artist.artistId;
    button.className = "btn";
    button.addEventListener("click", () => displayArtist(artist));
    menuElement.appendChild(button);
  });

  // Display songs of the first artist by default
  displayArtist(window.artists[0]);
};
function displayArtist(artist) {
  const selectedArtistElement = document.getElementById("selected-artist");
  selectedArtistElement.innerHTML = ""; // Clear existing content
  const artistName = document.createTextNode(`${artist.name} (`);
  selectedArtistElement.appendChild(artistName);

  // Add each link
  artist.urls.forEach((url, index) => {
    const link = document.createElement("a");
    link.href = url.url;
    link.textContent = url.name;
    link.target = "_blank"; // to open in a new tab

    selectedArtistElement.appendChild(link);

    // Add comma separator if not the last link
    if (index < artist.urls.length - 1) {
      selectedArtistElement.appendChild(document.createTextNode(", "));
    }
  });
  selectedArtistElement.appendChild(document.createTextNode(")"));
  // Clear existing rows in the table
  const songsListElement = document.getElementById("songs-list");
  songsListElement.innerHTML = "";

  const filteredSongs = window.songs.filter(
    (song) => song.artistId === artist.artistId && !song.explicit
  );
  console.log(filteredSongs);
  filteredSongs.forEach((song) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td><a href="${song.url}" target="_blank">${song.title}</a></td>
                     <td>${song.year}</td>
                     <td>${formatDuration(song.duration)}</td>`;

    row.addEventListener("click", () => {
      // Log the song object to the console when the row is clicked
      console.log(song);
    });
    songsListElement.appendChild(row);
  });
}
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
// For debugging, display all of our data in the console
console.log({ songs, artists }, "Store Data");
