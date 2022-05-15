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
        menu = this.menu;
        console.log(menu);
    }

    async loadOrders() {
        this.res2 = await fetch(this.ordersConst);
        this.orders = await this.res2.json();
        console.log(this.orders);
    }
}

const head = new getData();
