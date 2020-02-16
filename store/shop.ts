import { decorate, action, observable, runInAction } from "mobx";
import axios from "../services/axios";

class Shop {
  //STATE
  SEARCH_PRODUCTS = false;
  ADD_TO_CART = false;
  REMOVE_FROM_CART = false;
  UPDATE_CART = false;
  CART = false;
  ADD_TO_COMPARE = false;
  REMOVE_FROM_COMPARE = false;
  COMPARE = false;
  WISHLISTS = false;
  ADD_TO_WISHLIST = false;
  REMOVE_FROM_WISHLIST = false;
  APPLY_COUPON = false;
  CHECK_OUT_USER_DEFAULT_DETAILS = false;
  SUBMIT_CHECK_OUT_USER_DETAILS = false;
  CHECK_OUT_USER_DETAILS = false;
  PAYMENT_SETTING = false;
  STORE_PAYMENT_METHOD = false;
  CHECK_OUT_USER_PAYMENT_METHOD = false;
  PRODUCT_DETAILS = false;
  RECENTLY_VIEW_PRODUCTS = false;
  PAY_NOW = false;
  ORDER_SUCCESS = false;
  STORE_USER_DELIVERY_LOCATION = false;
  GET_USER_DELIVERY_LOCATION = false;
  NEW_ARRIVALS = false;
  FLASH_SCHEDULES = false;
  QUESTION_ANSWER = false;
  SUBMIT_QUESTION = false;
  QUESTION_LIKE_DISLIKE = false;
  PRODUCT_REVIEWS_BY_ID = false;
  PRODUCT_REVIEWS_LIKE_DISLIKE = false;
  STORE_PRODUCT_REVIEW = false;
  STORE_PRODUCT_REVIEW_PHOTO = false;
  DELETE_PRODUCT_REVIEW_IMAGE = false;
  DELETE_PRODUCT_REVIEW_IMAGES = false;
  STORE_WHOLE_SALE_MAIL = false;
  ALL_CATAGORIES = false;
  ALL_BRANDS = false;
  ALL_DISCOUNTED_PRODUCTS = false;
  TRACK_MY_ORDER = false;
  VENDOR_DETAILS = false;
  VENDOR_ALL_PRODUCTS = false;

  ///SETTERS
  setSearchProducts(data) {
   return this.SEARCH_PRODUCTS = data;
  }

  setAddToCart(data) {
    return (this.ADD_TO_CART = data);
  }

  setRemoveCART(data) {
    return (this.REMOVE_FROM_CART = data);
  }

  setUpdateCart(data) {
    return (this.UPDATE_CART = data);
  }

  setCart(data) {
    return (this.CART = data);
  }

  setAddToCompare(data) {
    return (this.ADD_TO_COMPARE = data);
  }

  setRemoveFromCompare(data) {
    return (this.REMOVE_FROM_COMPARE = data);
  }

  setCompare(data) {
    return (this.COMPARE = data);
  }

  setWishlists(data) {
    return (this.WISHLISTS = data);
  }

  setAddToWishList(data) {
    return (this.ADD_TO_WISHLIST = data);
  }

  setRemoveFromWishList(data) {
    return (this.REMOVE_FROM_WISHLIST = data);
  }

  setApplyCoupon(data) {
    return (this.APPLY_COUPON = data);
  }

  setCheckoutUserDefaultDetails(data) {
    return (this.CHECK_OUT_USER_DEFAULT_DETAILS = data);
  }

  setSubmitCheckoutDetails(data) {
    return (this.SUBMIT_CHECK_OUT_USER_DETAILS = data);
  }

  setCheckOutUserDetails(data) {
    return (this.CHECK_OUT_USER_DETAILS = data);
  }

  setPaymentSetting(data) {
    return (this.PAYMENT_SETTING = data);
  }

  setStorePaymentMethod(data) {
    return (this.STORE_PAYMENT_METHOD = data);
  }

