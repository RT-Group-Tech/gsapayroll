<template>
  <!-- start header -->
  <div class="dashboard-header">
    <x-loading v-if="isloading" />
    <nav class="navbar navbar-expand-lg bg-white fixed-top">
      <a class="navbar-brand" href=""
        ><span class="brand-text">GSA</span> <span class="sub-logo">PayRoll</span></a
      >

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto navbar-right-top">
          <li class="nav-item m-r-10">
            <div id="custom-search" class="top-search-bar">
              <router-link
                tag="button"
                :to="{ name: 'activity_create' }"
                class="btn btn-brand"
                type="button"
                ><i class="fas fa-plus"></i> Créer une activité</router-link
              >
            </div>
          </li>

          <li class="nav-item">
            <div id="custom-search" class="row m-r-10">
              <div class="col-md-12">
                <autocomplete
                  class="inputSearch m-auto"
                  placeholder="recherche"
                  aria-label="recherche"
                  :search="search"
                  :get-result-value="getResultValue"
                  @submit="handleSubmit"
                >
                </autocomplete>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>

  <!-- end header -->
</template>

<script>
export default {
  name: "NavHeader",

  data() {
    return {
      isloading: false,
    };
  },
  mounted() {
    this.$store.dispatch("viewLogUser");
  },

  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },

  methods: {
    //autocomplete search

    search(input) {
      return new Promise((resolve) => {
        if (input.length <= 1) {
          return resolve([]);
        }
        let formData = new FormData();
        formData.append("search_term", input);
        formData.append("admin_id", "1");
        this.$axios.post("operations/beneficiaires/recherche", formData).then((res) => {
          if (res.data == []) {
            return;
          }
          resolve(res.data.beneficiaires);
        });
      });
    },

    // We want to display the title
    getResultValue(result) {
      return result.nom;
    },
    // Open the selected article in
    // a new window
    handleSubmit(result) {
      this.isloading = true;
      this.$store.dispatch("viewFoundClient", result.beneficiaire_id);
      this.$router.push({ name: "beneficiaire" });
      this.isloading = false;
    },
  },
};
</script>

<style>
.brand-text {
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;

  text-shadow: rgba(12, 11, 11, 0.5) 0px 3px 3px;
  font-weight: bold;
  letter-spacing: 1px;
}

.sub-logo {
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 2px;
  color: rgb(2, 17, 88);
}
</style>
