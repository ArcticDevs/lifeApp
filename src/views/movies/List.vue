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
                class="col-12 col-sm-6 col-md-4 col-lg-3 h-100"
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

                    <h3 class="mt-2">{{ subject.name }}</h3>
                  </router-link>
                </b-card>
              </div>
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 h-100">
                <!-- Add subject card -->
                <b-card
                  class="mission_card text-center"
                  v-b-modal.add-subject-modal
                >
                  <img
                    src="@/assets/images/missions/plus_icon.png"
                    alt=""
                    class="mission_icon_plus"
                  />
                  <h3 class="mt-2">Add a subject</h3>
                </b-card>

                <!-- Add subject modal -->
                <b-modal
                  id="add-subject-modal"
                  centered
                  hide-footer
                  size="lg"
                  :title="editSubject ? 'Edit Subject' : 'Add Subject'"
                >
                  <div class="h-100 w-100 p-3">
                    <label for="subjectName">Subject Name</label>
                    <b-form-input
                      id="subjectName"
                      v-model="subjectName"
                      placeholder="Subject Name"
                    />
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
                  </div>
                </b-modal>
              </div>
            </div>
          </div>
        </b-col>
        <b-table striped hover :items="items" :fields="fields"></b-table>
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

export default {
  components: {
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
      subjectName: "",
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
          console.log(response.data.subjects);
          this.subjects = response.data.subjects;
          console.log(this.subjects);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addSubject() {
      var subjectData = {
        name: this.subjectName,
      };
      axios
        .post("/admin/v1/movies/create-subject", subjectData)
        .then((response) => {
          console.log(response);
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
      this.subjectName = "";
    },
    setEditSubject(subject) {
      this.subjectName = subject.name;
      this.editSubject = true;
      this.editSubjectId = subject.id;
      this.$bvModal.show("add-subject-modal");
    },
    updateSubject() {
      let updateData = {
        name: this.subjectName,
        subject_id: this.editSubjectId,
      };
      axios
        .post(`/admin/v1/movies/update-subject?_method=PUT`, updateData)
        .then(({ data }) => {
          this.$bvModal.hide("add-subject-modal");
          this.editSubject = false;
          this.editSubjectId = "";
          this.subjectName = "";
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
            this.subjectName = "";
          });
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
  height: 200px;
  box-shadow: 0 2px 5px rgb(167, 166, 166) !important;
  position: relative;

  .mission_icon {
    height: 110px;
    aspect-ratio: 1/1;
    margin: auto;
  }
  .mission_icon_plus {
    height: 50px;
    margin-top: 30px;
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
}
.addBtn {
  border-radius: 20px;
  padding: 10px 50px;
}
</style>