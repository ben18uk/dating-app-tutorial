import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import router from "./router/router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";


const app = createApp(App);

app.config.globalProperties.$filters = {
    capitalise(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}

app.use(Toast, {
    position: POSITION.BOTTOM_RIGHT
});

app.use(router);

app.mount('#app');
