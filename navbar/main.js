// сделано по этому ролику
// https://www.youtube.com/watch?v=ZzQdVy8b8n4
const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    this.classList.toggle("is-active");
});
