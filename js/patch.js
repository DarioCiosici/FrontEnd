async function PatchProduct(id) {
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
    FetchAll();
}