var domain="http://127.0.0.1/rd-payroll";
if(location.href.includes(".com"))
{
    domain="http://gsa-central-server.rtgroup-rdc.commm";
}

const states = {
    baseURL: domain,
    agents: [],
    activities: [],
    eActivities: [],
    cActivities: [],
    sites: [],
    clients: [],
    singleClient: {},
    admins: [],
    access: [],
    user: {}
};

export default states;
