async function DeleteProduct(id) {
    var response = await fetch('http://localhost:8081/products/' + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    document.getElementById("btnAnnDel").click();
    FetchAll();
}