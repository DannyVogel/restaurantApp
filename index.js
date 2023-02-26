import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const checkoutContainerEl = document.querySelector(".checkout")
const paymenteInfoContainerEl = document.querySelector(".payment-info-container")
let checkoutItems = []

renderMenu(menuArray)

function renderMenu(menu){
    menu.forEach(item => {
        const foodItem = `
                <div class="food-item-container">
                    <p class="food-item-image">${item.emoji}</p>
                    <div class="food-details-container">
                        <p class="food-name">${item.name}</p>
                        <p class="food-ingredients">${item.ingredients}</p>
                        <p class="food-price">$ ${item.price}</p>
                    </div>
                    <button class="add-item-btn" id="add-item-btn" data-id="${item.id}">+</button>
                </div>`

    document.getElementById("menu").innerHTML += foodItem
    })
}

document.addEventListener("click", (event) => {
    if (event.target.id == "add-item-btn"){
        menuArray.forEach(item => {
                if(item.id == event.target.dataset.id){
                    const checkoutItem = {...item, checkoutId:uuidv4()}
                    checkoutItems.push(checkoutItem)

                    renderCheckoutItems(checkoutItems)
                    calculateCheckoutTotal()
                }
        })    
    }

    if (event.target.id == "remove-item-btn"){
        let id = event.target.dataset.removeItem
        document.getElementById(`checkout-item${id}`).remove()
        
        checkoutItems = checkoutItems.filter(item => item.checkoutId != id)
        renderCheckoutItems()
        calculateCheckoutTotal()
    }

    if (event.target.id == "checkout-btn") {
        paymenteInfoContainerEl.style.visibility = 'visible'
    } 
    
    if(event.target.id == "close-btn"){
        paymenteInfoContainerEl.style.visibility = 'hidden'
    }

    if(event.target.id == "pay-btn"){
        paymenteInfoContainerEl.style.visibility = 'hidden'
        checkoutContainerEl.style.visibility = 'hidden'
        document.getElementById('order-complete-container').style.visibility = 'visible'
        renderReceipt()
    }

    if(event.target.id == "reset-btn"){
        location.reload()
    }
})

function renderCheckoutItems() {
    checkoutContainerEl.style.visibility = checkoutItems.length > 0 ? 'visible' : 'hidden'

    const checkoutItemContainerEl = document.querySelector(".checkout-item-container")
    checkoutItemContainerEl.innerHTML = ''

    checkoutItems.forEach(item => {
        const checkoutItem = `
            <div class="checkout-item" id="checkout-item${item.checkoutId}">
                <p class="food-name">${item.name}</p>
                <button class="remove-item-btn" id="remove-item-btn" data-remove-item="${item.checkoutId}">remove</button>
                <p class="food-price">$ ${item.price}</p>
            </div>`
    
            checkoutItemContainerEl.innerHTML += checkoutItem
    })
}

function calculateCheckoutTotal(){
    let totalPrice = 0

    checkoutItems.forEach(item => {
        totalPrice += item.price
    })

    document.querySelector(".total-price").innerHTML = `$ ${totalPrice}`
}

const paymentDetails = document.getElementById('payment-details')
paymentDetails.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const paymentData = new FormData(paymentDetails)
    renderReceipt(paymentData)
})

function renderReceipt(data) {
    const name = data.get('userName')
    
    document.getElementById('order-complete').textContent = `Thanks, ${name}! Your order is on its way.`
}