console.log('Client side Javasript file is Loade');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationName = document.querySelector('#location')
const messageOne = document.querySelector('#message-1')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const locationInput = search.value;
    search.value = ''
    messageOne.textContent = 'Loading...'

    fetch('/weather?location=' + locationInput)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) { 
                messageOne.innerHTML = `<p class="notFoundPage"><b> ${data.error} </b></p> `
            } else { 
                displayData(data)
            }
        })
})

let displayData = (data) => {
    const localDate = new Date().toLocaleTimeString();
    locationName.textContent = data.location.name;
    messageOne.innerHTML = `
    <img src="${data.current.condition.icon}">
    <strong>
          Hey! It's ${localDate}, </br>
           The Weather in ${data.location.name}, ${data.location.country} is ${data.current.condition.text}, Currently ${data.current.temp_c}\u2103 
    </strong>
    `;
}
