const vase = document.getElementById("vase");
const bouquet = document.getElementById("bouquet");

vase.addEventListener("click", () => {
    bouquet.classList.toggle("show");
});
