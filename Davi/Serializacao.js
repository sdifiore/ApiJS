var xhr = new XMLHttpRequest();
var url = "http://difiores-001-site3.etempurl.com/Agenda";

xhr.open("GET", url, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
        // Faça o que precisa ser feito com os dados JSON aqui
    }
};

xhr.send();