import { decorate, action, observable } from "mobx";
import axios from "../services/axios";

class Home {
  ///STATE
  INDEX = false;
  JUST_FOR_YOU = false;
  BESTBUY_CHOICES = false;

  ///SETTERS
  setIndex(data) {
    return (this.INDEX = data);
  }

  setJustForYou(data) {
    return (this.JUST_FOR_YOU = data);
  }

  setBestbuyChoices(data) {
    return (this.BESTBUY_CHOICES = data);
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

  async fetchBestBuyChoices(info) {
    const response = await axios.get("api/home/bestBuyChoices", {
      params: info
    });

    return this.setBestbuyChoices(response.data);
  }
}

decorate(Home, {
  //STATES
  INDEX: observable,
  JUST_FOR_YOU: observable,
  BESTBUY_CHOICES: observable,

  //SETTERS
  setIndex: action,
  setJustForYou: action,
  setBestbuyChoices: action,

  //GETTERS
  fetchIndex: action,
  fetchJustForYou: action,
  fetchBestBuyChoices: action
});

export default new Home();
