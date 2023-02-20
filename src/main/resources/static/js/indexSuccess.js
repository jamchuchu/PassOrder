window.onload = () => {
    
    PrincipalService.getInstance().setWelcomeText();
}



class PrincipalApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new PrincipalApi();
        }
        return this.#instance;
    }

    getPrincipal() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/login/user",
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


class PrincipalService{

    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new PrincipalService();
        }
        return this.#instance;
    }


    setWelcomeText(){

        let user = PrincipalApi.getInstance().getPrincipal();

        const message = document.querySelector(".welcome");
        message.innerHTML = `${user.name}님<br>PASSORDER에 오신 걸 환영합니다.`;

    }
}