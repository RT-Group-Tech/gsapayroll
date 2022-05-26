import index from "@/components/index";
import dashboard from "@/components/pages/dashboard";
import Login from "@/components/pages/auth/login_auth.vue";
import assignAgent from "@/components/pages/admin/assign_agent_page";

//creating
import agentCreatingPage from "@/components/pages/admin/create_agent_page";
import sitesCreatingPage from "@/components/pages/super_admin/agency_creating_page";
import activityCreatingPage from "@/components/pages/super_admin/activity_creating_page";
import foundBeneficiaires from "@/components/pages/super_admin/found_beneficiaires_page";
import adminCreatingPage from "@/components/pages/super_admin/admin_creating_page";
import adminViewPage from "@/components/pages/super_admin/admin_view_page";



const routes = [{
        path: '/',
        component: Login,
        name: 'login'
    },
    {
        path: '/home',
        component: index,
        name: 'home',
        beforeEnter: (to, from, next) => {
            let isAuthenticated = false;
            if (localStorage.getItem('accessToken')) {
                isAuthenticated = true;
            } else {
                isAuthenticated = false;
            }
            if (isAuthenticated) {
                next();
            } else {
                next({ name: 'login' });
            }
        },

        children: [{
                path: '',
                component: dashboard,
                name: 'dashboard'
            },
            {
                path: '/creation/agents',
                component: agentCreatingPage,
                name: 'agent_create'
            },
            {
                path: '/creation/sites',
                component: sitesCreatingPage,
                name: 'site_create'
            },
            {
                path: '/creation/activites',
                component: activityCreatingPage,
                name: 'activity_create'
            },
            {
                path: '/beneficiaires/founded/info',
                component: foundBeneficiaires,
                name: 'beneficiaire'
            },
            {
                path: '/create/admin',
                component: adminCreatingPage,
                name: 'admin_create'
            },
            {
                path: '/admin/view',
                component: adminViewPage,
                name: 'admin_view'
            },

            {
                path: '/admin/assigner/agent/:id/:status?',
                component: assignAgent,
                name: 'agent_assign'
            }
        ]
    },
];
export default routes;
