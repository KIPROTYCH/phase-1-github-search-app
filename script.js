// Event listener for the form submission
document.getElementById('github-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let searchItem = document.getElementById('search').value;
    searchUsers(searchItem);
});


