<template>
  <div>
    <b-breadcrumb class="breadcrumb-slash" :items="breadcrumbs" />
    <b-card class="subNameContainer">
      <h1 class="subName">
        {{ subjectName }}
      </h1>
      <img
        src="@/assets/images/missions/mission_icon.png"
        alt=""
        class="level_icon"
      />
    </b-card>
    <div class="row mx-0 mt-5">
      <div
        class="col-12 col-md-6 col-xl-4 mb-3"
        v-for="(level, levelIndex) in levels"
        :key="levelIndex"
      >
        <b-card class="level_card bg_orange">
          <div class="row h-100">
            <div class="level_card_content col-8 col-md-6 col-lg-8 pr-0">
              <h2>{{ level.level }}</h2>
              <p>
                {{ level.description }}
              </p>
              <router-link :to="'/movies/' + subjectId + '/' + level.id">
                <div class="StartBtn">Start</div>
              </router-link>
            </div>
            <div class="col-4 col-md-6 col-lg-4">
              <img
                src="@/assets/images/movies/level_icon.png"
                alt=""
                class="level_card_icon"
              />
            </div>
          </div>
        </b-card>
      </div>
      <div class="col-12 col-md-6 col-xl-4 mb-3">
        <b-card class="new_level_card" v-b-modal.add-level-modal>
          <div
            class="
              h-100
              d-flex
              flex-column
              justify-content-center
              align-items-center
            "
          >
            <img
              src="@/assets/images/missions/plus_icon.png"
              alt=""
              class="mission_icon_plus"
            />
            <h3 class="mt-2">Add a new level</h3>
          </div>
        </b-card>

        <!-- Add level modal -->
        <b-modal
          id="add-level-modal"
          centered
          hide-footer
          size="lg"
          title="Add level"
        >
          <div class="h-100 w-100 p-3">
            <!-- level name -->
            <label for="levelName">Level Name</label>
            <b-form-input
              id="levelName"
              v-model="levelName"
              placeholder="Level Name"
            />

            <!-- description -->
            <label for="description" class="mt-2">Description</label>
            <b-form-textarea
              id="description"
              v-model="levelDescription"
              placeholder="Description"
              rows="3"
            />

            <!-- total rewards -->
            <label for="rewards" class="mt-2">Total rewards</label>
            <b-form-input
              id="rewards"
              v-model="totalRewards"
              placeholder="Total rewards"
            />

            <!-- Total topic -->
            <label for="totalTopic" class="mt-2">Total topic</label>
            <b-form-input
              id="totalTopic"
              v-model="totalTopic"
              placeholder="Total topic"
            />

            <!-- add button -->
            <div class="text-center w-100 mt-3">
              <b-button
                variant="primary"
                class="addBtn"
                @click.prevent="addLevel()"
                >Add</b-button
              >
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import axios from "axios";
import {
  BBreadcrumb,
  BCard,
  BRow,
  BCol,
  BFormGroup,
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
      subjectId: this.$route.params.subject,
    
      breadcrumbs: [
        {
          text: "Movies",
          to: { name: "movies-list" },
        },
        {
          text: this.$route.params.subject,
          to: { name: `movies-subject` },
          active: true,
        },
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],

      levelName: "",
      levelDescription: "",
      totalRewards: "",
      totalTopic: "",
      levels: [],
      subjectName:"",
    };
  },
  created() {
    console.log(this.subjectId);
    axios
      .get("/admin/v1/movies/subjects")
      .then(({ data }) => {
        console.log(data.subjects);
        data.subjects.forEach((element) => {
          if (element.id == this.subjectId) {
              this.subjectName= element.name;
            this.levels = element.levels;
           
            console.log( this.levels);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addLevel() {
      this.levels.push({
        subject_id: this.subjectId,
        levelName: this.levelName,
        levelDescription: this.levelDescription,
        totalRewards: this.totalRewards,
        totalTopic: this.totalTopic,
      });
      var levelData = {
        subject_id: this.subjectId,
        level: this.levelName,
        description: this.levelDescription,
        total_rewards: this.totalRewards,
        total_question: this.totalTopic,
      };
      axios
        .post("/admin/v1/movies/create-level", levelData)
        .then(({ data }) => {
          console.log(data);
          this.$bvModal.hide("add-level-modal");
          this.levelName = "";
          this.levelDescription = "";
          this.totalRewards = "";
          this.totalTopic = "";
        })
        .catch(({ error }) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.subNameContainer {
  border-radius: 20px;
  padding: 10px 20px;
  position: relative;

  .subName {
    color: #ff9501;
    font-weight: bold;
  }

  .level_icon {
    position: absolute;
    right: 50px;
    top: -50px;
    height: 150px;
  }
}

.bg_orange {
  background: linear-gradient(180deg, #ff9900 0%, #ff6b00 100%);
  color: #fff;
}

.level_card {
  position: relative;
  border-radius: 20px;
  padding: 10px 15px;
  box-shadow: 0 2px 5px rgb(167, 166, 166) !important;
  height: 100%;

  .level_card_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.788);

    & > h2 {
      color: #fff;
      font-weight: bold;
    }

    .StartBtn {
      color: #ff9501;
      background: #fff;
      width: fit-content;
      padding: 10px 50px;
      border-radius: 20px;
      font-size: 1.2rem;
    }
  }

  .level_card_icon {
    position: absolute;
    right: -35px;
    top: -85px;
    height: 380px;
    max-height: 140%;
    max-width: 200px;
    object-fit: contain;
  }
}
.new_level_card {
  border-radius: 20px;
  box-shadow: 0 2px 5px rgb(167, 166, 166) !important;
  height: 100%;
  min-height: 300px;
  text-align: center;

  .mission_icon_plus {
    height: 70px;
  }

  h3 {
    color: #ff9501;
    font-weight: bold;
  }
}

.addBtn {
  border-radius: 20px;
  padding: 10px 50px;
}
</style>