  setCheckoutUserPaymentMethod(data) {
    return (this.CHECK_OUT_USER_PAYMENT_METHOD = data);
  }
  setProductDetails(data) {
    this.PRODUCT_DETAILS = data;
  }
  setRecentlyViewProducts(data) {
    return (this.RECENTLY_VIEW_PRODUCTS = data);
  }

  setPayNow(data) {
    return (this.PAY_NOW = data);
  }

  setOrderSuccess(data) {
    return (this.ORDER_SUCCESS = data);
  }

  setStoreUserDeliveryLocation(data) {
    return (this.STORE_USER_DELIVERY_LOCATION = data);
  }

  setGetUserDeliveryLocation(data) {
    return (this.GET_USER_DELIVERY_LOCATION = data);
  }

  setNewArrivals(data) {
    return (this.NEW_ARRIVALS = data);
  }

  setFlashSchedules(data) {
    return (this.FLASH_SCHEDULES = data);
  }

  setQuestionAnswer(data) {
    return (this.QUESTION_ANSWER = data);
  }

  setSubmitQuestion(data) {
    return (this.SUBMIT_QUESTION = data);
  }

  setQuestionLikeDislike(data) {
    return (this.QUESTION_LIKE_DISLIKE = data);
  }

  setProductReviewsById(data) {
    return (this.PRODUCT_REVIEWS_BY_ID = data);
  }

  setProductReviewLikeDislike(data) {
    return (this.PRODUCT_REVIEWS_LIKE_DISLIKE = data);
  }

  setStoreProductReview(data) {
    return (this.STORE_PRODUCT_REVIEW = data);
  }

  setStoreProductReviewPhotos(data) {
    return (this.STORE_PRODUCT_REVIEW_PHOTO = data);
  }

  setDeleteProductReviewImage(data) {
    return (this.DELETE_PRODUCT_REVIEW_IMAGE = data);
  }

  setDeleteProductReviewImages(data) {
    return (this.DELETE_PRODUCT_REVIEW_IMAGES = data);
  }

  setStoreWholeSaleMail(data) {
    return (this.STORE_WHOLE_SALE_MAIL = data);
  }

  setAllCategories(data) {
    return (this.ALL_CATAGORIES = data);
  }

  setAllBrands(data) {
    return (this.ALL_BRANDS = data);
  }

  setAllDiscountedProducts(data) {
    return (this.ALL_DISCOUNTED_PRODUCTS = data);
  }

  setTrackMyOrder(data) {
    return (this.TRACK_MY_ORDER = data);
  }

  setVendorDetails(data) {
    return (this.VENDOR_DETAILS = data);
  }

  setVendorAllProducts(data) {
    return (this.VENDOR_ALL_PRODUCTS = data);
  }

  // GETTSERS
  async fetchSearchProducts(info) {
    const response = await axios.get('api/shop/search_products', { params: info });
    return this.setSearchProducts(response.data);
  }

  async fetchAddToCart(info) {
    const response = await axios.get("api/shop/add_to_cart", { params: info });

    return this.setAddToCart(response.data);
  }

  async fetchRemoveFromCart(info) {
    const response = await axios.get("api/shop/remove_cart_item", {
      params: info
    });

    return this.setRemoveCART(response.data);
  }

  async fetchUpdateCart(info) {
    const response = await axios.post("api/shop/update_cart", info);

    return this.setUpdateCart(response.data);
  }

  async fetchCart(info) {
    const response = await axios.get("api/shop/cart", { params: info });

    return this.setCart(response.data);
  }

  async fetchAddToCompare(info) {
    const response = await axios.get("api/shop/add_to_compare", {
      params: info
    });

    return this.setAddToCompare(response.data);
  }

  async fetchRemoveFromCompare(info) {
    const response = await axios.get("api/shop/removeCompare", {
      params: info
    });

    return this.setRemoveFromCompare(response.data);
  }

  async fetchCompare(info) {
    const response = await axios.get("api/shop/view_compare", { params: info });

    return this.setCompare(response.data);
  }

