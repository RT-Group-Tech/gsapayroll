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
              <h2 class="pageheader-title">Création sites</h2>

              <div class="page-breadcrumb">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#" class="breadcrumb-link">Accueil</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#" class="breadcrumb-link">Creéation sites</a>
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
              <h3 class="section-title">Renseignez les infos concernant le site</h3>
            </div>
            <div class="card">
              <h5 class="card-header">Site infos</h5>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="inputNom" class="col-form-label">Désignation site</label>
                    <input
                      id="inputNom"
                      v-model="form.libelle"
                      type="text"
                      class="form-control border-info"
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputEmail">Province</label>
                    <input
                      id="inputPhone"
                      type="text"
                      placeholder="ex. kinshasa"
                      v-model="form.province"
                      class="form-control border-info"
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputPass" class="col-form-label">District</label>
                    <input
                      id="inputPass"
                      type="text"
                      v-model="form.district"
                      class="form-control border-info"
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

        <div class="row">
          <!-- recent orders  -->
          <!-- ============================================================== -->
          <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
            <div class="card">
              <h5 class="card-header">Tous les sites</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">Libellé</th>
                        <th class="border-0">Province</th>
                        <th class="border-0">District</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in sites" :key="data.site_id">
                        <td class="border-0">{{ data.libelle }}</td>
                        <td class="border-0">{{ data.province }}</td>
                        <td class="border-0">{{ data.district }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- ============================================================== -->
          <!-- end recent orders  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Agency",

  data() {
    return {
      form: {
        libelle: "",
        province: "",
        district: "",
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
    submitted() {
      let fields = [this.form.province, this.libelle, this.district];

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
      formData.append("libelle", this.form.libelle);
      formData.append("province", this.form.province);
      formData.append("district", this.form.district);
      formData.append("admin_id", "1");
      this.isLoading = true;
      this.$axios
        .post("operations/sites/creer", formData)
        .then((res) => {
          this.isLoading = false;
          if (res.data.reponse.status === "success") {
            this.$swal("Operation effectué", "", "success");
            this.$store.dispatch("viewSites");
            this.form.province = "";
            this.form.district = "";
            this.form.libelle = "";
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
