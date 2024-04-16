async function CreateProduct() {
    var dati = {
        'nome': document.getElementById('nome').value,
        'prezzo': parseInt(document.getElementById('prezzo').value),
        'marca': document.getElementById('marca').value
    };
    console.log(dati);
    var response = await fetch('http://localhost:8081/products', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dati)
    });
    document.getElementById("btnAnn").click();
    FetchAll();
}