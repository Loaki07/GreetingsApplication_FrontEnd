// UI Elements
const addUserButtonUI = document.getElementById("add-user-btn"),
  closeFormButtonUI = document.querySelector(".close-button");

// Event Listeners
addUserButtonUI.addEventListener("click", displayAddUserForm);
closeFormButtonUI.addEventListener("click", closeForm);

// Function to Display Add User Form
function displayAddUserForm() {
  document.querySelector(".add-user-modal").style.display = "flex";
}

// Function to close Add User Form
function closeForm() {
  document.querySelector(".add-user-modal").style.display = "none";
}
