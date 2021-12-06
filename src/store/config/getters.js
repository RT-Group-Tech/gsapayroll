const getters = {
    getAgents: state => state.agents,
    getActivities: state => state.activities,
    getSites: state => state.sites,
    getClients: state => state.clients,
    getSingleClient: state => state.singleClient,
    getAdmins: state => state.admins,
    geteActivities: state => state.eActivities,
    getcActivities: state => state.cActivities,
    getAccess: state => state.access,
    getUser: state => state.user
};

export default getters;