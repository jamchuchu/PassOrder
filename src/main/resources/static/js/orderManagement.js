window.onload = () => {
    OrderManagementHeaderEvent.getInstance().addLogoOnclickEvent();
    OrderManagementHeaderEvent.getInstance().addCafeMenuOnclickEvent();
    OrderManagementHeaderEvent.getInstance().addMypageOnclickEvent();
    OrderManagementHeaderEvent.getInstance().addCartOnclickEvent();
    OrderManagementHeaderEvent.getInstance().addAdminMypageOnclickEvent();

    OrderManagementService.getInstance().showCafeInfoPageLoad();
    OrderManagementService.getInstance().orderListUncompletedLoad();
    OrderManagementService.getInstance().finalCompleteButtonEvent();
    OrderManagementService.getInstance().orderDtlButtonOpenEvent();
    OrderManagementService.getInstance().orderDtlButtonEvent();
}


class PrincipalApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new PrincipalApi();
        }
        return this.#instance;
    }

    getPrincipal() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/account/principal",
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}

class CafeInfoApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new CafeInfoApi();
        }
        return this.#instance;
    }

    AdminCafeInfo() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/cafe/cafe-info",
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}

class OrderManageApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new OrderManageApi();
        }
        return this.#instance;
    }

    orderListUncompleted() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/order/order-list-uncompleted",
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }

    modifyCompleteStatus(orderId) {
        $.ajax({
            async: false,
            type: "patch",
            url: "/api/order/update-complete",
            contentType: "application/json",
            data: JSON.stringify({'orderId': orderId}),
            dataType: "json",
            success: response => {
                console.log(response);
                location.reload();
            },
            error: error => {
                console.log(error);
            }
        });
    }

    orderDtlListUncompleted(orderId) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `/api/order/order-dtl-list-uncompleted/${orderId}`,
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}

