import { decorate, action, observable } from "mobx";
import axios from "../services/axios";

class Common {

  ///STATES
  GLOBALS = false;
  SHOP_TYPE = false
  GET_SHOWROOM_BY_THANA = false
  DIVISIONS = []
  DISTRICTS_BY_DIVISIONS = []
  THANA_BY_DISTRICT = []
  PAGE_BY_ID = false
  NEWS_EVENTS = false
  NEWS_BY_ID = false
  MOST_READ_NEWS = false
  NEWS_ARCHIVE = false
  GET_OFFERS = false
  GET_OFFERS_BY_ID = false
  GET_OFFERS_BY_VIEWS = false
  GET_OFFERS_ARCHIVE = false
  ALL_JOBS = false
  JOB_BY_ID = false
  APPLY_JOB_CAREER = false
  SEND_CONTACT_EMAIL = false
  SITE_MAP = false
  TELL_US_SOMETHING_WHERE = false
  TELL_US_SOMETHING_WHAT = false
  TELL_US_SOMETHING_STORE = false
  SUBSCRIBE_NEWSLETTER = false
  GET_GALLERY_IMAGES = false
  GET_ADVERTISEMENT = false


  //SETTERS
  setGlobals(state) {
    return this.GLOBALS = state
  }

  setShopType(state) {
    return this.SHOP_TYPE = state
  }

  setGetShowroomByThana(state) {
    return this.GET_SHOWROOM_BY_THANA = state
  }

  setDivisions(state) {
    return this.DIVISIONS = state
  }

  setDistrictByDivision(state) {
    return this.DISTRICTS_BY_DIVISIONS = state
  }

  setThanaByDistrict(state) {
    return this.THANA_BY_DISTRICT = state
  }

  setPageById(state) {
    return this.PAGE_BY_ID = state
  }

  setNewsEvents(state) {
    return this.NEWS_EVENTS = state
  }

  setNewsById(state) {
    return this.NEWS_BY_ID = state
  }

  setMostReadNews(state) {
    return this.MOST_READ_NEWS = state
  }

  setNewsArchive(state) {
    return this.NEWS_ARCHIVE = state
  }

  setOffers(state) {
    return this.GET_OFFERS = state
  }

  setOffersById(state) {
    return this.GET_OFFERS_BY_ID = state
  }

  setOffersByViews(state) {
    return this.GET_OFFERS_BY_VIEWS = state
  }

  setOffersArchive(state) {
    return this.GET_OFFERS_ARCHIVE = state
  }

  setAllJobs(state) {
    return this.ALL_JOBS = state
  }

  setJobById(state) {
    return this.JOB_BY_ID = state
  }

  setApplyJobCareer(state) {
    return this.APPLY_JOB_CAREER = state
  }

  setSendContactEmail(state) {
    return this.SEND_CONTACT_EMAIL = state
  }

  setSiteMap(state) {
    return this.SITE_MAP = state
  }

  setTellUsSomethingWhere(state) {
    return this.TELL_US_SOMETHING_WHERE = state
  }

  setTellUsSomethingWhat(state) {
    return this.TELL_US_SOMETHING_WHAT = state
  }

  setTellUsSomethingStore(state) {
    return this.TELL_US_SOMETHING_STORE = state
  }

  setSubscribeNewsLetter(state) {
    return this.SUBSCRIBE_NEWSLETTER = state
  }

  setGalleryImages(state) {
    return this.GET_GALLERY_IMAGES = state
  }

  setAdvertisement(state) {
    return this.GET_ADVERTISEMENT = state
  }



  //GETTERS
  async fetchGlobals(info = {}) {
    const response = await axios.get('api/common/globals', {
      params: info
    })

    return this.setGlobals(response.data)
  }


  async fetchShoptype(info) {
    const response = await axios.get('api/common/shopType')

    return this.setShopType(response.data)
  }

  async fecthGetShowroomByThana(info) {
    const response = await axios.get('api/common/getShowroomByThana', {
      params: info
    })

    return this.setGetShowroomByThana(response.data)
  }

  async fetchDivisions(info) {
    const response = await axios.get('api/common/divisions')

    return this.setDivisions(response.data)
  }

  async fetchDistrictByDivision(info) {
    const response = await axios.get('api/common/getDistrictsByDivision', {
      params: info
    })

    return this.setDistrictByDivision(response.data)
  }

  async fetchSetThanaByDistrict(info) {
    const response = await axios.get('api/common/getThanaByDistrict', {
      params: info
    })

    return this.setThanaByDistrict(response.data)
  }

  async fetchPageById(info) {
    const response = await axios.get('api/common/getPage', {
      params: info
    })

    return this.setPageById(response.data)
  }


  async fetchNewsEvents(info) {
    const response = await axios.get('api/common/getNewsEvents', {
      params: info
    })

    return this.setNewsEvents(response.data)
  }


  async fetchgetNewsById(info) {
    const response = await axios.get('api/common/getNewsById', {
      params: info
    })

    return this.setNewsById(response.data)
  }


  async fetchMostReadNews(info) {
    const response = await axios.get('api/common/getMostReadNews', {
      params: info
    })

    return this.setMostReadNews(response.data)
  }


  async fetchNewsArchive(info) {
    const response = await axios.get('api/common/getNewsArchive', {
      params: info
    })

    return this.setNewsArchive(response.data)
  }

  async fetchOffers(info) {
    const response = await axios.get('api/common/getOffers', {
      params: info
    })

    return this.setOffers(response.data)
  }

