window.addEventListener("load", () => {
    AdminMenuService.getInstance().viewCategory();
    AdminMenuService.getInstance().viewAdminMenu("all");
  
    AdminPopupService.getInstance().saveMenuPopupClose();


  });

class AdminMenuApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AdminMenuApi();
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
            url: "/api/menu/admin/category",
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

    getAdminMenu(selectedCategory){
        if(selectedCategory=="all"){
            let responseData = null;
            $.ajax({
                async: false,
                type: "get",
                url: `/api/menu/admin/cafeId`,
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
            url: `/api/menu/admin/${selectedCategory}`,
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

    deleteMenu(menuId){
        let responseData = null;
        $.ajax({
            async: false,
            type: "delete",
            url: `/api/menu/${menuId}`,
            dataType: "JSON",
            success: response => {
                console.log(response);
                responseData = response.data;
                location.replace("/menu/admin");

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

  modifyMenu(menuId, menu){
    $.ajax({
        async: false,
        type: "put",
        url: `/api/menu/${menuId}`,
        contentType: "application/json",
        data: JSON.stringify(menu),
        dataType: "JSON",
        success: response => {
            console.log(response);
            alert("메뉴 수정 완료. 메뉴 페이지로 이동합니다.");
            location.replace("/menu/admin");
        },
        error: error => {
            console.log(error);
        }
    });
}
}


//errors
class AdminMenuService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AdminMenuService();
        }

        return this.#instance;
    }

    viewCategory() {
        const categoryBox = document.querySelector(".quick-group");
        categoryBox.innerHTML = `
          <input type="radio" id="all-menu-radio" name="menu-category" value="all" checked>
          <label for="all-menu-radio" class="left-button">전체메뉴</label>
        `;
      
        const categories = AdminMenuApi.getInstance().getcagetory();
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
            AdminMenuService.getInstance().viewAdminMenu(selectedCategory);
          });
        });
      }

    viewAdminMenu(selectedCategory) {
        const menuBox = document.querySelector(".main-menu-drink-group");
        menuBox.innerHTML = "";
      
        menuBox.innerHTML = `
          <div class="main-menu-drink-box">
            <div class="main-menu-drink-img">
              <i class="fa-solid fa-circle-plus"></i>
            </div>
          </div>
        `;



        const adminMenus = AdminMenuApi.getInstance().getAdminMenu(selectedCategory);
        adminMenus.data.forEach((menu) => {
          menuBox.innerHTML += `
            <div class="main-menu-drink-box">
            <p hidden>${menu.menuId}</p>
              <div class="main-menu-drink-img"><img src="/static/images/음료1.PNG" alt=""></div>
              <div class="main-menu-drink-name"><p>${menu.menuName}</p></div>
              <div class="cart-button-group">
                <button type="button" class="cart-button-modify" id="menu-id-${menu.menuId}">수정</button>
                <button type="button" class="cart-button-delete" id="delete-menu-id-${menu.menuId}">삭제</button>
              </div>
            </div>
          `;
        });

        AdminPopupService.getInstance().saveMenuPopupOpen();
        AdminPopupService.getInstance().modifyMenuPopupOpen();
        AdminMenuEvent.getInstance().deleteBtnOnclickEvent();

      }

}


class AdminMenuEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AdminMenuEvent();
        }

        return this.#instance;
    }


    saveMenuOnclickEvent() {
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
            console.log(menu);
            AdminMenuApi.getInstance().registerMenu(menu);
        }

    }

    modifyMenuOnclickEvent(menuId) {
      const modifyBtn =  document.querySelector(".footer-button.save-button");
      modifyBtn.onclick = () => {

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
          console.log(menu);
          AdminMenuApi.getInstance().modifyMenu(menuId, menu);
      }

  }

    noneOptionBtnOnclickEvent(){
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



    deleteBtnOnclickEvent(){
        const deleteBtn =  document.querySelectorAll(".cart-button-delete");

        deleteBtn.forEach(btn => {
            const menuId = btn.id.split("-")[3]; 
            btn.onclick =() => {
                if(confirm("삭제하시겠습니까?")) {
                    AdminMenuApi.getInstance().deleteMenu(menuId);
                }
            }
        });
    }

    


    

}


class AdminPopupService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AdminPopupService();
        }

        return this.#instance;
    }

    saveMenuPopupOpen(){
        var popupContainer = document.querySelector(".popup-container"); 
        var circleTrigger = document.querySelector(".fa-circle-plus"); 
    

        circleTrigger.onclick = () => {
          AdminMenuEvent.getInstance().saveMenuOnclickEvent();
          AdminPopupService.getInstance().resetPopupInnerText();
          popupContainer.classList.add("show-popup-container");
        }
    }


    saveMenuPopupClose(){
        var popupContainer = document.querySelector(".popup-container"); 
        var closeButton = document.querySelector(".footer-button.close-button");

        closeButton.onclick = ()=> {
          popupContainer.classList.remove("show-popup-container"); 
        }
        
    }



    modifyMenuPopupOpen(){
        const modifyBtn =  document.querySelectorAll(".cart-button-modify");
        const modifyPopup = document.querySelector(".popup-container");


        modifyBtn.forEach(btn => {
            btn.onclick = () => {
              const menuId = btn.id.split("-")[2];
              AdminMenuEvent.getInstance().modifyMenuOnclickEvent(menuId);
              AdminPopupService.getInstance().setModifyPopupInnerText(menuId);
              modifyPopup.classList.add("show-popup-container");

            }
          });
    }



    setModifyPopupInnerText(menuId){
      const menu = AdminMenuApi.getInstance().getMenuByMenuId(menuId);

          document.querySelector("#category").value = menu.category;
          document.querySelector("#menuName").value = menu.menuName;
          document.querySelector("#menuPrice").value =  menu.menuPrice;
          menu.menuDtlList.forEach(dtl => {

            if (dtl.addMenuName === 'hot') {
              document.getElementById('hot-radio').checked = true;
              document.querySelector('#status').value = dtl.addPrice;
            } else if (dtl.addMenuName === 'ice') {
              document.getElementById('ice-radio').checked = true;
              document.querySelector('#status').value = dtl.addPrice;
            } else if (dtl.addMenuName === 'shotAdd') {
              document.getElementById('shot-add-radio').checked = true;
              document.querySelector('#shot').value = dtl.addPrice;
            } else if (dtl.addMenuName === 'shotNone') {
              document.getElementById('shot-none-radio').checked = true;
              document.querySelector('#shot').value = dtl.addPrice;
            } else if (dtl.addMenuName === 'whipAdd') {
              document.getElementById('whip-add-radio').checked = true;
              document.querySelector('#whip').value = dtl.addPrice;
            } else if (dtl.addMenuName === 'whipNone') {
              document.getElementById('whip-none-radio').checked = true;
              document.querySelector('#whip').value = dtl.addPrice;

            }
          })


    }

    resetPopupInnerText(){
      const radioInputs = document.querySelectorAll('.popup-container input[type="radio"]');
      const textInputs = document.querySelectorAll('.popup-container input[type="text"]');
      
      radioInputs.forEach(radio => {
        radio.checked = null;
      })

      textInputs.forEach(text => {
        text.value = null;
      })
    }

  
}



class Menu {
    category = null;
    menuName = null;
    menuPrice = null;
    hotAndice = null;
    shotStatus = null;
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