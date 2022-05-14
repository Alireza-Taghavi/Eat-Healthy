//DOM
list=document.getElementById("list");
main = document.getElementsByTagName("main");

//Fetch
class warn{
    constructor(x){
        this.name = x;
    }

    showAlert= async()=>{
        await alert(this.name)
    }
}
class red {
    getPrompt=()=>{
        return prompt("give sting")
    }
}
//test comment