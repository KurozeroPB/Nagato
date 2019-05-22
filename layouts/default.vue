<template>
    <el-container>
        <el-header style="height: 100px;">
            <router-link to="/">
                <vue-typer
                    :text="title"
                    :type-delay="120"
                    :pre-type-delay="250"
                    :erase-delay="120"
                    :pre-erase-delay="60000"
                    caret-animation="smooth"
                    erase-style="backspace"
                    class="header-title" />
            </router-link>
        </el-header>
        <el-main>
            <nuxt />
        </el-main>
        <el-footer>
            <div class="footer-center">
                <div class="footer-buttons">
                    <div>
                        <a
                            v-for="icon in icons"
                            :key="icon.class"
                            :href="icon.href"
                            target="_blank"
                            class="el-button el-button--default el-button--mini is-circle footer-button">
                            <i :class="icon.class" />
                        </a>
                        <el-button v-if="!loginData.token" class="footer-button extra" size="mini" circle icon="el-icon-more" @click="loginDialogVisible = true" />
                        <el-button v-else class="footer-button extra" size="mini" circle icon="el-icon-circle-close-outline" @click="logout()" />
                    </div>
                    <p class="footer-credits">
                        &copy; {{ new Date().getFullYear() }} — <strong>Kurozero</strong> | Made with
                        <a href="https://vuejs.org/" target="_blank">VueJS</a>,
                        <a href="https://element.eleme.io" target="_blank">ElementUI</a> and
                        <a href="https://nuxtjs.org/" target="_blank">NuxtJS</a>.
                    </p>
                </div>
            </div>
        </el-footer>

        <el-dialog title="Login" :visible.sync="loginDialogVisible" width="30%" center>
            <span>
                <el-input v-model="loginData.email" type="email" style="margin-bottom: 10px;" />
                <el-input v-model="loginData.password" type="password" autocomplete="off" />
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" plain @click="loginDialogVisible = false">Cancel</el-button>
                <el-button type="primary" plain @click="login()">Confirm</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            title: "Kurozero",
            icons: [
                { class: "fab fa-facebook", href: "https://www.facebook.com/pepijnvdbroek" },
                { class: "fab fa-twitter", href: "https://twitter.com/pvdbroek98" },
                { class: "fab fa-github", href: "https://github.com/kurozeropb" },
                { class: "fab fa-keybase", href: "https://keybase.io/kurozero" },
                { class: "fab fa-discord", href: "https://discord.gg/p895czC" },
                { class: "fab fa-google-play", href: "https://play.google.com/store/apps/dev?id=4732354838030747081" }
            ],
            loginDialogVisible: false,
            loginData: {
                email: "",
                password: "",
                token: null
            }
        };
    },
    mounted() {
        this.loginData.token = localStorage.getItem("token");
    },
    methods: {
        login() {
            const isValidEmail = this.validateEmail(this.loginData.email);
            if (!isValidEmail) {
                this.$notify.error({ title: "Error", message: "Invalid email address" });
                return null;
            }

            const passwd = this.validatePassword(this.loginData.password);
            if (!passwd.valid) {
                this.$notify.error({ title: "Error", message: passwd.message });
                return null;
            }

            this.$axios.post(`${this.$apiUrl}/blog?type=login`, {
                data: {
                    email: this.loginData.email,
                    password: this.loginData.password
                }
            }).then((response) => {
                if (response.data.success) {
                    this.loginData.token = response.data.token;
                    localStorage.setItem("token", response.data.token);
                    this.$notify.success({ title: "Success", message: "Login successful, welcome!" });
                    this.loginDialogVisible = false;
                } else {
                    this.$notify.error({ title: "Error", message: response.data.message });
                }
            }).catch((exception) => {
                this.$notify.error({ title: "Error", message: exception.toString() });
            });
        },
        logout() {
            this.$axios.post(`${this.$apiUrl}/blog?type=logout`, {
                data: {
                    token: this.loginData.token
                }
            }).then((response) => {
                if (response.data.success) {
                    this.loginData.token = null;
                    localStorage.removeItem("token");
                    this.$notify.success({ title: "Success", message: "Logout successful, goodbye 👋" });
                } else {
                    this.$notify.error({ title: "Error", message: response.data.message });
                }
            }).catch((exception) => {
                this.$notify.error({ title: "Error", message: exception.toString() });
            });
        },
        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u;
            return re.test(email);
        },
        validatePassword(passwd) {
            const re = /[@#$%^&*)(+=-]+/gu
            const containsInvalidChars = re.test(passwd);
            if (containsInvalidChars) {
                return { valid: false, message: "Password can only contain a-zA-Z, 0-9, !, . and _" };
            }

            if (passwd.length < 10 || passwd.length > 20) {
                return { valid: false, message: "Password needs to be greater than 10 and less than 20 characters long" };
            }

            return { valid: true, message: null };
        }
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

    @media only screen and (max-width: 1100px)
        .el-dialog
            width: 95%

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
        border-bottom: 1px solid #DAE4EB

    .header-title
        font-family: "Exo2-Bold"
        font-weight: bold
        font-size: 50px

    .el-header, .el-footer
        background-color: #FFF
        color: #333
        text-align: center

    .footer-credits
        font-size: 14px

    .footer-button
        height: 28px
        width: 28px
        &.extra
            margin-left: 6px

    .el-main
        background-color: #FFF
        color: #333
        overflow: hidden

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

    .el-row
        margin-left: -20px
        margin-right: -20px
</style>
