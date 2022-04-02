<template>
  <div>
    <b-breadcrumb class="breadcrumb-slash" :items="breadcrumbs" />
    <b-card title="Movie List">
      <hr />
      <b-row>
        <b-col cols="12">
          <div class="m-2">
            <!-- List Top -->
            <div class="row">
              <div
                class="col-12 col-sm-6 col-md-4 col-lg-3"
                v-for="(subject, subIndex) in subjects"
                :key="subIndex"
              >
                <b-card class="mission_card text-center">
                  <div class="actionBtns">
                    <!-- edit button -->
                    <span @click="setEditSubject(subject)"
                      ><i class="fas fa-edit editBtn cursor-pointer"></i>
                    </span>

                    <!-- delete button -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      class="ml-1 cursor-pointer"
                      @click="removeSubject(subject.id)"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="#EC4899"
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
                      />
                    </svg>
                  </div>
                  <router-link :to="'/movies/' + subject.id">
                    <div class="w-100">
                      <img
                        src="@/assets/images/missions/mission_icon.png"
                        alt=""
                        class="mission_icon"
                      />
                    </div>

                    <h3 class="mt-2">{{ subject.locale_data[0].title }}</h3>
                  </router-link>
                </b-card>
              </div>
              <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <!-- Add subject card -->
                <b-card
                  class="mission_card text-center"
                  v-b-modal.add-subject-modal
                >
                  <div class="add-subject-icon">
                    <img
                      src="@/assets/images/missions/plus_icon.png"
                      alt=""
                      class="mission_icon_plus"
                    />
                    <h3 class="mt-2">Add a subject</h3>
                  </div>
                </b-card>

                <!-- Add subject modal -->
                <b-modal
                  id="add-subject-modal"
                  centered
                  hide-footer
                  size="lg"
                  :title="editSubject ? 'Edit Subject' : 'Add Subject'"
                  @hide="modalClose"
                >
                  <div class="h-100 w-100 p-3">
                    <validation-observer ref="addSubjectRules">
                      <b-form
                        novalidate
                        class="needs-validation"
                        id="addSubjectForm"
                      >
                        <label for="subjectNameEnglish"
                          >Subject Name - <b> English </b></label
                        >
                        <validation-provider
                          #default="{ errors }"
                          name="Subject Name"
                          rules="required"
                        >
                          <b-form-input
                            id="subjectNameEnglish"
                            v-model="subjectNameEnglish"
                            placeholder="Subject Name"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                        <label for="subjectNameHindi" class="mt-2 d-block"
                          >Subject Name - <b> Hindi </b></label
                        >
                        <!-- <validation-provider
                          #default="{ errors }"
                          name="Subject Name"
                          rules="required"
                        > -->
                        <b-form-input
                          id="subjectNameHindi"
                          v-model="subjectNameHindi"
                          placeholder="Subject Name"
                        />
                        <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                        <label for="subjectNameMarathi" class="mt-2 d-block"
                          >Subject Name - <b> Marathi </b></label
                        >
                        <!-- <validation-provider
                          #default="{ errors }"
                          name="Subject Name"
                          rules="required"
                        > -->
                        <b-form-input
                          id="subjectNameMarathi"
                          v-model="subjectNameMarathi"
                          placeholder="Subject Name"
                        />
                        <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                        <div class="text-center w-100 mt-3">
                          <b-button
                            v-if="!editSubject"
                            variant="primary"
                            class="addBtn"
                            @click.prevent="addSubject()"
                            >Add</b-button
                          >
                          <b-button
                            v-else
                            variant="primary"
                            class="addBtn"
                            @click.prevent="updateSubject()"
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
        </b-col>
        <!-- <b-table striped hover :items="items" :fields="fields"></b-table> -->
      </b-row>
      <hr />
    </b-card>
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
  BFormCheckbox,
  BForm,
  BButton,
  BTable,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";

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
    BFormCheckbox,
    BForm,
    BButton,
    BTable,
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: "Movies",
          to: { name: "movies-list" },
        },
        {
          text: "List",
          to: { name: "movies-list" },
          active: true,
        },
      ],
      fields: ["first_name", "last_name", "age"],
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
      subjectNameEnglish: "",
      subjectNameHindi: "",
      subjectNameMarathi: "",
      subjects: [],
      editSubject: false,
      editSubjectId: "",
    };
  },
  created() {
    this.getSubjectsList();
  },
  methods: {
    getSubjectsList() {
      axios
        .get("/admin/v1/movies/subjects")
        .then((response) => {
          this.subjects = response.data.subjects;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modalClose() {
      this.editSubject = false;
      this.editSubjectId = "";
      this.subjectNameEnglish = "";
      this.subjectNameHindi = "";
      this.subjectNameMarathi = "";
    },
    addSubject() {
      this.$refs.addSubjectRules.validate().then((success) => {
        if (success) {
          var subjectData = {
            subject: [
              this.subjectNameEnglish && {
                title: this.subjectNameEnglish,
                locale: "En",
              },
              this.subjectNameHindi && {
                title: this.subjectNameHindi,
                locale: "Hi",
              },
              this.subjectNameMarathi && {
                title: this.subjectNameMarathi,
                locale: "Mr",
              },
            ],
          };
          axios
            .post("/admin/v1/movies/create-subjects", subjectData)
            .then((response) => {
              this.getSubjectsList();
            })
            .catch((error) => {
              console.error(error);
              this.$swal(
                "Error!",
                "Some error occurred. Please try again",
                "error"
              );
            });

          this.$bvModal.hide("add-subject-modal");
          this.subjectNameEnglish = "";
          this.subjectNameHindi = "";
          this.subjectNameMarathi = "";
        }
      });
    },
    setEditSubject(subject) {
      this.subjectNameEnglish = subject.locale_data[0].title;
      this.subjectNameHindi = subject.locale_data[1].title;
      this.subjectNameMarathi = subject.locale_data[2].title;
      this.editSubject = true;
      this.editSubjectId = subject.id;
      this.$bvModal.show("add-subject-modal");
    },
    updateSubject() {
      this.$refs.addSubjectRules.validate().then((success) => {
        if (success) {
          let updateData = {
            subject_id: this.editSubjectId,
            subject: [
              { title: this.subjectNameEnglish, locale: "En" },
              { title: this.subjectNameHindi, locale: "Hi" },
              { title: this.subjectNameMarathi, locale: "Mr" },
            ],
          };
          axios
            .post(`/admin/v1/movies/update-subjects?_method=PUT`, updateData)
            .then(({ data }) => {
              this.$bvModal.hide("add-subject-modal");
              this.editSubject = false;
              this.editSubjectId = "";
              this.subjectNameEnglish = "";
              this.subjectNameHindi = "";
              this.subjectNameMarathi = "";
              this.getSubjectsList();
            })
            .catch((resp) => {
              console.error(resp);
              this.$swal(
                "Error!",
                "Some error occurred. Please try again",
                "error"
              ).then(() => {
                this.$bvModal.hide("add-subject-modal");
                this.editSubject = false;
                this.editSubjectId = "";
                this.subjectNameEnglish = "";
                this.subjectNameHindi = "";
                this.subjectNameMarathi = "";
              });
            });
        }
      });
    },
    removeSubject(subjectId) {
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
              .get(`/admin/v1/movies/subject/delete/${subjectId}`)
              .then(({ data }) => {
                self
                  .$swal("Deleted!", "Subject has been deleted.", "success")
                  .then(() => {
                    self.getSubjectsList();
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

<style lang="scss" scoped>
.mission_card {
  border-radius: 20px;
  min-height: 200px;
  height: 90%;
  box-shadow: 0 2px 5px rgb(167, 166, 166) !important;
  position: relative;

  .mission_icon {
    height: 110px;
    aspect-ratio: 1/1;
    margin: auto;
  }

  h3 {
    color: #ff9501;
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
    color: #ec4899;
  }

  .add-subject-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .mission_icon_plus {
      height: 50px;
    }
  }
}
.addBtn {
  border-radius: 20px;
  padding: 10px 50px;
}
</style>