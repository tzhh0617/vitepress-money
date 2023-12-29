import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // register your custom global components
        // app.component('MyGlobalComponent' /* ... */)

        app.use(ElementPlus)
    }
}