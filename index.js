import { menuArray } from "./data.js";

renderMenu(menuArray)

function renderMenu(menu){
    menu.forEach(item => {
        const foodItem = `
                <div class="food-item-container">
                    <p class="food-item-image">${item.emoji}</p>
                    <div class="food-details-container">
                        <p class="food-name">${item.name}</p>
                        <p class="food-ingredients">${item.ingredients}</p>
                        <p class="food-price">$${item.price}</p>
                    </div>
                    <button class="add-item-btn" id="${item.id}">+</button>
                </div>
        `
    
    document.getElementById("menu").innerHTML += foodItem
    })
}

document.addEventListener("click", (event) => {
    if (event.target.id == "remove-item-btn"){
        let id = event.target.dataset.removeItem
        document.getElementById(`checkout-item${id}`).remove()
        
        const totalPrice = document.querySelector(".total-price")
        totalPrice.innerHTML = Number(totalPrice.innerHTML) - menuArray[id].price

    } else if (event.target.id){
        menuArray.forEach(item => {
                if(item.id == event.target.id){
                    renderCheckout(item.name, item.price, item.id)
                }
        })    
    }
})

function renderCheckout(name, price, id) {
    document.querySelector(".checkout").style.visibility = 'visible'

    const checkoutItem = `
        <div class="checkout-item" id="checkout-item${id}">
            <p class="food-name">${name}</p>
            <button class="remove-item-btn" id="remove-item-btn" data-remove-item="${id}">remove</button>
            <p class="food-price">$${price}</p>
        </div>`

    document.querySelector(".checkout-item-container").innerHTML += checkoutItem
    
    const totalPrice = document.querySelector(".total-price")
    if(!totalPrice.innerHTML){
        totalPrice.innerHTML += `${price}`
    } else {
        totalPrice.innerHTML = Number(totalPrice.innerHTML) + price
    }
}
