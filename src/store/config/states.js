var domain="http://127.0.0.1/rd-payroll";
if(location.href.includes(".com"))
{
    if(location.protocol!=="https://")
    {
        location.protocol="https://";
    }
    domain="https://gsa-central-server.rtgroup-rdc.com";
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
