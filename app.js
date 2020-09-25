// UI Elements
const addUserButton = document.getElementById("add-user-btn"),
  editUserButton = document.getElementById("edit-user-btn"),
  closeAddFormButton = document.querySelector(".close-button-for-add-user"),
  closeEditFormButton = document.querySelector(".close-button-for-edit-user"),
  addUserOverlay = document.querySelector(".add-user-modal"),
  editUserOverlay = document.querySelector(".edit-user-modal");

// Event Listeners
addUserButton.addEventListener("click", displayAddUserForm);
editUserButton.addEventListener("click", displayEditUserForm);
closeAddFormButton.addEventListener("click", closeAddUserForm);
closeEditFormButton.addEventListener("click", closeEditUserForm);

// Function to Display Add User Form
function displayAddUserForm() {
  addUserOverlay.style.display = "flex";
}

// Function to Display Edit User Form
function displayEditUserForm() {
  editUserOverlay.style.display = "flex";
}

// Function to close Add User Form
function closeAddUserForm() {
  addUserOverlay.style.display = "none";
}

function closeEditUserForm() {
  editUserOverlay.style.display = "none";
}
