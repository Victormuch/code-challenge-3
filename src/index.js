document.addEventListener("DOMContentLoaded", function () {
  let glass1 = document.querySelector("#glass");
  glass1.addEventListener("click", function (event) {
    console.log("Glass Onion clicked!");
  });
});
 function getMovie(){
    fetch("http://localhost:3000/films")
    .then(res => res.json)
    .then(data => {
    
    })
 }