  async fetchWishLists(info) {
    const response = await axios.get("api/shop/wishlists", {
      params: info
    });

    return this.setWishlists(response.data);
  }

  async fetchAddToWishList(info) {
    const response = await axios.get("api/shop/addToWishList", {
      params: info
    });

    return this.setAddToWishList(response.data);
  }

  async fetchRemoveFromWishList(info) {
    const response = await axios.get("api/shop/removeFromWishList", {
      params: info
    });

    return this.setRemoveFromWishList(response.data);
  }

  async fetchApplyCoupon(info) {
    const response = await axios.get("api/shop/apply_coupon_voucher", {
      params: info
    });

    return this.setApplyCoupon(response.data);
  }

  async fetchCheckoutUserDefaultDetails(info) {
    const response = await axios.get("api/shop/checkoutUserDefaultDetails", {
      params: info
    });

    return this.setCheckoutUserDefaultDetails(response.data);
  }

  async fetchSubmitCheckoutUserDetails(info) {
    const response = await axios.post(
      "api/shop/submitCheckoutUserDetails",
      info
    );

    return this.setSubmitCheckoutDetails(response.data);
  }

  async fetchCheckoutUserDetails(info) {
    const response = await axios.get("api/shop/checkoutUserDetails", {
      params: info
    });

    return this.setCheckOutUserDetails(response.data);
  }

  async fetchPaymentSetting({ commit }) {
    const response = await axios.get("api/shop/getPaymentSetting");

    return this.setPaymentSetting(response.data);
  }

  async fetchStorePaymentMethod(info) {
    const response = await axios.post("api/shop/storePaymentMethod", info);

    return this.setStorePaymentMethod(response.data);
  }

  async fetchCheckoutUserPaymentMethod(info) {
    const response = await axios.get("api/shop/checkoutUserPaymentMethod", {
      params: info
    });
    return this.setCheckoutUserPaymentMethod(response.data);
  }

  async fetchProductDetails(info) {

    const response = await axios.get("api/shop/product_details", {
      params: info
    });
    
    return this.setProductDetails(response.data);
  }

  async fetchRecentlyViewProducts(info) {
    const response = await axios.get("api/shop/recentlyViewProducts", {
      params: info
    });

    return this.setRecentlyViewProducts(response.data);
  }

  async fetchPayNow(info) {
    const response = await axios.get("api/shop/pay_now", {
      params: info
    });

    return this.setPayNow(response.data);
  }

  async fetchOrderSuccess(info) {
    const response = await axios.get("api/shop/orderSuccess", {
      params: info
    });

    return this.setOrderSuccess(response.data);
  }

  async fetchStoreUserDeliveryLocation(info) {
    const response = await axios.post(
      "api/shop/storeUserDeliveryLocation",
      info
    );

    return this.setStoreUserDeliveryLocation(response.data);
  }

  async fetchGetUserDeliveryLocation(info) {
    const response = await axios.get("api/shop/getUserDeliveryLocation", {
      params: info
    });

    return await this.setGetUserDeliveryLocation(response.data);
  }

  async fetchNewArrivals(info) {
    const response = await axios.get("api/shop/newArrivals", {
      params: info
    });

    return await this.setNewArrivals(response.data);
  }

  async fetchFlashSchedules(info) {
    const response = await axios.get("api/shop/flashSchedules");

    return await this.setFlashSchedules(response.data);
  }

  async fetchQuestionAnswer(info) {
    const response = await axios.get(`api/shop/product/${info.product_id}/qa`);

    return await this.setQuestionAnswer(response.data);
  }

  async fetchSubmitQuestion(info) {
    const response = await axios.post("api/shop/product/qa", info);

    return await this.setSubmitQuestion(response.data);
  }

  async fetchQuestionLikeDislike(info) {
    const response = await axios.get("api/shop/product/qa/likeDislike", {
      params: info
    });

    return await this.setQuestionLikeDislike(response.data);
  }

