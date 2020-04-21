const moveTestElement = document.querySelector('#move-test')

moveTestElement.addEventListener('click', event => {
  event.preventDefault()

  const coordinate = document.querySelector('#move-coordinate').value
  const uri = moveTestElement.attributes.href.value

  fetch(uri, {
    method: 'post',
    body: JSON.stringify({ coordinate }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
})