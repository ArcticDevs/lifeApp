<template>
  <div v-if="mission">
    <b-breadcrumb class="breadcrumb-slash" :items="breadcrumbs" />
    <b-card class="subNameContainer">
      <div class="row m-0">
        <div class="col-12 col-sm-8 col-md-9">
          <h2 class="subName">
            {{
              mission.translations.hasOwnProperty("En")
                ? mission.translations.En.name
                : mission.translations.hasOwnProperty("Hi")
                ? mission.translations.Hi.name
                : mission.translations.hasOwnProperty("Mr")
                ? mission.translations.Mr.name
                : ""
            }}
          </h2>
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
    <div class="w-100 text-right my-2">
      <div
        class="btn btn-primary"
        @click="isEditable = true"
        v-if="!isEditable"
      >
        Edit Mission
      </div>
      <div
        class="btn btn-primary"
        @click="isEditable = false"
        v-if="isEditable"
      >
        Disable Edit
      </div>
      <div class="btn btn-danger ml-2" @click="deleteMission">
        Delete Mission
      </div>
    </div>
    <!-- Mission Form::begin -->
    <b-card :title="cardTitle" class="add_mission">
      <hr />

      <validation-observer ref="simpleRules">
        <b-form
          novalidate
          class="needs-validation"
          id="missionForm"
          enctype="multipart/form-data"
        >
          <b-form-row>
            <!-- mission type radio btns -->
            <div class="demo-inline-spacing mb-2">
              <b-form-radio
                v-model="missionForm.SelectedMissionType"
                name="brain"
                value="brain"
                class="custom-control-primary"
                :disabled="!isEditable"
              >
                Brain Mission
              </b-form-radio>
              <b-form-radio
                v-model="missionForm.SelectedMissionType"
                name="heart"
                value="heart"
                class="custom-control-primary"
                :disabled="!isEditable"
              >
                Heart Mission
              </b-form-radio>
            </div>

            <!-- coins allotment -->
            <b-col md="12" class="mb-2">
              <label for="coins">Coins Allotment:</label>
              <b-form-row>
                <b-col md="6" class="mb-2 mb-md-0">
                  <validation-provider
                    #default="{ errors }"
                    name="Brain Coins"
                    rules="required|integer"
                  >
                    <b-form-input
                      id="brainCoins"
                      v-model="missionForm.brainCoins"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Brain Coins"
                      :disabled="!isEditable"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <b-col md="6" class="mb-2 mb-md-0">
                  <validation-provider
                    #default="{ errors }"
                    name="Heart Coins"
                    rules="required|integer"
                  >
                    <b-form-input
                      id="heartCoins"
                      v-model="missionForm.heartCoins"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Heart Coins"
                      :disabled="!isEditable"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
              </b-form-row>
            </b-col>

            <div class="w-100 mt-3">
              <!-- <div class="demo-inline-spacing mb-2">
                <b-form-radio
                  v-for="(lang, langIndex) in langs"
                  :key="langIndex"
                  :name="lang.name"
                  :value="lang.code.toLowerCase()"
                  v-model="locale"
                  class="custom-control-primary"
                  :disabled="!isEditable"
                >
                  {{ lang.name }}
                </b-form-radio>
              </div> -->
              <b-tabs>
                <b-tab
                  v-for="(lang, langIndex) in langs"
                  :key="langIndex"
                  :title="lang.name"
                >
                  <b-card-text>
                    <!-- Mission name input -->
                    <b-col md="12" class="mb-2">
                      <label for="missionName">Mission Name:</label>
                      <validation-provider
                        #default="{ errors }"
                        name="Mission Name"
                        rules="required"
                      >
                        <b-form-input
                          v-model="lang.missionName"
                          :state="errors.length > 0 ? false : null"
                          placeholder="Mission Name"
                          :disabled="!isEditable"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-col>

                    <!-- images -->
                    <b-form-row
                      class="
                        w-100
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                    >
                      <b-col cols="12" md="8" class="mb-2 mr-md-3">
                        <label>Images</label>
                        <b-form-group
                          v-for="(image, index) in lang.images"
                          :key="index"
                          :disabled="!isEditable"
                        >
                          <div class="d-flex align-items-center">
                            <!-- image upload container -->
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
                                @change="
                                  onImageSelected($event, langIndex, index)
                                "
                                :id="'prodImg' + langIndex + index"
                              ></b-form-file>
                              <!-- <img src="" alt="" :id="'previewImg'+index" class="previewImg" /> -->
                              <p
                                :id="'previewImgName' + langIndex + index"
                                class="m-0 previewImgName"
                                :key="imageNameKey"
                              >
                                {{ image.name }}
                              </p>
                              <!--          Remove Svg Icon-->
                              <svg
                                v-show="lang.images.length > 1 && isEditable"
                                @click="removeImage(langIndex, index)"
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

                            <!-- Add button -->
                            <b-button
                              variant="primary"
                              v-show="index === lang.images.length - 1"
                              @click="addImage(langIndex)"
                            >
                              Add
                            </b-button>
                          </div>
                        </b-form-group>
                      </b-col>
                    </b-form-row>

                    <!-- Question -->
                    <b-col md="12" class="mb-2">
                      <label for="question">Question:</label>
                      <validation-provider
                        #default="{ errors }"
                        name="Question"
                        rules="required"
                      >
                        <b-form-input
                          v-model="lang.question"
                          :state="errors.length > 0 ? false : null"
                          placeholder="Question"
                          :disabled="!isEditable"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-col>

                    <!-- Upload document -->
                    <b-form-row
                      class="
                        w-100
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                    >
                      <b-col cols="12" md="8" class="mb-2 mr-md-3">
                        <label>Upload Document</label>

                        <div class="d-flex align-items-center">
                          <div class="fileUploadContainer mb-1 mr-2">
                            <div class="text-center">
                              <img
                                src="@/assets/images/svg/file-upload.svg"
                                alt="file upload"
                              />
                              <span class="d-block"
                                >Click to upload document</span
                              >
                            </div>
                            <b-form-file
                              @change="onDocumentSelected($event, langIndex)"
                              :disabled="!isEditable"
                            ></b-form-file>
                            <!-- <img src="" alt="" :id="'previewImg'+index" class="previewImg" /> -->
                            <p
                              class="m-0 previewImgName"
                              :key="documentNameKey"
                            >
                              {{ lang.document.name }}
                            </p>
                            <!--          Remove Svg Icon-->
                            <svg
                              v-show="lang.document.file != null && isEditable"
                              @click="removeDocument(langIndex)"
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
                        </div>
                      </b-col>
                    </b-form-row>
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </div>

            <!-- image removed toast::begin -->
            <b-toast
              id="image-delete-toast"
              variant="info"
              auto-hide-delay="2000"
              solid
            >
              <template #toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                  <strong class="mr-auto">Image removed</strong>
                </div>
              </template>
              One image was removed from mission
            </b-toast>
            <!-- image removed toast::end -->

            <b-col cols="12" md="10" v-if="isEditable">
              <div class="text-center">
                <b-button
                  variant="primary"
                  type="submit"
                  @click.prevent="onSubmit()"
                  >Submit</b-button
                >
              </div>
            </b-col>
          </b-form-row>
        </b-form>
      </validation-observer>
    </b-card>
    <!-- Mission Form::end -->
  </div>
