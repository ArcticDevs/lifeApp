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
    <div class="row mx-0 mt-5" :key="componentKey">
      <div
        class="col-12 col-md-6 col-xl-4 mb-3"
        v-for="(level, levelIndex) in levels"
        :key="levelIndex"
      >
        <b-card class="level_card bg_orange">
          <div class="actionBtns pl-1">
            <!-- edit button -->
            <span @click="setEditLevel(level)"
              ><i class="fas fa-edit editBtn cursor-pointer"></i>
            </span>

            <!-- delete button -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="cursor-pointer removeBtn ml-1"
              @click.prevent="removeLevel(level.id)"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="#f22229"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
              />
            </svg>
          </div>
          <div class="row h-100 mt-1">
            <div class="level_card_content col-8 col-md-6 col-lg-8 pr-0">
              <h2>{{ level.level }}</h2>
              <p>
                {{ level.local_data[0].description }}
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
          size="xl"
          :title="editLevel ? 'Edit Level' : 'Add Level'"
          @hide="modalClose"
        >
          <div class="h-100 w-100 p-3">
            <validation-observer ref="addLevelRules">
              <b-form novalidate class="needs-validation" id="addLevelForm">
                <div class="row">
                  <div class="col-12 col-lg-4">
                    <!-- total rewards -->
                    <label for="rewards" class="mt-2">Total rewards</label>
                    <validation-provider
                      #default="{ errors }"
                      name="Total rewards"
                      rules="required|integer"
                    >
                      <b-form-input
                        id="rewards"
                        v-model="totalRewards"
                        placeholder="Total rewards"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div class="col-12 col-lg-4">
                    <!-- Total topic -->
                    <label for="totalTopic" class="mt-2 d-block"
                      >Total topic</label
                    >
                    <validation-provider
                      #default="{ errors }"
                      name="Total topic"
                      rules="required|integer"
                    >
                      <b-form-input
                        id="totalTopic"
                        v-model="totalTopic"
                        placeholder="Total topic"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div class="col-12 col-lg-4">
                    <!-- level name -->
                    <label for="levelName" class="mt-2 d-block"
                      >Level Name</label
                    >
                    <validation-provider
                      #default="{ errors }"
                      name="Level Name"
                      rules="required|integer"
                    >
                      <b-form-input
                        id="levelName"
                        v-model="levelName"
                        placeholder="Level Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-lg-4">
                    <!-- level name -->
                    <!-- <label for="levelNameEnglish" class="mt-2 d-block"
                      >Level Name - <b>English</b></label
                    >
                    <validation-provider
                      #default="{ errors }"
                      name="Level Name"
                      rules="required"
                    >
                      <b-form-input
                        id="levelNameEnglish"
                        v-model="levelNameEnglish"
                        placeholder="Level Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider> -->

                    <!-- description -->
                    <label for="descriptionEnglish" class="mt-2 d-block"
                      >Description - <b>English</b></label
                    >
                    <validation-provider
                      #default="{ errors }"
                      name="Description"
                      rules="required"
                    >
                      <b-form-textarea
                        id="descriptionEnglish"
                        v-model="levelDescriptionEnglish"
                        placeholder="Description"
                        rows="3"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div class="col-12 col-lg-4">
                    <!-- level name -->
                    <!-- <label for="levelNameHindi" class="mt-2 d-block"
                      >Level Name - <b>Hindi</b></label
                    >
                    <validation-provider
                      #default="{ errors }"
                      name="Level Name"
                      rules="required"
                    >
                      <b-form-input
                        id="levelNameHindi"
                        v-model="levelNameHindi"
                        placeholder="Level Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider> -->

                    <!-- description -->
                    <label for="descriptionHindi" class="mt-2 d-block"
                      >Description - <b>Hindi</b></label
                    >
                    <!-- <validation-provider
                      #default="{ errors }"
                      name="Description"
                      rules="required"
                    > -->
                    <b-form-textarea
                      id="descriptionHindi"
                      v-model="levelDescriptionHindi"
                      placeholder="Description"
                      rows="3"
                    />
                    <!-- <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider> -->
                  </div>
                  <div class="col-12 col-lg-4">
                    <!-- level name -->
                    <!-- <label for="levelNameMarathi" class="mt-2 d-block"
                      >Level Name - <b>Marathi</b></label
                    >
                    <validation-provider
                      #default="{ errors }"
                      name="Level Name"
                      rules="required"
                    >
                      <b-form-input
                        id="levelNameMarathi"
                        v-model="levelNameMarathi"
                        placeholder="Level Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider> -->

                    <!-- description -->
                    <label for="descriptionMarathi" class="mt-2 d-block"
                      >Description - <b>Marathi</b></label
                    >
                    <!-- <validation-provider
                      #default="{ errors }"
                      name="Description"
                      rules="required"
                    > -->
                    <b-form-textarea
                      id="descriptionMarathi"
                      v-model="levelDescriptionMarathi"
                      placeholder="Description"
                      rows="3"
                    />
                    <!-- <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider> -->
                  </div>
                </div>

                <!-- add button -->
                <div class="text-center w-100 mt-3">
                  <b-button
                    v-if="!editLevel"
                    variant="primary"
                    class="addBtn"
                    @click.prevent="addLevel()"
                    >Add</b-button
                  >
                  <b-button
                    v-else
                    variant="primary"
                    class="addBtn"
                    @click.prevent="updateLevel()"
                    >Update</b-button
                  >
                </div>
              </b-form>
            </validation-observer>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import axios from "axios";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, integer } from "@validations";

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
    ValidationProvider,
    ValidationObserver,
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
          text: "",
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
      // levelNameEnglish: "",
      levelDescriptionEnglish: "",
      // levelNameHindi: "",
      levelDescriptionHindi: "",
      // levelNameMarathi: "",
      levelDescriptionMarathi: "",
      totalRewards: "",
      totalTopic: "",
      levels: [],
      subjectName: "",
      componentKey: 0,
      editLevel: false,
      editLevelId: "",
    };
  },
  created() {
    this.getSubject();
  },
  methods: {
    getSubject() {
      axios
        .post("/admin/v1/movies/get-subject", { subject_id: this.subjectId })
        .then(({ data }) => {
          this.breadcrumbs[1].text = data.subjects[0].locale_data[0].title;
          this.subjectName = data.subjects[0].locale_data[0].title;
          this.levels = data.subjects[0].levels;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modalClose() {
      this.editLevel = false;
      this.editLevelId = "";
      this.levelName = "";
      this.levelDescriptionEnglish = "";
      this.levelDescriptionHindi = "";
      this.levelDescriptionMarathi = "";
      this.totalRewards = "";
      this.totalTopic = "";
    },
    addLevel() {
      this.$refs.addLevelRules.validate().then((success) => {
        if (success) {
          var levelData = {
            subject_id: this.subjectId,
            level: this.levelName,
            levels: [
              this.levelDescriptionEnglish && {
                description: this.levelDescriptionEnglish,
                locale: "En",
              },
              this.levelDescriptionHindi && {
                description: this.levelDescriptionHindi,
                locale: "Hi",
              },
              this.levelDescriptionMarathi && {
                description: this.levelDescriptionMarathi,
                locale: "Mr",
              },
            ],
            total_rewards: this.totalRewards,
            total_question: this.totalTopic,
          };
          axios
            .post("/admin/v1/movies/create-levels", levelData)
            .then(({ data }) => {
              this.getSubject();
              this.$bvModal.hide("add-level-modal");
              this.levelName = "";
              this.levelDescriptionEnglish = "";
              this.levelDescriptionHindi = "";
              this.levelDescriptionMarathi = "";
              this.totalRewards = "";
              this.totalTopic = "";
              this.componentKey += 1;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    setEditLevel(level) {
      this.levelName = level.level;
      this.levelDescriptionEnglish = (level.local_data[0] && level.local_data[0].description) || "";
      this.levelDescriptionHindi = (level.local_data[1] && level.local_data[1].description) || "";
      this.levelDescriptionMarathi = (level.local_data[2] && level.local_data[2].description) || "";
      this.totalRewards = level.total_rewards;
      this.totalTopic = level.total_question;
      this.editLevel = true;
      this.editLevelId = level.id;
      this.$bvModal.show("add-level-modal");
    },
    updateLevel() {
      let updateData = {
        level: this.levelName,
        levels: [
          { description: this.levelDescriptionEnglish, locale: "En" },
          { description: this.levelDescriptionHindi, locale: "Hi" },
          { description: this.levelDescriptionMarathi, locale: "Mr" },
        ],
        total_rewards: this.totalRewards,
        total_question: this.totalTopic,
        level_id: this.editLevelId,
      };
      axios
        .post(`/admin/v1/movies/update-levels?_method=PUT`, updateData)
        .then(({ data }) => {
          this.$bvModal.hide("add-level-modal");
          this.editLevel = false;
          this.editLevelId = "";
          this.levelName = "";
          this.levelDescriptionEnglish = "";
          this.levelDescriptionHindi = "";
          this.levelDescriptionMarathi = "";
          this.totalRewards = "";
          this.totalTopic = "";
          this.getSubject();
        })
        .catch((resp) => {
          console.error(resp);
          this.$swal(
            "Error!",
            "Some error occurred. Please try again",
            "error"
          ).then(() => {
            this.$bvModal.hide("add-level-modal");
            this.editLevel = false;
            this.editLevelId = "";
            this.levelName = "";
            this.levelDescriptionEnglish = "";
            this.levelDescriptionHindi = "";
            this.levelDescriptionMarathi = "";
            this.totalRewards = "";
            this.totalTopic = "";
          });
        });
    },
    removeLevel(levelId) {
      let self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          customClass: {
            confirmButton: "mr-2",
          },
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .get(`/admin/v1/movies/level/delete/${levelId}`)
              .then(({ data }) => {
                self
                  .$swal("Deleted!", "Level has been deleted.", "success")
                  .then(() => {
                    self.getSubject();
                  });
              })
              .catch((resp) => {
                console.error(resp);
                self.$swal(
                  "Error!",
                  "Some error occurred. Please try again",
                  "error"
                );
              });
          }
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
  min-height: 200px;

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
    height: 230px;
    max-width: 200px;
    object-fit: contain;
  }

  .actionBtns {
    position: absolute;
    top: 5px;
    left: 10px;
    display: flex;
    align-items: center;
  }

  .editBtn {
    font-size: 19px;
    color: #ee2d2d;
  }
}
.new_level_card {
  border-radius: 20px;
  box-shadow: 0 2px 5px rgb(167, 166, 166) !important;
  height: 100%;
  min-height: 200px;
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