class OrderManagementService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new OrderManagementService();
        }
        return this.#instance;
    }

    showCafeInfoPageLoad() {
        const principal = PrincipalApi.getInstance().getPrincipal();
        const cafeInfo = CafeInfoApi.getInstance().AdminCafeInfo();
        const adminBaseBox = document.querySelector('.admin-base-box');

        adminBaseBox.innerHTML = `
        <div class="admin-base-box">
            <div class="welcome-dtl">
                <p>${principal.name} 사장님 매장</p>
            </div>
            <div class="store-dtl-box">
                <div class="store-dtl">
                    <p class="store-subtitle">지점명</p><p>${cafeInfo.cafeName}</p>
                </div>
                <div class="store-dtl">
                    <p class="store-subtitle">주소</p><p>${cafeInfo.address}</p>
                </div>
                <div class="store-dtl">
                    <p class="store-subtitle">가게 번호</p><p>${cafeInfo.phone}</p>
                </div>
            </div>
        </div>
        `;
    }

    orderListUncompletedLoad() {
        const userOrderListBox = document.querySelector('.user-orderlist-box');
        const orderListResponseData = OrderManageApi.getInstance().orderListUncompleted();
        console.log("orderList responseData 출력: " + orderListResponseData);


        orderListResponseData.forEach((order) => {
            const orderId = order.orderId;
            const userId = order.userId;
            const totalPrice = order.totalPrice;

            const orderItem = `
                <div class="user-orderlist-title">
                    <div class="order-ordertitle order-order-id">${orderId}</div>
                    <div class="order-ordertitle order-user-id">${userId}</div>
                    <div class="order-ordertitle order-total-price">${totalPrice}</div>
                    <div class="order-ordertitle order-complete">
                        <button type="button" class="order-button-group complete-button">최종 결제 완료</button>
                    </div>
                    <div class="order-ordertitle order-complete">
                        <button type="button" class="order-button-group order-dtl-button">주문 상세 보기</button>
                    </div>
                </div>
                `;

                userOrderListBox.insertAdjacentHTML("beforeend", orderItem);
        });
    }

    finalCompleteButtonEvent() {
        const completeButtons = document.querySelectorAll('.complete-button');
        const orderListResponseData = OrderManageApi.getInstance().orderListUncompleted();
      
        completeButtons.forEach((button, index) => {
          button.onclick = () => {
            const confirmResult = confirm("주문을 최종 완료 하시겠습니까?");
      
            if (confirmResult) {
                const order = orderListResponseData[index];
                const complete = order.complete;
                console.log("complete 값: " + complete);
            
                const orderId = order.orderId;
                console.log("orderId 값: " + orderId)

                OrderManageApi.getInstance().modifyCompleteStatus(orderId);
                alert("주문이 최종 완료되었습니다.");
            } else {
              alert("작업이 취소되었습니다.");
            }
          }
        });
    }

    orderDtlButtonOpenEvent() {
        var popupContainer = document.querySelector(".popup-container");
        // 팝업 트리거 버튼 요소 가져오기
        var circleTrigger = document.getElementsByClassName("order-dtl-button");

        // 팝업 토글 함수 정의
        function toggleModal() {
            popupContainer.classList.toggle("show-popup-container");
        }

        // 팝업 트리거 버튼에 클릭 이벤트 등록
        for (var i = 0; i < circleTrigger.length; i++) {
                circleTrigger[i].addEventListener("click", toggleModal);
            }
        }


    orderDtlButtonEvent() {
        const orderDtlButton = document.querySelectorAll('.order-dtl-button');
        const orderListResponseData = OrderManageApi.getInstance().orderListUncompleted();

        // 팝업 컨테이너 요소 가져오기
        var popupContainer = document.querySelector(".popup-container");
      
        // 팝업 트리거 버튼 요소 가져오기
        // var circleTrigger = document.getElementsByClassName("order-dtl-button");
      
        // 팝업 닫기 버튼 요소 가져오기
        var closeButton = document.querySelector(".close-button");
      
        orderDtlButton.forEach((button, index) => {
          button.onclick = () => {
                const order = orderListResponseData[index];
                const orderId = order.orderId;
                console.log("orderDtlList에 사용될 orderlist의 orderId" + orderId);

                const orderDtlResponseData = OrderManageApi.getInstance().orderDtlListUncompleted(orderId);
                console.log("오더 디테일: " + orderDtlResponseData);

                

                // 팝업 내부에 출력할 HTML 코드 작성
                var orderDtlHTML = "";
                for (var i = 0; i < orderDtlResponseData.length; i++) {
                var orderDtl = orderDtlResponseData[i];
                orderDtlHTML += `
                    <div class="admin-orderdtllist-title">
                    <div class="orderdtl-orderdtltitle orderdtl-order-dtl-id">${orderDtl.orderDtlId}</div>
                    <div class="orderdtl-orderdtltitle orderdtl-order-id">${orderDtl.orderId}</div>
                    <div class="orderdtl-orderdtltitle orderdtl-menu-id">${orderDtl.menuId}</div>
                    <div class="orderdtl-orderdtltitle orderdtl-status">${orderDtl.status}</div>
                    <div class="orderdtl-orderdtltitle orderdtl-shot">${orderDtl.shot}</div>
                    <div class="orderdtl-orderdtltitle orderdtl-whip">${orderDtl.whip}</div>
                    </div>
                `;
                }
            
                // 팝업 내부 HTML 코드를 팝업 요소에 삽입
                var adminOrderDtlListBox = document.querySelector(".admin-orderdtllist-box");
                adminOrderDtlListBox.innerHTML = orderDtlHTML;
            
                // 팝업 토글 함수 정의
                function toggleModal() {
                    popupContainer.classList.toggle("show-popup-container");
                    closeButton.removeEventListener("click", toggleModal);
                    window.removeEventListener("click", windowOnClick);
                }
            
                // 팝업 창 클릭 시 닫기 함수 정의
                function windowOnClick(event) {
                    if (event.target === popupContainer) {
                        toggleModal();
                    }
                }
            

                // 팝업 닫기 버튼에 클릭 이벤트 등록
                closeButton.addEventListener("click", toggleModal);
            
                // 팝업 창 클릭 시 닫기 이벤트 등록
                window.addEventListener("click", windowOnClick);
            }
        });
    }
}

class OrderManagementHeaderEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new OrderManagementHeaderEvent();
        }

        return this.#instance;
    }

    addCafeMenuOnclickEvent() {
        const cafeMenuButton = document.querySelectorAll(".menu-container-nav")[0];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        cafeMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/menu/admin';
            }
        }
    }
    
    addMypageOnclickEvent() {
        const mypageMenuButton = document.querySelectorAll(".menu-container-nav")[1];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        mypageMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/mypage/admin';
            }
        }
    }

    addCartOnclickEvent() {
        const cartMenuButton = document.querySelectorAll(".menu-container-nav")[2];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        cartMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                alert("현재 페이지가 관리자 주문관리(장바구니) 페이지입니다.");
                location.reload;
            }
        }
    }

    addLogoOnclickEvent() {
        const logoMenuButton = document.querySelector(".logo-button");
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        logoMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/login-success';
            }
        }
    }

    addAdminMypageOnclickEvent() {
        const adminMypageButton = document.querySelector(".logout-submit");
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        adminMypageButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/mypage/admin';
            }
        }
    }
}

