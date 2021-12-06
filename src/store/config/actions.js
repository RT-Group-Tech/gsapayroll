import axios from "axios";
import { scroller } from "vue-scrollto/src/scrollTo";

const actions = {
    viewAgents({ commit, state }) {
        //let adminId = localStorage.getItem("admin_id");
        let formData = new FormData();
        formData.append("admin_id", "1");
        try {
            axios
                .post(`${state.baseURL}/operations/agents/all`, formData)
                .then((result) => {
                    let content = result.data.agents;
                    commit("setAgents", content);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    },

    reportActivities({ commit, state }, key) {
        //let adminId = localStorage.getItem("admin_id");
        let formData = new FormData();
        formData.append("admin_id", "1");
        try {
            switch (key) {
                case 'enattente':
                    axios
                        .post(`${state.baseURL}/operations/activites/reporting/enattente`, formData)
                        .then((result) => {

                            let data = result.data.reponse;
                            commit("seteActivities", data);
                        })
                        .catch((err) => console.log(err));
                    break;
                case 'cloture':
                    axios
                        .post(`${state.baseURL}/operations/activites/reporting/cloturee`, formData)
                        .then((result) => {
                            let data = result.data.reponse;
                            commit("setcActivities", data);
                        })
                        .catch((err) => console.log(err));
                    break;
                default:
                    axios
                        .post(`${state.baseURL}/operations/activites/reporting`, formData)
                        .then((result) => {

                            let data = result.data.reponse;
                            commit("setActivities", data);
                        })
                        .catch((err) => console.log(err));
                    break;

            }
        } catch (err) {
            console.log(err);
        }
    },

    viewSites({ commit, state }) {
        //let adminId = localStorage.getItem("admin_id");
        let formData = new FormData();
        formData.append("admin_id", "1");
        try {
            axios
                .post(`${state.baseURL}/operations/sites/all`, formData)
                .then((result) => {
                    let data = result.data.sites;
                    commit("setSites", data);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    },

    viewClientsReport({ commit, state }, searchTerm) {
        let adminId = localStorage.getItem("admin_id");
        let formData = new FormData();
        formData.append("admin_id", adminId);
        formData.append("search_term", searchTerm);
        try {
            axios
                .post(`${state.baseURL}/operations/activites/beneficiaires/reporting`, formData)
                .then((result) => {
                    let data = result.data.reponse;
                    commit("setClients", data);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    },

    viewFoundClient({ commit, state }, id) {
        let formData = new FormData();
        formData.append("admin_id", "1"),
            formData.append("beneficiaire_id", id),
            axios
            .post(`${state.baseURL}/operations/beneficiaires/view`, formData)
            .then((result) => {
                commit('setSingleClient', result.data.beneficiaire);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    viewAdmins({ commit, state }) {
        let formData = new FormData();
        formData.append("admin_id", "1"),
            axios
            .post(`${state.baseURL}/operations/admin/all`, formData)
            .then((result) => {
                commit('setAdmins', result.data.admins);
                console.log(result.data.admins);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    viewAccess({ commit, state }) {
        let formData = new FormData();
        formData.append("admin_id", "1"),
            axios
            .post(`${state.baseURL}/operations/access`, formData)
            .then((result) => {
                commit('setAccess', result.data.access);

            })
            .catch((err) => {
                console.log(err);
            });
    },

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
    },

    viewLogUser({ commit }) {
        let user = localStorage.getItem('user');
        let data = JSON.parse(user);
        commit('setUser', data);
    },


    scrollToTop() {
        const scrollTo = scroller();
        scrollTo("#top");
    },



};

export default actions;