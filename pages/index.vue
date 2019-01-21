<template>
    <el-container>
        <el-row :gutter="40">
            <el-col v-for="(project) in projects" :key="project.id" :span="8">
                <div class="grid-content">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="project.image.replace('/static', '')" class="image">
                        <!-- <div class="image" style="text-align: center;"><div style="width: 316.333px; height: 316.333px;">image</div></div> -->
                        <div class="card-footer" style="padding: 14px;">
                            <span class="title">{{ project.title }}</span>
                            <div class="bottom clearfix">
                                <p class="short-desc">{{ project.short_desc }}</p>
                                <time class="time">{{ prettyDate(project.published) }}</time>
                                <el-button
                                    :loading="loading"
                                    type="text"
                                    style="float: right;"
                                    @click="showDialog(project.id)">
                                    Read more
                                </el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
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
      .$get("https://api.kurozeropb.info/v1/projects?project=blog&type=feed")
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
        .$get(`https://api.kurozeropb.info/v1/projects?project=blog&type=post&post=${id}`)
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
    .el-container
        margin-left: auto
        margin-right: auto
        max-width: 45%

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

    .short-desc
        line-height: 1.1
        font-size: 12px

    .time
        font-size: 13px
        color: #999

    .button
        padding: 0
        float: right
</style>
