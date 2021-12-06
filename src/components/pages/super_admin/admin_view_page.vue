<template>
  <div>
    <div class="container-fluid dashboard-content">
      <x-loading v-if="isLoading" />
      <div class="row">
        <div :class="hasPanelOpened ? 'col-md-10' : 'col-md-12'">
          <!-- ============================================================== -->
          <!-- pageheader  -->
          <!-- ============================================================== -->
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="page-header" id="top">
                <h2 class="pageheader-title">Attribution accès administrateur</h2>

                <div class="page-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a href="#" class="breadcrumb-link">Accueil</a>
                      </li>
                      <li class="breadcrumb-item">
                        <a href="#" class="breadcrumb-link">Attribution accès</a>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div
              :class="hasPanelOpened ? 'col-md-6' : 'col-md-4'"
              v-for="admin in admins"
              :key="admin.admin_id"
            >
              <div class="card card-fluid">
                <!-- .card-body -->
                <div class="card-body">
                  <!-- .media -->
                  <div class="media align-items-center">
                    <!-- .user-avatar -->
                    <a href="user-profile.html" class="user-avatar user-avatar-xl mr-3">
                      <img
                        src="assets/images/avatar.png"
                        alt="User Avatar"
                        class="rounded user-avatar-xl"
                      />
                    </a>
                    <!-- /.user-avatar -->
                    <!-- .media-body -->
                    <div class="media-body">
                      <h3 class="card-title mb-2 text-truncate">
                        <a href="user-profile.html">{{ admin.nom }}</a>
                      </h3>

                      <h6 class="card-subtitle text-muted">
                        <i class="fas fa-envelope"> </i> {{ admin.email }}
                      </h6>
                      <br />
                      <p><i class="fas fa-phone"></i> {{ admin.telephone }}</p>
                      <br />
                    </div>
                    <!-- /.media-body -->
                    <button
                      type="button"
                      @click="
                        hasPanelOpened = true;
                        selected = admin.admin_id;
                      "
                      class="btn btn-outline-primary m-r-10"
                    >
                      <i class="fa fa-fw fa-plus"></i> Accès
                    </button>

                    <button type="button" class="btn btn-outline-brand">
                      <i class="fa fa-fw fa-minus"></i> retirer
                    </button>
                  </div>
                  <!-- /.media -->
                </div>
                <!-- /.card-body -->
              </div>
            </div>
          </div>
        </div>

        <div v-if="hasPanelOpened" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12">
          <div class="sidebar-nav-fixed">
            <ul class="list-unstyled">
              <li>
                <a href="#overview" class="m-b-20 bg-primary">Attribution accès</a>
              </li>
              <li v-for="data in access" :key="data.access_controle_id">
                <div class="card m-b-0">
                  <a
                    href="#basicform"
                    @click.prevent="submitAccess(data.access_controle_id)"
                  >
                    <label class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" /><span
                        class="custom-control-label"
                        >{{ data.access }}</span
                      >
                    </label></a
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminViewer",

  data() {
    return {
      hasPanelOpened: false,
      selected: "",
      isLoading: false,
    };
  },

  mounted() {
    this.$store.dispatch("viewAdmins");
    this.$store.dispatch("viewAccess");
  },

  computed: {
    admins() {
      return this.$store.getters.getAdmins;
    },
    access() {
      return this.$store.getters.getAccess;
    },
  },

  methods: {
    submitAccess(id) {
      console.log(this.selected);
      let formData = new FormData();
      formData.append("admin_id", "1");
      formData.append("to_admin_id", this.selected);
      formData.append("access_controle_id", id);

      this.$swal({
        buttonsStyling: true,
        title: "Avertissement !",
        text: `Etes-vous sûr de vouloir effectuer cette opération ?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.value) {
          this.isLoading = true;
          this.$axios
            .post("operations/admin/access/ajouter", formData)
            .then((res) => {
              this.isLoading = false;
              if (res.data.reponse.status === "success") {
                this.$swal({
                  toast: true,
                  showConfirmButton: false,
                  position: "top-end",
                  timer: 2000,
                  timerProgressBar: false,
                  icon: "success",
                  title: "action effectuée avec succès !",
                });
              }
            })
            .catch((err) => console.log(err));
        } else return;
      });
    },
  },
};
</script>
