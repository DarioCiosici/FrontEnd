async function ReadProduct(id) {
    var response = await fetch('http://localhost:8081/products/' + id, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    console.log(response);
    response = await response.json();
    var dati = {
        'id': response["data"].id,
        'nome': response["data"]["attributes"].nome,
        'prezzo': response["data"]["attributes"].prezzo,
        'marca': response["data"]["attributes"].marca,
    };
    return dati;
}