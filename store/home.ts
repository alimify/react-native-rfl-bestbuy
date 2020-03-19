import { decorate, action, observable } from "mobx";
import axios from "../services/axios";

class Home {
  ///STATE
  INDEX = false;
  JUST_FOR_YOU = false;
  JUST_FOR_YOU_ALL = false;
  BESTBUY_CHOICES = false;
  BESTBUY_CHOICES_ALL = false;
  CATEGORY_SET = false;

  ///SETTERS
  setIndex(data) {
    return (this.INDEX = data);
  }

  setJustForYou(data) {
    return (this.JUST_FOR_YOU = data);
  }

  setJustForYouAll(data) {
    this.JUST_FOR_YOU_ALL = data;
  }

  setBestbuyChoices(data) {
    this.BESTBUY_CHOICES = data;
  }

  setBestbuyChoicesAll(data) {
    this.BESTBUY_CHOICES_ALL = data;
  }


  setCategorySet(data) {
    this.CATEGORY_SET = data
  }

  ///GETTERS

  async fetchIndex(params = {}) {
    const response = await axios.get("api/home/index", {
      params: params
    });
    return this.setIndex(response.data);
  }

  async fetchJustForYou(info) {
    const response = await axios.get("api/home/justForYou", {
      params: info
    });

    return this.setJustForYou(response.data);
  }



  async fetchJustForYouAll(info) {
    const response = await axios.get("api/home/justForYou", {
      params: info
    });

    return this.setJustForYouAll(response.data);
  }

  async fetchBestBuyChoices(info) {
    const response = await axios.get("api/home/bestBuyChoices", {
      params: info
    });

    return this.setBestbuyChoices(response.data);
  }


  async fetchBestBuyChoicesAll(info) {
    const response = await axios.get("api/home/bestBuyChoices", {
      params: info
    });

    return this.setBestbuyChoicesAll(response.data);
  }


  async fetchCategorySet(info) {
    const response = await axios.get('api/home/categorySet', {
      params: info
    })

    return this.setCategorySet(response.data)
  }
}

decorate(Home, {
  //STATES
  INDEX: observable,
  JUST_FOR_YOU: observable,
  JUST_FOR_YOU_ALL: observable,
  BESTBUY_CHOICES: observable,
  BESTBUY_CHOICES_ALL: observable,
  CATEGORY_SET: observable,

  //SETTERS
  setIndex: action,
  setJustForYou: action,
  setJustForYouAll: action,
  setBestbuyChoices: action,
  setBestbuyChoicesAll: action,
  setCategorySet: action,

  //GETTERS
  fetchIndex: action,
  fetchJustForYou: action,
  fetchJustForYouAll: action,
  fetchBestBuyChoices: action,
  fetchBestBuyChoicesAll: action,
  fetchCategorySet: action
});

export default new Home();
