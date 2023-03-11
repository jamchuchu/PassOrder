window.onload = () => {

    UserMenuService.getInstance().viewCategory();
    UserMenuService.getInstance().viewUserMenu("all");

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
            <button type="button" class="cart-button" id="menu-id-${menu.menuId}">장바구니</button>
            <button type="button" class="cart-button favorite-button"><i class="fa-solid fa-heart-circle-plus"></i></button>
          </div>
        </div>
          `;
        });
        UserMenuEvent.getInstance().cartBtnOnclickEvent();
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
        const menuSaveButton = document.querySelector(".footer-button.save-button");
        menuSaveButton.onclick = () => {
        
            const menuName = document.querySelector(".menuName").innerText;
            let totalPrice = parseInt(document.querySelector(".menu-price").innerText);
        
            let hotAndice = null;
            let shotStatus = null;
            let whipStatus = null;
        
            try {
                const hotAndiceRadios = document.getElementsByName("hotAndice");
                if (hotAndiceRadios.length > 0) {
                    hotAndice = Array.from(hotAndiceRadios).find(radio => radio.checked).value;
                }
            } catch (error) {}
        
            try {
                const shotStatusRadios = document.getElementsByName("shotStatus");
                if (shotStatusRadios.length > 0) {
                    shotStatus = Array.from(shotStatusRadios).find(radio => radio.checked).value;
                }
            } catch (error) {}
        
            try {
                const whipStatusRadios = document.getElementsByName("whipStatus");
                if (whipStatusRadios.length > 0) {
                    whipStatus = Array.from(whipStatusRadios).find(radio => radio.checked).value;
                }
            } catch (error) {}
        
            try {
                const statusMenuPlusPrice = document.querySelector(".status-menu-plus-price");
                if (statusMenuPlusPrice) {
                    totalPrice += parseInt(statusMenuPlusPrice.innerText.split("원")[0]);
                }
            } catch (error) {}
        
            try {
                const shotMenuPlusPrice = document.querySelector(".shot-menu-plus-price");
                if (shotMenuPlusPrice) {
                    totalPrice += parseInt(shotMenuPlusPrice.innerText.split("원")[0]);
                }
            } catch (error) {}
        
            try {
                const whipMenuPlusPrice = document.querySelector(".whip-menu-plus-price");
                if (whipMenuPlusPrice) {
                    totalPrice += parseInt(whipMenuPlusPrice.innerText.split("원")[0]);
                }
            } catch (error) {}
        
            const menu = new Menu(menuName, totalPrice, hotAndice, shotStatus, whipStatus);
            console.log(menu);
            UserMenuApi.getInstance().addCart(menu);
        }


        
    }

    cartBtnOnclickEvent(){
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
              btn.onclick = () => {
                const menuId = btn.id.slice(8);
                UserPopupService.getInstance().setPopupInnerText(menuId);
                closeButton.addEventListener("click", toggleModal);
                window.addEventListener("click", windowOnClick);
              };
            }
          });


        }

        closeButtonOnclickEvent(){
            var popupContainer = document.querySelector(".popup-container"); 
            var closeButton = document.querySelector(".close-button");

            closeButton.onclick = () => {
                popupContainer.hidden = true;
            }


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

    setPopupInnerText(menuId){
        let body =  document.querySelector(".popup-body");
        body.innerHTML = "";
        
        let menu = UserMenuApi.getInstance().getMenuByMenuId(menuId);
        
        body.innerHTML +=`
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

                <div class="status-option-box">
                  <div class="option-label">
                    <label for="menuStatus">상태</label>
                  </div>
                  <div class="menu-button-input">
                    <div class="menu-button-area">
                      <input type="radio" id="hot-radio" name="hotAndice" value="hot">
                      <label for="hot-radio" class="status-button hot-button">HOT</label>
                      <input type="radio" id="ice-radio" name="hotAndice" value="ice">
                      <label for="ice-radio" class="status-button ice-button">ICE</label>
                    </div>
                    <div class="add-menu-price">
                      <p class="add-menu-plus-price">500원</p>
                    </div>
                  </div>
                </div>

                <div class="shot-option-box">
                  <div class="option-label">
                    <label for="menuStatus">샷 추가</label>
                  </div>
                  <div class="menu-button-input">
                    <div class="menu-button-area">
                      <input type="radio" id="shot-none-radio" name="shotStatus" value=false>
                      <label for="shot-none-radio" class="shot-button shot-none-button">없음</label>
                      <input type="radio" id="shot-add-radio" name="shotStatus" value="true">
                      <label for="shot-add-radio" class="shot-button shot-add-button">추가</label>
                    </div>
                    <div class="add-menu-price">
                      <p class="add-menu-plus-price">500원</p>
                    </div>
                  </div>
                </div>

                <div class="whip-option-box">
                  <div class="option-label">
                    <label for="menuStatus">휘핑 추가</label>
                  </div>
                  <div class="menu-button-input">
                    <div class="menu-button-area">
                      <input type="radio" id="whip-none-radio" name="whipStatus" value=false>
                      <label for="whip-none-radio" class="whip-button whip-none-button">없음</label>
                      <input type="radio" id="whip-add-radio" name="whipStatus" value=true>
                      <label for="whip-add-radio" class="whip-button whip-add-button">추가</label>
                    </div>
                    <div class="add-menu-price">
                      <p class="add-menu-plus-price">500원</p>
                    </div>
                  </div>
                </div>
              </div>
              
        </form>
        </div>
              `;
              menu.menuDtlList.forEach(dtl => {
                if(dtl.addMenuName == "hot"){
                    var addMenuBox = document.querySelector(".status-option-box")
                    addMenuBox.innerHTML = "";
                    addMenuBox.innerHTML += 
                    `
                      <div class="option-label">
                        <label for="menuStatus">상태</label>
                      </div>
                      <div class="menu-button-input">
                        <div class="menu-button-area">
                          <input type="radio" id="hot-radio" name="hotAndice" value="hot">
                          <label for="hot-radio" class="status-button hot-button">HOT</label>
                          <input type="radio" id="ice-radio" name="hotAndice" value="ice">
                          <label for="ice-radio" class="status-button ice-button">ICE</label>
                        </div>
                        <div class="add-menu-price">
                          <p class="status-menu-plus-price"></p>
                        </div>
                      </div>
                    `
                    const iceRadio = document.querySelector('#ice-radio');
                    const hotRadio = document.querySelector('#hot-radio');
                    const addMenuPlusPrice = document.querySelector('.status-menu-plus-price');
                    
                    hotRadio.addEventListener('click', () => {
                      addMenuPlusPrice.innerText = `${dtl.addPrice}원`;
                    });
                    iceRadio.addEventListener('click', () => {
                        addMenuPlusPrice.innerText = ``;
                    });
                    
                }else if(dtl.addMenuName == "ice"){
                    var addMenuBox = document.querySelector(".status-option-box")
                    addMenuBox.innerHTML = "";
                    addMenuBox.innerHTML += 
                    `
                      <div class="option-label">
                        <label for="menuStatus">상태</label>
                      </div>
                      <div class="menu-button-input">
                        <div class="menu-button-area">
                          <input type="radio" id="hot-radio" name="hotAndice" value="hot">
                          <label for="hot-radio" class="status-button hot-button">HOT</label>
                          <input type="radio" id="ice-radio" name="hotAndice" value="ice">
                          <label for="ice-radio" class="status-button ice-button">ICE</label>
                        </div>
                        <div class="add-menu-price">
                          <p class="status-menu-plus-price"></p>
                        </div>
                      </div>
                    `
                    const iceRadio = document.querySelector('#ice-radio');
                    const hotRadio = document.querySelector('#hot-radio');
                    const addMenuPlusPrice = document.querySelector('.status-menu-plus-price');
                    
                    iceRadio.addEventListener('click', () => {
                      addMenuPlusPrice.innerText = `${dtl.addPrice}원`;
                    });
                    hotRadio.addEventListener('click', () => {
                        addMenuPlusPrice.innerText = ``;
                    });
                } 

                if(dtl.addMenuName == "shotAdd"){
                    var addMenuBox = document.querySelector(".shot-option-box")
                    addMenuBox.innerHTML = "";
                    addMenuBox.innerHTML += 
                    `
                    <div class="option-label">
                      <label for="menuStatus">샷 추가</label>
                    </div>
                    <div class="menu-button-input">
                      <div class="menu-button-area">
                        <input type="radio" id="shot-none-radio" name="shotStatus" value=false>
                        <label for="shot-none-radio" class="shot-button shot-none-button">없음</label>
                        <input type="radio" id="shot-add-radio" name="shotStatus" value="true">
                        <label for="shot-add-radio" class="shot-button shot-add-button">추가</label>
                      </div>
                      <div class="add-menu-price">
                        <p class="shot-menu-plus-price"></p>
                      </div>
                    </div>
                    `
                    const shotAdd = document.querySelector('#shot-add-radio');
                    const shotNone = document.querySelector('#shot-none-radio');
                    const addMenuPlusPrice = document.querySelector('.shot-menu-plus-price');
                    
                    shotAdd.addEventListener('click', () => {
                      addMenuPlusPrice.innerText = `${dtl.addPrice}원`;
                    });
                    shotNone.addEventListener('click', () => {
                      addMenuPlusPrice.innerText = ``;
                    });
                    
                }else if(dtl.addMenuName == "shotNone"){
                    var addMenuBox = document.querySelector(".shot-option-box")
                    addMenuBox.remove();
                }
                if(dtl.addMenuName == "whipAdd"){
                    var addMenuBox = document.querySelector(".whip-option-box")
                    addMenuBox.innerHTML = "";
                    addMenuBox.innerHTML += 
                    `
                    <div class="option-label">
                      <label for="menuStatus">휘핑 추가</label>
                    </div>
                    <div class="menu-button-input">
                      <div class="menu-button-area">
                        <input type="radio" id="whip-none-radio" name="whipStatus" value=false>
                        <label for="whip-none-radio" class="whip-button whip-none-button">없음</label>
                        <input type="radio" id="whip-add-radio" name="whipStatus" value=true>
                        <label for="whip-add-radio" class="whip-button whip-add-button">추가</label>
                      </div>
                      <div class="add-menu-price">
                        <p class="whip-menu-plus-price"></p>
                      </div>
                    </div>
                  </div>
                    `
                    const whipAdd = document.querySelector('#whip-add-radio');
                    const whipNone = document.querySelector('#whip-none-radio');
                    const addMenuPlusPrice = document.querySelector('.whip-menu-plus-price');
                    
                    whipAdd.addEventListener('click', () => {
                      addMenuPlusPrice.innerText = `${dtl.addPrice}원`;
                    });
                    whipNone.addEventListener('click', () => {
                      addMenuPlusPrice.innerText = ``;
                    });
                    
                }else if(dtl.addMenuName == "whipNone"){
                    var addMenuBox = document.querySelector(".whip-option-box")
                    addMenuBox.remove();
                }                      
            });
            UserMenuEvent.getInstance().addCartOnclickEvent();
            UserMenuEvent.getInstance().closeButtonOnclickEvent();
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