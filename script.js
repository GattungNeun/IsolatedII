const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => addNewNote(note));
}

addBtn.addEventListener('click', ()=>{ addNewNote() });

function addNewNote(text = ''){
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="check hidden"><i class="fa-solid fa-check"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="textarea ${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit');
    const checkBtn = note.querySelector('.check');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('.textarea');

    textArea.value = text;
    main.innerHTML = marked(text);

    deleteBtn.addEventListener('click', ()=>{
        note.remove();
        updateLS();
    });

    editBtn.addEventListener('click', ()=>{
        main.classList.add('hidden');
        textArea.classList.remove('hidden');
        checkBtn.classList.remove('hidden');
        editBtn.classList.add('hidden');
    });

    checkBtn.addEventListener('click', ()=>{
        main.classList.remove('hidden');
        textArea.classList.add('hidden');
        checkBtn.classList.add('hidden');
        editBtn.classList.remove('hidden');
    });

    textArea.addEventListener('click', ()=>{
        main.classList.add('hidden');
        textArea.classList.remove('hidden');
        checkBtn.classList.remove('hidden');
        editBtn.classList.add('hidden');
    });

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS(){
    const notesText = document.querySelectorAll('textarea');
    const notes = [];
    notesText.forEach(note => notes.push(note.value));
    localStorage.setItem('notes', JSON.stringify(notes));
}