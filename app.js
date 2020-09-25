// UI Elements
const addUserButton = document.getElementById("add-user-button"),
  editUserButton = document.getElementById("edit-user-button"),
  deleteUserButton = document.getElementById("delete-user-button"),
  closeAddFormButton = document.querySelector(".close-button-for-add-user"),
  closeEditFormButton = document.querySelector(".close-button-for-edit-user"),
  closeDeleteFormButton = document.querySelector(".close-button-for-delete-user"),
  addUserOverlay = document.querySelector(".add-user-modal"),
  editUserOverlay = document.querySelector(".edit-user-modal"),
  deleteUserOverlay = document.querySelector(".delete-user-modal");

// Event Listeners
addUserButton.addEventListener("click", displayAddUserForm);
editUserButton.addEventListener("click", displayEditUserForm);
deleteUserButton.addEventListener("click", displayDeleteUserForm);
closeAddFormButton.addEventListener("click", closeAddUserForm);
closeEditFormButton.addEventListener("click", closeEditUserForm);
closeDeleteFormButton.addEventListener("click", closeDeleteUserForm);

// Function to Display Forms
function displayAddUserForm() {
  addUserOverlay.style.display = "flex";
}

function displayEditUserForm() {
  editUserOverlay.style.display = "flex";
}

function displayDeleteUserForm() {
  deleteUserOverlay.style.display = "flex";
}

// Function to close Forms
function closeAddUserForm() {
  addUserOverlay.style.display = "none";
}

function closeEditUserForm() {
  editUserOverlay.style.display = "none";
}

function closeDeleteUserForm() {
  deleteUserOverlay.style.display = "none";
}