  async fetchOffersById(info) {
    const response = await axios.get('api/common/getOffersById', {
      params: info
    })

    return this.setOffersById(response.data)
  }


  async fetchOffersByViews(info) {
    const response = await axios.get('api/common/getMostViewsOffer', {
      params: info
    })

    return this.setOffersByViews(response.data)
  }

  async fetchOffersArchive(info) {
    const response = await axios.get('api/common/getOffersArchive', {
      params: info
    })

    return this.setOffersArchive(response.data)
  }

  async fetchAllJobs(info) {
    const response = await axios.get('api/common/jobs')

    return this.setAllJobs(response.data)
  }

  async fetchJobById(info) {
    const response = await axios.get('api/common/job', {
      params: info
    })

    return this.setJobById(response.data)
  }

  async fetchApplyJobCareer(info) {
    const response = await axios.post('api/common/applyJob', info)

    return this.setApplyJobCareer(response.data)
  }

  async fetchSendContactEmail(info) {
    const response = await axios.post('api/common/sendContactEmail', info)

    return this.setSendContactEmail(response.data)
  }

  async fetchSiteMap(info) {
    const response = await axios.get('api/common/sitemap')

    return this.setSiteMap(response.data)
  }

  async fetchTellUsSomethingWhere(info) {
    const response = await axios.get('api/common/tellUsSomethingWhere')

    return this.setTellUsSomethingWhere(response.data)
  }


  async fetchTellUsSomethingWhat(info, id) {
    const response = await axios.get('api/common/tellUsSomethingWhat/' + id)

    return this.setTellUsSomethingWhat(response.data)
  }

  async fetchTellUsSomethingStore(info) {
    const response = await axios.post('api/common/tellUsSomethingWhat/store', info)

    return this.setTellUsSomethingStore(response.data)
  }

  async fetchSubscribeNewsletter(info) {
    const response = await axios.post('api/common/subscribeNewsletter', info)

    return this.setSubscribeNewsLetter(response.data)
  }

  async fetchGalleryImages(info) {
    const response = await axios.get('api/common/galleryImages', {
      params: info
    })

    return this.setGalleryImages(response.data)
  }

  async fetchAdvertisement(info) {
    const response = await axios.get('api/common/ads', {
      params: info
    })

    return this.setAdvertisement(response.data)
  }


}

decorate(Common, {

  ///STATE
  GLOBALS: observable,
  SHOP_TYPE: observable,
  GET_SHOWROOM_BY_THANA: observable,
  DIVISIONS: observable,
  DISTRICTS_BY_DIVISIONS: observable,
  THANA_BY_DISTRICT: observable,
  PAGE_BY_ID: observable,
  NEWS_EVENTS: observable,
  NEWS_BY_ID: observable,
  MOST_READ_NEWS: observable,
  NEWS_ARCHIVE: observable,
  GET_OFFERS: observable,
  GET_OFFERS_BY_ID: observable,
  GET_OFFERS_BY_VIEWS: observable,
  GET_OFFERS_ARCHIVE: observable,
  ALL_JOBS: observable,
  JOB_BY_ID: observable,
  APPLY_JOB_CAREER: observable,
  SEND_CONTACT_EMAIL: observable,
  SITE_MAP: observable,
  TELL_US_SOMETHING_WHERE: observable,
  TELL_US_SOMETHING_WHAT: observable,
  TELL_US_SOMETHING_STORE: observable,
  SUBSCRIBE_NEWSLETTER: observable,
  GET_GALLERY_IMAGES: observable,
  GET_ADVERTISEMENT: observable,



  ///SETTERS
  setGlobals: action,
  setShopType: action,
  setGetShowroomByThana: action,
  setDivisions: action,
  setDistrictByDivision: action,
  setThanaByDistrict: action,
  setPageById: action,
  setNewsEvents: action,
  setNewsById: action,
  setMostReadNews: action,
  setNewsArchive: action,
  setOffers: action,
  setOffersById: action,
  setOffersByViews: action,
  setOffersArchive: action,
  setAllJobs: action,
  setJobById: action,
  setApplyJobCareer: action,
  setSendContactEmail: action,
  setSiteMap: action,
  setTellUsSomethingWhere: action,
  setTellUsSomethingWhat: action,
  setTellUsSomethingStore: action,
  setSubscribeNewsLetter: action,
  setGalleryImages: action,
  setAdvertisement: action,

  //GETTERS
  fetchGlobals: action,
  fetchShoptype: action,
  fecthGetShowroomByThana: action,
  fetchDivisions: action,
  fetchDistrictByDivision: action,
  fetchSetThanaByDistrict: action,
  fetchPageById: action,
  fetchNewsEvents: action,
  fetchgetNewsById: action,
  fetchMostReadNews: action,
  fetchNewsArchive: action,
  fetchOffers: action,
  fetchOffersById: action,
  fetchOffersByViews: action,
  fetchOffersArchive: action,
  fetchAllJobs: action,
  fetchJobById: action,
  fetchApplyJobCareer: action,
  fetchSendContactEmail: action,
  fetchSiteMap: action,
  fetchTellUsSomethingWhere: action,
  fetchTellUsSomethingWhat: action,
  fetchTellUsSomethingStore: action,
  fetchSubscribeNewsletter: action,
  fetchGalleryImages: action,
  fetchAdvertisement: action,

});

export default new Common();
