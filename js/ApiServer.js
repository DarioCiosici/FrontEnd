function popolaTabella(jsonData) {
    var datiTabella = jsonData;
    // Funzione per generare la tabella
    function generaTabella() {
        var responseDel;
        var tabellaBody = document.getElementById("tabellaBody");

        // Pulizia del corpo della tabella
        tabellaBody.innerHTML = '';

        // Iterazione attraverso i dati della tabella
        datiTabella.forEach(function(record) {
            // Creazione di una riga della tabella
            var row = document.createElement("tr");

            // Creazione delle colonne per ogni campo
            var idCell = document.createElement("td");
            idCell.textContent = record.id;

            var marcaCell = document.createElement("td");
            marcaCell.textContent = record["attributes"].nome;

            var nomeCell = document.createElement("td");
            nomeCell.textContent = record["attributes"].prezzo;

            var prezzoCell = document.createElement("td");
            prezzoCell.textContent = record["attributes"].marca;

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
                var nome = document.getElementById('nomeP');
                nome.value = record["attributes"].nome;

                var marca = document.getElementById('marcaP');
                marca.value = record["attributes"].marca;

                var prezzo = document.getElementById('prezzoP');
                prezzo.value = record["attributes"].prezzo;
                var action = document.getElementById('ActionPatch');
                action.addEventListener("click", function() {
                    PatchProduct(record.id);
                });
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
                var nome = document.getElementById('nomeLabelD');
                nome.textContent = responseDel["nome"];

                var marca = document.getElementById('marcaLabelD');
                marca.textContent = responseDel["marca"];

                var prezzo = document.getElementById('prezzoLabelD');
                prezzo.textContent = responseDel["prezzo"];
                var btnDel = document.getElementById("ActionD");
                btnDel.hidden = false;
                btnDel.addEventListener("click", async function() {
                    await DeleteProduct(responseDel["id"]);
                    responseDel.value = null;
                });
                var btnAnn = document.getElementById("btnAnnDel");
                btnAnn.addEventListener("click", function() {
                    responseDel = null;
                })
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
    generaTabella();

}
async function FetchAll() {

    const option = {
        method: 'GET',
        mode: 'no-cors'
    };
    var response = await fetch('http://localhost:8081/products', { mode: "cors" });
    var data = await response.json();
    var arr = data["data"];
    console.log(arr); //stampo i dati in console per debug
    popolaTabella(arr);
}

FetchAll()