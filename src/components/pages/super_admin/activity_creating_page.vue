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
              <h2 class="pageheader-title">Création activités</h2>

              <div class="page-breadcrumb">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#" class="breadcrumb-link">Accueil</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#" class="breadcrumb-link">Création activités</a>
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
              <h3 class="section-title">Renseignez les infos concernant l'activité</h3>
            </div>
            <div class="card">
              <h5 class="card-header">activité infos</h5>
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="inputNom" class="col-form-label"
                          >Sélectionnez le site concerné</label
                        >
                        <div class="input-group">
                          <select
                            :class="`form-control ${
                              form.site_id === '' ? 'border-secondary' : 'border-success'
                            }`"
                            v-model="form.site_id"
                          >
                            <option value="" disabled>
                              Sélectionnez le site concerné
                            </option>
                            <option
                              :value="site.site_id"
                              v-for="site in sites"
                              :key="site.site_id"
                            >
                              {{ site.libelle }}
                            </option>
                          </select>
                          <div class="input-group-append">
                            <span class="input-group-text"
                              ><i class="fas fa-chevron-down"></i
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="inputNom" class="col-form-label">Date activité</label>
                        <input
                          id="inputNom"
                          v-model="form.date_activite"
                          type="date"
                          class="form-control border-primary"
                          placeholder="jj/mm/aaaa"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="inputEmail">Nom Répresentant</label>
                        <input
                          id="inputPhone"
                          type="text"
                          placeholder="entrez le nom du répresentant"
                          class="form-control border-primary"
                          v-model="form.nom_representant"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="inputPass" class="col-form-label"
                          >N° de téléphone du répresentant</label
                        >
                        <input
                          id="inputPass"
                          type="text"
                          class="form-control border-primary"
                          placeholder="+(243)..."
                          v-model="form.telephone"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="section-block" id="basicform">
              <h3 class="section-title">importer le fichier excel des bénéficiaires</h3>
            </div>
            <div class="card">
              <h5 class="card-header">Fichier excel des bénéficiaires</h5>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="inputNom" class="col-form-label"
                      >Sélectionnez le site concerné</label
                    >
                    <input
                      id="inputNom"
                      type="file"
                      ref="file"
                      @change="uploadFile($event)"
                      class="form-control border-primary"
                      placeholder="jj/mm/aaaa"
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
  name: "Activity",

  data() {
    return {
      form: {
        site_id: "",
        date_activite: "",
        nom_representant: "",
        telephone: "",
        file: "",
      },
      isLoading: false,
    };
  },

  mounted() {
    this.$store.dispatch("viewSites");
  },

  computed: {
    sites() {
      return this.$store.getters.getSites;
    },
  },

  methods: {
    uploadFile(event) {
      this.form.file = this.$refs.file.files[0];
      let file = event.target.files[0];
      console.log(file);
    },

    submitted() {
      let checking = [
        this.form.site_id,
        this.form.nom_representant,
        this.form.telephone,
        this.form.file,
      ];

      for (let i = 0; i < checking.length; i++) {
        if (checking[i] === "") {
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
      formData.append("admin_id", "1");
      formData.append("activite_date", this.form.date_activite);
      formData.append("site_id", this.form.site_id);
      formData.append("nom_representant", this.form.nom_representant);
      formData.append("telephone_representant", this.form.telephone);
      this.isLoading = true;
      this.$axios
        .post("operations/activites/creer", formData)
        .then((res) => {
          console.log(JSON.stringify(res.data));

          if (res.data.reponse.status === "success") {
            let formData1 = new FormData();
            formData1.append("activite_id", res.data.reponse.activite_id);
            formData1.append("admin_id", "1");
            formData1.append("data", this.form.file);
            this.$axios
              .post("operations/activites/beneficiaires/importer", formData1)
              .then((result) => {
                console.log(JSON.stringify(result.data));

                if (result.data.reponse.status === "success") {
                  this.isLoading = false;
                  this.$swal(
                    "Operation effectué",
                    `${result.data.reponse.message}`,
                    "success"
                  );
                  this.$router.push({ name: "dashboard" });
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
