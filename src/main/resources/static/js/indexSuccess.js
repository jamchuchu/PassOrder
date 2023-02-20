window.onload = () => {
    principalSerivce.getInstance().setWelcome();
}

const user = {
    userId : 1,
    username: "",
    password: "",
    name: "",
    email: "",
    roleId: 1,
}

class PrincipalApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new PrincipalApi();
        }
        return this.#instance;
    }

    getName() {
        const name = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/account/user/${userId}`,
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



class principalSerivce{

    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new principalSerivce();
        }
        return this.#instance;
    }


    setWelcome(){
        const message = document.querySelector(".welcome");
        message.innerHTML = `${user.name}님<br>PASSORDER에 오신 걸 환영합니다.`;

    }
}