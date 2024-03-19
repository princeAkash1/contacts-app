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
    contacts.forEach(function(contact) {
        var newRow = "<tr><td>" + contact.name + "</td><td>" + contact.phone + "</td><td>" + contact.email + "</td><td><button class='btn btn-primary'>Edit</button></td><td><button class='btn btn-danger'>Delete</button></td></tr>";
        tbody.innerHTML += newRow;
    });
}

window.onload = updateTable;
