window.onload=()=>{
  ComponentEvent.getInstance().addClickEventFavoriteButtons();
}

class LikeApi{
  static #instance = null;
  static getInstance(){
    if (this.#instance == null) {
      this.#instance = new LikeApi();
  }
  return this.#instance;
  }

  setFavoriteStatus(){

    $.ajax({
      async :false,
      type : "post",
      url : `http://localhost:8000/api/like`,
      contentType: "application/json",
      data: JSON.stringify(user),
      dataType : "json",
      success : response =>{
        console.log(response);
      },
      error : error=>{
        console.log(error);
      }
    });

  }

  setNormalStatus(){

    $.ajax({
      async:false,
      type : "delete",
      url : `http://localhost:8000/api/like`,
      contentType: "application/json",
      data: JSON.stringify(user),
      dataType : "json",
      success:response=>{
        console.log(response);
      },
      error : error=>{
        console.log(error);
      }
    });
  }

}



class ComponentEvent {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new ComponentEvent();
    }
    return this.#instance;
  }

  addClickEventFavoriteButtons(){
    const favoriteButtons = document.querySelectorAll(".favorite-buttons");
    
    favoriteButtons.onclick = () => {
      if (button.classList.contains('favorite-buttons')) {
        
        LikeApi.getInstance().setFavoriteStatus();

        button.classList.remove('favorite-buttons');
        button.classList.add('normal-button');
      } else {

        LikeApi.getInstance().setNormalStatus();

        button.classList.remove('normal-button');
        button.classList.add('favorite-buttons');
      }
    }
  }
}