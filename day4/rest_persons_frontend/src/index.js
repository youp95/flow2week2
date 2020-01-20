import 'bootstrap/dist/css/bootstrap.css'
window.onload = showPersons();
function showPersons() {
    fetch("http://localhost:8080/demob/api/person/all")
        .then(res => res.json())
        .then((data) => {
            console.log("test");
            var tablehead = Object.keys(data.all[0]).map(x => "<td>" + x.toUpperCase()
                + "</td>");
            tablehead.unshift("<tr>");
            tablehead.push("<td></td></tr>");
            tablehead = tablehead.join("\n");
            var tabledata = data.all.map(obj => "<tr>" +
                Object.keys(obj).map(x => "<td>" + obj[x] + "</td>").join("\n")
                + "<td><a href=\"#\" id=\"delete\">delete</a> / <a href=\"#\" id=\"edit\">edit</a></td></tr>").join("\n");
            var table = tablehead + tabledata;
            document.getElementById("table").innerHTML = table;
        });
}
document.getElementById("reload").onclick = showPersons;

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

document.getElementById("add").onclick = function () {
    const data = {
        firstName: "name", lastName: "name", phone: "phone",
        address: {
            street: "street",
            zip: "zip",
            city: "city",
        }
    };
    const options = makeOptions("POST", data);
    fetch("http://localhost:8080/demob/api/person/", options);
}


console.log("inside");
document.getElementById("edit").addEventListener('click', function () {
    const data = {
        firstName: "name", lastName: "name", phone: "phone",
        address: {
            street: "street",
            zip: "zip",
            city: "city",
        }
    };
    const options = makeOptions("POST", data);
    fetch("http://localhost:8080/demob/api/person/", options);
});
console.log("inside");
document.getElementById("remove").addEventListener('click', function (e) {
    console.log(e.target);
    const options = makeOptions("REMOVE");
    fetch("http://localhost:8080/demob/api/person/", options);
});
