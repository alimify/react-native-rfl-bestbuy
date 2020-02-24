import { decorate, action, observable } from "mobx";
import axios from "../services/axios";
import Constants from "expo-constants";

class User {
  ///STATES
  LOGIN = false;
  ACCOUNT = false;
  REGISTER = false;
  UPDATE_ACCOUNT = false;
  UPDATE_PASSWORD = false;
  UPDATE_BILLING_ADDRESS = false;
  ORDERS_HISTORY = false;
  SELF_DASHBOARD = false;
  SELF_TOKEN = Constants.deviceId;
  ACCESS_TOKEN = false;
  PASSWORD_RESET_REQUEST = false;
  PASSWORD_RESET = false;
  CONVERT_RP_TO_TK = false;
  REWARD_TK_HISTORY = false;

  //SETTERS
  setLogin(data) {
    this.LOGIN = data;
    return this.LOGIN;
  }

  setAccount(data) {
    this.ACCOUNT = data;
    return true;
  }

  setAccessToken(token) {
    this.ACCESS_TOKEN = token;
    return this.ACCESS_TOKEN;
  }

  setRegister(data) {
    this.REGISTER = data;
    return this.REGISTER;
  }

  setUpdateAccount(data) {
    return (this.UPDATE_ACCOUNT = data);
  }

  setUpdatePassword(data) {
    return (this.UPDATE_PASSWORD = data);
  }

  setUpdateBillingAddress(data) {
    return (this.UPDATE_BILLING_ADDRESS = data);
  }

  setOrdersHistory(data) {
    return (this.ORDERS_HISTORY = data);
  }

  setSelfDashboard(data) {
    return (this.SELF_DASHBOARD = data);
  }

  setSelfToken(data) {
    this.SELF_TOKEN = data;
  }

  setPasswordResetRequest(data) {
    this.PASSWORD_RESET_REQUEST = data;
  }

  setPasswordReset(data) {
    this.PASSWORD_RESET = data;
  }

  setConvertRpToTk(data) {
    this.CONVERT_RP_TO_TK = data
  }

  setRewardTkHistory(data) {
    this.REWARD_TK_HISTORY = data
  }

  ///GETTERS

  async fetchLogin(info) {
    const response = await axios.post("api/auth/login", info),
      data = response.data;

    return await this.setLogin(data);
  }

  async fetchRegister(info) {
    const response = await axios.post("api/auth/register", info);

    return this.setRegister(response.data);
  }

  async fetchAccount(info) {
 const response = await axios.get("api/user/account", {
        params: info
      });
      
    return this.setAccount(response.data);
  }

  async fetchUpdateAccount(info) {
    const response = await axios.post("api/user/updateAccount", info);

    return this.setUpdateAccount(response.data);
  }

  async fetchUpdatePassword(info) {
    const response = await axios.post("api/user/updatePassword", info);

    return this.setUpdatePassword(response.data);
  }

  async fetchUpdateBillingAddress(info) {
    const response = await axios.post("api/user/updateBillingAddress", info);

    return this.setUpdateBillingAddress(response.data);
  }

  async fetchOrdersHistory(info) {
    const response = await axios.get("api/user/orderHistory", {
      params: info
    });

    return this.setOrdersHistory(response.data);
  }

  async fetchSelfDashboard(info) {
    const response = await axios.get("api/user/selfDashboard", {
      params: info
    });

    return this.setSelfDashboard(response.data);
  }

  async fetchSelfToken(info) {
    return this.setSelfToken(info);
  }

  async fetchPasswordResetRequest(info) {
    const response = await axios.post("api/auth/passwordResetRequest", info);

    return this.setPasswordResetRequest(response.data);
  }

  async fetchPasswordReset(info) {
    const response = await axios.post("api/auth/passwordReset", info);

    return this.setPasswordReset(response.data);
  }

  async fetchConvertRpToTk(info) {
    const response = await axios.post('api/shop/convertPointToCoupon', info)
    
    return await this.setConvertRpToTk(response.data)
  }

  async fetchRewardTkHistory(info) {
    const response = await axios.get('api/shop/rewardPointHistoryByUser', {
      params: info
    })

    return await this.setRewardTkHistory(response.data)
  }
}

decorate(User, {
  //STATES
  ACCOUNT: observable,
  REGISTER: observable,
  UPDATE_ACCOUNT: observable,
  UPDATE_PASSWORD: observable,
  UPDATE_BILLING_ADDRESS: observable,
  ORDERS_HISTORY: observable,
  SELF_DASHBOARD: observable,
  SELF_TOKEN: observable,
  ACCESS_TOKEN: observable,
  PASSWORD_RESET_REQUEST: observable,
  PASSWORD_RESET: observable,

  //SETTERS
  setAccount: action,
  setRegister: action,
  setUpdateAccount: action,
  setUpdatePassword: action,
  setUpdateBillingAddress: action,
  setOrdersHistory: action,
  setSelfDashboard: action,
  setSelfToken: action,
  setAccessToken: action,
  setPasswordResetRequest: action,
  setPasswordReset: action,

  ///GETTERS

  fetchRegister: action,
  fetchAccount: action,
  fetchUpdateAccount: action,
  fetchUpdatePassword: action,
  fetchUpdateBillingAddress: action,
  fetchOrdersHistory: action,
  fetchSelfDashboard: action,
  fetchSelfToken: action,
  fetchPasswordResetRequest: action,
  fetchPasswordReset: action
});

export default new User();
