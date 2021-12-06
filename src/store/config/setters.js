const mutations = {
    setAgents: (state, data) => state.agents = data,
    setActivities: (state, data) => state.activities = data,
    setSites: (state, data) => state.sites = data,
    setClients: (state, data) => state.clients = data,
    setSingleClient: (state, data) => state.singleClient = data,
    setAdmins: (state, data) => state.admins = data,
    seteActivities: (state, data) => state.eActivities = data,
    setcActivities: (state, data) => state.cActivities = data,
    setAccess: (state, data) => state.access = data,
    setUser: (state, data) => state.user = data
};
export default mutations;