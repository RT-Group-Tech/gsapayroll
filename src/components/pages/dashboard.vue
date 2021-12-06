<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content">
      <x-loading v-if="isLoading" />
      <!-- ============================================================== -->
      <!-- pageheader  -->
      <!-- ============================================================== -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <h2 class="pageheader-title">Tableau de bord</h2>
            <p class="pageheader-text"></p>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#" class="breadcrumb-link">Accueil</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Activités reporting
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <!-- ============================================================== -->
      <!-- end pageheader  -->
      <!-- ============================================================== -->
      <div class="ecommerce-widget">
        <!--<div class="row">
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="text-muted">Total Paiement</h5>
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">12099</h1>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-success font-weight-bold"
                ></div>
              </div>
              <div id="sparkline-revenue"></div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="text-muted">Agents</h5>
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">200</h1>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-success font-weight-bold"
                ></div>
              </div>
              <div id="sparkline-revenue2"></div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="text-muted">Sites</h5>
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">150</h1>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-primary font-weight-bold"
                ></div>
              </div>
              <div id="sparkline-revenue3"></div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="text-muted">Activités en cours</h5>
                <div class="metric-value d-inline-block">
                  <h1 class="mb-1">5</h1>
                </div>
                <div
                  class="metric-label d-inline-block float-right text-secondary font-weight-bold"
                ></div>
              </div>
              <div id="sparkline-revenue4"></div>
            </div>
          </div>
        </div> -->
        <div class="row">
          <!-- recent orders  -->
          <!-- ============================================================== -->
          <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
            <div class="card">
              <h5 class="card-header bg-success-light">Activités en cours</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">Site</th>
                        <th class="border-0">Province</th>
                        <th class="border-0">Montant budget</th>
                        <th class="border-0">Devise</th>
                        <th class="border-0">Representant nom</th>
                        <th class="border-0">Representant téléphone</th>
                        <th class="border-0">Bénéficiaire Paiement status</th>
                        <th class="border-0">Solde</th>
                        <th class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in activites" :key="data.activite_id">
                        <td class="border-0">{{ data.site }}</td>
                        <td class="border-0">{{ data.province }}</td>
                        <td class="border-0">{{ data.montant_budget }}</td>
                        <td class="border-0">{{ data.devise }}</td>
                        <td class="border-0">{{ data.nom_representant }}</td>
                        <td class="border-0">{{ data.telephone_representant }}</td>
                        <td class="border-0">{{ data.beneficiaires_paiement_status }}</td>
                        <td class="border-0">{{ data.solde }}</td>
                        <td>
                          <button
                            @click.prevent="tasksActivities(data.activite_id, 'close')"
                            class="btn btn-outline-warning btn-sm m-r-10"
                          >
                            cloturer
                          </button>
                          <router-link
                            tag="button"
                            :to="{
                              name: 'agent_assign',
                              params: { id: `${data.activite_id}|${data.devise}` },
                            }"
                            class="btn btn-outline-primary btn-sm"
                          >
                            <i class="fas fa-plus-circle"></i> Agents
                          </router-link>
                        </td>
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

        <div class="row">
          <!-- recent orders  -->
          <!-- ============================================================== -->
          <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
            <div class="card">
              <h5 class="card-header bg-info-light text-dark">Activités en attente</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">Site</th>
                        <th class="border-0">Province</th>
                        <th class="border-0">Montant budget</th>
                        <th class="border-0">Devise</th>
                        <th class="border-0">Representant nom</th>
                        <th class="border-0">Representant téléphone</th>
                        <th class="border-0">Bénéficiaire Paiement status</th>
                        <th class="border-0">Solde</th>
                        <th class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in eActivites" :key="data.activite_id">
                        <td class="border-0">{{ data.site }}</td>
                        <td class="border-0">{{ data.province }}</td>
                        <td class="border-0">{{ data.montant_budget }}</td>
                        <td class="border-0">{{ data.devise }}</td>
                        <td class="border-0">{{ data.nom_representant }}</td>
                        <td class="border-0">{{ data.telephone_representant }}</td>
                        <td class="border-0">{{ data.beneficiaires_paiement_status }}</td>
                        <td class="border-0">{{ data.solde }}</td>
                        <td class="border-0">
                          <button
                            class="btn btn-outline-success btn-sm m-r-10"
                            @click.prevent="tasksActivities(data.activite_id)"
                          >
                            Lancer
                          </button>

                          <button
                            @click.prevent="tasksActivities(data.activite_id, 'delete')"
                            class="btn btn-outline-secondary btn-sm m-r-10"
                          >
                            supprimer
                          </button>
                        </td>
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

        <div class="row">
          <!-- recent orders  -->
          <!-- ============================================================== -->
          <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
            <div class="card">
              <h5 class="card-header bg-brand-light">Activités Cloturées</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr class="border-0">
                        <th class="border-0">Site</th>
                        <th class="border-0">Province</th>
                        <th class="border-0">Montant budget</th>
                        <th class="border-0">Devise</th>
                        <th class="border-0">Representant nom</th>
                        <th class="border-0">Representant téléphone</th>
                        <th class="border-0">Bénéficiaire Paiement status</th>
                        <th class="border-0">Solde</th>
                        <th class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in cActivites" :key="data.activite_id">
                        <td class="border-0">{{ data.site }}</td>
                        <td class="border-0">{{ data.province }}</td>
                        <td class="border-0">{{ data.montant_budget }}</td>
                        <td class="border-0">{{ data.devise }}</td>
                        <td class="border-0">{{ data.nom_representant }}</td>
                        <td class="border-0">{{ data.telephone_representant }}</td>
                        <td class="border-0">{{ data.beneficiaires_paiement_status }}</td>
                        <td class="border-0">{{ data.solde }}</td>
                        <td class="border-0">
                          <div>
                            <button
                              type="button"
                              data-toggle="dropdown"
                              class="btn btn-primary dropdown-toggle"
                              aria-expanded="true"
                            >
                              <i class="fas fa-print"></i> Rapports
                            </button>
                            <div
                              class="dropdown-menu"
                              x-placement="bottom-start"
                              style="
                                position: absolute;
                                transform: translate3d(1162px, 41px, 0px);
                                top: 0px;
                                left: 0px;
                                will-change: transform;
                              "
                            >
                              <a
                                @click.prevent="
                                  printRapports(
                                    `http://gsa-central-server.rtgroup-rdc.com/page/print/impression_activites_beneficiaires.html`,
                                    data.activite_id
                                  )
                                "
                                href="#"
                                target="_blank"
                                class="dropdown-item"
                              >
                                <i class="fas fa-print"></i> Global</a
                              >
                              <a
                                href="#"
                                @click.prevent="
                                  printRapports(
                                    `http://gsa-central-server.rtgroup-rdc.com/page/print/beneficiaire-paie.html`,
                                    data.activite_id,
                                    data.site,
                                    data.activite_date
                                  )
                                "
                                target="_blank"
                                class="dropdown-item"
                              >
                                <i class="fas fa-print"></i> Paiements effectués</a
                              >
                              <a
                                href="#"
                                @click.prevent="
                                  printRapports(
                                    `http://gsa-central-server.rtgroup-rdc.com/page/print/beneficiaire-non-paie.html`,
                                    data.activite_id,
                                    data.site,
                                    data.activite_date
                                  )
                                "
                                target="_blank"
                                class="dropdown-item"
                              >
                                <i class="fas fa-print"></i> Paiements non effectués</a
                              >
                            </div>
                          </div>
                        </td>
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
  name: "Dashboard",

  data() {
    return {
      isLoading: false,
    };
  },

  mounted() {
    this.isLoading = true;
    this.$store.dispatch("reportActivities");
    this.$store.dispatch("reportActivities", "enattente");
    this.$store.dispatch("reportActivities", "cloture");
    this.isLoading = false;
  },

  computed: {
    activites() {
      return this.$store.getters.getActivities;
    },

    user() {
      return this.$store.getters.getUser;
    },

    eActivites() {
      return this.$store.getters.geteActivities;
    },

    cActivites() {
      return this.$store.getters.getcActivities;
    },
  },

  methods: {
    tasksActivities(id, key) {
      let formData = new FormData();
      formData.append("admin_id", "1");
      formData.append("activite_id", id);
      console.log(id);
      let subUrl = "";
      switch (key) {
        case "close":
          subUrl = "cloturer";
          break;
        case "delete":
          subUrl = "supprimer";
          break;

        default:
          subUrl = "lancer";
          break;
      }

      this.$swal({
        buttonsStyling: true,
        title: "Avertissement !",
        text: `Etes-vous sûr de ${subUrl} cette activité ?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.value) {
          this.isLoading = true;
          this.$axios
            .post(`operations/activites/action/${subUrl}`, formData)
            .then((res) => {
              if (res.data.reponse.status === "success") {
                this.isLoading = false;
                this.$swal({
                  toast: true,
                  showConfirmButton: false,
                  position: "top-end",
                  timer: 2000,
                  timerProgressBar: false,
                  icon: "success",
                  title: "action effectuée avec succès !",
                });
                this.$store.dispatch("reportActivities");
                this.$store.dispatch("reportActivities", "enattente");
                this.$store.dispatch("reportActivities", "cloture");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else return;
      });
    },
    printRapports(url, activiteId, site = "0", periode = "0") {
      console.log(
        JSON.stringify({ activiteId: activiteId, site: site, periode: periode })
      );
      window.localStorage.setItem("activite_id", activiteId);
      window.localStorage.setItem("admin_id", this.user.admin_id);
      window.localStorage.setItem("periode", periode);
      window.localStorage.setItem("site", site);
      window.open(url, "GSA payroll", "location=0");
    },
  },
};
</script>
