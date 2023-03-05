window.onload = () => {


    alert("ok");
    RegisterEvent.getInstance().addMenusSaveOnclickEvent();
    RegisterEvent.getInstance().addClickNoneEvent();
    RegisterEvent.getInstance().addClickcloseEvent();


    Service.getInstance().viewCategory();
}

class RegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterApi();
        }

        return this.#instance;
    }


    registerMenu(menu){
        let responseData = null;
        $.ajax({
            async: false,
            type: "post",
            url: "/api/menu",
            contentType: "application/json",
            data: JSON.stringify(menu),
            dataType: "JSON",
            success: response => {
                console.log(response);
                alert("메뉴 등록 완료. 메뉴 페이지로 이동합니다.");
                location.replace("/menu/admin");
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    getcagetory(){
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: "/api/menu/category",
            dataType: "JSON",
            success: response => {
                console.log(response);
                responseData = response;
            },
            error: error => {
                console.log(error);
                RegisterService.getInstance().setErrorMessage(error.responseJSON.data);
            }
        });
        return responseData;
    }
}


//errors
class Service {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new Service();
        }

        return this.#instance;
    }

    viewCategory(){
        const categoryBox = document.querySelector(".quick-group");
        categoryBox.innerHTML = `<button type="button" class="left-button">전체메뉴</button>` ;

        // const category = RegisterApi.getInstance().getcagetory();

        // for(const i=0; i<category.length; i++){
        //     const str = category[i];
        //     categoryBox.innerHTML += `<button type="button" class="left-button" value ="${str}">${str}</button>` ;
        // }

    }

}


class RegisterEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterEvent();
        }

        return this.#instance;
    }
    


    addMenusSaveOnclickEvent() {
        const menuSaveButton =  document.querySelector(".footer-button.save-button");
        menuSaveButton.onclick = () => {

            const category = document.querySelector("#category").value;
            const menuName = document.querySelector("#menuName").value;
            const menuPrice =  document.querySelector("#menuPrice").value;
            const hotAndice = Array.from(document.getElementsByName("hotAndice")).find(radio => radio.checked).value;    
            const shotStatus = Array.from(document.getElementsByName("shotStatus")).find(radio => radio.checked).value;    
            const whipStatus = Array.from(document.getElementsByName("whipStatus")).find(radio => radio.checked).value;    
            const hotAndicePrice = document.querySelectorAll(".menu-register-input.menu-status-input")[0].value;
            const shotPrice = document.querySelectorAll(".menu-register-input.menu-status-input")[1].value;
            const whipPrice = document.querySelectorAll(".menu-register-input.menu-status-input")[2].value;
        
            let menu = null;

            menu = new Menu(category, menuName, menuPrice, hotAndice, shotStatus, whipStatus, hotAndicePrice, shotPrice, whipPrice);
            RegisterApi.getInstance().registerMenu(menu);
        }

    }

    addClickNoneEvent(){
        const shotStatusFalse = document.getElementsByName("shotStatus")[0];
        shotStatusFalse.onclick = () => {
            const shotPrice = document.querySelectorAll(".menu-register-input.menu-status-input")[1];
            shotPrice.disabled =  true;
            shotPrice.placeholder = "없음 선택 시 입력 할 수 없습니다"; 
        } 
        const shotStatusTrue = document.getElementsByName("shotStatus")[1];
        shotStatusTrue.onclick = () => {
            const shotPrice = document.querySelectorAll(".menu-register-input.menu-status-input")[1];
            shotPrice.disabled =  false;
            shotPrice.placeholder = "옵션의 가격을 입력해주세요 example) 500"; 

        } 

        const whipStatusFalse = document.getElementsByName("whipStatus")[0];
        whipStatusFalse.onclick = () => {
            const whipPrice = document.querySelectorAll(".menu-register-input.menu-status-input")[2];
            whipPrice.disabled =  true;
            whipPrice.placeholder = "없음 선택 시 입력 할 수 없습니다"; 
        } 
        const whipStatusTrue = document.getElementsByName("whipStatus")[1];
        whipStatusTrue.onclick = () => {
            const whipPrice = document.querySelectorAll(".menu-register-input.menu-status-input")[2];
            whipPrice.disabled =  false;
            whipPrice.placeholder = "옵션의 가격을 입력해주세요 example) 500"; 

        } 
    }

    addClickcloseEvent(){
        const closeButton =  document.querySelector(".footer-button.close-button");
        closeButton.onclick = () => {
            document.querySelector("#category").value = null;
            document.querySelector("#menuName").value = null;
            document.querySelector("#menuPrice").value = null;
            Array.from(document.getElementsByName("hotAndice")).find(radio => radio.checked).checked = null;    
            Array.from(document.getElementsByName("shotStatus")).find(radio => radio.checked).checked = null;    
            Array.from(document.getElementsByName("whipStatus")).find(radio => radio.checked).checked = null;    
            document.querySelectorAll(".menu-register-input.menu-status-input")[0].value =  null;
            document.querySelectorAll(".menu-register-input.menu-status-input")[1].value =  null;
            document.querySelectorAll(".menu-register-input.menu-status-input")[2].value =null;
       
        }
    }


    

}


class Menu {
    category = null;
    menuName = null;
    menuPrice = null;
    hotAndice = null;
    shotStat0us = null;
    whipStatus = null;
    hotAndicePrice = null;
    shotPrice = null;
    whipPrice = null;


    constructor(category, menuName, menuPrice, hotAndice, shotStatus, whipStatus, hotAndicePrice, shotPrice, whipPrice) {
      this.category = category;
      this.menuName = menuName;
      this.menuPrice = menuPrice;
      this.hotAndice = hotAndice;
      this.shotStatus = shotStatus;
      this.whipStatus = whipStatus;
      this.hotAndicePrice = hotAndicePrice;
      this.shotPrice = shotPrice;
      this.whipPrice = whipPrice;
  }
}

    

