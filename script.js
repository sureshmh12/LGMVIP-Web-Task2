document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const output = document.getElementById('output');
    const clearButton = document.getElementById('clear-button');

    // Load existing data from localStorage
    let savedData = JSON.parse(localStorage.getItem('studentData')) || [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const course = document.getElementById('course').value;
        const password = document.getElementById('password').value;

        // Create a new student object
        const student = {
            name,
            email,
            age,
            gender,
            course,
            password
        };

        // Add the new student to the savedData array
        savedData.push(student);

        // Save the updated data to localStorage
        localStorage.setItem('studentData', JSON.stringify(savedData));

        // Display all saved entries next to the form
        displayEntries(savedData);

        form.reset();
    });

    // Function to display all saved entries
    function displayEntries(data) {
        let html = '';
        data.forEach((entry, index) => {
            html += `
                <div class="entry">
                    <h3>Entry ${index + 1}</h3>
                    <p>Name: ${entry.name}</p>
                    <p>Email: ${entry.email}</p>
                    <p>Age: ${entry.age}</p>
                    <p>Gender: ${entry.gender}</p>
                    <p>Course: ${entry.course}</p>
                    <button class="clear-entry" data-index="${index}">Clear Entry</button>
                </div>
            `;
        });
        output.innerHTML = html;

        // Add event listeners to "Clear Entry" buttons
        const clearButtons = document.querySelectorAll('.clear-entry');
        clearButtons.forEach(button => {
            button.addEventListener('click', function () {
                const indexToRemove = parseInt(button.getAttribute('data-index'));
                savedData.splice(indexToRemove, 1);
                localStorage.setItem('studentData', JSON.stringify(savedData));
                displayEntries(savedData);
            });
        });
    }

    // Display all saved entries on page load
    displayEntries(savedData);

    // Clear button functionality
    clearButton.addEventListener('click', function () {
        if (savedData.length > 0) {
            savedData.pop();
            localStorage.setItem('studentData', JSON.stringify(savedData));
            displayEntries(savedData);
        }
    });
});