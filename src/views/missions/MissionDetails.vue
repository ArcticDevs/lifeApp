<template>
  <div v-if="mission">
    <b-breadcrumb class="breadcrumb-slash" :items="breadcrumbs" />
    <b-card class="subNameContainer">
      <div class="row m-0">
        <div class="col-12 col-sm-8 col-md-9">
          <h2 class="subName">
            {{ mission.name[0].toUpperCase() + mission.name.slice(1) }}
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

            <!-- Mission name input -->
            <b-col md="12" class="mb-2">
              <label for="missionName">Mission Name:</label>
              <validation-provider
                #default="{ errors }"
                name="Mission Name"
                rules="required"
              >
                <b-form-input
                  id="missionName"
                  v-model="missionForm.missionName"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Mission Name"
                  :disabled="!isEditable"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>

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
              <div class="demo-inline-spacing mb-2">
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
              </div>
              <b-card-text>
                <!-- images -->
                <b-form-row
                  class="w-100 d-flex justify-content-center align-items-center"
                >
                  <b-col cols="12" md="8" class="mb-2 mr-md-3">
                    <label>Images</label>
                    <b-form-group
                      v-for="(image, index) in missionForm.images"
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
                            @change="onImageSelected($event, index, locale)"
                            :id="'prodImg' + index"
                          ></b-form-file>
                          <!-- <img src="" alt="" :id="'previewImg'+index" class="previewImg" /> -->
                          <p
                            :id="'previewImgName' + index"
                            class="m-0 previewImgName"
                            :key="imageNameKey"
                          >
                            {{ image.name }}
                          </p>
                          <!--          Remove Svg Icon-->
                          <svg
                            v-show="missionForm.images.length > 1 && isEditable"
                            @click="removeImage(index)"
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

                          <!-- image removed toast::begin -->
                          <b-toast
                            id="image-delete-toast"
                            variant="info"
                            auto-hide-delay="2000"
                            solid
                          >
                            <template #toast-title>
                              <div
                                class="d-flex flex-grow-1 align-items-baseline"
                              >
                                <strong class="mr-auto">Image removed</strong>
                              </div>
                            </template>
                            One image was removed from mission
                          </b-toast>
                          <!-- image removed toast::end -->
                        </div>

                        <!-- Add button -->
                        <b-button
                          variant="primary"
                          v-show="index === missionForm.images.length - 1"
                          @click="addImage"
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
                      id="question"
                      v-model="missionForm.question"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Question"
                      :disabled="!isEditable"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>

                <!-- Upload document -->
                <b-form-row
                  class="w-100 d-flex justify-content-center align-items-center"
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
                          <span class="d-block">Click to upload document</span>
                        </div>
                        <b-form-file
                          @change="onDocumentSelected($event)"
                          id="document"
                          :disabled="!isEditable"
                        ></b-form-file>
                        <!-- <img src="" alt="" :id="'previewImg'+index" class="previewImg" /> -->
                        <p
                          id="documentName"
                          class="m-0 previewImgName"
                          :key="documentNameKey"
                        >
                          {{ missionForm.document.name }}
                        </p>
                        <!--          Remove Svg Icon-->
                        <svg
                          v-show="
                            missionForm.document.file != null && isEditable
                          "
                          @click="removeDocument()"
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
            </div>

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
        missionName: "",
        brainCoins: "",
        heartCoins: "",
        question: "",
        images: [{}],
        document: { file: null, name: "" },
      },
      locale: "en",
      required,
      email,
      integer,
      imageNameKey: 0,
      documentNameKey: 0,
      langs: [
        { name: "English", code: "En" },
        { name: "Hindi", code: "Hi" },
        { name: "Marathi", code: "Mr" },
      ],
      isQuestionDocumentUpdated: false,
      areImagesUpdated: false,
    };
  },
  created() {
    this.getMission();
  },
  methods: {
    getMission() {
      axios
        .post("/admin/v1/missions/get-mission", { mission_id: this.missionId })
        .then(({ data }) => {
          this.mission = data.missions[0];
          this.breadcrumbs[2].text = this.mission.name;
          let images = [];
          let length = this.mission.mission_images.length;
          for (let i = 0; i < length; i++) {
            images.push({ img: null, name: "" });
          }
          this.mission.mission_images.forEach((item, i) => {
            images[i].id = item.id;
            images[i].img = item.mission_media_id.url;
            images[i].name = item.mission_media_id.name;
          });
          let missionForm = {
            SelectedMissionType: this.mission.type,
            missionName: this.mission.name,
            brainCoins: this.mission.brain_point,
            heartCoins: this.mission.heart_point,
            question: this.mission.question[0].question_title,
            images: images,
            document: {
              file: this.mission.question[0].media.url,
              name: this.mission.question[0].media.name,
            },
          };
          this.missionForm = missionForm;
          this.locale = this.mission.question[0].locale.toLowerCase();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit() {
      var postData = new FormData();
      postData.append("mission_name", this.missionForm.missionName);
      postData.append("brain_points", this.missionForm.brainCoins);
      postData.append("heart_points", this.missionForm.heartCoins);
      postData.append("locale", this.locale);
      postData.append("mission_type", this.missionForm.SelectedMissionType);
      postData.append("mission_id", this.missionId);
      postData.append("question_title", this.missionForm.question);
      if (this.isQuestionDocumentUpdated)
        postData.append("question_document", this.missionForm.document.file);
      if (this.areImagesUpdated)
      this.missionForm.images.forEach((element, i) => {
        postData.append(`image[${i}]`, element.img);
      });
      for (var pair of postData.entries()) {
        console.log(pair[0] + " -> " + pair[1]);
      }

      // mission PUT API here
      axios
        .post(`/admin/v1/missions/update-mission?_method=PUT`, postData)
        .then((data) => {
          this.isQuestionDocumentUpdated = false
          this.areImagesUpdated = false
          this.isEditable = false
          this.getMission();
        })
        .catch((error) => {
          console.error(error);
          this.$swal({
            title: "Some error occurred",
            text: "Please try again",
            icon: "error",
          });
        });
    },
    onImageSelected(e, index) {
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        self.missionForm.images[index].img = e.target.files[0];
        self.missionForm.images[index].name = name;
        self.areImagesUpdated = true
        self.imageNameKey++;
      }
    },
    addImage() {
      this.missionForm.images.push({});
    },
    removeImage(index) {
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
          console.log(this.missionForm.images);
          let imageId = this.missionForm.images[index].id;
          axios
            .get(`/admin/v1/missions/mission-image/delete/${imageId}`)
            .then(({ data }) => {
              this.$bvToast.show("image-delete-toast");
              if (this.missionForm.images.length === 1) {
                this.missionForm.images = [{}];
              } else {
                this.missionForm.images.splice(index, 1);
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
        }
      });
    },
    onDocumentSelected(e) {
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        self.missionForm.document.file = e.target.files[0];
        self.missionForm.document.name = name;
        self.isQuestionDocumentUpdated = true;
        self.documentNameKey++;
      }
    },
    removeDocument() {
      this.missionForm.document = { file: null, name: "" };
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
