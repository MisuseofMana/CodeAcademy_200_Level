'use strict'

let users = []; //placeholder for users

let listUsers = () => {
    users.forEach(entry => {

        console.log(entry)
        
        //get app wrapper
        const domEntries = document.getElementById('entries');

        //create section, class module
        const wrapper = document.createElement('section');
        wrapper.classList.add('module')
        domEntries.appendChild(wrapper)

        //create section, add to wrapper, add class
        const nameWrapper = document.createElement('section')
        wrapper.appendChild(nameWrapper)
        nameWrapper.classList.add('nameWrapper')

        //create img, add src, append to wrapper
        const propic = document.createElement('img');
        propic.src = entry.picture.medium;
        propic.classList.add('propic');
        nameWrapper.appendChild(propic)

        //create h1, add to wrapper
        const title = document.createElement('h1');
        nameWrapper.appendChild(title);
        //set text of h1, add class
        title.innerText = entry.name.first + ' ' + entry.name.last
        title.classList.add('title');
        
        //create div, add divv to wrapper, add class arrow
        const arrow = document.createElement('div');
        wrapper.appendChild(arrow)
        arrow.classList.add('arrow')

        //create section, add xtraData to wrapper, hide xtraData
        const xtraData = document.createElement('section')
        wrapper.appendChild(xtraData);
        xtraData.classList.add('hide');
        xtraData.classList.add('xtraData')

        //create paragraph, add to xtraData, set innerText
        const birthday = document.createElement('p')
        xtraData.appendChild(birthday);
        birthday.innerText = `Birthday: ${entry.dob.date.slice(0,10)} | Age: ${entry.dob.age}`;

        //create cellm add to xtraData, set innerText
        const cell = document.createElement('p')
        xtraData.appendChild(cell);
        cell.innerText = `Cell: ${entry.cell}`;
        
        // create paragraph, add address to xtraData, set innerText 
        const address = document.createElement('p')
        xtraData.appendChild(address);
        address.innerText = `Location: ${entry.location.city} ${entry.location.country}`

        const email = document.createElement('p')
        xtraData.appendChild(email);
        email.innerText = `Email: ${entry.email}`

        wrapper.addEventListener('click', () => {
            if (xtraData.classList.contains('hide')) {
                xtraData.classList.remove('hide')
                arrow.classList.remove('arrow')
                arrow.classList.add('openArrow')
            }
            else {
                xtraData.classList.add('hide')
                arrow.classList.remove('openArrow')
                arrow.classList.add('arrow')

            }
        })
    })
}

const openAddress = () => {

}

// fetchUser function, runs on window load
const fetchUser = () => {
    fetch('https://randomuser.me/api/?results=8')
    .then(response => response.json())
    .then(jsonRes => users = jsonRes.results)
    .then(function(){listUsers()})
}

//run fetchUser on window load
document.onload = fetchUser();
