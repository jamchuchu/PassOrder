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

  setFavoriteStatus(like){

    $.ajax({
      async :false,
      type : "post",
      url : `/api/like`,
      contentType: "application/json",
      data: JSON.stringify(like),
      dataType : "json",
      success : response =>{
        console.log(response);
      },
      error : error=>{
        console.log(error);
      }
    });

  }



}



class likeEvent {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new ComponentEvent();
    }
    return this.#instance;
  }

  addClickEventFavoriteButtons(favoriteButtons, menuId){
    
    favoriteButtons.onclick = () => {

      if (button.classList.contains('favorite-buttons')) {
        button.classList.remove('favorite-buttons');
        button.classList.add('normal-button');
      } else {
        button.classList.remove('normal-button');
        button.classList.add('favorite-buttons');
      }
      const like = new Like(0, 0, menuId, cafeId);
      console.log(like);
      LikeApi.getInstance().setFavoriteStatus(like);
    }
  }
}

const cafeId = 26;

class Like {
  likeId = null;
  userId = null;
  menuId = null;
  cafeId = null;

  constructor(likeId, userId, menuId, cafeId) {
    this.likeId = likeId;
    this.userId = userId;
    this.menuId = menuId;
    this.cafeId = cafeId;
}
}