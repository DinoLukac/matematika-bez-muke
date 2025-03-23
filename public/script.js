document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".latest-materials").classList.add("show")
})
document.getElementById("avatar-toggle").addEventListener("click", function () {
  const dropdown = document.getElementById("dropdown-menu")
  dropdown.classList.toggle("show")
})
const avatarToggle = document.getElementById("avatar-toggle")
const dropdownMenu = document.getElementById("dropdown-menu")

// Sakrij dropdown ako klikne van avatara i van menija
document.addEventListener("click", function (event) {
  if (
    !avatarToggle.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.classList.remove("show")
  }
})

// Script za formu
const form = document.getElementById("Kontaktirajte")
const checkmark = document.getElementById("checkmark")
