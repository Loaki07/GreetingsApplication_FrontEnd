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

/**
 * Add Users
 */
const firstName = document.getElementById("first-name"),
  lastName = document.getElementById("last-name"),
  greetingMessage = document.getElementById("enter-greeting");
addUserForm = document.querySelector(".add-user-form");

addUserForm.addEventListener("submit", addUserToDataBase);

// Functions to process data
function addUserToDataBase(e) {
  e.preventDefault();
  let detailsArr = [firstName, lastName, greetingMessage];
  checkRequired(detailsArr);
  let greeting = createGreetingObject(detailsArr);
}

// Check Required Fields
function checkRequired(inputArr) {
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].value.trim() === "") {
      alert("Fill all the required fields");
      break;
    } else if (inputArr[i].value.trim().length < 3) {
      alert("Minimum three characters required in all the fields");
      break;
    }
  }
}

/**
 * Listing All the users from the database
 */
const listAllUsersButton = document.getElementById("list-all-users-button");

listAllUsersButton.addEventListener("click", getAllUsersFromDataBase);

// Function to get all the users from the database
async function getAllUsersFromDataBase(e) {
  try {
    e.preventDefault();
    const URL = "http://localhost:3000/users";

    const response = await fetch(URL, {
      "Content-type": "application/json",
    });

    const results = await response.json();

    let inputParsedToHTML = ``;

    results.forEach((data) => {
      inputParsedToHTML += parseReceivedInputToHTML(data);
      document.getElementById("input-from-data-base").innerHTML = inputParsedToHTML;
    });
  } catch (error) {
    console.log(error);
  }
}

// Creating greetings Object
function createGreetingObject(inputArr) {
  return {
    firstName: inputArr[0].value,
    lastName: inputArr[1].value,
    greeting: inputArr[2].value,
  };
}

// Parse received input from server to HTML to Display
function parseReceivedInputToHTML(data) {
  return `<div class="user-details-object">
  <p class="parent-paragraph-user-details">
    <span id="object-id" class="user-details">Object Id(${data._id})</span>
    <span id="greet-user" class="user-details">Hello ${data.firstName.concat(
      " ",
      data.lastName
    )} </span
      ><span class="details-id">(Greeting)</span>
    <span id="display-user-name" class="user-details">${data.firstName.concat(
      " ",
      data.lastName
    )} </span
      ><span class="details-id">(Name)</span>
    <span id="time-stamp">${data.updatedAt}</span>
  </p>
  </div>`;
}

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
