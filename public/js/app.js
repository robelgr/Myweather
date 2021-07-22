
const weatherform = document.querySelector('form')
const inputfield = document.querySelector('input')
const message = document.querySelector('#message')
const error_message_one = document.querySelector('#error')
const place = document.querySelector('#address')
// create the submit event 
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const userinput = inputfield.value
    message.textContent = "loading..."
    fetch(`http://localhost:31000/weather?address=${userinput}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                error_message_one.textContent = data.error
            } else {
                const { forcast_string, address } = data
                place.textContent = address
                message.textContent = forcast_string
            }
        })
    })
})
