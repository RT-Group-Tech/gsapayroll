<template>
  <div class="container-fluid dashboard-content">
    <x-loading v-if="isLoading" />
    <div class="row">
      <div class="col-xl-12">
        <!-- ============================================================== -->
        <!-- pageheader  -->
        <!-- ============================================================== -->
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="page-header" id="top">
              <div class="row">
                <div class="col-md-10">
                  <h2 class="pageheader-title">Création administrateur</h2>
                </div>
                <div class="col-md-2 float-right">
                  <router-link
                    :to="{ name: 'admin_view' }"
                    tag="button"
                    class="btn btn-info"
                  >
                    <i class="fas fa-users"></i> Attribution accès
                  </router-link>
                </div>
              </div>
              <div class="page-breadcrumb">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#" class="breadcrumb-link">Accueil</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#" class="breadcrumb-link">Création admin</a>
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
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="section-block" id="basicform">
              <h3 class="section-title">
                Renseignez les infos concernant l'administrateur à créer
              </h3>
            </div>
            <div class="card">
              <h5 class="card-header">Admin infos</h5>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="inputNom" class="col-form-label">Admin Nom</label>
                    <input
                      id="inputNom"
                      v-model="form.nom"
                      type="text"
                      class="form-control border-primary"
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputEmail">Email</label>
                    <input
                      id="inputPhone"
                      type="text"
                      v-model="form.email"
                      placeholder="ex. kinshasa"
                      class="form-control border-primary"
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputPass" class="col-form-label">Téléphone</label>
                    <input
                      id="inputPass"
                      v-model="form.tel"
                      type="text"
                      class="form-control border-primary"
                    />
                  </div>

                  <div class="form-group">
                    <label for="inputPass" class="col-form-label">Mot de passe</label>
                    <input
                      id="inputPass"
                      v-model="form.pass"
                      type="text"
                      class="form-control border-primary"
                    />
                  </div>
                </form>
              </div>

              <div class="card-footer">
                <button class="btn btn-success m-r-10" @click.prevent="submitted">
                  Enregistrer
                </button>
                <button class="btn btn-secondary">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCreating",

  data() {
    return {
      form: {
        nom: "",
        email: "",
        tel: "",
        pass: "",
      },
      isLoading: false,
    };
  },
  methods: {
    submitted() {
      let fields = [this.form.nom, this.form.email, this.form.tel, this.form.pass];

      for (let i = 0; i < fields.length; i++) {
        if (fields[i] === "") {
          this.$swal({
            toast: true,
            showConfirmButton: false,
            position: "top-end",
            timer: 2000,
            timerProgressBar: false,
            icon: "warning",
            title: "vous devez entrer toutes les infos requises !",
          });
          return;
        }
      }

      let formData = new FormData();
      formData.append("nom", this.form.nom);
      formData.append("email", this.form.email);
      formData.append("telephone", this.form.tel);
      formData.append("pass", this.form.pass);
      formData.append("admin_id", "1");
      this.isLoading = true;
      this.$axios
        .post("operations/admin/creer", formData)
        .then((res) => {
          this.isLoading = false;
          if (
            res.data.reponse.status === "actif" ||
            res.data.reponse.status === "success"
          ) {
            this.$swal("Operation effectué", "", "success");
            this.$store.dispatch("viewSites");
            this.form.nom = "";
            this.form.pass = "";
            this.form.email = "";
            this.form.tel = "";
            this.$router.push({ name: "admin_view" });
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
};
</script>
