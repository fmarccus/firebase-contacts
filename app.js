const formdata = $("#formdata");
const tabledata = $("#tabledata");


formdata.on('submit', (e) => {
    e.preventDefault();

    db.collection('contacts').add({
        lastname: $("#lastname").val(),
        firstname: $("#firstname").val(),
        middlename: $("#middlename").val(),
        email: $("#email").val(),
        contact: $("#contact").val(),
        address: $("#address").val()
    })
    $("#lastname").val("");
    $("#firstname").val("");
    $("#middlename").val("");
    $("#email").val("");
    $("#contact").val("");
    $("#address").val("");
    alert("New Contact Added!");
})


function render(doc) {
    tabledata.append(`<tr id="${doc.id}"> 
    <td>${doc.data().lastname}</td>
    <td>${doc.data().firstname}</td>
    <td>${doc.data().middlename}</td>
    <td>${doc.data().email}</td>
    <td>${doc.data().contact}</td>
    <td>${doc.data().address}</td>
    </tr>`)
}

db.collection('contacts').orderBy('lastname').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=="added"){
            render(change.doc)
        }
    })
})

