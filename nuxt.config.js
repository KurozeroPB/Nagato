module.exports = {
    mode: "universal",

    // * Headers of the page
    head: {
        title: "Kurozero",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "Personal website that shows projects I enjoy/enjoyed working on" }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        script: [{ defer: true, src: "https://use.fontawesome.com/releases/v5.5.0/js/all.js", integrity: "sha384-GqVMZRt5Gn7tB9D9q7ONtcp4gtHIUEW/yG7h98J7IpE3kpi+srfFyyB/04OV6pG0", crossorigin: "anonymous", body: true }],
        noscript: [{ innerHTML: "This website requires JavaScript." }]
    },

    // * Customize the progress-bar color
    loading: { color: "#3A8EE6" },

    // * Global CSS
    css: ["element-ui/lib/theme-chalk/index.css"],

    // * Plugins to load before mounting the App
    plugins: [
        { src: "@/plugins/element-ui" },
        { src: "@/plugins/vue-typer", ssr: false }
    ],

    // * Nuxt.js modules
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        "@nuxtjs/axios"
    ],

    // * Axios module configuration
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
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
