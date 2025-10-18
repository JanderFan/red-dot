import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { RedDotTriePlugin } from 'red-dot-vue';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

createApp(App).use(ElementPlus).use(RedDotTriePlugin).mount('#app');
