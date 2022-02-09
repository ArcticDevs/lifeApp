<template>
  <div v-if="mission">
    <b-breadcrumb class="breadcrumb-slash" :items="breadcrumbs" />
    <b-card class="subNameContainer bg_orange">
      <div class="row m-0">
        <div class="col-12 col-sm-8 col-md-9">
          <h2 class="subName">
            {{ mission.name[0].toUpperCase() + mission.name.slice(1) }}
          </h2>
          <!-- <p>
            {{ topicDescription }}
          </p> -->
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
            src="@/assets/images/missions/mission_icon.png"
            alt=""
            class="topicDetails_icon"
          />
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

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
      missionId: this.$route.params.missionId,
      mission: '',

      topicDescription:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the .",

      breadcrumbs: [
        {
          text: "Missions",
          to: { name: "mission-list" },
        },
        {
          text: "List",
          to: { name: "mission-list" },
        },
        {
          text: "",
          active: true,
        },
      ],
    };
  },
  created() {
    axios
      .get("/admin/v1/missions/list")
      .then((response) => {
        console.log(response);
        response.data.missions.forEach((mission) => {
          if (mission.id == this.missionId) {
            this.mission = mission;
            this.breadcrumbs[2].text=mission.name;
          }
        });
        // console.log(this.mission);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped lang="scss">
.subNameContainer {
  border-radius: 20px;
  position: relative;
  height:100px;

  .subName {
    color: #000;
    font-weight: bold;
  }

  .topicDetails_icon {
    height: 150px;
    position: absolute;
    top: -70px;

  }
}
.addDetailsBtn {
  border-radius: 29px;
  padding: 10px 30px;
  font-size: 1.2rem;
}
</style>