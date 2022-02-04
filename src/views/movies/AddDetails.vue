<template>
  <div>
    <b-breadcrumb class="breadcrumb-slash" :items="breadcrumbs" />
    <b-card class="subNameContainer bg_orange">
      <div class="row m-0">
        <div class="col-12 col-sm-8 col-md-9">
          <h2 class="subName">
            {{ levelId[0].toUpperCase() + levelId.slice(1) }}
          </h2>
          <p>
            {{ topicDescription }}
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

    <div class="w-100 mt-3">
      <validation-observer ref="simpleRules">
        <b-form
          novalidate
          class="needs-validation mb-3"
          id="pointsForm"
          enctype="multipart/form-data"
        >
          <b-form-row>
            <b-col cols="12" class="mb-1">
              <label>Coins Allotment</label>
            </b-col>

            <b-col cols="6" md="4" lg="3" class="mb-2 mb-md-0">
              <validation-provider
                #default="{ errors }"
                name="Brain Points"
                rules="required|integer"
              >
                <b-form-input
                  id="brainPoints"
                  v-model="pointsForm.brainPoints"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Brain Points"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col cols="6" md="4" lg="3" class="mb-2 mb-md-0">
              <validation-provider
                #default="{ errors }"
                name="Heart Points"
                rules="required|integer"
              >
                <b-form-input
                  id="heartPoints"
                  v-model="pointsForm.heartPoints"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Heart Points"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="3"
              lg="3"
              class="mb-2 mb-md-0 ml-md-3 text-center text-md-left"
            >
              <b-button
                variant="primary"
                type="submit"
                class="addPointsBtn"
                @click.prevent="submitPoints"
                >Submit</b-button
              >
            </b-col>
          </b-form-row>
        </b-form>
      </validation-observer>

      <b-tabs>
        <b-tab title="Movie">
          <b-card>
            <b-tabs>
              <b-tab
                v-for="(lang, langIndex) in movieForm"
                :key="langIndex"
                :title="lang.lang"
              >
                <b-card-text>
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
                      <div
                        class="
                          d-flex
                          flex-column
                          justify-content-center
                          align-items-center
                        "
                      >
                        <div class="fileUploadContainer mb-1 mt-1">
                          <div class="text-center">
                            <img
                              src="@/assets/images/svg/file-upload.svg"
                              alt="file upload"
                            />
                            <span class="d-block">Click to upload video</span>
                          </div>
                          <b-form-file accept="video/*"
                            @change="onDocumentSelected($event, langIndex)"
                          ></b-form-file>
                          <p :key="documentNameKey" class="m-0 previewImgName">
                            {{ lang.name }}
                          </p>
                          <!--          Remove Svg Icon-->
                          <svg
                            v-if="lang.file != null"
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
                        <div class="w-100 text-center">
                          <b-button
                            variant="primary"
                            class="addVideoBtn"
                            @click="addVideo(langIndex)"
                            >Add</b-button
                          >
                        </div>
                      </div>
                    </b-col>
                  </b-form-row>
                </b-card-text>
              </b-tab></b-tabs
            >
          </b-card>
        </b-tab>
        <b-tab title="Quiz">
          <div class="row mx-0">
            <div
              v-for="(form, formIndex) in quizForm"
              :key="formIndex"
              class="w-100 text-right"
            >
              <b-card>
                <b-tabs>
                  <b-tab title="Question">
                    <validation-observer ref="simpleRules">
                      <b-form
                        novalidate
                        class="needs-validation"
                        :id="'quizForm_'+formIndex"
                        enctype="multipart/form-data"
                      >
                        <b-form-row>
                          <!-- question type radio btns -->
                          <div class="demo-inline-spacing mb-2">
                            <b-form-radio
                              v-model="form.pointsType"
                              name="brain"
                              value="brain"
                              class="custom-control-primary"
                            >
                              Brain Question
                            </b-form-radio>
                            <b-form-radio
                              v-model="form.pointsType"
                              name="heart"
                              value="heart"
                              class="custom-control-primary"
                            >
                              Heart Question
                            </b-form-radio>
                          </div>
                        </b-form-row>

                        <b-form-row>
                          <!-- Question titles -->
                          <b-col cols="12" md="7">
                            <b-form-group
                              class="text-left"
                              label-cols="12"
                              label-cols-md="2"
                              label="English"
                              label-for="question_english"
                            >
                              <b-form-input
                                id="question_english"
                                placeholder="Question"
                              />
                            </b-form-group>
                            <b-form-group
                              class="text-left"
                              label-cols="12"
                              label-cols-md="2"
                              label="Hindi"
                              label-for="question_hindi"
                            >
                              <b-form-input
                                id="question_hindi"
                                placeholder="Question"
                              />
                            </b-form-group>
                            <b-form-group
                              class="text-left"
                              label-cols="12"
                              label-cols-md="2"
                              label="Marathi"
                              label-for="question_marathi"
                            >
                              <b-form-input
                                id="question_marathi"
                                placeholder="Question"
                              />
                            </b-form-group>
                          </b-col>
                          <!-- audio uploads -->
                          <b-col cols="12" md="5" class="mt-2 mt-md-0">
                            <b-form-group>
                              <b-form-row>
                                <b-col cols="6">
                                  <b-form-input
                                    :id="'audio_english_'+formIndex"
                                    placeholder="English Audio"
                                    disabled
                                /></b-col>
                                <b-col cols="6" class="text-center">
                                  <b-button
                                    variant="primary"
                                    class="addQuestionBtn"
                                  >
                                    Add audio
                                  </b-button>
                                </b-col>
                              </b-form-row>
                            </b-form-group>
                            <b-form-group>
                              <b-form-row>
                                <b-col cols="6">
                                  <b-form-input
                                    :id="'audio_hindi_'+formIndex"
                                    placeholder="Hindi Audio"
                                    disabled

                                /></b-col>
                                <b-col cols="6" class="text-center">
                                  <input :id="'hindiAudioUpload_'+formIndex" @onChange="addAudio($event,'audio_hindi_'+formIndex,formIndex)" type="file" hidden>
                                  <b-button
                                    variant="primary"
                                    class="addQuestionBtn"
                                    @click="openAudioInput(`hindiAudioUpload_${formIndex}`)"
                                  >
                                    Add audio
                                  </b-button>
                                </b-col>
                              </b-form-row>
                            </b-form-group>
                            <b-form-group>
                              <b-form-row>
                                <b-col cols="6">
                                  <b-form-input
                                    id="audio_marathi"
                                    placeholder="Marathi Audio"
                                    disabled
                                /></b-col>
                                <b-col cols="6" class="text-center">
                                  <b-button
                                    variant="primary"
                                    class="addQuestionBtn"
                                  >
                                    Add audio
                                  </b-button>
                                </b-col>
                              </b-form-row>
                            </b-form-group>
                          </b-col>
                        </b-form-row>
                      </b-form>
                    </validation-observer>
                  </b-tab>
                  <b-tab title="Options">
                    <div class="row mx-0">
                      <div
                        v-for="(option, optionIndex) in form.options"
                        :key="optionIndex"
                        class="col-12 col-sm-6 col-md-4 col-lg-3"
                      >
                        <b-card>
                          <div class="fileUploadContainer mb-1 mt-1">
                            <div class="text-center">
                              <img
                                src="@/assets/images/svg/file-upload.svg"
                                alt="file upload"
                              />
                              <span class="d-block">Click to upload image</span>
                            </div>
                            <b-form-file
                            accept="image/*"
                              @change="
                                onDocumentSelected(
                                  $event,
                                  formIndex,
                                  optionIndex
                                )
                              "
                            ></b-form-file>
                            <p :key="optionNameKey" class="m-0 previewImgName">
                              {{ option.imgName }}
                            </p>
                            <!--          Remove Svg Icon-->
                            <svg
                              v-if="form.options.length >0"
                              @click="removeOption(formIndex, optionIndex)"
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
                          <b-form-textarea
                            :id="'Option_' + optionIndex"
                            placeholder="Option"
                            v-model="form.options[optionIndex].optionName"
                            rows="3"
                          />
                        </b-card>
                      </div>
                      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-1">
                        <b-card class="h-100" @click="addOption(formIndex)">
                          <div class="addOptionCard mt-1">
                            <img
                              src="@/assets/images/missions/plus_icon.png"
                              alt="add option"
                            />
                            <h3 class="mt-2">Add an option</h3>
                          </div>
                        </b-card>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
                <hr>
              </b-card>
               <b-button
                variant="primary"
                class="addQuestionBtn mb-2 mr-4"
                @click="addQuestion(formIndex)"
              >
                Add a question
              </b-button>

              <hr>
            </div>
               <div class="w-100 text-center">
                  <b-button
                variant="primary"
                class="addQuestionBtn mt-2"
                @click="submitQuestion(formIndex)"
              >
                Submit
              </b-button>
                </div>
          </div>
        </b-tab>
      </b-tabs>
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
  BTabs,
  BTab,
  BFormGroup,
  BFormFile,
  BFormRow,
  BFormRadio,
  BCardText,
  BFormInput,
  BFormTextarea,
  BFormCheckbox,
  BForm,
  BButton,
  BTable,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, integer } from "@validations";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BBreadcrumb,
    BCardCode,
    BCard,
    BRow,
    BCol,
    BTabs,
    BTab,
    BFormFile,
    BFormRow,
    BFormRadio,
    BCardText,
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
      topicDescription:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the .",

      breadcrumbs: [
        {
          text: "Movies",
          to: { name: "movies-list" },
        },
        {
          text: this.$route.params.subject,
          to: { name: `movies-subject` },
        },
        {
          text: this.$route.params.level,
          to: { name: `movies-level` },
        },
        {
          text: "add",
          active: true,
        },
      ],
      pointsForm: {
        brainPoints: "",
        heartPoints: "",
      },
      movieForm: [
        { lang: "Hindi", file: null, name: "" },
        { lang: "English", file: null, name: "" },
        { lang: "Marathi", file: null, name: "" },
      ],
      documentNameKey: 0,
      optionNameKey: 0,
      quizForm: [
        {
          pointsType: "brain",
          hindiQuestion: "",
          englishQuestion: "",
          marathiQuestion: "",
          hindiAudio: null,
          englishAudio: null,
          marathiAudio: null,
          questionImages: [{ img: null, name: "" }],
          options: [],
        },
      ],
    };
  },
  methods: {
    submitPoints() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          this.$swal({
            title: "Points Allotted!",
            text: `Brain Points: ${this.pointsForm.brainPoints} | Heart Points: ${this.pointsForm.heartPoints}`,
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        }
      });
    },
    onDocumentSelected(e, index) {
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        self.movieForm[index].file = e.target.files[0];
        self.movieForm[index].name = name;
        self.documentNameKey++;
      }
    },
    removeDocument(index) {
      this.movieForm[index].file = null;
      this.movieForm[index].name = "";
    },
    addVideo(index) {
      if (this.movieForm[index].file === null) {
        this.$swal({
          title: "Error!",
          text: "No video uploaded!",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      } else {
        this.$swal({
          title: "Video Uploaded!",
          text: `Language: ${this.movieForm[index].lang}`,
          icon: "success",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      }
    },
    addQuestion(formIndex) {
      const form={
          pointsType: "brain",
          hindiQuestion: "",
          englishQuestion: "",
          marathiQuestion: "",
          hindiAudio: null,
          englishAudio: null,
          marathiAudio: null,
          questionImages: [{ img: null, name: "" }],
          options: [{ img: null, imgName: "", optionName: "" }],
        };
      // this.quizForm.splice(formIndex+1,0,form)
      const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index)
]

  this.quizForm = insert(this.quizForm, formIndex+1, form)
    },
    openAudioInput(inputId){
      document.getElementById(inputId).click()
    },
    addAudio(e,lang,index){
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        self.movieForm[index].file = e.target.files[0];
        self.movieForm[index].name = name;
        self.documentNameKey++;
      }
    },
    addOption(formIndex) {
      this.quizForm[formIndex].options.push({
        img: null,
        imgName: "",
        optionName: "",
      });
    },
    removeOption(formIndex,optionIndex){
      this.quizForm[formIndex].options.splice(optionIndex,1)
    }
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
.fileUploadContainer {
  background: #fff;
  box-shadow: 0px 2px 5px #33333326;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  width: 100%;
  height: 200px;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  position: relative;
  overflow: hidden;

  // &:hover {
  //   box-shadow: 0 5px 10px rgb(214, 213, 213);
  //   color: #747474;
  // }

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
.addVideoBtn,
.addPointsBtn,
.addQuestionBtn {
  border-radius: 29px;
  padding: 10px 30px;
}

.addOptionCard {
  height: 100%;
  height: 200px;
  max-height: 400px;
  box-shadow: 0px 2px 5px #33333326;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.addOptionCard img {
  height: 15%;
}
</style>