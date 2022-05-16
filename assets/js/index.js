const main = document.querySelector("main");


let menu, res;

class getData {
    constructor() {
        this.menuConst = "http://localhost:3000/menu";
        this.ordersConst = "http://localhost:3000/orders";
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
        console.log(this.orders);
    }

    menuSetter() {
        menu = this.menu;
        main.innerHTML = "";
        this.menu.forEach(item =>
            main.innerHTML += `<div class="item d-flex jst-cnt-btw"><div class="left-item d-flex flex-column align-itms-strt"><div class="rate-holder"><span class="rate">${item.stars}</span><i class="fa fa-star" aria-hidden="true"></i></div><div class="info-box d-flex flex-column align-itms-strt gap0-5"><div class="txt-lft">${item.foodName}</div></div></div><div class="right-item  d-flex flex-column align-itms-cnt"><div class="item-pic d-flex flex-column"><div class="pic-holder"><img src="${item.imageLink}" alt="Spicy Rote"></div><div class="item-amount d-flex flex-column"><i class="fa fa-certificate" aria-hidden="true"></i><span class="amount">4</span></div></div><span class=" each-price">${item.price}</span></div></div>`
        )
    }
}

const head = new getData();
