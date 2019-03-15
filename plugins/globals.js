import Vue from "vue";

export default (_ctx, inject) => {
    Vue.mixin({
        data() {
          return {
            // $apiUrl: "https://api.kurozeropb.info/v1"
            $apiUrl: "http://api.example.com:8080/v1"
          };
        }
    });

    // inject("apiUrl", "https://api.kurozeropb.info/v1");
    inject("apiUrl", "http://api.example.com:8080/v1");
};
