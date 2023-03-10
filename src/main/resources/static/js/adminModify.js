window.onload = () => {
    PrincipalModifyService.getInstance().modifyUserPrincipal();
    ModifyButtonEvent.getInstance().modifyButtonOnclickEvent();

}

const Password = {
    password: "",
    repassword: ""
}

const CafeInfo={
    cafeName : "",
    address :"",
    phone : ""
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

class ModifyAdminApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ModifyAdminApi();
        }
        return this.#instance;
    }

    modifyAdmin() {
        $.ajax({
            async: false,
            type: "patch",
            url: "/api/admin-account/modify-admin",
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

    modifyCafeInfo(){
        $.ajax({
            async : false,
            type : "patch",
            url : "/api/admin-account/modify-cafe-info",
            contentType : "application/json",
            data : JSON.stringify(CafeInfo),
            dataType:"json",
            success : response=>{
                console.log(response);
            },
            error : error =>{
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

    modifyPrincipal() {
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

            const modifyCafeName = document.querySelector('#modify-strorename').value;
            console.log("new storename value값 : " + modifyStoreName);
            
            const modifyAddress = document.querySelector('#modify-address').value;
            console.log("new address value값 : " + modifyAddress);

            const modifyPhone = document.querySelector('#modify-tel').value;
            console.log("new tel value값 : " + modifyPhone);


            Password.password = modifyPassword;
            console.log("새 패스워드 대입: " + Password.password);

            Password.repassword = modifyRePassword;
            console.log("새 리패스워드 대입: " + Password.repassword);

            CafeInfo.cafeName = modifyCafeName;
            console.log("새 지점명 대입 : "+ CafeInfo.cafeName )

            CafeInfo.address = modifyAddress;
            console.log("새 주소 대입 : "+ CafeInfo.address )

            CafeInfo.phone = modifyPhone;
            console.log("새 전화번호 대입 : "+ CafeInfo.phone )


            ModifyAdminApi.getInstance().modifyAdmin();
            ModifyAdminApi.getInstance().modifyCafeInfo();


            const modifyResult1 = ModifyAdminApi.getInstance().modifyAdmin();
            const modifyResult2 = ModifyAdminApi.getInstance().modifyCafeInfo();
            
            console.log(modifyResult1);
            console.log(modifyResult2);


            alert("정보 변경 완료! 다시 로그인해주세요.");
            location.href = '/index';
        }
    }
}