import User from "@/services/graphql/User"
import router from "@/router"

/**
 * @author Nikola Popov
 * Vuex store USER
 *
 * @action
 *  login
 *  resetPassword
 *  lenderSignUp
 *  isLoggedIn
 *  registerUser
 *  checkRegisterEmail
 * @getters
 *  user
 *  loggedIn
 * @mutation
 *  loginSuccess
 *  loginFailure
 *  logout
 *  setAuth
 */

export default {
  namespaced: false,
  state: {
    user: {},
    auth: localStorage.getItem("auth") || "",
    loggedIn: false,
    token: null,
    expires_in: null,
    refresh_token: null,
    refresh_ready: false,
    show_type_of_loans: false,
    non_beta_user: false,
    // chatbot: localStorage.getItem('chatbot') || '',

    explanationVideoFromhamburgerMenuClicked: false,
  },
  mutations: {
    /**
     * @author Nikola Popov
     * @description
     * set user and loggedIn
     * @param state
     * @param data object from server side
     */
    loginSuccess(state, data): void {
      state.loggedIn = true
      state.user = data
    },
    /**
     * @author Nikola Popov
     * @description
     * remove all from localstorage and state var set to null
     * @param state
     */
    loginFailure(state): void {
      state.loggedIn = false
      state.user = null
      state.auth = null
      // state.chatbot = null;
    },
    /**
     * @author Nikola Popov
     * @description
     * logout user and remove all from localstorage, state var set to null
     * @param state
     */
    logout(state): void {
      state.loggedIn = false
    },
    /**
     * @author Nikola Popov
     * @description
     * set auth ( user info )
     * @param state
     */
    setAuth(state, data): void {
      state.auth = data
      // const chatbotParse = JSON.stringify(
      //     {
      //         name: data.user.first_name + ' ' + data.user.last_name,
      //         email: data.user.email,
      //         role: data.user.role,
      //         company: data.user.company.company_name,
      //         profile_image: data.user.profile_image
      //     }
      // );
      // state.chatbot = btoa(chatbotParse);
    },
    CHANGE_NAME(state, data): void {
      state.user.first_name = data.first_name
      state.user.last_name = data.last_name
      const lStorage = localStorage.getItem("auth") || null
      if (lStorage) {
        const obj = JSON.parse(lStorage)
        obj.user.first_name = data.first_name
        obj.user.last_name = data.last_name
        localStorage.setItem("auth", JSON.stringify(obj))
        // const chatbotParse = JSON.stringify(
        //     {
        //         name: obj.user.first_name + obj.user.last_name,
        //         email: obj.user.email,
        //         role: obj.user.role,
        //         company: data.user.company.company_name,
        //         profile_image: data.user.profile_image
        //     }
        // );
        // localStorage.setItem('chatbot', btoa(chatbotParse));
      }
    },
    SET_TOKEN(state, data): void {
      state.token = data
    },
    SET_EXPIRES(state, data): void {
      state.expires_in = data
    },
    REFRESH_TOKEN(state, data): void {
      state.refresh_token = data
    },
    SET_REFRESH_READY(state, data) {
      state.refresh_ready = data
    },
    SET_FIRST_LOGIN_TYPE_OF_LOANS(state, data) {
      state.show_type_of_loans = data
    },
    SET_FIRST_LOGIN_NON_BETA_USER(state, data) {
      state.non_beta_user = data
    },

    EXPLANATION_VIDEO_CLICKED(state, data) {
      state.explanationVideoFromhamburgerMenuClicked = data
    },
  },
  actions: {
    explanationVideoFromhamburgerMenuClicked({ commit }, data) {
      commit("EXPLANATION_VIDEO_CLICKED", data)
    },

    /**
     * @author Nikola Popov
     * @description
     * send credential to server side ( username, password )
     * if response ok set token to localstorage
     * mutate user and loggedIn
     *
     * @error
     * remove all from localstorage
     * set auth, user and logged in to null
     *
     * @param commit
     * @param userInfo object
     */
    login({ commit, dispatch }, userInfo) {
      return User.login(userInfo).then(
        (response) => {
          if (!response.data.errors) {
            dispatch("setLoggedinIn", response.data.data.login)
          }
          return Promise.resolve(response)
        },
        (error) => {
          localStorage.removeItem("auth")
          // localStorage.removeItem('chatbot');
          commit("loginFailure")
          return Promise.reject(error)
        },
      )
    },

    /**
     * @author Nikola Popov
     * @description
     * logout user terminate session ( token )
     */
    logout() {
      return User.logout().then(
        (response) => {
          return Promise.resolve(response)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    /**
     * @author Nikola Popov
     * @description
     * refresh  token and set to localstorage
     */
    setLoggedinIn({ commit }, response) {
      const date = new Date()
      const ex = new Date(date.getTime() + response.expires_in * 1000)
      const obj: any = {
        access_token: response.access_token,
        expires_in: ex.getTime(),
        refresh_token: response.refresh_token,
        isloggedIn: true,
        user: response.user,
      }
      if (response.show_type_of_loans) {
        obj.show_type_of_loans = response.show_type_of_loans
        commit("SET_FIRST_LOGIN_TYPE_OF_LOANS", response.show_type_of_loans)
      }

      obj.non_beta_user = response.non_beta_user
      commit("SET_FIRST_LOGIN_NON_BETA_USER", response.non_beta_user)

      if (response.tempToken && response.tempToken !== "") {
        localStorage.setItem("tempToken", response.tempToken)
        commit("SET_TEMP_TOKEN", response.tempToken)
      }
      localStorage.setItem("auth", JSON.stringify(obj))
      // const chatbotParse = JSON.stringify(
      //     {
      //         name: obj.user.first_name + ' ' + obj.user.last_name,
      //         email: obj.user.email,
      //         role: obj.user.role,
      //         company: obj.user.company.company_name,
      //         profile_image: obj.user.profile_image
      //     }
      // );
      // localStorage.setItem('chatbot', btoa(chatbotParse));

      commit("loginSuccess", response.user)
      commit("setAuth", obj)
      commit("SET_TOKEN", response.access_token)
      commit("SET_EXPIRES", ex.getTime())
      commit("REFRESH_TOKEN", response.refresh_token)
    },

    /**
     * @author Nikola Popov
     * @description
     * refresh  token and set to localstorage
     */
    refreshToken({ commit, getters, dispatch }) {
      let refresh_token = ""
      let non_beta_user = ""
      const obj = JSON.parse(localStorage.getItem("auth"))

      if (localStorage.getItem("auth") !== null) {
        refresh_token = obj.refresh_token
        non_beta_user = obj.non_beta_user
        commit("SET_FIRST_LOGIN_NON_BETA_USER", non_beta_user)
      } else {
        console.log("token is not sent", obj)
      }

      return User.refreshToken({ refresh_token: refresh_token }).then(
        (response) => {
          if (!response.data.errors) {
            const obj = {
              access_token: response.data.data.refreshToken.access_token,
              expires_in: response.data.data.refreshToken.expires_in,
              refresh_token: response.data.data.refreshToken.refresh_token,
              isloggedIn: true,
              non_beta_user: non_beta_user,
              user: getters.getUser,
            }
            dispatch("setLoggedinIn", obj)
          }
          return Promise.resolve(response.data.data.refreshToken.access_token)
        },
        (error) => {
          // Logout user on refresh token error
          localStorage.removeItem("auth")
          localStorage.removeItem("tempToken")
          // localStorage.removeItem('chatbot');
          commit("loginFailure")
          router.push("/login")
          return Promise.reject(error)
        },
      )
    },

    /**
     * @author Nikola Popov
     * @description
     * send email to server side
     * if response 200 show message
     *
     * @error
     * email does not exist
     *
     * @param commit
     * @param emailInfo object ( with email )
     */
    resetPassword(store, emailInfo) {
      return User.resetPassword(emailInfo).then(
        (response) => {
          return Promise.resolve(response)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    /**
     * @author Nikola Popov
     * @description
     * if user logged in set state data
     *
     * @param commit
     */
    isLoggedIn({ commit }) {
      const lStorage = localStorage.getItem("auth") || null
      if (lStorage) {
        const obj = JSON.parse(lStorage)
        if (obj.isloggedIn) {
          commit("loginSuccess", obj.user)
          commit("setAuth", obj)
          commit("SET_TOKEN", obj.access_token)
          commit("SET_EXPIRES", obj.expires_in)
          commit("REFRESH_TOKEN", obj.refresh_token)
          commit("SET_FIRST_LOGIN_NON_BETA_USER", obj.non_beta_user)
        }
      }
    },

    /**
     * @author Nikola Popov
     * @description
     * register user
     * @param commit
     * @param user object
     */
    registerUser({ commit }, user) {
      return User.registerUser(user).then(
        (response) => {
          return Promise.resolve(response)
        },
        (error) => {
          localStorage.removeItem("auth")
          // localStorage.removeItem('chatbot');
          commit("loginFailure")
          return Promise.reject(error)
        },
      )
    },

    /**
     * @author Nikola Popov
     * @description
     * check if email exsist
     * @param objInfoEmail object with email
     */

    checkRegisterEmail(store, objInfoEmail) {
      return User.checkRegisterEmail(objInfoEmail).then(
        (response) => {
          return Promise.resolve(response)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    /**
     * @author Nikola Popov
     * @description
     *
     * @param obj object with form
     */

    lenderSignUp({ getters }, obj) {
      return User.lenderSignUp(obj, getters.getTempToken).then(
        (response) => {
          return Promise.resolve(response)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    /**
     * @author Nikola Popov
     * @description
     *  verify email and return response to component
     * @param obj object
     */

    userVerify({ commit }, obj) {
      return User.userVerify(obj).then(
        (response) => {
          if (!response.data.errors) {
            commit("SET_TOKEN", response.data.data.access_token)
          }
          return Promise.resolve(response)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    /**
     * @author Nikola Popov
     * @description
     *  new reset password
     * @param obj object
     */

    userRestartPassword(store, obj) {
      return User.userRestartPassword(obj).then(
        (response) => {
          return Promise.resolve(response)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    sendNewVerify(store, obj) {
      return User.sendNewVerify(obj).then(
        (response) => {
          return Promise.resolve(response)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    /**
     * @author Milica Mihajlovic
     * @description
     *  ignore deal
     * @param commit
     * @param obj object
     */

    lenderIgnoreDeal(store, obj) {
      return User.lenderIgnoreDeal(obj).then(
        (response) => {
          return Promise.resolve(response)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    async settingLoanOfType({ commit }, arr) {
      const res = await User.settingLoanOfType(arr)
      commit("SET_LOAN_AFTER_SUBMIT", arr)
      return res
    },

    changeSettingLoanOfType({ commit }, flag) {
      commit("SET_FIRST_LOGIN_TYPE_OF_LOANS", flag)
    },
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getLoggedIn(state) {
      return state.loggedIn
    },
    getUserId(state) {
      return state.user.id
    },
    getToken(state) {
      return state.token
    },
    getExpires(state) {
      return state.expires_in
    },
    getRefreshToken(state) {
      return state.refresh_token
    },
    getRefreshReady(state) {
      return state.refresh_ready
    },
    getLenderLoanOfType(state) {
      return state.show_type_of_loans
    },

    getExplanationVideoClicked(state) {
      return state.explanationVideoFromhamburgerMenuClicked
    },

    getSubscription(state) {
      return state.user.plan
    },
  },
}