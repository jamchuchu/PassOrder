window.onload = () => {
    PrincipalModifyService.getInstance().modifyUserPrincipal();
    ModifyButtonEvent.getInstance().modifyButtonOnclickEvent();
    UserModifyHeaderEvent.getInstance().addCafeMenuOnclickEvent();
    UserModifyHeaderEvent.getInstance().addMypageOnclickEvent();
    UserModifyHeaderEvent.getInstance().addCartOnclickEvent();
    UserModifyHeaderEvent.getInstance().addLogoOnclickEvent();


}

const Password = {
    password: "",
    repassword: ""
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

class ModifyApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ModifyApi();
        }
        return this.#instance;
    }

    modifyUser() {
        $.ajax({
            async: false,
            type: "patch",
            url: "/api/account/modify-password",
            contentType: "application/json",
            data: JSON.stringify(Password),
            dataType: "json",
            success: response => {
                console.log(response);
            },
            error: error => {
                console.log(error);

            }
        });
    }
}

class PrincipalModifyService {

    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new PrincipalModifyService();
        }
        return this.#instance;
    }

    modifyUserPrincipal() {
        const modifyPrincipalData = PrincipalApi.getInstance().getPrincipal();
        console.log(modifyPrincipalData);
        const modifyPrincipalUsername = document.querySelectorAll('.register-inputs')[0];
        // console.log(modifyPrincipalUsername);
        const modifyPrincipalName = document.querySelectorAll('.register-inputs')[1];
        // console.log(modifyPrincipalName);
        const modifyPrincipalEmail = document.querySelectorAll('.register-inputs')[4];
        // console.log(modifyPrincipalEmail);


        modifyPrincipalUsername.innerHTML = `<p class="register-inputs">${modifyPrincipalData.username}</p>`;
        modifyPrincipalName.innerHTML = `<p class="register-inputs">${modifyPrincipalData.name}</p>`;
        modifyPrincipalEmail.innerHTML = `<p class="register-inputs">${modifyPrincipalData.user.email}</p>`;
    }
}



class ModifyButtonEvent {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ModifyButtonEvent();
        }

        return this.#instance;
    }

    modifyButtonOnclickEvent() {
        const modifyButton = document.querySelector('.register-submit');

        modifyButton.onclick = () => {
            const modifyPassword = document.querySelector('#modify-password').value;
            console.log("password value값: " + modifyPassword);
            const modifyRePassword = document.querySelector('#modify-repassword').value;
            console.log("repassword value값: " + modifyRePassword);

            Password.password = modifyPassword;
            console.log("새 패스워드 대입: " + Password.password);

            Password.repassword = modifyRePassword;
            console.log("새 리패스워드 대입: " + Password.repassword);

            ModifyApi.getInstance().modifyUser();

            const modifyResult = ModifyApi.getInstance().modifyUser();
            console.log(modifyResult);

            alert("비밀번호 변경 완료! 다시 로그인해주세요.");
            location.href = '/index';
        }
    }
}

class UserModifyHeaderEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserModifyHeaderEvent();
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
                location.href = '/mypage/user';
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