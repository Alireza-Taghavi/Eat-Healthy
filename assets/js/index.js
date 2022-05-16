const main = document.querySelector("main");
const list = document.getElementById("list");
const modalBG = document.querySelector(".modal-bg");
const modal = modalBG.querySelector(".modal")


class getData {
    priceAll = 0;
    total = 0;
    taxes = 0.09;
    cart = [];

    constructor() {
        this.menuConst = "http://localhost:3000/menu";
        this.ordersConst = "http://localhost:3000/orders";
        this.reset();
        this.loadMenu();
        this.loadOrders();
    }

    async loadMenu() {
        this.res = await fetch(this.menuConst);
        this.menu = await this.res.json();
        await this.menuSetter();

    }

    async loadOrders() {
        this.res2 = await fetch(this.ordersConst);
        this.orders = await this.res2.json();
    }

    reset() {
        main.innerHTML = "";
        list.innerHTML = "";
    }

    menuSetter() {
        let d = 0;
        this.menu.forEach(item => this.cart.push({name: item.foodName, amount: 0, price: 0, d:d++}))
        this.menu.forEach(item =>
            main.innerHTML += `<div id="${item.id}" onclick="og.openModal(${item.id})" class="item d-flex jst-cnt-btw"><div class="left-item d-flex flex-column align-itms-strt"><div class="rate-holder"><span class="rate">${item.stars}</span><i class="fa fa-star" aria-hidden="true"></i></div><div class="info-box d-flex flex-column align-itms-strt gap0-5"><div class="txt-lft">${item.foodName}</div></div></div><div class="right-item  d-flex flex-column align-itms-cnt"><div class="item-pic d-flex flex-column"><div class="pic-holder"><img src="${item.imageLink}" alt="Spicy Rote"></div><div class="item-amount d-flex flex-column"><i class="fa fa-certificate" aria-hidden="true"></i><span class="amount">0</span></div></div><span class=" each-price">${item.price}</span></div></div>`,
        )
    }

    closeModal() {
        modalBG.style.display = "none";
    }

    openModal(e) {

        const item = this.menu[e - 1];
        document.querySelector(".modal-pic").innerHTML = `<img src="${item.imageLink}" alt="${item.foodName}">`
        document.getElementById("modal-name").innerText = item.foodName;
        document.querySelector(".one").innerText = item.price;
        document.querySelector(".rate").innerText = item.stars;
        document.querySelector(".three").innerHTML = `<button id="lower" onclick="og.lower(${e - 1})"><i class="fa fa-minus" aria-hidden="true"></i></button><input id="amount" type="text" value="0"><button id="higher" onclick="og.higher(${e - 1})"><i class="fa fa-plus" aria-hidden="true"></i></button>`;
        this.renderModal(e-1);
        modalBG.style.display = "flex";

    }

    lower(x) {

        if (this.cart[x].amount > 0) {
            this.cart[x].amount--;
            this.cart[x].price = (this.menu[x].price * this.cart[x].amount).toFixed(2);
            this.renderModal(x);
            this.renderList();
        }
    }

    higher(x) {

        if (this.cart[x].amount < 20) {
            this.cart[x].amount++;
            this.cart[x].price = (this.menu[x].price * this.cart[x].amount).toFixed(2);
            this.renderModal(x);
            this.renderList();
        }
    }
    remove(x){
        this.cart[x].amount = 0;
        this.renderModal(x);
        this.renderList();
    }
    renderModal(x) {
        document.getElementById("modal-total").innerText = this.cart[x].price;
        document.getElementById("amount").value = this.cart[x].amount;
    }

    renderList() {

        console.log(this.cart)
        list.innerHTML = "";
        // for (let i = 0; i < this.cart.length; i++) {
        //     this.addList(i);
        //     console.log("test loop")
        // }
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i] !== undefined && this.cart[i].amount > 0) {
                list.innerHTML += `
                <div class="list-item d-flex flex-column align-itms-cnt">
                <div class="not-hr">
                   <span class="jst-slf-str">
                    ${this.cart[i].name}
                   </span>
                    <button onclick="og.remove(${this.cart[i].d})" class="close-btn jst-slf-end"><i class="fa fa-times " aria-hidden="true"></i></button>
                    <div class="btns d-flex gap0-5 jst-slf-str">
                        <button onclick="og.lower(${this.cart[i].d})" class="btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></button>
                        <input type="number" value="${this.cart[i].amount}" class="input-number">
                        <button onclick="og.higher(${this.cart[i].d})" class="btn-plus"><i class="fa fa-plus" aria-hidden="true"></i></button>
                    </div>
                    <span class="dlr jst-slf-end tot">${this.cart[i].price}</span>
                </div>
                <div class="line"></div>
            </div>
                `
            }
        }
    }
}


const og = new getData();

modalBG.addEventListener("click", og.closeModal, false);
modal.addEventListener("click", (event) => {
    event.stopPropagation();
}, false);
document.getElementById("modal-close").addEventListener("click", og.closeModal, false);


