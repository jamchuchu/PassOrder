window.onload = () => {
    alert("ok");

    UserMenuEvent.getInstance().addCartOnclickEvent();
}



class UserMenuApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserMenuApi();
        }

        return this.#instance;
    }

    addCart(menu){
        let responseData = null;
        $.ajax({
            async: false,
            type: "post",
            url: "/api/cart",
            contentType: "application/json",
            data: JSON.stringify(menu),
            dataType: "JSON",
            success: response => {
                console.log(response);
                alert("장바구니에 추가되었습니다. 메뉴 페이지로 이동합니다.");
                location.replace("/menu/user");
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

}

//errors
class UserMenuService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserMenuService();
        }

        return this.#instance;
    }
}


class UserMenuEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserMenuEvent();
        }

        return this.#instance;
    }
    
    addCartOnclickEvent(){
        const menuSaveButton =  document.querySelector(".footer-button.save-button");
        menuSaveButton.onclick = () => {

            const menuName = document.querySelector(".menuName").innerText;
            let totalPrice = parseInt(document.querySelector(".menu-price").innerHTML);
            const prices = document.querySelectorAll(".add-menu-plus-price");
            const price = parseInt(prices[0].innerText.split('원')[0]);
            totalPrice += price;
            const hotAndice = Array.from(document.getElementsByName("hotAndice")).find(radio => radio.checked).value;    
            const shotStatus = Array.from(document.getElementsByName("shotStatus")).find(radio => radio.checked).value;    
            const whipStatus = Array.from(document.getElementsByName("whipStatus")).find(radio => radio.checked).value;    
            
            if(shotStatus === "true"){
                const price = parseInt(prices[1].innerText.split('원')[0]);
                totalPrice += price;
            }
            if(whipStatus === "true"){
                const price = parseInt(prices[2].innerText.split('원')[0]);
                totalPrice += price;
            }
            
            alert(totalPrice);
            const menu = new Menu(menuName, totalPrice, hotAndice, shotStatus, whipStatus);
            UserMenuApi.getInstance().addCart(menu);


        }
    }
}


class Menu {
    menuName = null;
    totalPrice = null;
    hotAndice = null;
    shotStatus = null;
    whipStatus = null;

    constructor(menuName, totalPrice, hotAndice, shotStatus, whipStatus) {
      this.menuName = menuName;
      this.totalPrice = totalPrice;
      this.hotAndice = hotAndice;
      this.shotStatus = shotStatus;
      this.whipStatus = whipStatus;
  }
}