<template>
    <el-container>
        <div class="grid" style="--cols-xl: 3; --cols-lg: 2; --cols-sm: 1;">
            <div v-for="(project) in projects" :key="project.id" class="card">
                <div class="card-header" :style="{ 'background-image': 'url(' + project.image.replace('/static', '') + ')' }" />
                <div class="card-body">
                    <h4>{{ project.title }}</h4>
                    <p>{{ project.short_desc }}</p>
                </div>
                <div class="card-footer">
                    <small><time class="time">{{ prettyDate(project.published) }}</time></small>
                    <el-button
                        :loading="loading"
                        type="text"
                        style="float: right;"
                        @click="showDialog(project.id)">
                        Read more
                    </el-button>
                </div>
            </div>
        </div>
        <el-dialog :title="dialogData.title" :visible.sync="dialogVisible">
            <el-card :body-style="{ padding: '0px' }" shadow="never" style="border: 0; border-radius: 0;">
                <el-row :gutter="5">
                    <el-col :span="4">
                        <img :src="dialogData.image ? dialogData.image.replace('/static', '') : ''" class="dialog-image">
                    </el-col>
                    <el-col :span="20" style="padding: 10px;">
                        <div class="bottom clearfix">
                            <p class="description">{{ dialogData.content }}</p>
                            <time class="time">{{ prettyDate(dialogData.meta ? dialogData.meta.published : '') }}</time>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-dialog>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            title: "Kurozero",
            dialogVisible: false,
            dialogData: {},
            loading: false
        };
    },
    asyncData({ app, query, error }) {
        return app.$axios
            .$get(`${app.$apiUrl}/blog?type=feed`)
            .then((data) => {
                if (data.statusCode === 200) return { projects: data.results };
                else error({ statusCode: data.statusCode, message: data.message });
            }).catch((e) => error(e));
    },
    methods: {
        prettyDate(date) {
            return new Date(date)
                .toString()
                .split(" ")
                .slice(0, 4)
                .join(" ")
                .replace(/( \d+)$/u, ",$1");
        },
        showDialog(id) {
            this.loading = true;
            this.$axios
                .$get(`${this.$apiUrl}/blog?type=post&id=${id}`)
                .then((data) => {
                    this.dialogData = data.results[0];
                    this.dialogVisible = true;
                    this.loading = false;
                }).catch(console.error);
        }
    }
};
</script>

<style lang="sass" scoped>
    small
        color: #9c9c99

    .el-container
        margin-left: auto
        margin-right: auto
        max-width: 45%
        display: block

    .card
        min-width: 250px
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
        border-radius: 8px
        margin-left: 10px
        margin-right: 10px

    .card-header
        height: 250px
        background-size: contain
        background-repeat: no-repeat
        background-position: center center
        border-radius: 8px 8px 0 0

    .card-body
        padding-left: 10px
        padding-right: 10px

    .card-footer
        line-height: 2.2;
        min-height: 3vh
        padding-left: 10px
        padding-right: 10px

    .el-row, .el-col
        margin-bottom: 20px
        &:last-child
            margin-bottom: 0

    .image
        width: 100%
        display: block
        height: auto
        background: #979797

    .dialog-image
        width: 100%
        display: block
        height: auto

    .title
        font-family: "Exo2-Bold"

    .bottom
        margin-top: 13px
        line-height: 12px

    .clearfix:before, .clearfix:after
        display: table
        content: ""

    .clearfix:after
        clear: both

    .description
        line-height: 1.1

    .time
        font-size: 13px
        color: #999

    .button
        padding: 0
        float: right
</style>
