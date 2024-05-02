function popolaTabella(jsonData) {
    var datiTabella = jsonData;

    // Pulizia del corpo della tabella

    // Funzione per generare la tabella

    generaTabella(datiTabella);


}

function generaTabella(datiTabella) {
    // Iterazione attraverso i dati della tabella
    datiTabella.forEach(function(record) {
        // Creazione di una riga della tabella
        var row = document.createElement("tr");
        row.id = record.id;

        // Creazione delle colonne per ogni campo
        var idCell = document.createElement("td");
        idCell.textContent = record.id;
        idCell.setAttribute("data-id", record.id);
        idCell.setAttribute("id", record.id);
        console.log(idCell);

        var marcaCell = document.createElement("td");
        marcaCell.textContent = record["attributes"].nome;
        marcaCell.setAttribute("id", record.id + "nome");

        var nomeCell = document.createElement("td");
        nomeCell.textContent = record["attributes"].prezzo;
        nomeCell.setAttribute("id", record.id + "prezzo");

        var prezzoCell = document.createElement("td");
        prezzoCell.textContent = record["attributes"].marca;
        prezzoCell.setAttribute("id", record.id + "marca");

        var azioniCell = document.createElement("td");

        // Creazione dei pulsanti per ciascun record
        var btnShow = document.createElement("button");
        btnShow.textContent = "Show";
        btnShow.classList.add("btn", "btn-info", "btn-sm", "me-1");
        btnShow.setAttribute("data-bs-toggle", "modal");
        btnShow.setAttribute("data-bs-target", "#VisualModal");
        btnShow.setAttribute("id", "Show");
        btnShow.addEventListener("click", async function() {
            var response = await ReadProduct(record.id)
            var nome = document.getElementById('nomeLabel');
            nome.textContent = response["nome"];

            var marca = document.getElementById('marcaLabel');
            marca.textContent = response["marca"];

            var prezzo = document.getElementById('prezzoLabel');
            prezzo.textContent = response["prezzo"];
            document.getElementById("Action").hidden = true;
        });


        var btnModifica = document.createElement("button");
        btnModifica.textContent = "Modifica";
        btnModifica.classList.add("btn", "btn-info", "btn-sm", "me-1");
        btnModifica.setAttribute("data-bs-toggle", "modal");
        btnModifica.setAttribute("data-bs-target", "#PatchModal");
        btnModifica.addEventListener("click", function() {
            var id = document.getElementById("IdLabelP");
            id.textContent = record["id"];

            var nome = document.getElementById('nomeP');
            nome.value = record["attributes"].nome;

            var marca = document.getElementById('marcaP');
            marca.value = record["attributes"].marca;

            var prezzo = document.getElementById('prezzoP');
            prezzo.value = record["attributes"].prezzo;
            var action = document.getElementById('ActionPatch');

        });

        var btnElimina = document.createElement("button");
        btnElimina.textContent = "Elimina";
        btnElimina.classList.add("btn", "btn-danger", "btn-sm");
        btnElimina.setAttribute("data-bs-toggle", "modal");
        btnElimina.setAttribute("data-bs-target", "#DeleteModal");
        btnElimina.addEventListener("click", async function() {
            responseDel = await ReadProduct(record.id);
            console.log(responseDel);
            console.log(responseDel["id"]);

            var id = document.getElementById("IdLabelD");
            id.textContent = responseDel["id"];

            var nome = document.getElementById('nomeLabelD');
            nome.textContent = responseDel["nome"];

            var marca = document.getElementById('marcaLabelD');
            marca.textContent = responseDel["marca"];

            var prezzo = document.getElementById('prezzoLabelD');
            prezzo.textContent = responseDel["prezzo"];
        });
        // Aggiunta delle colonne alla riga
        row.appendChild(idCell);
        row.appendChild(marcaCell);
        row.appendChild(prezzoCell);
        row.appendChild(nomeCell);
        row.appendChild(azioniCell);

        // Aggiunta della riga al corpo della tabella
        tabellaBody.appendChild(row);
        azioniCell.appendChild(btnShow);
        azioniCell.appendChild(btnModifica);
        azioniCell.appendChild(btnElimina);
    });
}

async function FetchAll() {

    const option = {
        method: 'GET',
        mode: 'no-cors'
    };
    var response = await fetch('http://localhost:8081/products', { mode: "cors" });
    var data = await response.json();
    var arr = data["data"];
    console.log(arr);
    var tabellaBody = document.getElementById("tabellaBody");

    // Pulizia del corpo della tabella
    tabellaBody.innerHTML = ''; //stampo i dati in console per debug
    popolaTabella(arr);
}

FetchAll()