  async fetchProductReviewsById(info) {
    const response = await axios.get("api/shop/product/reviews", {
      params: info
    });

    return await this.setProductReviewsById(response.data);
  }

  async fetchProductReviewLikeDislike(info) {
    const response = await axios.post(
      "api/shop/product/reviews/likeDislikes",
      info
    );

    return await this.setProductReviewLikeDislike(response.data);
  }

  async fetchStoreProductReview(info) {
    const response = await axios.post("api/shop/product/reviews/store", info);

    return await this.setStoreProductReview(response.data);
  }

  async fetchStoreProductReviewPhoto(info) {
    const response = await axios.post(
      "api/shop/product/reviews/UploadPhoto",
      info
    );
    return await this.setStoreProductReviewPhotos(response.data);
  }

  async fetchDeleteProductReviewImage(info) {
    const response = await axios.post(
      "api/shop/product/reviews/deleteImage",
      info
    );

    return await this.setDeleteProductReviewImage(response.data);
  }

  async fetchDeleteProductReviewImages(info) {
    const response = await axios.post(
      "api/shop/product/reviews/deleteImages",
      info
    );

    return await this.setDeleteProductReviewImages(response.data);
  }

  async fetchStoreWholeSaleMail(info) {
    const response = await axios.post("api/shop/wholeSale", info);

    return await this.setStoreWholeSaleMail(response.data);
  }

  async fetchAllCategories(info) {
    const response = await axios.get("api/shop/allCategories", info);

    return await this.setAllCategories(response.data);
  }

  async fetchAllBrands(info) {
    const response = await axios.get("api/shop/getAllBrands", {
      params: info
    });
    return await this.setAllBrands(response.data);
  }

  async fetchAllDiscountedProducts(info) {
    const response = await axios.get("api/shop/getDiscountedAllProducts", {
      params: info
    });

    return this.setAllDiscountedProducts(response.data);
  }

  async fetchTrackMyOrder(info) {
    const response = await axios.get("api/shop/trackMyOrder", {
      params: info
    });

    return this.setTrackMyOrder(response.data);
  }

  async fetchVendorDetails(info) {
    const response = await axios.get("api/shop/vendor/details", {
      params: info
    });

    return this.setVendorDetails(response.data);
  }

  async fetchVendorAllProducts(info) {
    const response = await axios.get("api/shop/vendor/allProducts", {
      params: info
    });

    return this.setVendorAllProducts(response.data);
  }
}

