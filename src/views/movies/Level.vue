<template>
  <div>
    <b-breadcrumb class="breadcrumb-slash" :items="breadcrumbs" />
    <b-card class="subNameContainer bg_orange pr-5" v-if="topics">
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
          <span class="ml-0 mr-1 ml-lg-0"
            ><img src="@/assets/images/movies/svg/Star.svg" class="mr-1" />Total
            Reward : <span> {{ totalRewards }} Coins</span></span
          >
          <span class="ml-lg-2 ml-0 mt-1 mt-lg-0"
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
        <b-card class="level_card">
          <div class="actionBtns">
            <!-- edit button -->
            <span @click="setEditTopic(topic)"
              ><i class="fas fa-edit editBtn cursor-pointer"></i>
            </span>

            <!-- delete button -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="cursor-pointer removeBtn ml-1"
              @click.prevent="removeTopic(topic.id)"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="#f22229"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
              />
            </svg>
          </div>
          <router-link :to="$route.path + '/' + topic.id">
            <div class="level_card_content pr-0 mt-1">
              <h2>{{ topic.local_data[0].title }}</h2>
              <div class="descriptionContainer">
                <p>
                  {{ topic.local_data[0].description }}
                </p>
              </div>
            </div>

            <img
              :src="'https://media.gappubobo.com/' + topic.media.url"
              :alt="topic.media.name"
              class="level_card_icon"
            />
          </router-link>
        </b-card>
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
          size="xl"
          title="Add topic"
          @hide="modalClose"
        >
          <div class="h-100 w-100 p-3">
            <validation-observer ref="addTopicRules">
              <b-form novalidate class="needs-validation" id="addTopicForm">
                <div class="row">
                  <div class="col-12 col-lg-4">
                    <!-- topic name -->
                    <label for="topicNameEnglish"
                      >Topic Name - <b>English</b></label
                    >
                    <validation-provider
                      #default="{ errors }"
                      name="Topic name"
                      rules="required"
                    >
                      <b-form-input
                        id="topicNameEnglish"
                        v-model="topicForm.topicNameEnglish"
                        placeholder="Topic Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>

                    <!-- description -->
                    <label for="descriptionEnglish" class="mt-2"
                      >Description - <b>English</b></label
                    >
                    <validation-provider
                      #default="{ errors }"
                      name="Topic description"
                      rules="required"
                    >
                      <b-form-textarea
                        id="descriptionEnglish"
                        v-model="topicForm.topicDescriptionEnglish"
                        placeholder="Description"
                        rows="3"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div class="col-12 col-lg-4">
                    <!-- topic name -->
                    <label for="topicNameHindi"
                      >Topic Name - <b>Hindi</b></label
                    >
                    <!-- <validation-provider
                      #default="{ errors }"
                      name="Total rewards"
                      rules="required"
                    > -->
                    <b-form-input
                      id="topicNameHindi"
                      v-model="topicForm.topicNameHindi"
                      placeholder="Topic Name"
                    />
                    <!-- <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider> -->

                    <!-- description -->
                    <label for="descriptionHindi" class="mt-2"
                      >Description - <b>Hindi</b></label
                    >
                    <!-- <validation-provider
                      #default="{ errors }"
                      name="Total rewards"
                      rules="required"
                    > -->
                    <b-form-textarea
                      id="descriptionHindi"
                      v-model="topicForm.topicDescriptionHindi"
                      placeholder="Description"
                      rows="3"
                    />
                    <!-- <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider> -->
                  </div>
                  <div class="col-12 col-lg-4">
                    <!-- topic name -->
                    <label for="topicNameMarathi"
                      >Topic Name - <b>Marathi</b></label
                    >
                    <!-- <validation-provider
                      #default="{ errors }"
                      name="Total rewards"
                      rules="required"
                    > -->
                    <b-form-input
                      id="topicNameMarathi"
                      v-model="topicForm.topicNameMarathi"
                      placeholder="Topic Name"
                    />
                    <!-- <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider> -->

                    <!-- description -->
                    <label for="descriptionMarathi" class="mt-2"
                      >Description - <b>Marathi</b></label
                    >
                    <!-- <validation-provider
                      #default="{ errors }"
                      name="Total rewards"
                      rules="required"
                    > -->
                    <b-form-textarea
                      id="descriptionMarathi"
                      v-model="topicForm.topicDescriptionMarathi"
                      placeholder="Description"
                      rows="3"
                    />
                    <!-- <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider> -->
                  </div>
                </div>

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
                    v-if="!editTopic"
                    variant="primary"
                    class="addBtn"
                    @click.prevent="addTopic"
                    >Add</b-button
                  >
                  <b-button
                    v-else
                    variant="primary"
                    class="addBtn"
                    @click.prevent="updateTopic"
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
    ValidationProvider,
    ValidationObserver,
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
        topicNameEnglish: "",
        topicDescriptionEnglish: "",
        topicNameHindi: "",
        topicDescriptionHindi: "",
        topicNameMarathi: "",
        topicDescriptionMarathi: "",
        topicImg: { img: null, name: "" },
      },
      topics: [],
      imageNameKey: 0,
      editTopic: false,
      editTopicId: "",
      isImageUpdated: false,
    };
  },
  created() {
    axios
      .post("/admin/v1/movies/get-subject", { subject_id: this.subjectId })
      .then(({ data }) => {
        this.breadcrumbs[1].text = data.subjects[0].locale_data[0].title;
        data.subjects[0].levels.forEach((level) => {
          if (level.id == this.levelId) {
            this.breadcrumbs[2].text = level.level + "";
            this.levelName = level.level;
            this.levelDescription = level.local_data[0].description;
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
          if (self.editTopic) {
            self.isImageUpdated = true;
          }
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
    modalClose() {
      this.editTopic = false;
      this.editTopicId = "";
      this.topicForm.topicNameEnglish = "";
      this.topicForm.topicDescriptionEnglish = "";
      this.topicForm.topicNameHindi = "";
      this.topicForm.topicDescriptionHindi = "";
      this.topicForm.topicNameMarathi = "";
      this.topicForm.topicDescriptionMarathi = "";
    },
    addTopic() {
      this.$refs.addTopicRules.validate().then((success) => {
        if (success) {
          if (this.topicForm.topicImg.name === "" && !this.editTopic) {
            this.$swal(
              "Image not uploaded!",
              "Please upload an image",
              "error"
            );
            return;
          }
          var topicData = new FormData();
          topicData.append("level_id", this.levelId);
          if (
            this.topicForm.topicNameEnglish ||
            this.topicForm.topicDescriptionEnglish
          ) {
            topicData.append("topic[0][locale]", "En");
            topicData.append(
              "topic[0][title]",
              this.topicForm.topicNameEnglish
            );
            topicData.append(
              "topic[0][description]",
              this.topicForm.topicDescriptionEnglish
            );
          }
          if (
            this.topicForm.topicNameHindi ||
            this.topicForm.topicDescriptionHindi
          ) {
            topicData.append("topic[1][locale]", "Hi");
            topicData.append("topic[1][title]", this.topicForm.topicNameHindi);
            topicData.append(
              "topic[1][description]",
              this.topicForm.topicDescriptionHindi
            );
          }
          if (
            this.topicForm.topicNameMarathi ||
            this.topicForm.topicDescriptionMarathi
          ) {
            topicData.append("topic[2][locale]", "Mr");
            topicData.append(
              "topic[2][title]",
              this.topicForm.topicNameMarathi
            );
            topicData.append(
              "topic[2][description]",
              this.topicForm.topicDescriptionMarathi
            );
          }

          topicData.append("flag", 0);
          topicData.append("image", this.topicForm.topicImg.img);

          axios
            .post("admin/v1/movies/create-topics", topicData)
            .then(({ data }) => {
              this.getTopics();

              this.$bvModal.hide("add-topic-modal");

              this.topicForm.topicNameEnglish = "";
              this.topicForm.topicDescriptionEnglish = "";
              this.topicForm.topicNameHindi = "";
              this.topicForm.topicDescriptionHindi = "";
              this.topicForm.topicNameMarathi = "";
              this.topicForm.topicDescriptionMarathi = "";
              this.topicForm.topicImg = { img: null, name: "" };
            })
            .catch((error) => {
              console.log(error);
              this.$swal(
                "Error!",
                "Some error occurred. Please try again",
                "error"
              );
            });
        }
      });
    },
    setEditTopic(topic) {
      this.isImageUpdated = false;
      this.editTopic = true;
      this.editTopicId = topic.id;

      this.$bvModal.show("add-topic-modal");
      this.topicForm.topicNameEnglish = topic.local_data[0].title || "";
      this.topicForm.topicDescriptionEnglish =
        topic.local_data[0].description || "";
      this.topicForm.topicNameHindi = topic.local_data[1].title || "";
      this.topicForm.topicDescriptionHindi =
        topic.local_data[1].description || "";
      this.topicForm.topicNameMarathi = topic.local_data[2].title || "";
      this.topicForm.topicDescriptionMarathi =
        topic.local_data[2].description || "";

      document.getElementById(
        "previewImg"
      ).src = `https://media.gappubobo.com/${topic.image}`;
    },
    updateTopic() {
      let updateData = new FormData();
      if (this.isImageUpdated) {
        updateData.append("image", this.topicForm.topicImg.img);
        updateData.append("topic_id", this.editTopicId);
        if (
          this.topicForm.topicNameEnglish ||
          this.topicForm.topicDescriptionEnglish
        ) {
          updateData.append("topic[0][locale]", "En");
          updateData.append("topic[0][title]", this.topicForm.topicNameEnglish);
          updateData.append(
            "topic[0][description]",
            this.topicForm.topicDescriptionEnglish
          );
        }
        if (
          this.topicForm.topicNameHindi ||
          this.topicForm.topicDescriptionHindi
        ) {
          updateData.append("topic[1][locale]", "Hi");
          updateData.append("topic[1][title]", this.topicForm.topicNameHindi);
          updateData.append(
            "topic[1][description]",
            this.topicForm.topicDescriptionHindi
          );
        }
        if (
          this.topicForm.topicNameMarathi ||
          this.topicForm.topicDescriptionMarathi
        ) {
          updateData.append("topic[2][locale]", "Mr");
          updateData.append("topic[2][title]", this.topicForm.topicNameMarathi);
          updateData.append(
            "topic[2][description]",
            this.topicForm.topicDescriptionMarathi
          );
        }
      } else {
        updateData.append("topic_id", this.editTopicId);
        if (
          this.topicForm.topicNameEnglish ||
          this.topicForm.topicDescriptionEnglish
        ) {
          updateData.append("topic[0][locale]", "En");
          updateData.append("topic[0][title]", this.topicForm.topicNameEnglish);
          updateData.append(
            "topic[0][description]",
            this.topicForm.topicDescriptionEnglish
          );
        }
        if (
          this.topicForm.topicNameHindi ||
          this.topicForm.topicDescriptionHindi
        ) {
          updateData.append("topic[1][locale]", "Hi");
          updateData.append("topic[1][title]", this.topicForm.topicNameHindi);
          updateData.append(
            "topic[1][description]",
            this.topicForm.topicDescriptionHindi
          );
        }
        if (
          this.topicForm.topicNameMarathi ||
          this.topicForm.topicDescriptionMarathi
        ) {
          updateData.append("topic[2][locale]", "Mr");
          updateData.append("topic[2][title]", this.topicForm.topicNameMarathi);
          updateData.append(
            "topic[2][description]",
            this.topicForm.topicDescriptionMarathi
          );
        }
      }

      axios
        .post(`/admin/v1/movies/update-topics?_method=PUT`, updateData)
        .then(({ data }) => {
          this.$bvModal.hide("add-topic-modal");
          this.editTopic = false;
          this.editTopicId = "";
          this.topicForm.topicNameEnglish = "";
          this.topicForm.topicDescriptionEnglish = "";
          this.topicForm.topicNameHindi = "";
          this.topicForm.topicDescriptionHindi = "";
          this.topicForm.topicNameMarathi = "";
          this.topicForm.topicDescriptionMarathi = "";
          this.getTopics();
        })
        .catch((resp) => {
          console.error(resp);
          this.$swal(
            "Error!",
            "Some error occurred. Please try again",
            "error"
          ).then(() => {
            this.$bvModal.hide("add-topic-modal");
            this.editTopic = false;
            this.editTopicId = "";
            this.topicForm.topicNameEnglish = "";
            this.topicForm.topicDescriptionEnglish = "";
            this.topicForm.topicNameHindi = "";
            this.topicForm.topicDescriptionHindi = "";
            this.topicForm.topicNameMarathi = "";
            this.topicForm.topicDescriptionMarathi = "";
          });
        });
    },
    removeTopic(topicId) {
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
              .get(`/admin/v1/movies/topic/delete/${topicId}`)
              .then(({ data }) => {
                self
                  .$swal("Deleted!", "Topic has been deleted.", "success")
                  .then(() => {
                    self.getTopics();
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
  min-height: 120px;

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
    top: 70px;
    height: 380px;
    max-height: 35%;
    width: 200px;
    max-width: 70%;
    object-fit: contain;
  }

  .actionBtns {
    position: absolute;
    top: 5px;
    right: 10px;
    display: flex;
    align-items: center;
  }

  .editBtn {
    font-size: 19px;
    color: #ec4848;
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
