<template>
  <div class="dashboard-influence">
    <div class="container-fluid dashboard-content">
      <!-- ============================================================== -->
      <!-- pageheader  -->
      <!-- ============================================================== -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <h3 class="mb-2">Bénéficiaire informations</h3>

            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#" class="breadcrumb-link">Accueil</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Bénéficiaire informations
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
      <!-- ============================================================== -->
      <!-- content  -->
      <!-- ============================================================== -->
      <!-- ============================================================== -->
      <!-- influencer profile  -->
      <!-- ============================================================== -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card influencer-profile-data">
            <div class="card-body">
              <div class="row">
                <div class="col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12">
                  <div class="text-center">
                    <img
                      v-if="beneficiaire.photo === ''"
                      src="assets/images/avatar-1.jpg"
                      alt="User Avatar"
                      class="rounded user-avatar-xxl"
                    />
                    <img
                      v-else
                      :src="`data:image/png;base64,${beneficiaire.photo}`"
                      alt="User Avatar"
                      class="rounded user-avatar-xxl"
                    />
                  </div>
                </div>
                <div class="col-xl-10 col-lg-8 col-md-8 col-sm-8 col-12">
                  <div class="user-avatar-info">
                    <div class="m-b-20">
                      <div class="user-avatar-name">
                        <h2 class="mb-1">{{ beneficiaire.nom }}</h2>
                      </div>
                    </div>
                    <!--  <div class="float-right"><a href="#" class="user-avatar-email text-secondary">www.henrybarbara.com</a></div> -->
                    <div class="user-avatar-address">
                      <p class="border-bottom pb-3">
                        <span class="d-xl-inline-block d-block mb-2"
                          ><i class="fa fa-map-marker-alt mr-2 text-primary"></i>4045
                          {{ beneficiaire.adresse }}</span
                        >
                      </p>
                      <div class="mt-3">
                        <div class="campaign-table table-responsive">
                          <table class="table">
                            <thead class="bg-info">
                              <tr class="border-0">
                                <th class="border-0">Téléphone</th>
                                <th class="border-0">sexe</th>
                                <th class="border-0">Etat civil</th>
                                <th class="border-0">Date de Naissance</th>

                                <th class="border-0">Province</th>
                                <th class="border-0">Entité remunerée</th>
                                <th class="border-0">Unité affectation</th>

                                <th class="border-0">Ayant droit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{{ beneficiaire.telephone }}</td>
                                <td>{{ beneficiaire.sexe }}</td>
                                <td>{{ beneficiaire.etat_civil }}</td>
                                <td>{{ beneficiaire.date_naissance }}</td>
                                <td>{{ beneficiaire.province }}</td>
                                <td>{{ beneficiaire.entite_remuneree }}</td>
                                <td>{{ beneficiaire.unite_affectation }}</td>
                                <td>{{ beneficiaire.ayant_droit }}</td>
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

            <div class="border-top user-social-box">
              <div class="user-social-media d-xl-inline-block">
                <h3>N° de compte</h3>
                <p>{{ beneficiaire.num_compte }}</p>
              </div>

              <div class="user-social-media d-xl-inline-block">
                <h3>Matricule</h3>
                <p>{{ beneficiaire.matricule }}</p>
              </div>

              <div class="user-social-media d-xl-inline-block">
                <h3>Identifiant</h3>
                <p>{{ beneficiaire.identifiant }}</p>
              </div>

              <div class="user-social-media d-xl-inline-block">
                <h3>Grade</h3>
                <p>{{ beneficiaire.grade }}</p>
              </div>

              <div class="user-social-media d-xl-inline-block">
                <h3>Banque</h3>
                <p>{{ beneficiaire.banque }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="section-block">
            <h3 class="section-title">Photo signature</h3>
          </div>
        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="card campaign-card text-center">
            <div class="card-body">
              <img src="assets/images/dribbble.png" alt="user" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- ============================================================== -->
        <!-- campaign activities   -->
        <!-- ============================================================== -->
        <div class="col-lg-12">
          <div class="section-block">
            <h3 class="section-title">Historique des paiements</h3>
          </div>
          <div class="card">
            <div class="campaign-table table-responsive">
              <table class="table">
                <thead class="bg-info">
                  <tr class="border-0">
                    <th class="border-0">N°</th>
                    <th class="border-0">Site</th>
                    <th class="border-0">Date activité</th>
                    <th class="border-0">Salaire brute</th>
                    <th class="border-0">TFC</th>
                    <th class="border-0">Net à payer</th>
                    <th class="border-0">Devise</th>
                    <th class="border-0">Indice</th>
                    <th class="border-0">status</th>
                    <th class="border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="story in beneficiaire.paiements" :key="story.paiement_id">
                    <td>1</td>
                    <td>{{ story.site }}</td>
                    <td>{{ story.activite_date }}</td>
                    <td>{{ story.salaire_brute }}</td>
                    <td>{{ story.ftc }}</td>
                    <td>{{ story.netapayer }}</td>
                    <td>{{ story.devise }}</td>
                    <td>{{ story.indice }}</td>
                    <td>
                      <span
                        :class="
                          story.paiement_reception === 'oui'
                            ? 'badge badge-success'
                            : 'badge badge-danger'
                        "
                        >{{ story.paiement_reception }}</span
                      >
                    </td>
                    <td v-if="story.paiement_reception === 'oui'">
                      <a
                        :href="`https://gsa-central-server.rtgroup-rdc.com/page/print/mapage/impression-mapage.html?paiement_id=${story.paiement_id}&admin_id=1`"
                        target="_blank"
                        class="btn btn-primary btn-block btn-sm"
                      >
                        <i class="fas fa-print"></i> Imprimer</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FoundPage",

  data() {
    return {
      data: {},
    };
  },

  computed: {
    beneficiaire() {
      return this.$store.getters.getSingleClient;
    },
  },
};
</script>
