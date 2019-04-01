

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


const fetchForecastAndRender = (address) => {
    const url = `/weather?address=${address}`

    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''
    
    return fetch(url).then(res => {
        return res.json()
    }).then(data => {
        if (data.error) throw new Error(data.error)
        console.log({data})
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    }).catch(err => {
        messageOne.textContent = err.message
    })
}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetchForecastAndRender(location)
})