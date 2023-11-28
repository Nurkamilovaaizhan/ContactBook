function validateForm() {
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;

    if (name == "") {
        alert("Name is required");
        return false;
    }
    if (number == "") {
        alert("Number is required");
        return false;
    }

    return true;
}

function showData() {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    let html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.number + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-1">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-2">Edit</button></td>';
        html += "</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData;
//add
function AddData() {
    if (validateForm()) {
        let name = document.getElementById("name").value;
        let number = document.getElementById("number").value;
        let peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        peopleList.push({
            name: name,
            number: number
        });
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("number").value = "";
    }
}
//delete
function deleteData(index) {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}
// upadate/edit
function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("number").value = peopleList[index].number;

    document.querySelector("#update").onclick = function () {
        if (validateForm()) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].number = document.getElementById("number").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById("name").value = "";
            document.getElementById("number").value = "";

            document.getElementById("submit").style.display = "none";
            document.getElementById("update").style.display = "block";
        }
    };
}