</template>

<script>
import axios from "axios";

import {
  BBreadcrumb,
  BCard,
  BRow,
  BTabs,
  BTab,
  BFormRow,
  BCol,
  BButton,
  BFormInput,
  BFormGroup,
  BForm,
  BCardText,
  BFormFile,
  BFormInvalidFeedback,
  BFormRadio,
} from "bootstrap-vue";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email, integer } from "@validations";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BBreadcrumb,
    BCard,
    BCardText,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BTabs,
    BTab,
    BFormRow,
    BCol,
    BButton,
    vSelect,
    BFormFile,
    BFormInvalidFeedback,
    BFormRadio,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      isEditable: false,
      cardTitle: "Mission Details",
      missionId: this.$route.params.missionId,
      mission: "",
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
      missionForm: {
        SelectedMissionType: "brain",
        brainCoins: "",
        heartCoins: "",
      },
      images: [{}],
      // index: 0,
      // locale: "en",
      required,
      email,
      integer,
      imageNameKey: 0,
      documentNameKey: 0,
      langs: [
        {
          name: "English",
          code: "En",
          missionName: "",
          question: "",
          images: [{}],
          document: { file: null, name: "" },
          isQuestionDocumentUpdated: false,
          areImagesUpdated: false,
          newImages: [{}],
        },
        {
          name: "Hindi",
          code: "Hi",
          missionName: "",
          question: "",
          images: [{}],
          document: { file: null, name: "" },
          isQuestionDocumentUpdated: false,
          areImagesUpdated: false,
          newImages: [{}],
        },
        {
          name: "Marathi",
          code: "Mr",
          missionName: "",
          question: "",
          images: [{}],
          document: { file: null, name: "" },
          isQuestionDocumentUpdated: false,
          areImagesUpdated: false,
          newImages: [{}],
        },
      ],
      // isQuestionDocumentUpdated: false,
      // areImagesUpdated: false,
    };
  },
  created() {
    this.getMission();
  },
  methods: {
    getMission() {
      axios
        .get(`/admin/v1/missions/${this.missionId}`)
        .then(({ data }) => {
          // console.log(data);
          this.mission = data.mission;
          if (this.mission.translations.hasOwnProperty("Mr")) {
            this.breadcrumbs[2].text = this.mission.translations.Mr.name;

            this.langs[2].missionName = this.mission.translations.Mr.name;
            this.langs[2].question =
              this.mission.translations.Mr.question.title;
            this.langs[2].document.file =
              this.mission.translations.Mr.question.media.url;
            this.langs[2].document.name =
              this.mission.translations.Mr.question.media.name;

            let images = [];
            let length = this.mission.translations.Mr.images.length;
            for (let i = 0; i < length; i++) {
              images.push({ img: null, name: "" });
            }
            this.mission.translations.Mr.images.forEach((item, i) => {
              images[i].id = item.id;
              images[i].img = item.media.url;
              images[i].name = item.media.name;
            });
            this.langs[2].images = images;
          }
          if (this.mission.translations.hasOwnProperty("Hi")) {
            this.breadcrumbs[2].text = this.mission.translations.Hi.name;

            this.langs[1].missionName = this.mission.translations.Hi.name;
            this.langs[1].question =
              this.mission.translations.Hi.question?.title;
            this.langs[1].document.file =
              this.mission.translations.Hi.question?.media?.url;
            this.langs[1].document.name =
              this.mission.translations.Hi.question?.media?.name;

            let images = [];
            let length = this.mission.translations.Hi.images?.length;
            for (let i = 0; i < length; i++) {
              images.push({ img: null, name: "" });
            }
            this.mission.translations.Hi.images?.forEach((item, i) => {
              images[i].id = item.id;
              images[i].img = item.media.url;
              images[i].name = item.media.name;
            });
            this.langs[1].images = images;
          }
          if (this.mission.translations.hasOwnProperty("En")) {
            this.breadcrumbs[2].text = this.mission.translations.En.name;

            this.langs[0].missionName = this.mission.translations.En.name;
            this.langs[0].question =
              this.mission.translations.En.question.title;
            this.langs[0].document.file =
              this.mission.translations.En.question.media.url;
            this.langs[0].document.name =
              this.mission.translations.En.question.media.name;

            let images = [];
            let length = this.mission.translations.En.images.length;
            for (let i = 0; i < length; i++) {
              images.push({ img: null, name: "" });
            }
            this.mission.translations.En.images.forEach((item, i) => {
              images[i].id = item.id;
              images[i].img = item.media.url;
              images[i].name = item.media.name;
            });
            this.langs[0].images = images;
          }

          let missionForm = {
            SelectedMissionType: this.mission.mission_type,
            brainCoins: this.mission.brain_point,
            heartCoins: this.mission.heart_point,
          };
          this.missionForm = missionForm;
          // this.locale = this.mission.question[0].locale.toLowerCase();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    urlencodeFormData(fd) {
      var s = "";
      function encode(s) {
        return encodeURIComponent(s).replace(/%20/g, "+");
      }
      for (var pair of fd.entries()) {
        if (typeof pair[1] == "string") {
          s += (s ? "&" : "") + encode(pair[0]) + "=" + encode(pair[1]);
        }
      }
      return s;
    },
    onSubmit() {
      const self = this;

      // update mission name, type and coins
      let missionPutData = {
        brain_points: self.missionForm.brainCoins,
        heart_points: self.missionForm.heartCoins,
        mission_type: self.missionForm.SelectedMissionType,
      };
      self.langs.forEach((lang) => {
        if (lang.missionName != "") {
          if (!missionPutData["translations"]) {
            missionPutData["translations"] = {};
          }

          if (!missionPutData["translations"][`${lang.code}`]) {
            missionPutData["translations"][`${lang.code}`] = {};
          }

          if (!missionPutData["translations"][`${lang.code}`]["name"]) {
            missionPutData["translations"][`${lang.code}`]["name"] = "";
          }

          missionPutData["translations"][`${lang.code}`]["name"] =
            lang.missionName;
        }
      });
      axios
        .put(`/admin/v1/missions/${self.missionId}`, missionPutData)
        .then(({ data }) => {
          // update mission question and document
          let postQuestionData = new FormData();
          self.langs.forEach((lang) => {
            if (lang.question != "") {
              postQuestionData.append(`locale`, lang.code);
              postQuestionData.append(`title`, lang.question);
              if (lang.isQuestionDocumentUpdated) {
                postQuestionData.append(`document`, lang.document.file);
              }
            }
          });

          axios
            .post(
              `/admin/v1/missions/${self.missionId}/questions`,
              postQuestionData
            )
            .then(({ data }) => {
              // update mission images
              let postImageData = new FormData();
              self.langs.forEach((lang) => {
                if (lang.missionName != "") {
                  lang.newImages.forEach((image, i) => {
                    if (image.img && !postImageData.get("locale")) {
                      postImageData.append(`locale`, lang.code);
                      postImageData.append(`image`, image.img);
                    } else if (image.img) {
                      postImageData.append(`image`, image.img);
                    }
                  });
                }
              });
              if (!postImageData.entries().next().value) {
                self.isEditable = false;
                self.langs.forEach((lang) => {
                  lang.isQuestionDocumentUpdated = false;
                  lang.areImagesUpdated = false;
                });
                self.getMission();
              } else {
                axios
                  .post(
                    `/admin/v1/missions/${self.missionId}/images`,
                    postImageData
                  )
                  .then(({ data }) => {
                    self.isEditable = false;
                    self.langs.forEach((lang) => {
                      lang.isQuestionDocumentUpdated = false;
                      lang.areImagesUpdated = false;
                    });
                    self.getMission();
                  })
                  .catch((err) => {
                    self.$swal({
                      title: "Some error occurred while adding images",
                      text: "Please try again",
                      icon: "error",
                    });
                  });
              }
            })
            .catch((resp) => {
              self.$swal({
                title: "Some error occurred while updating question",
                text: "Please try again",
                icon: "error",
              });
            });
        })
        .catch((error) => {
          self.$swal({
            title: "Some error occurred while updating mission details",
            text: "Please try again",
            icon: "error",
          });
        });
    },
    onImageSelected(e, langIndex, index) {
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        let imgData = {
          img: e.target.files[0],
          name: name,
        };
        self.langs[langIndex].newImages.push(imgData);
        self.langs[langIndex].images[index].img = e.target.files[0];
        self.langs[langIndex].images[index].name = name;
        self.langs[langIndex].areImagesUpdated = true;
        self.imageNameKey++;
        e.target.value = "";
      }
    },
    addImage(langIndex) {
      this.langs[langIndex].images.push({});
      this.langs[langIndex].newImages.push({});
    },
    removeImage(langIndex, index) {
      if (Object.keys(this.langs[langIndex].images[index]).length === 0) {
        this.langs[langIndex].newImages.splice(index, 1);
        this.langs[langIndex].images.splice(index, 1);
      } else {
        this.$swal({
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
        }).then((result) => {
          if (result.isConfirmed) {
            let imageId = this.langs[langIndex].images[index].id;
            if (imageId) {
              axios
                .delete(`/admin/v1/mission-images/${imageId}`)
                .then(({ data }) => {
                  this.$bvToast.show("image-delete-toast");
                  if (this.images.length === 1) {
                    this.langs[langIndex].images = [{}];
                    this.langs[langIndex].newImages = [{}];
                  } else {
                    this.langs[langIndex].images.splice(index, 1);
                    this.langs[langIndex].newImages.splice(index, 1);
                  }
                  this.imageNameKey++;
                })
                .catch((resp) => {
                  console.error(resp);
                  this.$swal(
                    "Error!",
                    "Some error occurred. Please try again",
                    "error"
                  );
                });
            } else {
              this.langs[langIndex].images.splice(index, 1);
              this.langs[langIndex].newImages.splice(index, 1);
            }
          }
        });
      }
    },
    onDocumentSelected(e, langIndex) {
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        self.langs[langIndex].document.file = e.target.files[0];
        self.langs[langIndex].document.name = name;
        self.langs[langIndex].isQuestionDocumentUpdated = true;
        self.documentNameKey++;
        e.target.value = "";
      }
    },
    removeDocument(langIndex) {
      this.$swal({
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
      }).then((result) => {
        if (result.isConfirmed) {
          const locale = this.langs[langIndex].code;
          const mission_id = this.mission.id;
          const media_id = this.mission.translations[locale].question.media.id;
          axios
            .patch(
              `/admin/v1/missions/${mission_id}/question-documents/${media_id}`
            )
            .then((data) => {
              this.langs[langIndex].document = { file: null, name: "" };
            })
            .catch((err) => {
              this.$swal(
                "Error!",
                "Some error occurred. Please try again",
                "error"
              );
            });
        }
      });
    },
    deleteMission() {
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
              .get(`/admin/v1/missions/delete/${self.missionId}`)
              .then(({ data }) => {
                self
                  .$swal("Deleted!", "Question has been deleted.", "success")
                  .then(() => {
                    self.$router.push("/mission/list");
                  });
              })
              .catch((resp) => {
                console.error(resp);
              });
          }
        });
    },
  },
};
</script>



<style scoped lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
.subNameContainer {
  border-radius: 20px;
  position: relative;
  height: 100px;

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

.add_mission {
  #missionForm {
    max-width: 900px;
    margin: auto;

    label {
      font-size: 14px;
      font-weight: bold;
    }

    .fileUploadContainer {
      background: #fff;
      box-shadow: 0px 2px 5px #33333326;
      border: 1px solid #ebebeb;
      border-radius: 20px;
      width: 80%;
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
      .btn {
        z-index: 100;
      }
    }

    .removeImg {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
}
</style>
