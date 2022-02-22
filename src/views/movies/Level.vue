<template>
  <div>
    <b-breadcrumb class="breadcrumb-slash" :items="breadcrumbs" />
    <b-card class="subNameContainer bg_orange" v-if="topics">
      <div class="row m-0">
        <div class="col-8 col-md-6">
          <h2 class="subName">
            {{ levelName }}
          </h2>
          <p>
            {{ levelDescription }}
          </p>
        </div>
        <div
          class="
            col-12 col-md-6 col-lg-6
            mt-2 mt-lg-0
            pr-xl-4
            d-flex
            flex-wrap flex-lg-nowrap
            align-items-end
            justify-content-lg-end
          "
        >
          <span class="ml-1 ml-lg-0"
            ><img src="@/assets/images/movies/svg/Star.svg" class="mr-1" />Total
            Reward : <span> {{ totalRewards }} Coins</span></span
          >
          <span class="ml-lg-2 ml-1 mt-1 mt-lg-0"
            ><img
              src="@/assets/images/movies/svg/Chart.svg"
              class="mr-1"
            />Total Concepts : <span>{{ totalQuestions }}</span></span
          >
        </div>
        <img
          src="@/assets/images/movies/level_icon.png"
          alt=""
          class="level_icon"
        />
      </div>
    </b-card>
    <div class="row mx-0 mt-5">
      <div
        class="col-12 col-md-4 col-xl-3 mb-3"
        v-for="(topic, topicIndex) in topics"
        :key="topicIndex"
      >
        <router-link :to="$route.path + '/' + topic.id">
          <b-card class="level_card">
            <div class="level_card_content pr-0">
              <h2>{{ topic.title }}</h2>
              <div class="descriptionContainer">
                <p>
                  {{ topic.description }}
                </p>
              </div>
            </div>

            <img
              :src="'https://media.gappubobo.com/'+topic.media.url"
              :alt="topic.media.name"
              class="level_card_icon"
            />
          </b-card>
        </router-link>
      </div>
      <div class="col-12 col-md-4 col-xl-3 mb-3">
        <b-card class="new_level_card" v-b-modal.add-topic-modal>
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
            <h3 class="mt-2">Add a new topic</h3>
          </div>
        </b-card>

        <!-- Add topic modal -->
        <b-modal
          id="add-topic-modal"
          centered
          hide-footer
          size="lg"
          title="Add topic"
        >
          <div class="h-100 w-100 p-3">
            <!-- topic name -->
            <label for="topicName">Topic Name</label>
            <b-form-input
              id="topicName"
              v-model="topicForm.topicName"
              placeholder="Topic Name"
            />

            <!-- description -->
            <label for="description" class="mt-2">Description</label>
            <b-form-textarea
              id="description"
              v-model="topicForm.topicDescription"
              placeholder="Description"
              rows="3"
            />

            <!-- Topic Image -->
            <label class="mt-3">Topic Image</label>
            <div class="fileUploadContainer mb-1 mr-2">
              <div class="text-center">
                <img
                  src="@/assets/images/svg/file-upload.svg"
                  alt="file upload"
                />
                <span class="d-block">Click to upload </span>
              </div>
              <b-form-file
                accept="image/*"
                @change="onImageSelected($event)"
                id="topicImg"
              ></b-form-file>
              <img src="" alt="" id="previewImg" class="previewImg" />
              <p
                id="previewImgName"
                class="m-0 previewImgName"
                :key="imageNameKey"
              >
                {{ topicForm.topicImg.name }}
              </p>
              <!--          Remove Svg Icon-->
              <svg
                v-if="topicForm.topicImg.img != null"
                @click="removeImage()"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="ml-2 cursor-pointer removeImg"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="#EC4899"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
                />
              </svg>
            </div>

            <!-- add button -->
            <div class="text-center w-100 mt-3">
              <b-button
                variant="primary"
                class="addBtn"
                @click.prevent="addTopic"
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
      levelId: this.$route.params.level,
      subjectId: this.$route.params.subject,
      levelName: "",
      levelDescription: "",
      totalRewards: 0,
      totalQuestions: 0,
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
          active: true,
        },
      ],

      topicForm: {
        topicName: "",
        topicDescription: "",
        topicImg: { img: null, name: "" },
      },
      topics: [],
      imageNameKey: 0,
    };
  },
  created() {
    console.log(this.subjectId);
    axios
      .post("/admin/v1/movies/get-subject", { subject_id: this.subjectId })
      .then(({ data }) => {
        console.log(data);
        this.breadcrumbs[1].text = data.subjects[0].name;
        data.subjects[0].levels.forEach((level) => {
          if (level.id == this.levelId) {
            this.breadcrumbs[2].text = level.level + '';
            this.levelName = level.level;
            this.levelDescription = level.description;
            this.totalRewards = level.total_rewards;
            this.totalQuestions = level.total_question;
          }
        });
      })
      .catch((resp) => {
        console.error(resp);
      });

    this.getTopics();
  },

  methods: {
    getTopics() {
      axios
        .post("admin/v1/movies/topics", { level_id: this.levelId })
        .then(({ data }) => {
          this.topics = data.topics;
          console.log(this.topics);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onImageSelected(e) {
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.onload = function (f) {
          document.getElementById("previewImg").src = reader.result;
          document.getElementById("previewImg").style.display = "block";
          self.topicForm.topicImg.img = e.target.files[0];
        };
        reader.readAsDataURL(e.target.files[0]);
        // self.topicForm.topicImg.img = e.target.files[0];
        self.topicForm.topicImg.name = name;
        self.imageNameKey++;
      }
    },
    removeImage() {
      this.topicForm.topicImg = { img: null, name: "" };
      document.getElementById("previewImg").src = "";
      document.getElementById("previewImg").style.display = "none";
      self.imageNameKey++;
    },
    addTopic() {
      var topicData = new FormData();
      topicData.append("level_id", this.levelId);
      topicData.append("title", this.topicForm.topicName);
      topicData.append("description", this.topicForm.topicDescription);
      topicData.append("flag", 0);
      topicData.append("image", this.topicForm.topicImg.img);

      axios
        .post("admin/v1/movies/create-topic", topicData)
        .then(({ data }) => {

          this.getTopics();

          console.log(data);
          this.$bvModal.hide("add-topic-modal");

          this.topicForm.topicName = "";
          this.topicForm.topicDescription = "";
          this.topicForm.topicImg = "";
        })
        .catch((error) => {
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
  min-height:120px;

  .subName {
    color: #fff;
    font-weight: bold;
  }

  .level_icon {
    position: absolute;
    right: 5px;
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
  box-shadow: 0 2px 5px rgb(167, 166, 166) !important;
  height: 100%;
  min-height: 200px;

  .level_card_content {
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #000;

    & > h2 {
      color: #000;
      font-weight: bold;
      z-index: 2;
    }

    .descriptionContainer {
      margin-top: 140px;
    }
  }

  .level_card_icon {
    position: absolute;
    right: 0;
    top: 50px;
    height: 380px;
    max-height: 35%;
    width: 200px;
    max-width: 70%;
    object-fit: contain;
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

.fileUploadContainer {
  background: #fff;
  box-shadow: 0px 2px 5px #33333326;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 5px 10px rgb(214, 213, 213);
    color: #747474;
  }

  .b-form-file {
    position: absolute;
    height: 100%;
    width: 100%;
    font-size: 50rem;
    opacity: 0;
  }
  .previewImgName {
    color: rgb(76, 212, 48);
  }
  #previewImg {
    height: 150px;
    max-width: 100%;
    display: none;
  }
  .btn {
    z-index: 100;
  }
}
.removeImg {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
