window.addEventListener("load", () => {
    AdminMenuService.getInstance().viewCategory();
    AdminMenuService.getInstance().viewAdminMenu("all");
    
    AdminMenuEvent.getInstance().saveMenuOnclickEvent();
    AdminMenuEvent.getInstance().noneOptionBtnOnclickEvent();
    
    AdminPopupService.getInstance().saveMenuPopupClose();
    AdminPopupService.getInstance().modifyMenuPopupClose();


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
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
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

    resetBycloseBtnOnclick(){
        const closeButton =  document.querySelector(".footer-button.close-button");
        closeButton.onclick = () => {
            try {
                document.querySelector("#category").value = null;
              } catch (error) {}
              try {
                document.querySelector("#menuName").value = null;
              } catch (error) {}
              try {
                document.querySelector("#menuPrice").value = null;
              } catch (error) {}
              try {
                Array.from(document.getElementsByName("hotAndice")).find(radio => radio.checked).checked = null;
              } catch (error) {}
              try {
                Array.from(document.getElementsByName("shotStatus")).find(radio => radio.checked).checked = null;
              } catch (error) {}
              try {
                Array.from(document.getElementsByName("whipStatus")).find(radio => radio.checked).checked = null;
              } catch (error) {}
              try {
                document.querySelectorAll(".menu-register-input.menu-status-input").forEach(input => {
                    input.value = null;
                })
              } catch (error) {}

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
    
       //console.log(modal);
    
       function toggleModal() { 
            popupContainer.classList.toggle("show-popup-container"); 
        }

        circleTrigger.addEventListener("click", toggleModal);
    }




    saveMenuPopupClose(){
        var popupContainer = document.querySelector(".popup-container"); 
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
    
        closeButton.addEventListener("click", () => {
            AdminMenuEvent.getInstance().resetBycloseBtnOnclick();
            toggleModal();
          });
        window.addEventListener("click", windowOnClick);
    }



    modifyMenuPopupOpen(){
        const modifyBtn =  document.querySelectorAll(".cart-button-modify");
        const modifyPopup = document.querySelector(".modify-popup-container");


        modifyBtn.forEach(btn => {
            btn.onclick = () => {
              modifyPopup.classList.add("show-popup-container");
              const menuId = btn.id.split("-")[2];
              AdminPopupService.getInstance().setModifyPopupInnerText(menuId);
            }
          });
    }

    
    modifyMenuPopupClose(){
        const modifyBtn =  document.querySelector(".modify-footer-button.close-button");
        const modifyPopup = document.querySelector(".modify-popup-container");


            modifyBtn.onclick = () => {
                modifyPopup.classList.remove("show-popup-container");
            }
    
    }


    setModifyPopupInnerText(menuId){
        var modifyBody = document.querySelector(".modify-popup-body");
        const menu = AdminMenuApi.getInstance().getMenuByMenuId(menuId);

        modifyBody.innerHTML = "";
        modifyBody.innerHTML =`
        <div class="modify-popup-body">
          <div class="body-left-content">
            <div class="register-image-container">
              <img src="/static/images/no-image.jpg" alt="">
            </div>
            <div class="image-button-group">
              <button type="button" class="img-button modify">수정</button>
              <button type="button" class="img-button delete">삭제</button>
            </div>
          </div>
          <div class="body-right-content">
            <form action="" method="post">
                  <div class="menu-name-box">
                    <div class="option-label">
                      <label for="menu-category-box" class="option-label">카테고리</label>
                    </div>
                    <input type="text" id="menuName" class="menu-register-input menu-name-input" name="menuName" value="${menu.category}" placeholder="등록할 메뉴이름을 입력해주세요" requried
                    >
                  </div>
                  <div class="menu-name-box">
                    <div class="option-label">
                      <label for="menuName" class="option-label">메뉴명</label>
                    </div>
                    <input type="text" id="menuName" class="menu-register-input menu-name-input" name="menuName" value="${menu.menuName}" placeholder="등록할 메뉴이름을 입력해주세요" requried>
                  </div>
                  <div class="menu-price-box">
                    <div class="option-label">
                      <label for="menu-price" class="option-label">메뉴가격</label>
                    </div>
                    <input type="text" id="menuPrice" class="menu-register-input menu-price-input" name="menuPrice"  value="${menu.menuPrice}"   oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  placeholder="등록할 메뉴가격을 입력해주세요" requried>
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
                      <div class="menu-input-area">
                        <input type="text" id="menuStatus" class="menu-register-input menu-status-input" name="menuStatus"     oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" / placeholder="옵션의 가격을 입력해주세요 example) 500" requried>
                        <p>원</p>
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
                      <div class="menu-input-area">
                        <input type="text" id="menuStatus" class="menu-register-input menu-status-input" name="menuStatus"    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" / placeholder="옵션의 가격을 입력해주세요 example) 500"  requried>
                        <p>원</p>
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
                      <div class="menu-input-area">
                        <input type="text" id="menuStatus" class="menu-register-input menu-status-input" name="menuStatus"     oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" / placeholder="옵션의 가격을 입력해주세요 example) 500" requried>
                        <p>원</p>
                      </div>
                    </div>
                  </div>
                </div>
                
          </form>
          </div>
                `

                menu.menuDtlList.forEach(dtl => {
                    if(dtl.addMenuName == "hot"){
                        var addMenuBox = document.querySelector(".status-option-box");
                        addMenuBox.innerHTML = "";
                        addMenuBox.innerHTML += 
                        `
                        <div class="status-option-box">
                        <div class="option-label">
                          <label for="menuStatus">상태</label>
                        </div>
                        <div class="menu-button-input">
                          <div class="menu-button-area">
                            
                            <input type="radio" id="hot-radio" name="hotAndice" value="hot" checked>
                            <label for="hot-radio" class="status-button hot-button">HOT</label>
                            <input type="radio" id="ice-radio" name="hotAndice" value="ice">
                            <label for="ice-radio" class="status-button ice-button">ICE</label>
                          </div>
                          <div class="menu-input-area">
                            <input type="text" id="menuStatus" class="menu-register-input menu-status-input" name="menuStatus"   value = "${dtl.addPrice}"  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" / placeholder="옵션의 가격을 입력해주세요 example) 500" requried>
                            <p>원</p>
                          </div>
                        </div>
                      </div>
                        `
                    }else if(dtl.addMenuName == "ice"){
                        var addMenuBox = document.querySelector(".status-option-box");
                        addMenuBox.innerHTML = "";
                        addMenuBox.innerHTML += 
                        `
                        <div class="status-option-box">
                        <div class="option-label">
                          <label for="menuStatus">상태</label>
                        </div>
                        <div class="menu-button-input">
                          <div class="menu-button-area">
                            
                            <input type="radio" id="hot-radio" name="hotAndice" value="hot" >
                            <label for="hot-radio" class="status-button hot-button">HOT</label>
                            <input type="radio" id="ice-radio" name="hotAndice" value="ice" checked>
                            <label for="ice-radio" class="status-button ice-button">ICE</label>
                          </div>
                          <div class="menu-input-area">
                            <input type="text" id="menuStatus" class="menu-register-input menu-status-input" name="menuStatus"   value = "${dtl.addPrice}"  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" / placeholder="옵션의 가격을 입력해주세요 example) 500" requried>
                            <p>원</p>
                          </div>
                        </div>
                      </div>
                        `
                    }

                    if(dtl.addMenuName == "shotAdd"){
                        var addMenuBox = document.querySelector(".shot-option-box");
                        addMenuBox.innerHTML = "";
                        addMenuBox.innerHTML += 
                        `
                        <div class="shot-option-box">
                        <div class="option-label">
                          <label for="menuStatus">샷 추가</label>
                        </div>
                        <div class="menu-button-input">
                          <div class="menu-button-area">
                            <input type="radio" id="shot-none-radio" name="shotStatus" value=false>
                            <label for="shot-none-radio" class="shot-button shot-none-button">없음</label>
                            <input type="radio" id="shot-add-radio" name="shotStatus" value="true" checked>
                            <label for="shot-add-radio" class="shot-button shot-add-button">추가</label>
                          </div>
                          <div class="menu-input-area">
                            <input type="text" id="menuStatus" class="menu-register-input menu-status-input" name="menuStatus"  ${dtl.addPrice}  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" / placeholder="옵션의 가격을 입력해주세요 example) 500"  requried>
                            <p>원</p>
                          </div>
                        </div>
                      </div>
    
                        `
                    }else if(dtl.addMenuName == "shotNone"){
                        var addMenuBox = document.querySelector(".shot-option-box");
                        addMenuBox.innerHTML = "";
                        addMenuBox.innerHTML += `
                        <div class="shot-option-box">
                        <div class="option-label">
                          <label for="menuStatus">샷 추가</label>
                        </div>
                        <div class="menu-button-input">
                          <div class="menu-button-area">
                            <input type="radio" id="shot-none-radio" name="shotStatus" value=false checked>
                            <label for="shot-none-radio" class="shot-button shot-none-button">없음</label>
                            <input type="radio" id="shot-add-radio" name="shotStatus" value="true">
                            <label for="shot-add-radio" class="shot-button shot-add-button">추가</label>
                          </div>
                          <div class="menu-input-area">
                            <input type="text" id="menuStatus" class="menu-register-input menu-status-input" name="menuStatus"    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" / placeholder="옵션의 가격을 입력해주세요 example) 500"  requried>
                            <p>원</p>
                          </div>
                        </div>
                      </div>
                        `
                    }

                    if(dtl.addMenuName == "whipAdd"){
                        var addMenuBox = document.querySelector(".whip-option-box");
                        addMenuBox.innerHTML = "";
                        addMenuBox.innerHTML += `
                        <div class="whip-option-box">
                        <div class="option-label">
                          <label for="menuStatus">휘핑 추가</label>
                        </div>
                        <div class="menu-button-input">
                          <div class="menu-button-area">
                            <input type="radio" id="whip-none-radio" name="whipStatus" value=false>
                            <label for="whip-none-radio" class="whip-button whip-none-button">없음</label>
                            <input type="radio" id="whip-add-radio" name="whipStatus" value=true checked>
                            <label for="whip-add-radio" class="whip-button whip-add-button">추가</label>
                          </div>
                          <div class="menu-input-area">
                            <input type="text" id="menuStatus" class="menu-register-input menu-status-input" name="menuStatus"  value="${dtl.addPrice}"  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" / placeholder="옵션의 가격을 입력해주세요 example) 500" requried>
                            <p>원</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
              </form>
              </div>`
                    }else if(dtl.addMenuName == "whipNone"){
                        var addMenuBox = document.querySelector(".whip-option-box");
                        addMenuBox.innerHTML = "";
                        addMenuBox.innerHTML += `
                        <div class="menu-option-box">
                        <div class="option-label">
                          <label for="menuStatus">휘핑 추가</label>
                        </div>
                        <div class="menu-button-input">
                          <div class="menu-button-area">
                            <input type="radio" id="whip-none-radio" name="whipStatus" value=false checked>
                            <label for="whip-none-radio" class="whip-button whip-none-button">없음</label>
                            <input type="radio" id="whip-add-radio" name="whipStatus" value=true >
                            <label for="whip-add-radio" class="whip-button whip-add-button">추가</label>
                          </div>
                          <div class="menu-input-area">
                            <input type="text" id="menuStatus" class="menu-register-input menu-status-input" name="menuStatus"     oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" / placeholder="옵션의 가격을 입력해주세요 example) 500" requried>
                            <p>원</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
              </form>
              </div>`
                    }

                    });
                
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