import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import { RedDotTriePlugin } from './plugin/red-dot';
import './style.css';

createApp(App).use(ElementPlus).use(RedDotTriePlugin).mount('#app');
