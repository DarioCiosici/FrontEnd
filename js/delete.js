async function DeleteProduct() {
    var id = document.getElementById("IdLabelD").textContent;
    console.log(id);
    var response = await fetch('http://localhost:8081/products/' + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    document.getElementById("btnAnnDel").click();
        var rowToDelete = document.getElementById(id);
            if (rowToDelete) {
                rowToDelete.parentNode.removeChild(rowToDelete);
            } else {
                console.error("Nessuna riga con ID " + id + " trovata nella tabella.");
            }
    
}