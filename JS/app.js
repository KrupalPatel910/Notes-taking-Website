console.log("Welcome to Note taking Website");
showNotes();


// If user adds a Note, add it to the local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {

    e.preventDefault()
    let addTxt = document.getElementById('addTxt').value;
    let notes = localStorage.getItem('notes');
    let addTtl = document.getElementById('addTtl').value;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
// console.log(addTxt.length,addTtl.length)

    if ((addTxt.length > 2 ) && (addTtl.length > 2)) {
        notesObj.push({
            txt: addTxt,
            title: addTtl
        });
         if (display.validate(notes)) {
             display.show('success', '   Your book has been successfully added.');
             display.clear()
         } 
    } 
    else {
        display.show('danger', '   Sorry! You cannot fill all details.');
        display.clear()

        

     }



    // console.log({txt:addTxt.value,title:addTtl.value},"working")
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTtl.value = ""
    addTxt.value = "";
    // console.log(notesObj)
    showNotes();
})



// Function to show Element  from Local Storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">

      
        <div class="card-body">
          <h3 class="card-title">Note - ${index + 1}</h3>
          <h6>Title: ${element.title}</h6>

          <p class="card-text">${element.txt}</p>
          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>

      </div> `;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;

    }
    else {
        notesElm.innerHTML = `<p>Nothing to show! Use <b>"Add a Note"</b> section above to add notes.</p>`
    }


}


// Function to Delete Note

function deleteNote(index) {
    console.log("i am deleting", index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    showNotes()
}

// Search Button
let search = document.getElementById('searchTxt');

search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();

    // console.log("input event fired" , inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.toLowerCase().includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

        // console.log(cardTxt);
    })





})


//Display Constructor

function Display() {

}
function Notes(addTtl, addTxt) {
    this.addTtl = addTtl,
        this.addTxt = addTxt
}




// Implement  the validate Function

Display.prototype.validate = function (notes) {
    if (addTtl.length < 2 || addTxt.length < 3) {
        return false;

    }
    else {
        return true;

    }
};
Display.prototype.show = function (type, message) {

    let msg = document.getElementById('msg');
    if (type === 'success') {
        boldTXt = "Success"
    }
    else {
        boldTXt = "Error"

    }
    msg.innerHTML = ` 
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${boldTXt}:</strong>    ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`

    setTimeout(function () {
        msg.innerHTML = ``;
    }, 4000)

}

let display = new Display();

Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
};

// Clear function to remove all book

function clearNote(index) {
    console.log("i am clearing all notes");
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    showNotes()
}


