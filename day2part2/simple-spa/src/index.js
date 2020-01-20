import 'bootstrap/dist/css/bootstrap.css'

// EventListeners
document.getElementById("getAllUsersBtn").addEventListener("click", getAllUsers);
document.getElementById("getUserByIdBtn").addEventListener("click", getUserById);
document.getElementById("addUserBtn").addEventListener("click", addUser);
document.getElementById("editUserBtn").addEventListener("click", editUser);
document.getElementById("deleteUserBtn").addEventListener("click", deleteUser);

function getAllUsers() {
    let result = "";
    fetch("http://localhost:3333/api/users")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                data.forEach(obj => {
                    result += "<tr>\n" +
                            "<td>" + obj.id + "</td>\n" +
                            "<td>" + obj.age + "</td>\n" +
                            "<td>" + obj.name + "</td>\n" +
                            "<td>" + obj.gender + "</td>\n" +
                            "<td>" + obj.email + "</td>\n";
                });
                document.getElementById("allUsersTableBody").innerHTML = result;
            })
            .catch(err => {
                if (err.status) {
                    err.fullError.then(e => console.log(e.detail))
                } else {
                    console.log("Network error");
                }
            });

}

function getUserById() {
    const userId = document.getElementById("userIdInput").value;
    fetch("http://localhost:3333/api/users/" + userId)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let user = "<tr>\n" +
                        "<td>" + data.id + "</td>\n" +
                        "<td>" + data.age + "</td>\n" +
                        "<td>" + data.name + "</td>\n" +
                        "<td>" + data.gender + "</td>\n" +
                        "<td>" + data.email + "</td>\n";
                document.getElementById("userByIdTableBody").innerHTML = user;
            })
            .catch(err => {
                if (err.status) {
                    err.fullError.then(e => console.log(e.detail))
                } else {
                    console.log("Network error");
                }
            });
}

function makeOptions(http_method, body) {
    var options = {
        method: http_method,
        headers: {
            "Content-type": "application/json"
        }
    }
    if (body) {
        options.body = JSON.stringify(body);
    }
    return options;
}

function addUser() {
    const age = document.getElementById("addUserAge").value;
    const name = document.getElementById("addUserName").value;
    const gender = document.getElementById("addUserGender").value;
    const email = document.getElementById("addUserEmail").value;

    const data = {age: age, name: name, gender: gender, email: email};
    console.log(data);

    const options = makeOptions("POST", data);

    function handleHttpErrors(res) {
        if (!res.ok) {
            return Promise.reject({status: res.status, fullError: res.json()})
        }
        return res.json();
    }

    fetch("http://localhost:3333/api/users/", options)
            .then(res => handleHttpErrors(res))
            .then(data => console.log(data))
            .catch(err => {
                console.log(err);

                if (err.status) {
                    err.fullError.then(e => console.log(e.detail))
                } else {
                    console.log("Network error");
                }
            });
}

function editUser() {
    const userid = document.getElementById("editUserId").value;
    const age = document.getElementById("editUserAge").value;
    const name = document.getElementById("editUserName").value;
    const gender = document.getElementById("editUserGender").value;
    const email = document.getElementById("editUserEmail").value;

    const data = {age: age, name: name, gender: gender, email: email};
    console.log(data);

    const options = makeOptions("PUT", data);

    function handleHttpErrors(res) {
        if (!res.ok) {
            return Promise.reject({status: res.status, fullError: res.json()})
        }
        return res.json();
    }

    fetch("http://localhost:3333/api/users/" + userid, options)
            .then(res => handleHttpErrors(res))
            .then(data => console.log(data))
            .catch(err => {
                console.log(err);

                if (err.status) {
                    err.fullError.then(e => console.log(e.detail))
                } else {
                    console.log("Network error");
                }
            });
}


function deleteUser() {
      const userid = document.getElementById("deleteUserId").value;
      fetch("http://localhost:3333/api/users/"+userid,{method: 'DELETE'})
      .then(function(response){
            if(response.ok) alert("User deleted!");
      })
              .catch(err => {
                  console.log(err);
  
                  if (err.status) {
                      err.fullError.then(e => console.log(e.detail))
                  } else {
                      console.log("Network error");
                  }
              });
  }