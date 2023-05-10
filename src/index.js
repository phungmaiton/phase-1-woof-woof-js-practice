const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');

const dogImage = document.createElement('img');
const dogH2 = document.createElement('h2');
const button = document.createElement('button');
dogInfo.append(dogImage, dogH2, button);  

const filterButton = document.querySelector('#good-dog-filter');

// function hideEmptyButton(button) {
//     if (button.textContent= "") {
//         button.style.display = 'none';
//     }
// }

// hideEmptyButton(button);

fetch('http://localhost:3000/pups') 
    .then(resp => resp.json())
    .then(dogObject => {
        dogObject.forEach(dog => renderDogs(dog));
        const goodDogs = dogObject.filter(dog => dog.isGoodDog === true)   
    }
    )

const renderDogs = (dog) => {
    const dogName = document.createElement('span');
    dogName.textContent = dog.name;
    dogBar.appendChild(dogName);
    dogName.id = dog.id;
    isGoodDog = dog.isGoodDog;

    dogName.addEventListener('click', () => {
        dogImage.src = dog.image;
        dogH2.textContent = dog.name;
        function isGoodDog (button) {
            if (dog.isGoodDog === true) {
                button.innerHTML = "Good Dog!"
            } else {
                button.innerHTML = "Bad Dog!"
            }
        }
        isGoodDog(button)  

        button.addEventListener('click', () => {
            if (button.textContent === "Good Dog!") {
                button.textContent = "Bad Dog!"
                isGoodDog = false;
            } else if (button.textContent === "Bad Dog!") {
                button.textContent = "Good Dog!"
                isGoodDog = true;
            }
        
            fetch(`http://localhost:3000/pups/${dog.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            isGoodDog: isGoodDog
                        })
                    })
                    .then(resp => resp.json())
            })
        })

        filterButton.addEventListener('click', () => {
            if (filterButton.textContent === "Filter good dogs: OFF") {
                filterButton.textContent = "Filter good dogs: ON";
                dogBar.innerHTML= "";
                goodDogs.forEach(goodDog => {
                    dogName.textContent = goodDog.name;
                    dogBar.appendChild(dogName);
                })
            } else if (filterButton.textContent === "Filter good dogs: ON") {
                filterButton.textContent = "Filter good dogs: OFF"
                dogBar.innerHTML= "";
                renderDogs(dog);
            }
            
            
        
        })
}


