window.onload = () => {
    ManageEvent.getInstance().getSelectedDateRange();
}



class ManageApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ManageApi();
        }
        return this.#instance;
    }

    
    getOrder(time){
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: `/api/order?startDate=${time.startDate}&endDate=${time.endDate}`,
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

    getOrderGroupUser(time){
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: `/api/order/groupUser?startDate=${time.startDate}&endDate=${time.endDate}`,
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

    getUser(userId){
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: `/api/account/user/${userId}`,
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


class ManageEvent {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ManageEvent();
        }
        return this.#instance;
    }

    getSelectedDateRange() {
        const btn = document.querySelector(".date-submit");

        btn.onclick = () => {
                    const option = Array.from(document.getElementsByName("view-option")).find(radio => radio.checked).value;    

            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;

            const time = new Time(startDate, endDate);
            console.log(time);


            var orderList = null;
            if(option == "time"){
                orderList = ManageApi.getInstance().getOrder(time);
                ManageService.getInstance().setInnerText(orderList);

            }else if(option == "id"){
                orderList = ManageApi.getInstance().getOrderGroupUser(time);
                ManageService.getInstance().setInnerTextGroup(orderList);

            }
        }

      }



}

class ManageService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ManageService();
        }
        return this.#instance;
    }

    setInnerText(orderList){
        const body = document.querySelector(".tableBody");
        body.innerHTML = "";
        var sales = 0;

        orderList.forEach(list => {
            const user= ManageApi.getInstance().getUser(list.userId);
            body.innerHTML +=`
            <tr>
            <td>${list.orderId}</td>
            <td>${user.username}</td>
            <td>${list.orderTime}</td>
            <td>${list.totalPrice}</td>
            <td></td>
          </tr>
            `
            sales += list.totalPrice;
        });

        const price = document.querySelector(".dateTotalPrice");
        price.innerText = `${sales} 원`;
    }

    setInnerTextGroup(orderList){
        const body = document.querySelector(".tableBody");
        body.innerHTML = "";
        var sales = 0;

        orderList.forEach(list => {
            const user= ManageApi.getInstance().getUser(list.userId);
            body.innerHTML +=`
            <tr>
            <td></td>
            <td>${user.username}</td>
            <td></td>
            <td>${list.totalPrice}</td>
            <td></td>
          </tr>
            `
            sales += list.totalPrice;
        });

        const price = document.querySelector(".dateTotalPrice");
        price.innerText = `${sales} 원`;
    }



}


class Time {
    startDate = null;
    endDate = null;

    constructor(startDate, endDate) {
      this.startDate = startDate;
      this.endDate = endDate;

  }
}