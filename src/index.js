const addBtn = document.querySelector('#new-toy-btn')
const toyFormDiv = document.querySelector('#form-container')
const toyForm = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector("#toy-collection")
let toys = []
let addToy = false

// YOUR CODE HERE

//fetch the data from localhost
fetch("http://localhost:3000/toys")
.then(function(response) {
  return response.json();
})
.then(function(parsedData) {
  toys = parsedData
  return createCard(toys)
});

// display the data that you got from localhost
function createCard(array) {
  array.forEach(function(element) {
    toyCollection.innerHTML += `
    <div class="card">
      <h2>${element.name}</h2>
      <img src=${element.image} class="toy-avatar" />
      <p>${element.likes} Likes</p>
      <button class="like-btn" data-id=${element.id} data-action="like">Like <3</button>
    </div>`
    // console.log(element);
  })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormDiv.style.display = 'block'
    // select the form --> add event listener on the form
    toyFormDiv.addEventListener("submit", function(event) {
      event.preventDefault();
      const name = toyFormDiv.querySelector("#name").value
      const image = toyFormDiv.querySelector("#image").value

      data = {
        name: name,
        image: image,
        likes: 0
      }

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify(data)
      })
      .then(function(response) {
        return response.json();
        // console.log(response.json());
      })
      .then(function(res){
        // add the new toy to toys
        toys.push(res)
        // re-display the toys
        toyCollection.innerHTML = "";
        createCard(toys)
        toyForm.reset()
      })
    })
  // addToy = !addToy
  } else {
    toyFormDiv.style.display = 'none'
  }
}) // end of add btn event listener

// add event listener on the container
toyCollection.addEventListener("click", function(event) {
  // console.log(event.target.dataset.action);

  if (event.target.dataset.action === "like") {
    //select the toy that needs to be edited
    let toy = toys.find(t => t.id == event.target.dataset.id)
    toy.likes +m          = 1

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify(toy)
    })
    .then(response => response.json())
    .then(function(res) {
      toys.map(function(toy) {
        if (toy.id == res.id) {
          return res
        } else {
          return toy
        }
      })
      toyCollection.innerHTML = ""
      createCard(toys)
    })
  }
})



// OR HERE!
