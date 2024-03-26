function popolaTabella(jsonData){
        var datiTabella=JSON.parse(jsonData)["data"]
        
          // Funzione per generare la tabella
          function generaTabella() {
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
              marcaCell.textContent = record["attributes"].marca;
        
              var nomeCell = document.createElement("td");
              nomeCell.textContent = record["attributes"].nome;
        
              var prezzoCell = document.createElement("td");
              prezzoCell.textContent = record["attributes"].prezzo;
        
              var azioniCell = document.createElement("td");
        
              // Creazione dei pulsanti per ciascun record
              var btnShow = document.createElement("button");
              btnShow.textContent = "Show";
              btnShow.classList.add("btn", "btn-info", "btn-sm","me-1");
        
              var btnModifica = document.createElement("button");
              btnModifica.textContent = "Modifica";
              btnModifica.classList.add("btn", "btn-info", "btn-sm", "me-1");
        
              var btnElimina = document.createElement("button");
              btnElimina.textContent = "Elimina";
              btnElimina.classList.add("btn", "btn-danger", "btn-sm");
        
              // Aggiunta dei pulsanti alla cella delle azioni
              
        
              // Aggiunta delle colonne alla riga
              row.appendChild(idCell);
              row.appendChild(marcaCell);
              row.appendChild(prezzoCell);
              row.appendChild(nomeCell)
              row.appendChild(azioniCell);
        
              // Aggiunta della riga al corpo della tabella
              tabellaBody.appendChild(row);
              azioniCell.appendChild(btnShow);
              azioniCell.appendChild(btnModifica);
              azioniCell.appendChild(btnElimina);
            });
          }
        
          // Attiva la funzione per generare la tabella al caricamento della pagina
          //window.onload = function() {
            generaTabella();
          //};
        
          // Gestione dell'azione generale
          var btnAzioneGenerale = document.getElementById("btnCreate");
          btnAzioneGenerale.addEventListener("click", function() {
            // Aggiungi qui la logica per l'azione generale
            alert("Azione generale eseguita!");
          });
        }
    function FetchAll(){
    const option = {
        method: 'GET'
      };
    {
        fetch('http://localhost:8081/products',option)
        .then(response => {
            console.log("Connessione riuscita")
            response.text().then((t)=>{popolaTabella(t)})// popolaTabella(response)
        });

    }
    }
   
    
//window.onlaod=FetchAll;
FetchAll()