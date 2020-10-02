/*******************************************************************************************
 *
 * Execution       : execute index.html using Live Server or run directly on Browser
 * Purpose         : Greetings App
 *
 * @description    : Implemention of fronend frame technologies to create a web GUI
 *                   application, with pop-forms, css-stlying, etc and integrate this
 *                   frontend to the backend of Greetings Application using Fetch Api.
 *                   Hence, being able to connect directly to the data base and also
 *                   required logical operations.
 *
 * @file           : index.html
 * @overview       : Greetings Application
 * @module         : Greetings Application
 * @version        : 1.0
 * @since          : 20/11/2020
 *
 * *****************************************************************************************/

// UI Elements
const addUserButton = document.getElementById('add-user-button'),
  editUserButton = document.getElementById('edit-user-button'),
  deleteUserButton = document.getElementById('delete-user-button'),
  closeAddFormButton = document.querySelector('.close-button-for-add-user'),
  closeEditFormButton = document.querySelector('.close-button-for-edit-user'),
  closeDeleteFormButton = document.querySelector('.close-button-for-delete-user'),
  addUserOverlay = document.querySelector('.add-user-modal'),
  editUserOverlay = document.querySelector('.edit-user-modal'),
  deleteUserOverlay = document.querySelector('.delete-user-modal');

// Event Listeners
addUserButton.addEventListener('click', displayAddUserForm);
editUserButton.addEventListener('click', displayEditUserForm);
deleteUserButton.addEventListener('click', displayDeleteUserForm);
closeAddFormButton.addEventListener('click', closeAddUserForm);
closeEditFormButton.addEventListener('click', closeEditUserForm);
closeDeleteFormButton.addEventListener('click', closeDeleteUserForm);

// URL
const URL = 'http://localhost:3000/users/';

/**
 * List All the users from the database
 */
const listAllUsersButton = document.getElementById('list-all-users-button');

listAllUsersButton.addEventListener('click', getAllUsersFromDataBase);

/**
 * ObjectId Map
 */
let idCount = 100;
let ObjectIdMap = new Map();

// Function to get all the users from the database
async function getAllUsersFromDataBase(event) {
  try {
    event.preventDefault();
    idCount = 100;
    ObjectIdMap.clear();
    const response = await fetch(URL, {
      'Content-Type': 'application/json',
    });

    const results = await response.json();

    let inputParsedToHTML = ``;

    await results.reverse().forEach((user) => {
      inputParsedToHTML += parseReceivedInputToHTML(user, idCount);
      document.querySelector('.input-from-data-base').innerHTML = inputParsedToHTML;
      idCount += 1;
    });
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Add Users
 */
const firstName = document.getElementById('first-name'),
  lastName = document.getElementById('last-name'),
  greetingMessage = document.getElementById('enter-greeting'),
  addUserForm = document.getElementById('add-user-form');

addUserForm.addEventListener('submit', addUserToDataBase);

// Function to add new User data
function addUserToDataBase(event) {
  event.preventDefault();
  const detailsArr = [firstName, lastName, greetingMessage];
  let isValidationPassed = checkRequired(detailsArr);
  const greeting = createGreetingObject(detailsArr);

  if (isValidationPassed) {
    fetch(URL, {
      method: 'POST',
      Accept: 'application/json, */*',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(greeting),
    })
      .then(() => {
        listAllUsersButton.click();
        alert(
          `Successfully added new user ${firstName.value.concat(' ', lastName.value)}!`
        );
      })
      .catch((error) => {
        clearFields();
        alert(error.message);
      });
    clearFields();
    closeAddFormButton.click();
  }
}

/**
 * Edit User
 */
const editUserFirstName = document.getElementById('edit-user-first-name'),
  editUserLastName = document.getElementById('edit-user-last-name'),
  editUserGreeting = document.getElementById('edit-user-enter-greeting');
(editUserObjectId = document.getElementById('object-id-edit-user')),
  (editUserForm = document.querySelector('.edit-user-form'));

editUserForm.addEventListener('submit', editUserSideMenuButtom);

document.querySelector('#edit-user-button').addEventListener('click', () => {
  clearEditFormFields();
  editUserFirstName.parentElement.parentElement.children[0].children[0].style.display =
    'block';
  editUserFirstName.parentElement.parentElement.children[0].children[1].style.display =
    'block';
  editUserObjectId.disabled = false;
});

function editUserSideMenuButtom(event) {
  event.preventDefault();
  let cardId = ObjectIdMap.get(parseInt(editUserObjectId.value));
  const detailsArr = [editUserFirstName, editUserLastName, editUserGreeting];
  let isValidationPassed = checkRequired(detailsArr);

  if (isValidationPassed) {
    fetch(URL + cardId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: editUserFirstName.value,
        lastName: editUserLastName.value,
        greeting: editUserGreeting.value,
      }),
    })
      .then(() => {
        listAllUsersButton.click();
        alert(
          `Successfully added edited user ${editUserFirstName.value.concat(
            ' ',
            editUserLastName.value
          )}!`
        );
      })
      .catch((error) => {
        closeEditFormButton.click();
        clearEditFormFields();
        alert(error.message);
      });
    clearEditFormFields();
    closeEditFormButton.click();
  }
}

