import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PcElement from 'pc-element';
import 'pc-element/dist/index.css';

createApp(App).use(PcElement).mount('#app');
