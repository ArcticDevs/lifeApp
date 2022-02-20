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
      <b-tabs>
        <b-tab
          v-for="(lang, langIndex) in langs"
          :key="langIndex"
          :title="lang.name"
          @click="locale = lang.code"
          :disabled="lang.name !== 'English'"
        >
          <b-tabs>
            <b-tab title="Movie">
              <b-card>
                <div class="w-100 text-right">
                  <div class="btn btn-outline-primary mr-1">Edit Movie</div>
                  <div class="btn btn-outline-danger">Delete Movie</div>
                </div>
                <validation-observer ref="movieRules">
                  <b-form
                    novalidate
                    class="needs-validation mb-2"
                    id="movieForm"
                    enctype="multipart/form-data"
                  >
                    <b-form-row class="mb-2">
                      <b-col cols="12" class="mb-1">
                        <label>Coins Allotment</label>
                      </b-col>

                      <b-col cols="6" md="4" class="mb-2">
                        <validation-provider
                          #default="{ errors }"
                          name="Brain Points"
                          rules="required|integer"
                        >
                          <b-form-input
                            id="movieBrainPoints"
                            v-model="movieForm.brain_points"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Brain Points"
                            :disabled="lang.isMoviePosted"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-col>
                      <b-col cols="6" md="4" class="mb-2">
                        <validation-provider
                          #default="{ errors }"
                          name="Heart Points"
                          rules="required|integer"
                        >
                          <b-form-input
                            id="movieHeartPoints"
                            v-model="movieForm.heart_points"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Heart Points"
                            :disabled="lang.isMoviePosted"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-col>
                    </b-form-row>

                    <b-form-row>
                      <b-col cols="12">
                        <div class="demo-inline-spacing mb-2">
                          <b-form-radio
                            v-model="movieForm.movie_type"
                            name="brain"
                            value="brain"
                            class="custom-control-primary"
                            :disabled="lang.isMoviePosted"
                          >
                            Brain Mission
                          </b-form-radio>
                          <b-form-radio
                            v-model="movieForm.movie_type"
                            name="heart"
                            value="heart"
                            class="custom-control-primary"
                            :disabled="lang.isMoviePosted"
                          >
                            Heart Mission
                          </b-form-radio>
                        </div>
                      </b-col>
                    </b-form-row>

                    <b-form-row class="mb-1">
                      <!-- movie title -->
                      <b-col cols="12" md="6" lg="4">
                        <label>Movie Title</label>
                        <b-form-group class="text-left">
                          <validation-provider
                            #default="{ errors }"
                            name="Movie Title"
                            rules="required"
                          >
                            <b-form-input
                              id="movie_title"
                              placeholder="Movie Title"
                              v-model="movieForm.title"
                              :disabled="lang.isMoviePosted"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                      <!-- Movie duration -->
                      <b-col cols="12" md="6" lg="4">
                        <label>Movie Duration</label>
                        <b-form-group class="text-left">
                          <validation-provider
                            #default="{ errors }"
                            name="Movie Duration"
                            rules="required|integer"
                          >
                            <b-form-input
                              id="movie_duration"
                              placeholder="Movie Duration"
                              v-model="movieForm.duration"
                              :disabled="lang.isMoviePosted"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <!-- Movie after duration -->
                      <b-col cols="12" md="6" lg="4">
                        <label>Movie After Duration</label>
                        <b-form-group class="text-left">
                          <validation-provider
                            #default="{ errors }"
                            name="Movie After Duration"
                            rules="required|integer"
                          >
                            <b-form-input
                              id="movie_after_duration"
                              placeholder="Movie After Duration"
                              v-model="movieForm.after_duration"
                              :disabled="lang.isMoviePosted"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-form-row>

                    <!-- Upload movie -->
                    <b-form-row class="mb-2">
                      <b-col cols="12" class="mb-1">
                        <label>Movie</label>
                      </b-col>
                      <b-col cols="12" md="8" xl="6" class="mr-md-3">
                        <validation-provider
                          #default="{ errors }"
                          name="Movie"
                          rules="required"
                        >
                          <b-form-file
                            id="movieUpload"
                            v-model="movieForm.movie"
                            placeholder="Video"
                            accept="video/*"
                            :disabled="lang.isMoviePosted"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-col>
                    </b-form-row>
                    <b-col cols="12" class="mb-2 mr-md-3">
                      <div class="w-100 mt-2 text-center">
                        <b-button
                          variant="primary"
                          type="submit"
                          class="addPointsBtn"
                          @click.prevent="submitMovie(langIndex)"
                          :disabled="lang.isMoviePosted"
                          >Submit</b-button
                        >
                      </div>
                    </b-col>
                  </b-form>
                </validation-observer>
              </b-card>
            </b-tab>
            <b-tab title="Quiz" :disabled="!lang.movieId">
              <div class="w-100 text-right mb-2" v-if="lang.quizId">
                <div
                  class="btn btn-primary addQuestionBtn"
                  @click="$bvModal.show(`modal-add-question${langIndex}`)"
                >
                  Add Question
                </div>
              </div>
              <validation-observer ref="quizRules" v-if="!lang.quizId">
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
                          v-model="quizPoints.brain_points"
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
                          v-model="quizPoints.heart_points"
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
                        @click.prevent="submitQuizPoints(langIndex)"
                        >Submit</b-button
                      >
                    </b-col>
                  </b-form-row>
                </b-form>
              </validation-observer>

              <!-- Display Quiz::start -->

              <div class="row mx-0" v-if="quizData.length > 0">
                <div class="w-100 text-right">
                  <div v-for="(quiz, quizIndex) in quizData" :key="quizIndex">
                    <div v-if="quiz.locale === locale">
                      <b-card
                        v-for="(question, questionIndex) in quiz.question"
                        :key="questionIndex"
                      >
                        <div class="w-100 text-right mb-2" v-if="lang.quizId">
                          <div
                            class="btn btn-outline-primary mr-1"
                            @click="toggleEditable(quizIndex, questionIndex)"
                          >
                            <span v-if="!quiz.isEditable">Edit Question</span
                            ><span v-else>Disable Edit</span>
                          </div>
                          <div
                            class="btn btn-outline-danger"
                            @click="deleteQuestion(quizIndex, questionIndex)"
                          >
                            Delete Question
                          </div>
                        </div>
                        <validation-observer ref="quizEditQuestionRules">
                          <b-form
                            novalidate
                            class="needs-validation"
                            id="quizEditForm"
                            enctype="multipart/form-data"
                          >
                            <div v-if="quiz.isEditable">
                              <b-form-row>
                                <!-- question type radio btns -->
                                <div class="demo-inline-spacing mb-2">
                                  <b-form-radio
                                    v-model="quizEditForm.pointsType"
                                    name="brain"
                                    value="brain"
                                    class="custom-control-primary"
                                  >
                                    Brain Question
                                  </b-form-radio>
                                  <b-form-radio
                                    v-model="quizEditForm.pointsType"
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
                                  <b-form-group class="text-left">
                                    <b-form-input
                                      id="edit_question_title"
                                      placeholder="Question Title"
                                      v-model="quizEditForm.questionTitle"
                                    />
                                  </b-form-group>
                                </b-col>

                                <!-- audio uploads -->
                                <b-col cols="12" md="5" class="mt-2 mt-md-0">
                                  <b-form-group>
                                    <b-form-row>
                                      <b-col cols="12">
                                        <div class="inputContainer">
                                          <b-form-input
                                            id="editAudio"
                                            placeholder="Audio File"
                                            v-model="quizEditForm.audio.name"
                                            disabled
                                          />
                                          <input
                                            id="editAudioUpload"
                                            @change="addAudio($event, 'edit')"
                                            type="file"
                                            accept="audio/*"
                                            hidden
                                          />
                                          <b-button
                                            variant="primary"
                                            class="addQuestionBtn px-0"
                                            @click="
                                              openAudioInput(`editAudioUpload`)
                                            "
                                          >
                                            Add audio
                                          </b-button>
                                        </div>
                                      </b-col>
                                    </b-form-row>
                                  </b-form-group>
                                </b-col>

                                <!-- image upload :: start -->
                                <b-col cols="12" md="7">
                                  <div class="imageInputContainer">
                                    <b-form-group class="text-left">
                                      <b-form-input
                                        id="editQuestionImage"
                                        placeholder="Image Upload"
                                        v-model="
                                          quizEditForm.questionImage.name
                                        "
                                        disabled
                                      />
                                    </b-form-group>

                                    <input
                                      id="editQuestionImageUpload"
                                      @change="addImage($event, 'edit')"
                                      type="file"
                                      accept="image/*"
                                      hidden
                                    />
                                    <b-button
                                      variant="primary"
                                      class="addQuestionBtn px-0"
                                      @click="
                                        openImageInput(
                                          `editQuestionImageUpload`
                                        )
                                      "
                                    >
                                      Add Image
                                    </b-button>
                                  </div>
                                </b-col>
                                <!-- image upload :: End -->
                              </b-form-row>

                              <hr />

                              <!-- Add options section::begin -->
                              <b-form-row
                                class="my-3 position-relative"
                                v-for="(
                                  option, optionIndex
                                ) in quizEditForm.options"
                                :key="optionIndex"
                              >
                                <b-col cols="1">{{ optionIndex + 1 }}.</b-col>
                                <!-- Question titles -->
                                <b-col cols="7" md="6">
                                  <b-form-group class="text-left mb-0">
                                    <b-form-input
                                      :id="'edit_option_title' + optionIndex"
                                      placeholder="Option Title"
                                      v-model="option.title"
                                    />
                                  </b-form-group>
                                </b-col>
                                <b-col
                                  cols="4"
                                  md="5"
                                  class="d-flex align-items-center mb-1"
                                >
                                  <div
                                    @click="
                                      toggleCorrectOption(optionIndex, 'edit')
                                    "
                                    class="optionCheckbox mr-1 mr-sm-2"
                                  >
                                    <div
                                      v-if="option.isCorrect"
                                      class="
                                        correctOption
                                        h-100
                                        w-100
                                        bg-success
                                      "
                                    ></div>
                                    <div
                                      v-else
                                      class="
                                        inCorrectOption
                                        h-100
                                        w-100
                                        bg-danger
                                      "
                                    ></div>
                                  </div>
                                  <div
                                    v-if="option.isCorrect"
                                    class="text-success"
                                  >
                                    Correct
                                  </div>
                                  <div v-else class="text-danger">
                                    Incorrect
                                  </div>
                                </b-col>
                                <!-- image upload :: start -->
                                <b-col cols="1"></b-col>
                                <b-col cols="11" md="6">
                                  <div class="imageInputContainer">
                                    <b-form-group class="text-left">
                                      <b-form-input
                                        :id="'editOptionImage' + optionIndex"
                                        placeholder="Option Image Upload"
                                        v-model="option.imageName"
                                        disabled
                                      />
                                    </b-form-group>

                                    <input
                                      :id="
                                        'editOptionImageUpload' + optionIndex
                                      "
                                      @change="
                                        addImage(
                                          $event,
                                          'editOption',
                                          optionIndex
                                        )
                                      "
                                      type="file"
                                      accept="image/*"
                                      hidden
                                    />
                                    <b-button
                                      variant="primary"
                                      class="addQuestionBtn px-0"
                                      @click="
                                        openImageInput(
                                          'editOptionImageUpload' + optionIndex
                                        )
                                      "
                                    >
                                      Add Image
                                    </b-button>
                                  </div>
                                </b-col>
                                <svg
                                  v-show="quizEditForm.options.length > 0"
                                  @click="removeOption(optionIndex, 'edit')"
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
                              </b-form-row>

                              <b-button
                                variant="primary"
                                class="addOptionBtn"
                                @click="
                                  quizEditForm.options.push({
                                    title: '',
                                    image: '',
                                    imageName: '',
                                    isCorrect: false,
                                  })
                                "
                              >
                                Add Option
                              </b-button>
                            </div>

                            <!-- if not editable -->
                            <div v-else>
                              <b-form-row>
                                <!-- question type radio btns -->
                                <div class="demo-inline-spacing mb-2">
                                  <b-form-radio
                                    v-model="question.type"
                                    name="brain"
                                    value="brain"
                                    class="custom-control-primary"
                                    disabled
                                  >
                                    Brain Question
                                  </b-form-radio>
                                  <b-form-radio
                                    v-model="question.type"
                                    name="heart"
                                    value="heart"
                                    class="custom-control-primary"
                                    disabled
                                  >
                                    Heart Question
                                  </b-form-radio>
                                </div>
                              </b-form-row>

                              <b-form-row>
                                <!-- Question titles -->
                                <b-col cols="12" md="7">
                                  <b-form-group class="text-left">
                                    <b-form-input
                                      id="edit_question_title"
                                      placeholder="Question Title"
                                      v-model="question.title"
                                      disabled
                                    />
                                  </b-form-group>
                                </b-col>

                                <!-- audio uploads -->
                                <b-col cols="12" md="5" class="mt-2 mt-md-0">
                                  <b-form-group>
                                    <b-form-row>
                                      <b-col cols="12">
                                        <div class="inputContainer">
                                          <b-form-input
                                            id="editAudio"
                                            placeholder="Audio File"
                                            v-model="
                                              question.audio_media_id.name
                                            "
                                            disabled
                                          />
                                          <input
                                            id="editAudioUpload"
                                            type="file"
                                            accept="audio/*"
                                            hidden
                                          />
                                          <b-button
                                            variant="primary"
                                            class="addQuestionBtn px-0"
                                            disabled
                                          >
                                            Add audio
                                          </b-button>
                                        </div>
                                      </b-col>
                                    </b-form-row>
                                  </b-form-group>
                                </b-col>

                                <!-- image upload :: start -->
                                <b-col cols="12" md="7">
                                  <div class="imageInputContainer">
                                    <b-form-group class="text-left">
                                      <b-form-input
                                        id="editQuestionImage"
                                        placeholder="Image Upload"
                                        v-model="
                                          question.question_media_id.name
                                        "
                                        disabled
                                      />
                                    </b-form-group>

                                    <input
                                      id="editQuestionImageUpload"
                                      type="file"
                                      hidden
                                    />
                                    <b-button
                                      variant="primary"
                                      class="addQuestionBtn px-0"
                                      disabled
                                    >
                                      Add Image
                                    </b-button>
                                  </div>
                                </b-col>
                                <!-- image upload :: End -->
                              </b-form-row>

                              <hr />

                              <!-- Add options section::begin -->
                              <b-form-row
                                class="my-3 position-relative"
                                v-for="(
                                  option, optionIndex
                                ) in question.options"
                                :key="optionIndex"
                              >
                                <b-col cols="1">{{ optionIndex + 1 }}.</b-col>
                                <!-- Question titles -->
                                <b-col cols="7" md="6">
                                  <b-form-group class="text-left mb-0">
                                    <b-form-input
                                      :id="'edit_option_title' + optionIndex"
                                      placeholder="Option Title"
                                      v-model="option.option_title"
                                      disabled
                                    />
                                  </b-form-group>
                                </b-col>
                                <b-col
                                  cols="4"
                                  md="5"
                                  class="d-flex align-items-center mb-1"
                                >
                                  <div class="optionCheckbox mr-1 mr-sm-2">
                                    <div
                                      v-if="option.id == question.answer"
                                      class="
                                        correctOption
                                        h-100
                                        w-100
                                        bg-success
                                      "
                                    ></div>
                                    <div
                                      v-else
                                      class="
                                        inCorrectOption
                                        h-100
                                        w-100
                                        bg-danger
                                      "
                                    ></div>
                                  </div>
                                  <div
                                    v-if="option.id == question.answer"
                                    class="text-success"
                                  >
                                    Correct
                                  </div>
                                  <div v-else class="text-danger">
                                    Incorrect
                                  </div>
                                </b-col>
                                <!-- image upload :: start -->
                                <b-col cols="1"></b-col>
                                <b-col cols="11" md="6">
                                  <div class="imageInputContainer">
                                    <b-form-group class="text-left">
                                      <b-form-input
                                        placeholder="Option Image Upload"
                                        v-model="option.media.name"
                                        disabled
                                      />
                                    </b-form-group>

                                    <input
                                      type="file"
                                      accept="image/*"
                                      hidden
                                    />
                                    <b-button
                                      variant="primary"
                                      class="addQuestionBtn px-0"
                                      disabled
                                    >
                                      Add Image
                                    </b-button>
                                  </div>
                                </b-col>
                              </b-form-row>
                            </div>
                          </b-form>
                        </validation-observer>
                        <div class="w-100 text-center">
                          <b-button
                            v-if="quiz.isEditable"
                            variant="primary"
                            class="addQuestionBtn mt-2"
                            @click="submitEditedQuestion(langIndex)"
                          >
                            Update
                          </b-button>
                        </div>
                        <!-- Add options section::end -->
                      </b-card>
                    </div>
                  </div>

                  <hr />
                </div>
              </div>
              <!-- Display Quiz::end -->

              <!-- add question section::begin -->
              <b-modal
                :id="'modal-add-question' + langIndex"
                size="xl"
                hide-footer
                no-close-on-backdrop
                title="Add Question"
              >
                <div class="row mx-0">
                  <div class="w-100 text-right">
                    <validation-observer ref="quizQuestionRules">
                      <b-form
                        novalidate
                        class="needs-validation"
                        id="quizForm"
                        enctype="multipart/form-data"
                      >
                        <b-form-row>
                          <!-- question type radio btns -->
                          <div class="demo-inline-spacing mb-2">
                            <b-form-radio
                              v-model="quizForm.pointsType"
                              name="brain"
                              value="brain"
                              class="custom-control-primary"
                            >
                              Brain Question
                            </b-form-radio>
                            <b-form-radio
                              v-model="quizForm.pointsType"
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
                          <b-col cols="12" md="6" lg="7">
                            <b-form-group class="text-left">
                              <b-form-input
                                id="question_title"
                                placeholder="Question Title"
                                v-model="quizForm.questionTitle"
                              />
                            </b-form-group>
                          </b-col>

                          <!-- audio uploads -->
                          <b-col cols="12" md="6" lg="5" class="mt-2 mt-md-0">
                            <b-form-group>
                              <b-form-row>
                                <b-col cols="12">
                                  <div class="inputContainer">
                                    <b-form-input
                                      id="audio"
                                      placeholder="Audio File"
                                      v-model="quizForm.audio.name"
                                      disabled
                                    />
                                    <input
                                      id="audioUpload"
                                      @change="addAudio($event)"
                                      type="file"
                                      accept="audio/*"
                                      hidden
                                    />
                                    <b-button
                                      variant="primary"
                                      class="addQuestionBtn px-0"
                                      @click="openAudioInput(`audioUpload`)"
                                    >
                                      Add audio
                                    </b-button>
                                  </div>
                                </b-col>
                              </b-form-row>
                            </b-form-group>
                          </b-col>

                          <!-- image upload :: start -->
                          <b-col cols="12" md="12" lg="7">
                            <div class="imageInputContainer">
                              <b-form-group class="text-left">
                                <b-form-input
                                  id="questionImage"
                                  placeholder="Image Upload"
                                  v-model="quizForm.questionImage.name"
                                  disabled
                                />
                              </b-form-group>

                              <input
                                id="questionImageUpload"
                                @change="addImage($event)"
                                type="file"
                                accept="image/*"
                                hidden
                              />
                              <b-button
                                variant="primary"
                                class="addQuestionBtn px-0"
                                @click="openImageInput(`questionImageUpload`)"
                              >
                                Add Image
                              </b-button>
                            </div>
                          </b-col>
                          <!-- image upload :: End -->
                        </b-form-row>
                        <hr />

                        <!-- Add options section::begin -->
                        <b-form-row
                          class="my-3 position-relative"
                          v-for="(option, optionIndex) in quizForm.options"
                          :key="optionIndex"
                        >
                          <b-col cols="1">{{ optionIndex + 1 }}.</b-col>
                          <!-- Question titles -->
                          <b-col cols="7" md="6">
                            <b-form-group class="text-left mb-0">
                              <b-form-input
                                :id="'option_title' + optionIndex"
                                placeholder="Option Title"
                                v-model="option.title"
                              />
                            </b-form-group>
                          </b-col>
                          <b-col
                            cols="4"
                            md="5"
                            class="d-flex align-items-center mb-1"
                          >
                            <div
                              @click="toggleCorrectOption(optionIndex)"
                              class="optionCheckbox mr-1 mr-sm-2"
                            >
                              <div
                                v-if="option.isCorrect"
                                class="correctOption h-100 w-100 bg-success"
                              ></div>
                              <div
                                v-else
                                class="inCorrectOption h-100 w-100 bg-danger"
                              ></div>
                            </div>
                            <div v-if="option.isCorrect" class="text-success">
                              Correct
                            </div>
                            <div v-else class="text-danger">Incorrect</div>
                          </b-col>
                          <!-- image upload :: start -->
                          <b-col cols="1"></b-col>
                          <b-col cols="11" md="6">
                            <div class="imageInputContainer">
                              <b-form-group class="text-left">
                                <b-form-input
                                  :id="'optionImage' + optionIndex"
                                  placeholder="Option Image Upload"
                                  v-model="option.image.name"
                                  disabled
                                />
                              </b-form-group>

                              <input
                                :id="'optionImageUpload' + optionIndex"
                                @change="
                                  addImage($event, 'option', optionIndex)
                                "
                                type="file"
                                accept="image/*"
                                hidden
                              />
                              <b-button
                                variant="primary"
                                class="addQuestionBtn px-0"
                                @click="
                                  openImageInput(
                                    'optionImageUpload' + optionIndex
                                  )
                                "
                              >
                                Add Image
                              </b-button>
                            </div>
                          </b-col>
                          <svg
                            v-show="quizForm.options.length > 0"
                            @click="removeOption(optionIndex)"
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
                        </b-form-row>
                        <b-button
                          variant="primary"
                          class="addOptionBtn"
                          @click="
                            quizForm.options.push({
                              title: '',
                              image: '',
                              isCorrect: false,
                            })
                          "
                        >
                          Add Option
                        </b-button>
                      </b-form>
                    </validation-observer>
                    <!-- Add options section::end -->
                    <hr />
                  </div>
                  <div class="w-100 text-center">
                    <b-button
                      variant="primary"
                      class="addQuestionBtn mt-2"
                      @click="submitQuestion(langIndex)"
                    >
                      Submit
                    </b-button>
                  </div>
                </div>
              </b-modal>
              <!-- add question section::end -->
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
      subjectId: this.$route.params.subject,
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
          text: "",
          to: { name: `movies-subject` },
        },
        {
          text: "",
          to: { name: `movies-level` },
        },
        {
          text: "",
          to: { name: `movies-level-details` },
        },
        {
          text: "add",
          active: true,
        },
      ],
      langs: [
        {
          name: "English",
          code: "En",
          isMoviePosted: false,
          isQuizPosted: false,
          movieId: "",
          quizId: "",
        },
        {
          name: "Hindi",
          code: "Hn",
          isMoviePosted: false,
          isQuizPosted: false,
          movieId: "",
          quizId: "",
        },
        {
          name: "Marathi",
          code: "Ma",
          isMoviePosted: false,
          isQuizPosted: false,
          movieId: "",
          quizId: "",
        },
      ],
      locale: "En",
      movieForm: {
        movie: null,
        title: "",
        movie_type: "brain",
        brain_points: "",
        heart_points: "",
        duration: "",
        after_duration: "",
      },
      movieId: "",
      documentNameKey: 0,
      optionNameKey: 0,
      questionForm: true,
      quizData: [],
      quizPoints: {
        brain_points: "",
        heart_points: "",
      },
      quizForm: {
        pointsType: "brain",
        questionTitle: "",
        audio: { file: null, name: "" },
        questionImage: { image: null, name: "" },
        options: [],
        answer: "",
      },
      quizEditForm: {
        pointsType: "brain",
        questionTitle: "",
        audio: { file: null, name: "" },
        questionImage: { image: null, name: "" },
        options: [],
        answer: "",
      },
    };
  },
  created() {
    var postData = {
      level_id: this.levelId,
    };
    // console.log(postData);
    axios
      .post("admin/v1/movies/topics", postData)
      .then(({ data }) => {
        // console.log(data);
        data.topics.forEach((element) => {
          if (element.id == this.topicId) {
            // console.log(element.id == this.topicId);
            this.topicDescription = element.description;
            this.title = element.title;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // ############### breadcrumbs data ################

    axios
      .post("/admin/v1/movies/get-subject", { subject_id: this.subjectId })
      .then(({ data }) => {
        this.breadcrumbs[1].text = data.subjects[0].name;
        data.subjects[0].levels.forEach((level) => {
          if (level.id == this.levelId) {
            this.breadcrumbs[2].text = level.level + "";
          }
        });
      })
      .catch((resp) => {
        console.error(resp);
      });

    axios
      .post("/admin/v1/movies/get-topic", { topic_id: this.topicId })
      .then(({ data }) => {
        this.breadcrumbs[3].text = data.topic[0].title;
      })
      .catch((resp) => {
        console.error(resp);
      });

    // ########### breadcrumbs data fetch::end ################

    // Get movie Data
    this.getMovieData();
  },
  methods: {
    getMovieData() {
      let self = this;
      axios
        .post("/admin/v1/movies/movie", {
          topic_id: self.topicId,
        })
        .then(({ data }) => {
          if (data.movie.length > 0) {
            // self.movieData = data.movie;

            data.movie.forEach((item) => {
              self.langs.forEach((lang) => {
                if (item.locale === lang.code) {
                  lang.isMoviePosted = true;
                  lang.movieId = item.id;
                  self.movieForm = {
                    movie: item.media,
                    title: item.title,
                    movie_type: item.movie_type,
                    brain_points: item.brain_points,
                    heart_points: item.heart_points,
                    duration: item.duration,
                    after_duration: item.after_duration,
                  };
                }
              });
            });
            self.getQuizData();
          }
          // else {
          //   self.movieData = null;
          // }
        })
        .catch((resp) => {
          console.error(resp);
        });
    },
    getQuizData() {
      let self = this;
      console.log(self.langs);

      axios
        .post("/api/v1/movies/quiz", {
          movie_id: self.langs[0].movieId,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.quiz.length > 0) {
            // self.quizData = data.quiz;
            data.quiz.forEach((item) => {
              self.quizData.push({ ...item, isEditable: false });

              self.langs.forEach((lang) => {
                if (item.locale === lang.code) {
                  lang.isQuizPosted = true;
                  lang.quizId = item.id;
                  self.quizPoints = {
                    brain_points: item.brain_points,
                    heart_points: item.heart_points,
                  };
                }
              });
            });
            console.log(self.quizData);
          } else {
            self.quizData = [];
          }
        })
        .catch((resp) => {
          console.error(resp);
        });
    },
    submitMovie(index) {
      this.$refs["movieRules"][index].validate().then((success) => {
        if (success) {
          let movieData = {
            topic_id: this.topicId,
            locale: this.locale,
            ...this.movieForm,
          };
          console.log(movieData);

          let movieFormData = new FormData();
          movieFormData.append("topic_id", this.topicId);
          movieFormData.append("locale", this.locale);
          for (let i = 0; i < Object.keys(this.movieForm).length; i++) {
            movieFormData.append(
              Object.keys(this.movieForm)[i],
              Object.values(this.movieForm)[i]
            );
          }
          for (var pair of movieFormData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
          }

          axios
            .post("/admin/v1/movies/create-movie", movieFormData)
            .then(({ data }) => {
              console.log(data);
              this.movieId = data.data;
              this.$swal({
                title: "Movie Data Uploaded!",
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
              });
            })
            .catch((resp) => {
              console.error(resp);
              this.$swal({
                title: "Error!",
                text: "Some error occurred while uploading movie data",
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                buttonsStyling: false,
              });
            });
        }
      });
    },
    openAudioInput(inputId) {
      document.getElementById(inputId).click();
    },
    addAudio(e, type = null) {
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        if (type === "edit") {
          self.quizEditForm.audio.file = e.target.files[0];
          self.quizEditForm.audio.name = name;
        } else {
          self.quizForm.audio.file = e.target.files[0];
          self.quizForm.audio.name = name;
        }
        self.documentNameKey++;
      }
    },
    openImageInput(inputId) {
      document.getElementById(inputId).click();
    },
    addImage(e, type, index) {
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let name = e.target.files[0].name;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        if (type === "option") {
          self.quizForm.options[index].image = e.target.files[0];
          document.getElementById("optionImage" + index).value = name;
        } else if (type === "edit") {
          self.quizEditForm.questionImage.image = e.target.files[0];
          self.quizEditForm.questionImage.name = name;
        } else if (type === "editOption") {
          self.quizEditForm.options[index].image = e.target.files[0];
          document.getElementById("editOptionImage" + index).value = name;
        } else {
          self.quizForm.questionImage.image = e.target.files[0];
          self.quizForm.questionImage.name = name;
        }

        console.log(self.quizForm);
        self.documentNameKey++;
      }
    },
    removeOption(index, type) {
      if (type === "edit") {
        this.$delete(this.quizEditForm.options, index);
        this.quizEditForm.options.sort();
      } else {
        this.$delete(this.quizForm.options, index);
        this.quizForm.options.sort();
      }
    },
    toggleCorrectOption(index, type) {
      if (type === "edit") {
        this.quizEditForm.options.forEach((opt) => {
          opt.isCorrect = false;
        });
        this.quizEditForm.options[index].isCorrect = true;
        this.quizEditForm.answer = index + 1;
      } else {
        this.quizForm.options.forEach((opt) => {
          opt.isCorrect = false;
        });
        this.quizForm.options[index].isCorrect = true;
        this.quizForm.answer = index + 1;
      }
    },
    submitQuizPoints(index) {
      this.$refs["quizRules"][index].validate().then((success) => {
        if (success) {
          var postQuizData = {
            movie_id: this.langs[index].movieId,
            brain_points: this.quizPoints.brain_points,
            heart_points: this.quizPoints.heart_points,
            locale: this.locale,
          };
          axios
            .post("/admin/v1/movies/create-quiz", postQuizData)
            .then(({ data }) => {
              console.log(data);
              this.langs[index].quizId = data.data;
              this.$swal({
                title: "Quiz Points Allotted!",
                text: `Brain Points: ${this.quizPoints.brain_points} | Heart Points: ${this.quizPoints.heart_points}`,
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
    submitQuestion(index) {
      this.$refs["quizQuestionRules"][index].validate().then((success) => {
        if (success) {
          var postQuizData = new FormData();
          postQuizData.append("quiz_id", this.langs[index].quizId);
          postQuizData.append("locale", this.locale);
          postQuizData.append("question_type", this.quizForm.pointsType);
          postQuizData.append("title", this.quizForm.questionTitle);
          postQuizData.append("audio", this.quizForm.audio.file);
          postQuizData.append("image", this.quizForm.questionImage.image);
          this.quizForm.options.forEach((opt, i) => {
            postQuizData.append(`options[${i}][title]`, opt.title);
            postQuizData.append(`options[${i}][image]`, opt.image);
            postQuizData.append(`options[${i}][check]`, opt.isCorrect ? 1 : 0);
          });

          axios
            .post("/admin/v1/movies/add-question", postQuizData)
            .then(({ data }) => {
              console.log(data);
              this.quizForm = {
                pointsType: "brain",
                questionTitle: "",
                audio: { file: null, name: "" },
                questionImage: { image: null, name: "" },
                options: [],
                answer: "",
              };
              self.getQuizData();
              this.$swal({
                title: "Question Added",
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
    toggleEditable(quizIndex, questionIndex) {
      let questionData = this.quizData[quizIndex].question[questionIndex];
      let options = [];
      questionData.options.forEach((opt) => {
        options.push({
          title: opt.option_title,
          image: null,
          imageName: opt.media.name,
          isCorrect: opt.id == questionData.answer ? true : false,
        });
      });
      this.quizEditForm = {
        pointsType: questionData.type,
        questionTitle: questionData.title,
        audio: { file: null, name: questionData.audio_media_id.name },
        questionImage: {
          image: null,
          name: questionData.question_media_id.name,
        },
        options: options,
      };

      let bool = this.quizData[quizIndex].isEditable;
      this.quizData.forEach((quiz) => {
        quiz.isEditable = false;
      });
      this.quizData[quizIndex].isEditable = !bool;
    },
    deleteQuestion(quizIndex, questionIndex) {
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
          this.$delete(this.quizData[quizIndex].question, questionIndex);
          this.quizData[quizIndex].question.sort();

          this.$swal("Deleted!", "Question has been deleted.", "success");
        }
      });
    },
    submitEditedQuestion(index) {
      alert("edit form submitted");
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
.addQuestionBtn,
.addOptionBtn {
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
.inputContainer {
  position: relative;
  display: flex;
  justify-content: flex-end;

  input {
    position: absolute;
    height: 100%;
    width: 100%;
    padding-right: 37%;
    top: 0;
    left: 0;
  }
  .addQuestionBtn {
    height: 100%;
    width: 35%;
    z-index: 99;
    border-radius: 5px;
  }
}
.imageInputContainer {
  position: relative;
  display: flex;
  justify-content: flex-end;

  input {
    position: absolute;
    height: 100%;
    width: 100%;
    padding-right: 37%;
    top: 0;
    left: 0;
  }
  .addQuestionBtn {
    height: 100%;
    width: 35%;
    z-index: 99;
    border-radius: 5px;
  }
}
.optionCheckbox {
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 38px;
  aspect-ratio: 1/1;
  border-radius: 5px;
  cursor: pointer;

  .correctOption {
    position: relative;
    &:before {
      content: "\2713";
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
    }
  }
  .inCorrectOption {
    position: relative;
    &:before {
      content: "\D7";
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 44px;
    }
  }
}
</style>
