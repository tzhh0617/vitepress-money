import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:uno.css'


const components = import.meta.glob(['./components/*/index.vue',], { eager: true });

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {

        app.use(ElementPlus)

        for (let key in components) {
            let [, name] = /[\/\\]([^\/\\]+)[\/\\]index\.vue/.exec(key);
            app.component(name, components[key].default);
        }
    }
}