decorate(Shop, {
  ///STATE
  SEARCH_PRODUCTS: observable,
  ADD_TO_CART: observable,
  REMOVE_FROM_CART: observable,
  UPDATE_CART: observable,
  CART: observable,
  ADD_TO_COMPARE: observable,
  REMOVE_FROM_COMPARE: observable,
  COMPARE: observable,
  WISHLISTS: observable,
  ADD_TO_WISHLIST: observable,
  REMOVE_FROM_WISHLIST: observable,
  APPLY_COUPON: observable,
  CHECK_OUT_USER_DEFAULT_DETAILS: observable,
  SUBMIT_CHECK_OUT_USER_DETAILS: observable,
  CHECK_OUT_USER_DETAILS: observable,
  PAYMENT_SETTING: observable,
  STORE_PAYMENT_METHOD: observable,
  CHECK_OUT_USER_PAYMENT_METHOD: observable,
  PRODUCT_DETAILS: observable,
  RECENTLY_VIEW_PRODUCTS: observable,
  PAY_NOW: observable,
  ORDER_SUCCESS: observable,
  STORE_USER_DELIVERY_LOCATION: observable,
  GET_USER_DELIVERY_LOCATION: observable,
  NEW_ARRIVALS: observable,
  FLASH_SCHEDULES: observable,
  QUESTION_ANSWER: observable,
  SUBMIT_QUESTION: observable,
  QUESTION_LIKE_DISLIKE: observable,
  PRODUCT_REVIEWS_BY_ID: observable,
  PRODUCT_REVIEWS_LIKE_DISLIKE: observable,
  STORE_PRODUCT_REVIEW: observable,
  STORE_PRODUCT_REVIEW_PHOTO: observable,
  DELETE_PRODUCT_REVIEW_IMAGE: observable,
  DELETE_PRODUCT_REVIEW_IMAGES: observable,
  STORE_WHOLE_SALE_MAIL: observable,
  ALL_CATAGORIES: observable,
  ALL_BRANDS: observable,
  ALL_DISCOUNTED_PRODUCTS: observable,
  TRACK_MY_ORDER: observable,
  VENDOR_DETAILS: observable,
  VENDOR_ALL_PRODUCTS: observable,

  ///SETTERS
  setSearchProducts: action,
  setAddToCart: action,
  setRemoveCART: action,
  setUpdateCart: action,
  setCart: action,
  setAddToCompare: action,
  setRemoveFromCompare: action,
  setCompare: action,
  setWishlists: action,
  setAddToWishList: action,
  setRemoveFromWishList: action,
  setApplyCoupon: action,
  setCheckoutUserDefaultDetails: action,
  setSubmitCheckoutDetails: action,
  setCheckOutUserDetails: action,
  setPaymentSetting: action,
  setStorePaymentMethod: action,
  setCheckoutUserPaymentMethod: action,
  setProductDetails: action,
  setRecentlyViewProducts: action,
  setPayNow: action,
  setOrderSuccess: action,
  setStoreUserDeliveryLocation: action,
  setGetUserDeliveryLocation: action,
  setNewArrivals: action,
  setFlashSchedules: action,
  setQuestionAnswer: action,
  setSubmitQuestion: action,
  setQuestionLikeDislike: action,
  setProductReviewsById: action,
  setProductReviewLikeDislike: action,
  setStoreProductReview: action,
  setStoreProductReviewPhotos: action,
  setDeleteProductReviewImage: action,
  setDeleteProductReviewImages: action,
  setStoreWholeSaleMail: action,
  setAllCategories: action,
  setAllBrands: action,
  setAllDiscountedProducts: action,
  setTrackMyOrder: action,
  setVendorDetails: action,
  setVendorAllProducts: action,

  //GETTERS
  fetchSearchProducts: action,
  fetchAddToCart: action,
  fetchRemoveFromCart: action,
  fetchUpdateCart: action,
  fetchCart: action,
  fetchAddToCompare: action,
  fetchRemoveFromCompare: action,
  fetchCompare: action,
  fetchWishLists: action,
  fetchAddToWishList: action,
  fetchRemoveFromWishList: action,
  fetchApplyCoupon: action,
  fetchCheckoutUserDefaultDetails: action,
  fetchSubmitCheckoutUserDetails: action,
  fetchCheckoutUserDetails: action,
  fetchPaymentSetting: action,
  fetchStorePaymentMethod: action,
  fetchCheckoutUserPaymentMethod: action,
  fetchProductDetails: action,
  fetchRecentlyViewProducts: action,
  fetchPayNow: action,
  fetchOrderSuccess: action,
  fetchStoreUserDeliveryLocation: action,
  fetchGetUserDeliveryLocation: action,
  fetchNewArrivals: action,
  fetchFlashSchedules: action,
  fetchQuestionAnswer: action,
  fetchSubmitQuestion: action,
  fetchQuestionLikeDislike: action,
  fetchProductReviewsById: action,
  fetchProductReviewLikeDislike: action,
  fetchStoreProductReview: action,
  fetchStoreProductReviewPhoto: action,
  fetchDeleteProductReviewImage: action,
  fetchDeleteProductReviewImages: action,
  fetchStoreWholeSaleMail: action,
  fetchAllCategories: action,
  fetchAllBrands: action,
  fetchAllDiscountedProducts: action,
  fetchTrackMyOrder: action,
  fetchVendorDetails: action,
  fetchVendorAllProducts: action
});

export default new Shop();
