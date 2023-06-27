// Event listener for the form submission
document.getElementById('github-form').addEventListener('submit', handleFormSubmission);

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    let searchItem = document.getElementById('search').value;
    searchUsers(searchItem);
}

// Function to search for users on GitHub
function searchUsers(username) {
    let searchUrl = 'https://api.github.com/search/users?q=' + username;

    fetch(searchUrl, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(data => {
            let users = data.items;
            if (users.length === 0) {
                displayNotFound();
            } else {
                displayUsers(users);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

// Function to display the search results
function displayUsers(users) {
    let userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(function (user) {
        let userElement = document.createElement('li');
        userElement.innerHTML = '<img src="' + user.avatar_url + '" width="50" height="50">' +
            '<a href="' + user.html_url + '">' + user.login + '</a>';
        userElement.addEventListener('click', function () {
            getUserRepos(user.login);
        });
        userList.appendChild(userElement);
    });
}

// Function to display "name not found" message
function displayNotFound() {
    let userList = document.getElementById('user-list');
    userList.innerHTML = '<li>User Does Not Exist !!!</li>';
}
