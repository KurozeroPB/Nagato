import Element from "element-ui/lib/element-ui.common";
import Vue from "vue";
import locale from "element-ui/lib/locale/lang/en";

export default () => {
    Vue.use(Element, { locale });
};
