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
let idCount = 1;
let ObjectIdMap = new Map();

// Function to get all the users from the database
async function getAllUsersFromDataBase(event) {
  try {
    event.preventDefault();
    idCount = 1;
    ObjectIdMap.clear();
    const response = await fetch(URL, {
      'Content-Type': 'application/json',
    });

    const results = await response.json();

    let inputParsedToHTML = ``;

    await results.forEach((user) => {
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
  greetingMessage = document.getElementById('enter-greeting');
addUserForm = document.querySelector('.add-user-form');

addUserForm.addEventListener('submit', addUserToDataBase);

// Function to add new User data
async function addUserToDataBase(event) {
  try {
    event.preventDefault();
    const detailsArr = [firstName, lastName, greetingMessage];
    checkRequired(detailsArr);
    const greeting = createGreetingObject(detailsArr);

    const response = await fetch(URL, {
      method: 'POST',
      Accept: 'application/json, */*',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(greeting),
    });
    alert(`Successfully added new user ${firstName.value.concat(' ', lastName.value)}!`);

    // Clearing the Form Fields
    clearFields();
    closeAddFormButton.click();

    // Clicking the List Button to display the new user on the home screen
    listAllUsersButton.click();
  } catch (error) {
    clearFields();
    alert(error.message);
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

editUserForm.addEventListener('submit', editUserInDataBase);

document.querySelector('#edit-user-button').addEventListener('click', () => {
  clearEditFormFields();
  editUserObjectId.disabled = false;
});

async function editUserInDataBase(event) {
  try {
    event.preventDefault();
    let cardId = ObjectIdMap.get(parseInt(editUserObjectId.value));
    const detailsArr = [editUserFirstName, editUserLastName, editUserGreeting];
    checkRequired(detailsArr);

    const response = await fetch(URL + cardId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: editUserFirstName.value,
        lastName: editUserLastName.value,
        greeting: editUserGreeting.value,
      }),
    });
    clearEditFormFields();
    listAllUsersButton.click();
    closeEditFormButton.click();
    alert(
      `Successfully added edited user ${editUserFirstName.value.concat(
        ' ',
        editUserLastName.value
      )}!`
    );
  } catch (error) {
    closeEditFormButton.click();
    clearEditFormFields();
    alert(error.message);
  }
}

function editUserDirectlyFromGreetingsCard(card) {
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
    editUserFirstName.parentElement.children[1].value = idElementValueParsedToInt;
    document.getElementById('object-id-edit-user').disabled = true;
    editUserFirstName.parentElement.children[4].value = firstNameElementValue;
    editUserFirstName.parentElement.children[7].value = lastNameElementValue;
    editUserFirstName.parentElement.children[10].value = greetingMessageElementValue;
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Delete User
 */

const deleteUserForm = document.querySelector('.delete-user-form'),
  deleteUserObjectId = document.getElementById('object-id-delete-user');

deleteUserForm.addEventListener('submit', deleteUserInDataBase);

async function deleteUserDirectlyFromGreetingsCard(card) {
  try {
    let idElementValue = card.parentElement.parentElement.children[0].textContent;
    let idElementValueParsedToInt = parseInt(idElementValue.match(/\d+/g));
    let cardId = ObjectIdMap.get(idElementValueParsedToInt);
    let isFetchSuccessful = await fetchApiToDeleteUsers(cardId);
    if (isFetchSuccessful) {
      listAllUsersButton.click();
      alert(`User Deleted!`);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function deleteUserInDataBase(event) {
  try {
    event.preventDefault();
    let cardId = ObjectIdMap.get(parseInt(deleteUserObjectId.value));
    let isFetchSuccessful = await fetchApiToDeleteUsers(cardId);
    if (isFetchSuccessful) {
      listAllUsersButton.click();
      deleteUserObjectId.value = '';
      closeDeleteFormButton.click();
      listAllUsersButton.click();
      alert(`User Deleted!`);
    }
    
  } catch (error) {
    deleteUserObjectId.value = '';
    closeDeleteFormButton.click();
    alert(error.message);
  }
}

async function fetchApiToDeleteUsers(cardId) {
  let isConfirmed = confirm('Are you sure you want to delete user?');
  if (isConfirmed) {
    const response = await fetch(URL + cardId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return true
  }
}

// Check Required Fields
function checkRequired(inputArr) {
  for (let i = 0; i < inputArr.length; i++) {
    let inputValue = inputArr[i].value.trim();
    if (inputValue === '' || inputValue === null || inputValue === undefined) {
      throw Error('Fill all the required fields');
    } else if (inputValue.match(/\d+/g) !== null) {
      throw Error('Numbers are not permitted');
    } else if (inputValue.length < 3) {
      throw Error('Minimum three characters required in all the fields');
    }
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
function parseReceivedInputToHTML(user, idCount) {
  ObjectIdMap.set(idCount, user._id);
  return `<div class="user-details-object">
  <p class="parent-paragraph-user-details">
    <span id="object-id" class="user-details">Object Id(${idCount})</span>
    <span id="greet-user" class="user-details">Hello</span
      ><span class="details-id">(Greeting)</span>
    <span id="display-user-name" class="user-details">${user.firstName.concat(
      ' ',
      user.lastName
    )} </span
      ><span class="details-id">(Name)</span>
      <span id="time-stamp">${user.updatedAt.slice(0, 10)}
      <button class="buttons-greetings-card card-delete-button" onclick="deleteUserDirectlyFromGreetingsCard(this)"><i class="fas fa-user-times fa-1x"></i></button>
      <button class="buttons-greetings-card" onclick="editUserDirectlyFromGreetingsCard(this)" ><i class="fas fa-edit fa-1x"></i></button>
      </span>
    </p>
  </div>`;
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
