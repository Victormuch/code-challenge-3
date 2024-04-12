//This event listener waits for the HTML document to fully load before executing the provided callback function.
document.addEventListener("DOMContentLoaded", () => {
  // This function finds and displayes the first movie
  findMovie();
  // This event listenerwaits for one to click on the Buy Ticket button to trigger the buyTicket function.
  document.querySelector("#buy-ticket").addEventListener("click", buyTicket);
});
//This function fetches the movie names from the server
function findMovie() {
  fetch("https://my-json-server.typicode.com/Victormuch/code-challenge-3/films")
    .then((res) => res.json())
    .then((films1) => {
      films1.forEach((movie) => {
        filmMovies(movie);
      });
      // an event that will tigger movie details when clicked
      const firstfilm = document.querySelector("#id1");
      firstfilm.dispatchEvent(new Event("click"));
    });
}

// This function creates a list item for each movie and adds it to the movie list
function filmMovies(movie) {
  let new1 = document.createElement("li");
  // we set the text content of the list of items to the movie title using string interpolation
  new1.textContent = `${movie.title}`;
  // we assign an id to the movie for easy accessibility
  new1.id = "id" + movie.id;
  // Create a delete button for each film
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  // we add an event listener to trigger the deleteMovie function only  when the delete button is clicked
  deleteButton.addEventListener("click", () => {
    deleteMovie(movie.id);
  });
  // we append the delete button to the list items
  new1.appendChild(deleteButton);

  // we append the list items to the list of films
  const new2 = document.querySelector("#films");
  new2.appendChild(new1);
  new1.classList.add("film");
  new1.classList.add("item");
  new1.addEventListener("click", () => {
    clicked(movie);
  });
}
// This function sends a delete request from the server
function deleteMovie(movieId) {
  fetch(`http://localhost:3000/films/${movieId}`, {
    method: "DELETE",
  });
}
// The function  that displays movie details when clicked
function clicked(movie) {
  // We have to select the element with the ID poster
  const poster = document.querySelector("img#poster");
  // we set the src attribute to the url of the movie its self
  poster.src = movie.poster;
  // we put an alt if case the url does not load
  poster.alt = movie.title;
  // we select elements with the id showing which contain information about the movie
  const info = document.querySelector("#showing");
  // we do updating of the movie details here
  info.querySelector("#title").textContent = movie.title;
  info.querySelector("#runtime").textContent = movie.runtime + " minutes";
  info.querySelector("#film-info").textContent = movie.description;
  info.querySelector("#showtime").textContent = movie.showtime;
  info.querySelector("#ticket-num").textContent =
    movie.capacity - movie.tickets_sold + " remaining tickets";
}
// We create a function to handle the buying of tickets
function buyTicket(Ticket) {
  // We use document.querySelector to select the element withthe id ticket-num
  const ticket1 = document.querySelector("#ticket-num");
  /**
   * .split method is used to split the string into array
   * [0]is used to access the first element since they start from zero
   */
  const tickets2 = ticket1.textContent.split(" ")[0];
  // We use the if condition to set condition for decreasing the tickets everytime they are bought
  if (tickets2 > 0) {
    ticket1.textContent = tickets2 - 1 + " remaining tickets";
  } else if (tickets2 == 0) {
    // if there are no more tickets the user should get an alert message that they are sold out.
    alert("sold out ");
  }
}
// reference .w3school, some regex and some tutorials here and there.(whole web) 