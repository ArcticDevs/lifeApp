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
            {{ topicDescription }}
          </p>
        </div>
        <div
          class="col-12 col-sm-4 col-md-3 mt-2 mt-lg-0 pr-xl-4 d-flex flex-wrap flex-lg-nowrap align-items-end justify-content-end"
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
      <b-tabs>
        <b-tab
          v-for="(lang, langIndex) in movieForm"
          :key="langIndex"
          :title="lang.lang"
        >
          <b-tabs>
            <b-tab title="Movie">
              <validation-observer ref="simpleRules1">
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
              <b-card>
                <b-tabs>
                  <b-card-text>
                    <!-- Upload document -->
                    <b-form-row class="w-100 d-flex justify-content-center">
                      <b-col cols="12" md="8" class="mb-2 mr-md-3">
                        <div class="d-flex flex-column justify-content-center">
                          <b-form
                            class="needs-validation mb-3"
                            enctype="multipart/form-data"
                          >
                            <b-form-row>
                              <b-col
                                cols="6"
                                md="6"
                                lg="6"
                                class="mb-2 mb-md-0"
                              >
                                <b-form-file
                                  id="movieUpload"
                                  v-model="movieForm[langIndex].name"
                                  placeholder="Video"
                                />
                              </b-col>

                              <b-col
                                cols="3"
                                md="3"
                                lg="3"
                                class="mb-2 mb-md-0 ml-md-3 text-center text-md-left"
                              >
                                <b-button
                                  variant="primary"
                                  type="submit"
                                  class="addVideoBtn"
                                  @click.prevent="addVideo(langIndex)"
                                  >Add Video</b-button
                                >
                              </b-col>
                            </b-form-row>
                          </b-form>
                        </div>
                      </b-col>
                    </b-form-row>
                  </b-card-text>
                </b-tabs>
              </b-card>
            </b-tab>
            <b-tab title="Quiz">
              <validation-observer ref="simpleRules1">
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
              <div class="row mx-0">
                <div
                  v-for="(form, formIndex) in quizForm"
                  :key="formIndex"
                  class="w-100 text-right"
                >
                  <b-card>
                    <b-tabs>
                      <div class="row">
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6 mb-1">
                          <b-card class="h-100" @click="addOption(formIndex)">
                            <div class="addOptionCard mt-1">
                              <img
                                src="@/assets/images/missions/plus_icon.png"
                                alt="add option"
                              />
                              <h3 class="mt-2">Add an Coin</h3>
                            </div>
                          </b-card>
                        </div>

                        <div class="col-6 col-sm-6 col-md-6 col-lg-6 mb-1">
                          <b-card class="h-100" @click="addQuestion(formIndex)">
                            <div class="addOptionCard mt-1">
                              <img
                                src="@/assets/images/missions/plus_icon.png"
                                alt="add option"
                              />
                              <h3 class="mt-2">Add an Question</h3>
                            </div>
                          </b-card>
                        </div>
                      </div>
                      <div>
                        <b-form class="text-left" v-if="questionForm == true">
                          <b-form-group
                            id="input-group-1"
                            label="Email address:"
                            label-for="input-1"
                            description="We'll never share your email with anyone else."
                          >
                            <b-form-input
                              id="input-1"
                              type="email"
                              placeholder="Enter email"
                              required
                            ></b-form-input>
                          </b-form-group>
                          <validation-observer ref="simpleRules">
                            <b-form
                              novalidate
                              class="needs-validation"
                              :id="'quizForm_' + formIndex"
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
                              <p>English</p>
                              <b-form-row>
                                <!-- Question titles -->
                                <b-col cols="12" md="7">
                                  <b-form-group
                                    class="text-left"
                                    label-cols="12"
                                    label-cols-md="2"
                                  >
                                    <b-form-input
                                      id="question_english"
                                      placeholder="Question Title"
                                    />
                                  </b-form-group>
                                </b-col>
                                <!-- audio uploads -->
                                <b-col cols="12" md="5" class="mt-2 mt-md-0">
                                  <b-form-group>
                                    <b-form-row>
                                      <b-col cols="6">
                                        <b-form-input
                                          :id="'audio_english_' + formIndex"
                                          placeholder="Audio File"
                                          v-model="form.englishAudio.name"
                                          disabled
                                      /></b-col>
                                      <b-col cols="6" class="text-center">
                                        <input
                                          :id="
                                            'englishAudioUpload_' + formIndex
                                          "
                                          @change="
                                            addAudio(
                                              $event,
                                              'English',
                                              formIndex
                                            )
                                          "
                                          type="file"
                                          hidden
                                        />
                                        <b-button
                                          variant="primary"
                                          class="addQuestionBtn"
                                          @click="
                                            openAudioInput(
                                              `englishAudioUpload_${formIndex}`
                                            )
                                          "
                                        >
                                          Add audio
                                        </b-button>
                                      </b-col>
                                    </b-form-row>
                                  </b-form-group>
                                </b-col>

                                <!-- image upload :: start -->
                                <b-col cols="12" md="7">
                                  <b-form-group
                                    class="text-left"
                                    label-cols="12"
                                    label-cols-md="2"
                                  >
                                    <b-form-input
                                      :id="'audio_english_' + formIndex"
                                      placeholder="Image Upload"
                                      v-model="form.englishAudio.name"
                                      disabled
                                    />
                                  </b-form-group>
                                </b-col>

                                <b-col cols="12" md="4" class="mt-2 mt-md-0">
                                  <input
                                    :id="'englishAudioUpload_' + formIndex"
                                    @change="
                                      addAudio($event, 'English', formIndex)
                                    "
                                    type="file"
                                    hidden
                                  />
                                  <b-button
                                    variant="primary"
                                    class="addQuestionBtn"
                                    @click="
                                      openAudioInput(
                                        `englishAudioUpload_${formIndex}`
                                      )
                                    "
                                  >
                                    Add a Image
                                  </b-button>
                                </b-col>
                                <!-- image upload :: End -->

                                <b-button
                                  variant="primary"
                                  class="addQuestionBtn"
                                  @click="
                                    openAudioInput(
                                      `englishAudioUpload_${formIndex}`
                                    )
                                  "
                                >
                                  Add option
                                </b-button>
                                <br />
                                <br />
                                <b-form-row>
                                  <b-col cols="12" md="7">
                                    <b-form-group
                                      class="text-left"
                                      label-cols="12"
                                      label-cols-md="2"
                                    >
                                      <b-form-input
                                        id="question_english"
                                        placeholder="Option Title"
                                      />
                                    </b-form-group>
                                  </b-col>
                                  <!-- audio uploads -->
                                  <b-col cols="12" md="5" class="mt-2 mt-md-0">
                                    <b-form-group>
                                      <b-form-row>
                                        <b-col cols="6">
                                          <b-form-checkbox
                                            id="checkbox-1"
                                            name="checkbox-1"
                                          >
                                          </b-form-checkbox
                                        ></b-col>
                                        <b-col cols="6" class="text-center">
                                        </b-col>
                                      </b-form-row>
                                    </b-form-group>
                                  </b-col>

                                  <!-- image upload :: start -->
                                  <b-col cols="12" md="7">
                                    <b-form-group
                                      class="text-left"
                                      label-cols="12"
                                      label-cols-md="2"
                                    > </b-form-group>

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
                                      </div>


                                  </b-col>

                                  <b-col cols="12" md="4" class="mt-2 mt-md-0">
                                    <input
                                      :id="'englishAudioUpload_' + formIndex"
                                      @change="
                                        addAudio($event, 'English', formIndex)
                                      "
                                      type="file"
                                      hidden
                                    />
                                    <b-button
                                      variant="primary"
                                      class="addQuestionBtn"
                                      @click="
                                        openAudioInput(
                                          `englishAudioUpload_${formIndex}`
                                        )
                                      "
                                    >
                                      Add a Image
                                    </b-button>
                                  </b-col>
                                </b-form-row>
                              </b-form-row>
                            </b-form>
                          </validation-observer>
                        </b-form>
                      </div>
                    </b-tabs>
                    <hr />
                  </b-card>
                  <b-button
                    variant="primary"
                    class="addQuestionBtn mb-2 mr-4"
                    @click="addQuestion(formIndex)"
                  >
                    Add a question
                  </b-button>

                  <hr />
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
        </b-tab>
      </b-tabs>
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
      topicId: this.$route.params.topic,

      topicDescription: "",
      title: "",
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
      questionForm: true,
      quizForm: [
        {
          pointsType: "brain",
          hindiQuestion: "",
          englishQuestion: "",
          marathiQuestion: "",
          hindiAudio: { file: null, name: "" },
          englishAudio: { file: null, name: "" },
          marathiAudio: { file: null, name: "" },
          questionImages: [{ img: null, name: "" }],
          options: [],
        },
      ],
    };
  },
  created() {
    var postData = {
      level_id: this.levelId,
    };
    console.log(postData);
    axios
      .post("admin/v1/movies/topics", postData)
      .then(({ data }) => {
        console.log(data);
        data.topics.forEach((element) => {
          if (element.id == this.topicId) {
            console.log(element.id == this.topicId);
            this.topicDescription = element.description;
            this.title = element.title;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    submitPoints() {
      this.$refs.simpleRules1.validate().then((success) => {
        if (success) {
          var postQuizData = {
            movie_id: this.topicId,
            brain_points: this.pointsForm.brainPoints,
            heart_points: this.pointsForm.heartPoints,
          };
          axios
            .post("/admin/v1/movies/create-quiz", postQuizData)
            .then(({ data }) => {
              console.log(data);
              this.$swal({
                title: "Points Allotted!",
                text: `Brain Points: ${this.pointsForm.brainPoints} | Heart Points: ${this.pointsForm.heartPoints}`,
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
              });
            })
            .catch((error) => {
              console.log(error);
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
      const form = {
        pointsType: "brain",
        hindiQuestion: "",
        englishQuestion: "",
        marathiQuestion: "",
        hindiAudio: { file: null, name: "" },
        englishAudio: { file: null, name: "" },
        marathiAudio: { file: null, name: "" },
        questionImages: [{ img: null, name: "" }],
        options: [{ img: null, imgName: "", optionName: "" }],
      };
      this.questionForm = true;
      // this.quizForm.splice(formIndex+1,0,form)
      const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index),
      ];

      this.quizForm = insert(this.quizForm, formIndex + 1, form);
    },
    openAudioInput(inputId) {
      document.getElementById(inputId).click();
    },
    addAudio(e, lang, index) {
      console.log("guiojhg");
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        if (lang === "Hindi") {
          self.quizForm[index].hindiAudio.file = e.target.files[0];
          self.quizForm[index].hindiAudio.name = name;
        } else if (lang === "English") {
          self.quizForm[index].englishAudio.file = e.target.files[0];
          self.quizForm[index].englishAudio.name = name;
        } else if (lang === "Marathi") {
          self.quizForm[index].marathiAudio.file = e.target.files[0];
          self.quizForm[index].marathiAudio.name = name;
        }
        console.log(self.quizForm[index]);
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
    removeOption(formIndex, optionIndex) {
      this.quizForm[formIndex].options.splice(optionIndex, 1);
    },
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
