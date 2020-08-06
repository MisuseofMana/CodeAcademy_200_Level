//on add button clicked 
    //append text to bottom of the list as a new li tag
    //must add button as well
let addButton = document.getElementById('addButton');
    addButton.addEventListener('click', () => {
   let inputText =  document.querySelector('input').value;
   let inputNode = document.querySelector('input');
   inputNode.value = '';
   
   let li = document.createElement('li');
   
   let span = document.createElement('span');
   span.innerText = inputText;

   let deleteButton = document.createElement('button');
   deleteButton.innerText="X";
   deleteButton.classList.add('delete');

   let ul = document.querySelector('ul');
   ul.appendChild(li);
   
   li.appendChild(span);
   setUpSpanList(span);

   li.appendChild(deleteButton);
   setUpDeleteButton(deleteButton);

});


//DELETE SETUP
//adds click event to buttons
let allDeletes = document.querySelectorAll('.delete');

// calls setUpDeleteButton on each element
allDeletes.forEach((button) => {
    setUpDeleteButton(button);
});

function setUpDeleteButton(value) {
    value.addEventListener('click', () => {
        value.parentNode.remove();
    });
}

//SPAN SETUP
//adds onclick event to all spans
let allSpans = document.querySelectorAll('span');

allSpans.forEach( (span) => {
    setUpSpanList(span);
});

function setUpSpanList(value) {
    value.addEventListener('click', () => {
        value.classList.toggle('done');
    });
}