import { decorate, action, observable } from "mobx";
import axios from "../services/axios";

class Home {
  ///STATE
  INDEX = false;
  JUST_FOR_YOU = false;
  JUST_FOR_YOU_ALL = false;
  BESTBUY_CHOICES = false;
  BESTBUY_CHOICES_ALL = false;

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
}

decorate(Home, {
  //STATES
  INDEX: observable,
  JUST_FOR_YOU: observable,
  JUST_FOR_YOU_ALL: observable,
  BESTBUY_CHOICES: observable,
  BESTBUY_CHOICES_ALL: observable,

  //SETTERS
  setIndex: action,
  setJustForYou: action,
  setJustForYouAll: action,
  setBestbuyChoices: action,
  setBestbuyChoicesAll: action,

  //GETTERS
  fetchIndex: action,
  fetchJustForYou: action,
  fetchJustForYouAll: action,
  fetchBestBuyChoices: action,
  fetchBestBuyChoicesAll: action,

});

export default new Home();
