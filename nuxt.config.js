const settings = require("./settings.json");

module.exports = {
    mode: "universal",

    // * Headers of the page
    head: {
        title: "Kurozero",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width,initial-scale=1" },
            { hid: "author", name: "author", content: "KurozeroPB <root@kurozeropb.info>" },
            { hid: "description", name: "description", content: "Personal website that shows projects I enjoy/enjoyed working on" },
            { hid: "theme-color", name: "theme-color", content: "#3A8EE6" },
            { hid: "twitter-card", name: "twitter:card", content: "summary_large_image" },
            { hid: "twitter-site", name: "twitter:site", content: "@Kurozero_" },
            { hid: "twitter-title", name: "twitter:title", content: "Kurozero" },
            { hid: "twitter-description", name: "twitter:description", content: "Personal website that shows projects I enjoy/enjoyed working on" },
            { hid: "twitter-image", name: "twitter:image", content: "https://kurozeropb.info/avatar.png" },
            { hid: "twitter-creator", name: "twitter:creator", content: "@Kurozero_" },
            { hid: "og-title", property: "og:title", content: "Kurozero" },
            { hid: "og-url", property: "og:url", content: "https://kurozeropb.info" },
            { hid: "og-image", property: "og:image", content: "https://kurozeropb.info/avatar.png" },
            { hid: "og-type", property: "og:type", content: "website" },
            { hid: "og-site_name", property: "og:site_name", content: "kurozeropb.info" },
            { hid: "og-description", property: "og:description", content: "Personal website that shows projects I enjoy/enjoyed working on" },
            { hid: "og-locale", property: "og:locale", content: "en-US" },
            { hid: "application-name", property: "application-name", content: "Kurozero" },
            { hid: "fragment", property: "fragment", content: "!" },
            { hid: "apple-mobile-web-app-capable", property: "apple-mobile-web-app-capable", content: "yes" }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        script: [{ defer: true, src: "https://use.fontawesome.com/releases/v5.5.0/js/all.js", integrity: "sha384-GqVMZRt5Gn7tB9D9q7ONtcp4gtHIUEW/yG7h98J7IpE3kpi+srfFyyB/04OV6pG0", crossorigin: "anonymous", body: true }],
        noscript: [{ innerHTML: "This website requires JavaScript." }]
    },

    // * Customize the progress-bar color
    loading: { color: "#3A8EE6" },

    // * Global CSS
    css: [
        "element-ui/lib/theme-chalk/index.css",
        "assets/scss/iota.scss"
    ],

    // * Plugins to load before mounting the App
    plugins: [
        { src: "@plugins/element-ui" },
        { src: "@plugins/globals" },
        { src: "@plugins/vue-typer", ssr: false }
    ],

    // * Nuxt.js modules
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        "@nuxtjs/axios",
        "@nuxtjs/google-analytics"
    ],

    // * Axios module configuration
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    "google-analytics": {
        id: settings.analytics.id
    },

    // * Build configuration
    build: {

        // * You can extend webpack config here
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/u,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/u
                });
            }
        }
    },
    generate: {
        dir: "../kurozeropb_info"
    }
};
