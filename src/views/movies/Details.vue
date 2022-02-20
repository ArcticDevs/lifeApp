<template>
  <div>
    <b-breadcrumb class="breadcrumb-slash" :items="breadcrumbs" />
    <b-card class="subNameContainer bg_orange">
      <div class="row m-0">
        <div class="col-12 col-sm-8 col-md-9">
          <h2 class="subName">
            {{ title }}
          </h2>
          <p>
            {{ description }}
          </p>
        </div>
        <div
          class="
            col-12 col-sm-4 col-md-3
            mt-2 mt-lg-0
            pr-xl-4
            d-flex
            flex-wrap flex-lg-nowrap
            align-items-end
            justify-content-end
          "
        >
          <img
            src="@/assets/images/movies/density.png"
            alt=""
            class="topicDetails_icon"
          />
        </div>
      </div>
    </b-card>
    <div class="w-100 text-center mt-5">
      <router-link :to="$route.path + '/add'">
        <b-button variant="primary" class="addDetailsBtn">Add Details</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import {
  BBreadcrumb,
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormFile,
  BFormInput,
  BFormTextarea,
  BFormCheckbox,
  BForm,
  BButton,
  BTable,
} from "bootstrap-vue";
import { mounted } from "vue-echarts";
import axios from "axios";
export default {
  components: {
    BBreadcrumb,
    BCardCode,
    BCard,
    BRow,
    BCol,
    BFormFile,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormCheckbox,
    BForm,
    BButton,
    BTable,
  },
  data() {
    return {
      description: "",
      title: "",
      subjectId: this.$route.params.subject,
      levelId: this.$route.params.level,
      topicId: this.$route.params.topic,
      breadcrumbs: [
        {
          text: "Movies",
          to: { name: "movies-list" },
        },
        {
          text: "",
          to: { name: `movies-subject` },
        },
        {
          text: "",
          to: { name: `movies-level` },
        },
        {
          text: "",
          active: true,
        },
      ],
    };
  },
  created() {
    var postData = {
      level_id: this.levelId,
    };
    axios
      .post("admin/v1/movies/topics", postData)
      .then(({ data }) => {
        data.topics.forEach((element) => {
          if (element.id == this.topicId) {
            this.description = element.description;
            this.title = element.title;
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .post("/admin/v1/movies/get-subject", { subject_id: this.subjectId })
      .then(({ data }) => {
        this.breadcrumbs[1].text = data.subjects[0].name;
        data.subjects[0].levels.forEach((level) => {
          if (level.id == this.levelId) {
            this.breadcrumbs[2].text = level.level + '';
          }
        });
      })
      .catch((resp) => {
        console.error(resp);
      });

    axios
      .post("/admin/v1/movies/get-topic", { topic_id: this.topicId })
      .then(({ data }) => {
        this.breadcrumbs[3].text = data.topic[0].title;
      })
      .catch((resp) => {
        console.error(resp);
      });
  },
};
</script>

<style scoped lang="scss">
.subNameContainer {
  border-radius: 20px;
  position: relative;

  .subName {
    color: #000;
    font-weight: bold;
  }

  .topicDetails_icon {
    height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
}
.addDetailsBtn {
  border-radius: 29px;
  padding: 10px 30px;
  font-size: 1.2rem;
}
</style>
