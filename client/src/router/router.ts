import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Lists from "../components/Lists.vue";
import Messages from "../components/Messages.vue";
import MemberList from "../components/members/MemberList.vue";
import MemberDetail from "../components/members/MemberDetail.vue";
import { accountService } from "../services/account.service";
import { first, map } from "rxjs/operators";
import { useToast } from "vue-toastification";

const authguard =  (to: any, from: any, next: any) => {
    accountService.currentUser$.pipe(
        map(user => {
            if (user) next();
            else next('/login')
        })
    )
}

// Routes
const routes = [
    { 
        path: '/',
        component: Home,
    },
    { path: '/login', component: Login },
    { path: '/members', component: MemberList },
    { path: '/members/:id', component: MemberDetail },
    { path: '/lists', component: Lists },
    { path: '/messages', component: Messages },
    { path: '/**', component: Home },

]

// History implementation used by the router
const history = createWebHistory();

// Vue router
const router = createRouter({
    history,
    routes
})

/**
 * Authenticate route guard
 */
router.beforeEach((to, from, next) => {
    const routesToGuard = [
        '/members',
        '/members/:id',
        '/lists',
        '/messages'
    ];

    if (!routesToGuard.includes(to.path)) {
        next();
    } else {

        let user;
        accountService.currentUser$.pipe(first()).subscribe(x => {
            user = x;
        });

        if (user) {
            next();
        } else {
            useToast().error("Not Authenticated");
            next('/login')
        }
    }
    
})

export default router;