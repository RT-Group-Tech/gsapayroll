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
              <h2 class="pageheader-title">Création agents</h2>

              <div class="page-breadcrumb">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#" class="breadcrumb-link">Accueil</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#" class="breadcrumb-link">Creéation agents</a>
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
              <h3 class="section-title">Renseignez les infos concernant un agent</h3>
            </div>
            <div class="card">
              <h5 class="card-header">Agent</h5>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="inputNom" class="col-form-label">Nom agent</label>
                    <input
                      id="inputNom"
                      type="text"
                      v-model="form.nom"
                      class="form-control border-primary"
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputEmail">N° Téléphone</label>
                    <input
                      id="inputPhone"
                      type="text"
                      v-model="form.tel"
                      placeholder="+(243)..."
                      class="form-control border-primary"
                    />
                  </div>
                  <div class="form-group">
                    <label for="inputPass" class="col-form-label">Mot de passe</label>
                    <input
                      id="inputPass"
                      type="text"
                      v-model="form.pass"
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

        <div class="row">
          <!-- recent orders  -->
          <!-- ============================================================== -->
          <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
            <div class="card">
              <h5 class="card-header bg-primary">Liste des agents</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0"></th>
                        <th class="border-0">Nom</th>
                        <th class="border-0">email</th>
                        <th class="border-0">Téléphone</th>
                        <th class="border-0">Mot de passe</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in agents" :key="data.agent_id">
                        <td>
                          <div class="m-r-10">
                            <img
                              v-if="data.photo !== ''"
                              :src="data.photo"
                              alt="user"
                              class="rounded"
                              width="50"
                            />
                            <img
                              v-else
                              src="assets/images/avatar.png"
                              alt="user"
                              class="rounded"
                              width="50"
                            />
                          </div>
                        </td>
                        <td class="border-0">{{ data.nom }}</td>
                        <td class="border-0">{{ data.email }}</td>
                        <td class="border-0">{{ data.telephone }}</td>
                        <td class="border-0">{{ data.pass }}</td>
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
  name: "Agents",

  data() {
    return {
      form: {
        nom: "",
        tel: "",
        pass: "",
      },
      isLoading: false,
    };
  },

  mounted() {
    this.$store.dispatch("viewAgents");
  },

  computed: {
    agents() {
      return this.$store.getters.getAgents;
    },
  },

  methods: {
    submitted() {
      let fields = [this.form.nom, this.form.tel, this.form.pass];
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
      formData.append("telephone", this.form.tel);
      formData.append("pass", this.form.pass);
      formData.append("admin_id", "1");
      this.isLoading = true;
      this.$axios
        .post("operations/agents/creer", formData)
        .then((res) => {
          this.isLoading = false;
          console.log(JSON.stringify(res.data));
          if (res.data.reponse.status === "success") {
            this.$swal("Operation effectué", "", "success");
            this.$store.dispatch("viewAgents");
            this.form.tel = "";
            this.form.nom = "";
            this.form.pass = "";
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
