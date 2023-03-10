window.onload = () => {
    alert("ok");

    UserMenuEvent.getInstance().addCartOnclickEvent();

    UserMenuService.getInstance().viewCategory();
    UserMenuService.getInstance().viewUserMenu("all");

    UserMenuEvent.getInstance().addClickCartButton();
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

    
    getcategory(){
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: `/api/menu/user/${cafeId}/category`,
            dataType: "JSON",
            success: response => {
                console.log(response);
                responseData = response;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    getUserMenu(selectedCategory){
        if(selectedCategory=="all"){
            let responseData = null;
            $.ajax({
                async: false,
                type: "get",
                url: `/api/menu/user/${cafeId}`,
                dataType: "JSON",
                success: response => {
                    console.log(response);
                    responseData = response;
                },
                error: error => {
                    console.log(error);
                }
            });
            return responseData;
        }
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: `/api/menu/user/${cafeId}/${selectedCategory}`,
            dataType: "JSON",
            success: response => {
                console.log(response);
                responseData = response;
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

    
    viewCategory() {
        const categoryBox = document.querySelector(".quick-group");

        categoryBox.innerHTML = `
          <input type="radio" id="all-menu-radio" name="menu-category" value="all" checked>
          <label for="all-menu-radio" class="left-button">전체메뉴</label>
        `;
      
        const categories = UserMenuApi.getInstance().getcategory();
        categories.data.forEach((category) => {
          categoryBox.innerHTML += `
            <input type="radio" id="${category}-menu-radio" name="menu-category" value="${category}">
            <label for="${category}-menu-radio" class="left-button">${category.toUpperCase()}</label>
          `;
        });
    
        const categoryRadios = categoryBox.querySelectorAll('input[name="menu-category"]');
        categoryRadios.forEach((radio) => {
          radio.addEventListener("click", () => {
            const selectedCategory = radio.value;
            UserMenuService.getInstance().viewUserMenu(selectedCategory);
          });
        });

    }

    viewUserMenu(selectedCategory) {
        const menuBox = document.querySelector(".main-menu-drink-group");
        menuBox.innerHTML = "";
      
        const userMenus = UserMenuApi.getInstance().getUserMenu(selectedCategory);
        userMenus.data.forEach((menu) => {
          menuBox.innerHTML += `
          <div class="main-menu-drink-box">
          <p hidden>${menu.menuId}</p>
          <div class="main-menu-drink-img"><img src="/static/images/음료1.PNG" alt=""></div>
          <div class="main-menu-drink-name"><p>${menu.menuName}</p></div>
          <div class="cart-button-group">
            <button type="button" class="cart-button">장바구니</button>
            <button type="button" class="cart-button favorite-button"><i class="fa-solid fa-heart-circle-plus"></i></button>
          </div>
        </div>
          `;
        });
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

    addClickCartButton(){
        var popupContainer = document.querySelector(".popup-container"); 
        var cartButton = document.querySelectorAll(".cart-button"); 
        var closeButton = document.querySelector(".close-button");

        //console.log(modal);

        function toggleModal() { 
        popupContainer.classList.toggle("show-popup-container"); 
        }

        function windowOnClick(event) { 
            if (event.target === popupContainer) { 
                toggleModal(); 
            } 
        }

        cartButton.forEach(btn => {
        if (btn.classList.contains("cart-button") && !btn.classList.contains("favorite-button")) {
            btn.addEventListener("click", toggleModal);
        }
        });

        closeButton.addEventListener("click", toggleModal);
        window.addEventListener("click", windowOnClick);
        }

}



class UserPopupService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserPopupService();
        }

        return this.#instance;
    }
}

const cafeId = 26;

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