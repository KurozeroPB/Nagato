<template>
    <el-container>
        <el-header style="height: 100px;">
            <h1>
                <router-link to="/">
                    <vue-typer
                        :text="title"
                        :type-delay="120"
                        :pre-type-delay="250"
                        :erase-delay="120"
                        :pre-erase-delay="60000" 
                        caret-animation="smooth"
                        erase-style="backspace"
                        class="header-title"/>
                </router-link>
            </h1>
        </el-header>
        <el-main>
            <nuxt/>
        </el-main>
        <el-footer>
            <div class="footer-center">
                <div class="footer-buttons">
                    <a v-for="icon in icons" :key="icon.class" :href="icon.href" target="_blank" class="el-button el-button--default el-button--mini is-circle footer-button"><i :class="icon.class"/></a>
                    <p class="footer-credits">
                        &copy; {{ new Date().getFullYear() }} — <strong>Kurozero</strong> | Made with <a href="https://vuejs.org/" target="_blank">VueJS</a>, <a href="https://element.eleme.io" target="_blank">ElementUI</a> and <a href="https://nuxtjs.org/" target="_blank">NuxtJS</a>.
                    </p>
                </div>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            title: 'Kurozero',
            icons: [
                { class: 'fab fa-facebook', href: 'https://www.facebook.com/pepijnvdbroek' },
                { class: 'fab fa-twitter', href: 'https://twitter.com/kurozero_' },
                { class: 'fab fa-github', href: 'https://github.com/kurozeropb' },
                { class: 'fab fa-keybase', href: 'https://keybase.io/kurozero' },
                { class: 'fab fa-discord', href: 'https://discord.gg/p895czC' },
                { class: 'fab fa-google-play', href: 'https://play.google.com/store/apps/dev?id=4732354838030747081' }
            ]
        };
    }
};
</script>

<style lang="sass">
    @font-face
        font-family: "Exo2-Bold"
        src: url(../assets/fonts/exo/Exo2-Bold.otf)

    @font-face
        font-family: "Exo2-Regular"
        src: url(../assets/fonts/exo/Exo2-Regular.otf)

    @font-face
        font-family: "Exo2-SemiBold"
        src: url(../assets/fonts/exo/Exo2-SemiBold.otf)

    html
        font-family: "Exo2-Regular"

    body
        margin: 0
        background-color: #FFF

    .el-header
        margin-left: auto
        margin-right: auto
        height: 100%
        width: 80%
        position: sticky
        top: 0
        z-index: 1000
        border-bottom: 1px solid #DAE4EB;

    .header-title
        font-family: "Exo2-Bold"
        font-size: 50px

    .el-header, .el-footer
        background-color: #FFF
        color: #333
        text-align: center

    .footer-credits
        font-size: 14px

    .el-main
        background-color: #FFF
        color: #333
    
    body > .el-container
        margin-bottom: 40px
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside
        line-height: 260px
    
    .el-container:nth-child(7) .el-aside
        line-height: 320px

    .router-button
        text-decoration: none

    .el-dialog__title
        font-family: "Exo2-Bold"
</style>
