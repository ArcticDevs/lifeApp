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
                <router-link :to="'/movies/' + subject.id">
                  <b-card class="mission_card text-center">
                    <img
                      src="@/assets/images/missions/mission_icon.png"
                      alt=""
                      class="mission_icon"
                    />

                    <h3 class="mt-2">{{ subject.name }}</h3>
                  </b-card>
                </router-link>
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
                  title="Add Subject"
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
                        variant="primary"
                        class="addBtn"
                        @click.prevent="addSubject()"
                        >Add</b-button
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
          console.log(error);
        });

      this.$bvModal.hide("add-subject-modal");
      this.subjectName = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.mission_card {
  border-radius: 20px;
  height: 200px;
  box-shadow: 0 2px 5px rgb(167, 166, 166) !important;
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
}
.addBtn {
  border-radius: 20px;
  padding: 10px 50px;
}
</style>