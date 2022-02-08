<template>
  <div>
    <b-breadcrumb class="breadcrumb-slash" :items="items" />
    <div class="m-2">
      <!-- List Top -->
      <div class="row">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3 h-100"
          v-for="(mission,i) in missions"
          :key="i"
        >
          <b-card class="mission_card text-center">
            <img
              src="@/assets/images/missions/mission_icon.png"
              alt=""
              class="mission_icon"
            />
            <h3 class="mt-2">{{ mission.name }}</h3>
          </b-card>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 h-100">
          <router-link to="/mission/add">
            <b-card class="mission_card text-center">
              <img
                src="@/assets/images/missions/plus_icon.png"
                alt=""
                class="mission_icon_plus"
              />
              <h3 class="mt-2">Add a mission</h3>
            </b-card>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BCardCode from "@core/components/b-card-code";
import { BBreadcrumb, BCard, BRow, BCol, BButton, BLink } from "bootstrap-vue";
import axios from "axios";
export default {
  components: {
    BBreadcrumb,
    // eslint-disable-next-line vue/no-unused-components
    BCardCode,
    BCard,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    BButton,
    BLink,
  },
  data() {
    return {
      items: [
        {
          text: "Missions",
          to: { name: "mission-list" },
        },
        {
          text: "List",
          active: true,
        },
      ],
      missions:[]
    };
  },
  created() {
    axios
      .get(
        "/admin/v1/missions/list"
      )
      .then((response) => {
        console.log(response);
        this.missions = response.data.missions
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.mission_card {
  border-radius: 20px;
  height: 200px;
  box-shadow: 0 2px 5px rgb(167, 166, 166) !important;

  .mission_icon {
    height: 110px;
    aspect-ratio: 1/1;
    margin: auto;
  }
  .mission_icon_plus {
    height: 50px;
    margin-top: 30px;
  }

  h3 {
    color: #ff9501;
  }
}
</style>