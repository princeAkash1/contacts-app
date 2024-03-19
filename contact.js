document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userName = document.getElementById('name').value;
    var userPhoneNumber = document.getElementById('phone').value;
    var userEmail = document.getElementById('email').value;

    var contacts = {
        name: userName,
        phone: userPhoneNumber,
        email: userEmail
    };

    saveContact(contacts);
    clearForm();
});

function saveContact(contacts) {
    var existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    existingContacts.push(contacts);
    localStorage.setItem("contacts", JSON.stringify(existingContacts));
    updateTable();
}

function clearForm() {
    document.getElementById('contactForm').reset();
}

function updateTable() {
    var tbody = document.querySelector('#contactTable tbody');
    tbody.innerHTML = ""; // Clear table body
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.forEach(function(contact, index) { // Added 'index' parameter
        var newRow = "<tr><td>" + contact.name + "</td><td>" + contact.phone + "</td><td>" + contact.email + "</td><td><button class='btn btn-danger' onclick='confirmDelete(" + index + ")'>Delete</button></td></tr>"; // Passed 'index' to confirmDelete()
        tbody.innerHTML += newRow;
    });
}

function confirmDelete(index) {
    if (confirm("Are you sure you want to delete this contact?")) {
        deleteContact(index);
    }
}

function deleteContact(index) {
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    updateTable();
}

// Call updateTable() on page load
updateTable();
