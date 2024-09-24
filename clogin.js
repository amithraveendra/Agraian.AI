document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Predefined usernames and passwords
        const users = [
            { username: 'user1', password: 'password1' },
            { username: 'user2', password: 'password2' },
            { username: 'user3', password: 'password3' }
            // Add more predefined users as needed
        ];

        // Check if the entered username and password match any predefined user
        const validUser = users.find(user => user.username === username && user.password === password);
        if (validUser) {
            // Redirect to details.html upon successful login
            window.location.href = 'details.html';
        } else {
            console.log('Invalid username or password');
            alert('Invalid username or password. Please try again.');
        }
    });
});
