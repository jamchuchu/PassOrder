window.onload = () => {
    UserMypageService.getInstance().userMypagePrincipal();
    UserMypageService.getInstance().loadCouponCheckBox();
    
    UserMypageHeaderEvent.getInstance().addLogoOnclickEvent();
    UserMypageHeaderEvent.getInstance().addCafeMenuOnclickEvent();
    UserMypageHeaderEvent.getInstance().addMypageOnclickEvent();
    UserMypageHeaderEvent.getInstance().addCartOnclickEvent();

    UserMypageEvent.getInstance().addCouponButtonOnclickEvent();
    UserMypageEvent.getInstance().addPurchaseDtlButtonOnclickEvent();


    UserMypageService.getInstance().loadCouponStatus();
    UserMypageService.getInstance().loadticketStatus();
    UserMypageService.getInstance().loadRankStatus();
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

class CouponApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new CouponApi();
        }
        return this.#instance;
    }

    userTotalPrice() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/mypage-user/sum",
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

    userCouponCount() {
        let responseData = null;
        
        $.ajax({
            async: false,
            type: "patch",
            url: "/api/mypage-user/update-coupon",
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

class UserOrderApi {

    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new UserOrderApi();
        }
        return this.#instance;
    }

    userOrderList() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/mypage-user/user-order-list",
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



class UserMypageService {

    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new UserMypageService();
        }
        return this.#instance;
    }

    userMypagePrincipal() {
        const userProfilePrincipal = PrincipalApi.getInstance().getPrincipal();
        const profileEmail = document.querySelectorAll('.user-profile-span')[0];
        const profileUsername = document.querySelectorAll('.user-profile-span')[1];
        const profileName = document.querySelectorAll('.user-profile-span')[2];

        profileEmail.innerHTML = `<span class="user-profile-span">${userProfilePrincipal.user.email}</span>`
        profileUsername.innerHTML = `<span class="user-profile-span">${userProfilePrincipal.username}</span>`
        profileName.innerHTML = `<span class="user-profile-span">${userProfilePrincipal.name}</span>`
    }

    loadCouponStatus() {
        const responseCoupon = CouponApi.getInstance().userCouponCount();
        console.log("userCouponCount: " + responseCoupon);
        const couponCount = document.querySelector('.coupon-count-span');

        couponCount.innerHTML = `<span class="coupon-count-span">${responseCoupon % 10}</span>`
    }

    loadticketStatus() {
        const responseCoupon = CouponApi.getInstance().userCouponCount();
        const ticketCount = document.querySelector('.ticket-count-span');

        ticketCount.innerHTML = `<span class="ticket-count-span">${parseInt(responseCoupon / 10)}</span>`
    }

    loadCouponCheckBox() {
        const userCouponBox = document.querySelector(".user-coupon-box");
        userCouponBox.innerHTML = `<div class="coupon-circle-area"></div>`;
        const circleBox = document.querySelector(".coupon-circle-area");
        const responseCoupon = CouponApi.getInstance().userCouponCount();
        const faCircleCheck = '<i class="fa-regular fa-circle-check"></i>';
        const faCircle = '<i class="fa-regular fa-circle"></i>';

        let innerHTML = '';
        const count = responseCoupon % 10;
        const checkCount = Math.min(count, 6);
        console.log("체크카운트 : " + checkCount);
        const circleCount = 10 - checkCount;
        
        for (let i = 0; i < checkCount; i++) {
            innerHTML += faCircleCheck;
        }
        
        for (let i = 0; i < circleCount; i++) {
            innerHTML += faCircle;
        }

        circleBox.innerHTML = innerHTML;
    }    
    

    loadRankStatus() {
        const totalPrice = CouponApi.getInstance().userTotalPrice();
        console.log(totalPrice);
        const rankStatus = document.querySelector('.rank-rankname');


        if(totalPrice >= 500000) {
            rankStatus.innerHTML = `
                <span class="rank-rankname">Diamond</span>
            `;
        } else if(totalPrice >= 100000) {
            rankStatus.innerHTML = `
                <span class="rank-rankname">Platinum</span>
            `;
        } else if(totalPrice >= 50000) {
            rankStatus.innerHTML = `
                <span class="rank-rankname">Gold</span>
            `;
        } else if(totalPrice >= 10000) {
            rankStatus.innerHTML = `
                <span class="rank-rankname">Silver</span>
            `;
        } else if(totalPrice >= 0) {
            rankStatus.innerHTML = `
                <span class="rank-rankname">Bronze</span>
            `;
        }
    }
}

class UserMypageHeaderEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserMypageHeaderEvent();
        }

        return this.#instance;
    }

    addCafeMenuOnclickEvent() {
        const cafeMenuButton = document.querySelectorAll(".menu-container-nav")[0];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        cafeMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/menu/user';
            }
        }
    }
    
    addMypageOnclickEvent() {
        const mypageMenuButton = document.querySelectorAll(".menu-container-nav")[1];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        mypageMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                alert("현재 페이지가 마이페이지 페이지입니다.");
                location.reload;
            }
        }
    }

    addCartOnclickEvent() {
        const cartMenuButton = document.querySelectorAll(".menu-container-nav")[2];
        const loginPrincipalData = PrincipalApi.getInstance().getPrincipal();

        cartMenuButton.onclick = () => {
            if(loginPrincipalData !== null) {
                location.href = '/cart/user';
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
}

class UserMypageEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserMypageEvent();
        }

        return this.#instance;
    }

    addCouponButtonOnclickEvent() {
        const couponButton = document.querySelector(".coupon-button");

        couponButton.onclick = () => {
            const userCouponBox = document.querySelector(".user-coupon-box");
            userCouponBox.innerHTML = `<div class="coupon-circle-area"></div>`;
            const circleBox = document.querySelector(".coupon-circle-area");
            const responseCoupon = CouponApi.getInstance().userCouponCount();
            const faCircleCheck = '<i class="fa-regular fa-circle-check"></i>';
            const faCircle = '<i class="fa-regular fa-circle"></i>';

            let innerHTML = '';
            const count = responseCoupon % 10;
            const checkCount = Math.min(count, 6);
            const circleCount = 10 - checkCount;
        
            for (let i = 0; i < checkCount; i++) {
            innerHTML += faCircleCheck;
            }
        
            for (let i = 0; i < circleCount; i++) {
            innerHTML += faCircle;
            }
        
            circleBox.innerHTML = innerHTML;
        }
        
    }

    addPurchaseDtlButtonOnclickEvent() {
        const responseData = UserOrderApi.getInstance().userOrderList();
        console.log("유저 orderlist: " + responseData);
        const purchaseDtlButton = document.querySelector('.purchase-dtl-button');
        const userCouponBox = document.querySelector('.user-coupon-box');


        purchaseDtlButton.onclick = () => {
            let orderListHtml = `
                <div class="user-orderlist-box">
                <div id="user-orderlist-id" class="user-orderlist-title">
                    <div class="order-ordertitle title-order">주문 번호</div>
                    <div class="order-ordertitle title-order">카페 번호</div>
                    <div class="order-ordertitle title-order">사용자 번호</div>
                    <div class="order-ordertitle title-order">주문 가격</div>
                    <div class="order-ordertitle title-order">결제 완료</div>
                </div>
            `;

            for (let i = 0; i < responseData.length; i++) {
                const { orderId, cafeId, userId, totalPrice } = responseData[i];
                orderListHtml += `
                <div class="user-orderlist-title">
                    <div class="order-ordertitle order-order-id">${orderId}</div>
                    <div class="order-ordertitle order-cafe-id">${cafeId}</div>
                    <div class="order-ordertitle order-user-id">${userId}</div>
                    <div class="order-ordertitle order-total-price">${totalPrice}</div>
                    <div class="order-ordertitle order-complete">1</div>
                </div>
                `;
            }

            orderListHtml += `</div>`;
            userCouponBox.innerHTML = orderListHtml;

        }
    
    }
}