function editUserCardButton(card) {
  try {
    let idElementValue = card.parentElement.parentElement.children[0].textContent,
      idElementValueParsedToInt = parseInt(idElementValue.match(/\d+/g));
    let greetingMessageElementValue =
      card.parentElement.parentElement.children[1].textContent;
    (fullName = card.parentElement.parentElement.children[3].textContent.split(' ')),
      (firstNameElementValue = fullName[0]),
      (lastNameElementValue = fullName[1]);

    // Pre filling the placeholder text for the edit from
    displayEditUserForm();
    editUserFirstName.parentElement.parentElement.children[0].children[1].value = idElementValueParsedToInt;
    document.getElementById('object-id-edit-user').disabled = true;
    editUserFirstName.parentElement.parentElement.children[0].children[0].style.display =
      'none';
    editUserFirstName.parentElement.parentElement.children[0].children[1].style.display =
      'none';
    editUserFirstName.parentElement.parentElement.children[1].children[1].value = firstNameElementValue;
    editUserFirstName.parentElement.parentElement.children[2].children[1].value = lastNameElementValue;
    editUserFirstName.parentElement.parentElement.children[3].children[1].value = greetingMessageElementValue;
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Delete User
 */

const deleteUserForm = document.querySelector('.delete-user-form'),
  deleteUserObjectId = document.getElementById('object-id-delete-user');

deleteUserForm.addEventListener('submit', deleteUserSideMenu);

function deleteUsersCardButton(card) {
  try {
    let idElementValue = card.parentElement.parentElement.children[0].textContent;
    let idElementValueParsedToInt = parseInt(idElementValue.match(/\d+/g));
    let cardId = ObjectIdMap.get(idElementValueParsedToInt);
    fetchApiToDeleteUsers(cardId);
  } catch (error) {
    alert(error.message);
  }
}

function deleteUserSideMenu(event) {
  try {
    event.preventDefault();
    let cardId = ObjectIdMap.get(parseInt(deleteUserObjectId.value));
    fetchApiToDeleteUsers(cardId);

    deleteUserObjectId.value = '';
    closeDeleteFormButton.click();
  } catch (error) {
    deleteUserObjectId.value = '';
    closeDeleteFormButton.click();
    alert(error.message);
  }
}

async function fetchApiToDeleteUsers(cardId) {
  let isConfirmed = confirm('Are you sure you want to delete user?');
  if (isConfirmed) {
    await fetch(URL + cardId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      listAllUsersButton.click();
      alert(`User Deleted!`);
    });
    return true;
  }
}

// Check Required Fields
function checkRequired(inputArr) {
  let flag = false;
  inputArr.forEach(function (input) {
    let inputValue = input.value.trim();
    if (inputValue === '') {
      showError(input, `${getFieldName(input)} is required`);
      flag = false;
    } else if (inputValue.match(/\d+/g) !== null) {
      showError(input, `${getFieldName(input)} cannot contain numbers`);
      flag = false;
    } else if (inputValue.length < 3) {
      showError(
        input,
        `${getFieldName(input)} must contain minimum 3 
      characters`
      );
      flag = false;
    } else {
      showSuccess(input);
      flag = true;
    }
  });
  return flag;
}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  console.log(formControl.className);
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success Outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Get Field Name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Creating greetings Object
function createGreetingObject(inputArr) {
  return {
    firstName: inputArr[0].value,
    lastName: inputArr[1].value,
    greeting: inputArr[2].value,
  };
}

// Function to Clear Fields
function clearFields() {
  (firstName.value = ''), (lastName.value = ''), (greetingMessage.value = '');
}

function clearEditFormFields() {
  (editUserObjectId.value = ''),
    (editUserFirstName.value = ''),
    (editUserLastName.value = ''),
    (editUserGreeting.value = '');
}

// Parse received input from server to HTML to Display
function parseReceivedInputToHTML(user, idCount) {
  ObjectIdMap.set(idCount, user._id);
  return `<div class="user-details-object">
  <div class="parent-paragraph-user-details">
    <span id="object-id" class="user-details">Object Id(${idCount})</span>
    <span id="greet-user" class="user-details">Hello</span
      ><span class="details-id">(Greeting)</span>
    <span id="display-user-name" class="user-details">${user.firstName.concat(
      ' ',
      user.lastName
    )} </span
      ><span class="details-id">(Name)</span>
      <span id="time-stamp">${user.updatedAt
        .slice(11, 16)
        .concat(', ', user.updatedAt.slice(0, 10))}
      <button class="buttons-greetings-card card-delete-button" onclick="deleteUsersCardButton(this)"><i class="fas fa-user-times fa-1x"></i></button>
      <button class="buttons-greetings-card" onclick="editUserCardButton(this)" ><i class="fas fa-edit fa-1x"></i></button>
      </span>
    </div>
  </div>`;
}

// Function to Display Forms
function displayAddUserForm() {
  addUserOverlay.style.display = 'flex';
}

function displayEditUserForm() {
  editUserOverlay.style.display = 'flex';
}

function displayDeleteUserForm() {
  deleteUserOverlay.style.display = 'flex';
}

// Function to close Forms
function closeAddUserForm() {
  addUserOverlay.style.display = 'none';
}

function closeEditUserForm() {
  editUserOverlay.style.display = 'none';
}

function closeDeleteUserForm() {
  deleteUserOverlay.style.display = 'none';
}
