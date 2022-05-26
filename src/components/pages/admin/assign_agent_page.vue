<template>
  <div>
    <div class="container-fluid dashboard-content" id="top">
      <x-loading v-if="isLoading" />
      <div class="row">
        <div class="col-xl-12">
          <!-- ============================================================== -->
          <!-- pageheader  -->
          <!-- ============================================================== -->
          <div v-if="status==='pending'" class="row">
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

          <div v-if="status==='pending'" class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="section-block" id="basicform">
                <h3 class="section-title">Assigner l'agent à une activité</h3>
              </div>
              <div class="card">
                <h5 class="card-header">Assignation à une activité</h5>
                <div class="card-body">
                  <form>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="inputNom" class="col-form-label"
                            >Sélectionnez un agent</label
                          >
                          <select
                            class="form-control border-primary"
                            v-model="form.agent_id"
                          >
                            <option value="" disabled>Sélectionnez un agent</option>
                            <option
                              :value="agent.agent_id"
                              v-for="agent in agents"
                              :key="agent.agent_id"
                            >
                              {{ agent.nom }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="card-footer">
                  <button class="btn btn-success m-r-10" @click.prevent="submitted">
                    Assigner
                  </button>
                  <button class="btn btn-secondary">Annuler</button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
              <div class="card">
                <h5 class="card-header">Tous les agents assignés</h5>
                <div class="card-body p-0">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">Nom</th>
                        <th class="border-0">Téléphone</th>
                        <th class="border-0">Montant</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="agent in agents" :key="agent.agent_id">
                        <td class="border-0">{{ agent.nom}}</td>
                        <td class="border-0">{{ agent.telephone}}</td>
                        <td class="border-0">{{ agent.montant}} {{agent.devise}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
  name: "AssignAgent",

  data() {
    return {
      form: {
        agent_id: "",
        devise: this.$route.params.id.split("|")[1],
        activite_id: this.$route.params.id.split("|")[0],
        montant: "",
      },
      isLoading: false,
      status:"pending"
    };
  },

  mounted() {

    this.status=this.$route.params.status;
    console.clear();
    console.log(this.status);
    this.$store.dispatch("viewAgents");
    this.$store.dispatch("scrollToTop");
    console.log(this.$route.params);
  },

  computed: {
    agents() {
      var activites
      if(this.status==="pending")
      {
        activites=this.$store.getters.geteActivities;
      }
      else
      {
        activites=this.$store.getters.getActivities;
      }
      var agents=[];
      for(var i=0; i<activites.length; i++)
      {
        if(activites[i].activite_id===this.form.activite_id)
        {
          agents=activites[i].agents;
          break;
        }
      }
      return agents;
    },
  },

  methods: {
    submitted() {
      let fields = [
        this.form.activite_id,
        this.form.agent_id,
      ];

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
      formData.append("agent_id", this.form.agent_id);
      formData.append("activite_id", this.form.activite_id);
      formData.append("admin_id", "1");
      this.isLoading = true;
      this.$axios
        .post("operations/activites/agents/assigner", formData)
        .then((res) => {
          this.isLoading = false;
          console.log(JSON.stringify(res.data));
          if (res.data.error !== null) {
            this.$swal({
              toast: true,
              showConfirmButton: false,
              position: "top-end",
              timer: 2000,
              timerProgressBar: false,
              icon: "info",
              title: res.data.error,
            });
          }

          if (res.data.reponse.status === "success") {
            this.$swal("Operation effectué", "", "success");
            this.form.montant = "";
            this.form.agent_id = "";
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
