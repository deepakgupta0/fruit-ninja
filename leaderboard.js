$(document).ready(function () {
    $('#example').DataTable({
        "lengthMenu": [3, 5, 7],
        "pageLength": 5
    });
});
let rankListFromStorage = JSON.parse(localStorage.getItem("USERSCORE"));
if (rankListFromStorage) {
    rankListFromStorage.sort((a, b) => b.uscore - a.uscore);
}

//looping and appending in tbody
for (let i = 0; i < rankListFromStorage.length; i++) {
    let userObj = rankListFromStorage[i];
    let row = `<tr><td>${i + 1}</td><td>${userObj.uname}</td><td>${userObj.uscore}</td></tr>`
    $("tbody").append(row);
}