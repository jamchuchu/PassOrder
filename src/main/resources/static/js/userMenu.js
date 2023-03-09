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

    getMenuByMenuId(menuId){
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: `/api/menu/menuId/${menuId}`,
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
          <p class="menu-id" hidden>${menu.menuId}</p>
          <div class="main-menu-drink-img"><img src="/static/images/음료1.PNG" alt=""></div>
          <div class="main-menu-drink-name"><p>${menu.menuName}</p></div>
          <div class="cart-button-group">
            <button type="button" class="cart-button">장바구니</button>
            <button type="button" class="cart-button favorite-button"><i class="fa-solid fa-heart-circle-plus"></i></button>
          </div>
        </div>
          `;
        });
        UserMenuEvent.getInstance().addClickCartButton();
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
            UserPopupService.getInstance().popupInnerText();
        }
        });

        var closeButton = document.querySelector(".close-button");
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

    popupInnerText(menuId){
        const menu = UserMenuApi.getInstance().getUserMenuByMenuId(menuId);
        alert(menu);
        const body = document.querySelector(".popup-body");
        body.innerHTML = `
        <div class="popup-body">
        <div class="body-left-content">
          <div class="register-image-container">
            <img src="/static/images/no-image.jpg" alt="">
          </div>
        </div>
        <div class="body-right-content">
          <form action="" method="post">
                <div class="menu-name-box">
                  <div class="option-label">
                    <label for="menuName" class="option-label">메뉴명</label>
                  </div>
                  <p class="menuName">${menu.menuName}</p>
                </div>
                <div class="menu-price-box">
                  <div class="option-label">
                    <label for="menu-price" class="option-label">메뉴가격</label>
                  </div>
                  <div>
                    <p class="menu-price">${menu.menuPrice}</p>
                  </div>
                </div>
                `;
        body.innerHTML +=        
                `
                <div class="menu-option-box">
                  <div class="option-label">
                    <label for="menuStatus">상태</label>
                  </div>
                  <div class="menu-button-input">
                    <div class="menu-button-area">
                `;
         
        menu.menuDtlList.array.forEach(dtl => {
            if(dtl.addMenuName == "hot" || dtl.addMenuName == "ice"){
            body.innerHTML +=`
            <input type="radio" id="hot-radio" name="hotAndice" value="hot">
            <label for="hot-radio" class="status-button hot-button">HOT</label>
            <input type="radio" id="ice-radio" name="hotAndice" value="ice">
            <label for="ice-radio" class="status-button ice-button">ICE</label>
          </div>
          <div class="add-hotandice-menu-price">
          </div>
        </div>
      </div>
      `
                if(dtl.addMenuName == "hot"){
                        const hotBtn = document.getElementById("hot-radio");
                        if(hotBtn.checked == true){
                            const addmenuPrice = document.querySelector(".add-hotandice-menu-price");
                            addmenuPrice.innerHTML = `
                            <p class="add-menu-plus-price">${dtl.addPrice}원</p>
                            `
                        }
                }else{
                    const iceBtn = document.getElementById("ice-radio");
                    if(iceBtn.checked == true){
                        const addmenuPrice = document.querySelector(".add-hotandice-menu-price");
                        addmenuPrice.innerHTML = `
                        <p class="add-menu-plus-price">${dtl.addPrice}원</p>
                        `
                    }
                }
            }else if(dtl.addMenuName == "shotAdd"){
            body.innerHTML +=`
                    <input type="radio" id="shot-none-radio" name="shotStatus" value=false>
                    <label for="shot-none-radio" class="shot-button shot-none-button">없음</label>
                    <input type="radio" id="shot-add-radio" name="shotStatus" value="true">
                    <label for="shot-add-radio" class="shot-button shot-add-button">추가</label>
                   </div>
                  <div class="add-shot-menu-price">
                  </div>
                </div>
              </div>
              `;
                    if(dtl.addPrice != 0){
                        const addBtn = document.getElementById("shot-add-radio");
                        if(addBtn.checked == true){
                            const addmenuPrice = document.querySelector(".add-shot-menu-price");
                            addmenuPrice.innerHTML = `
                            <p class="add-menu-plus-price">${dtl.addPrice}원</p>
                            `
                        }
                    }           
            }else if(dtl.addMenuName == "whipAdd"){
                body.innerHTML +=`
                        <input type="radio" id="whip-none-radio" name="whipStatus" value=false>
                        <label for="whip-none-radio" class="whip-button whip-none-button">없음</label>
                        <input type="radio" id="whip-add-radio" name="whipStatus" value=true>
                        <label for="whip-add-radio" class="whip-button whip-add-button">추가</label>
                    </div>
                      <div class="add-whip-menu-price">
                      </div>
                    </div>
                  </div>
                  `;
                        if(dtl.addPrice != 0){
                            const addBtn = document.getElementById("whip-add-radio");
                            if(addBtn.checked == true){
                                const addmenuPrice = document.querySelector(".add-whip-menu-price");
                                addmenuPrice.innerHTML = `
                                <p class="add-menu-plus-price">${dtl.addPrice}원</p>
                                `
                            }
                        }           
                }            
    });
    body.innerHTML +=
                `       

              </div>
              
              </form>
              </div>
            </div>
              <div class="button-group-footer">
                <button type="button" class="footer-button close-button">취소</button>
                <button type="button" class="footer-button save-button">장바구니</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
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