document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check if the username and password match predefined producers
        if (validateUser(username, password)) {
            // Redirect to the form page (replace 'form.html' with your actual form page)
            window.location.href = 'prod.html';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    // Function to validate user credentials
    function validateUser(username, password) {
        // Predefined producers
        const producers = [
            { username: 'amith', password: 'amith' },
            { username: 'producer2', password: 'password2' },
            { username: 'producer3', password: 'password3' }
            // Add more predefined producers as needed
        ];

        // Check if the provided username and password match any predefined producer
        return producers.some(producer => producer.username === username && producer.password === password);
    }
});
