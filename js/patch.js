async function PatchProduct() {
    var id = document.getElementById("IdLabelP").textContent;
    var dati = {
        'nome': document.getElementById('nomeP').value,
        'prezzo': parseInt(document.getElementById('prezzoP').value),
        'marca': document.getElementById('marcaP').value
    };
    console.log(dati);
    var response = await fetch('http://localhost:8081/products/' + id, {
        method: 'PATCH',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dati)
    });
    document.getElementById("btnAnnP").click();
    var CellToPatch = document.getElementById(id);
    console.log(CellToPatch);
    var CellMarcaToPatch = document.getElementById(id + 'marca');
    console.log(CellMarcaToPatch);
    CellMarcaToPatch.textContent = dati['marca'];
    var CellNomeToPatch = document.getElementById(id + 'nome');
    CellNomeToPatch.textContent = dati['nome'];
    var CellPrezzoToPatch = document.getElementById(id + 'prezzo');
    CellPrezzoToPatch.textContent = dati['prezzo'];
    console.log(CellToPatch);

}