class getData {
    constructor(URL){
        this.URL = URL;
        this.load();
    }
    async load(){
       this.res = await fetch(this.URL);
        this.data = await this.res.json();
        console.log(this.data);
    }
}
const fetchMenu = new getData("http://localhost:3000/menu");
const fetchOrders = new getData("http://localhost:3000/orders");