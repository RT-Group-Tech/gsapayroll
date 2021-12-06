<template>
  <div class="nav-left-sidebar sidebar-dark">
    <div class="menu-list">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav flex-column">
            <div class="m-t-30">
              <div class="user-avatar text-center d-block">
                <img src="assets/images/av.png" alt="User Avatar" width="60" />
              </div>
              <div class="text-center">
                <h2 class="font-24 mb-0 text-light">{{ user.nom }}</h2>
                <p class="text-info">{{ user.email }}</p>
                <button
                  @click.prevent="logout"
                  class="btn btn-sm btn-secondary text-center"
                >
                  <i class="fas fa-power-off mr-2"></i> Déconnexion
                </button>
              </div>
            </div>
            <li class="nav-divider m-t-20">Menu</li>
            <li class="nav-item">
              <router-link tag="a" :to="{ name: 'dashboard' }" class="nav-link active"
                ><i class="fa fa-fw fa-th-list"></i>Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'agent_create' }" tag="a" class="nav-link"
                ><i class="fa fa-fw fa-user-plus"></i>Création agents</router-link
              >
            </li>

            <li class="nav-divider">SUPER ADMIN</li>
            <li class="nav-item">
              <router-link tag="a" :to="{ name: 'admin_create' }" class="nav-link active"
                ><i class="fa fa-fw fa-user-plus"></i>Création admin
              </router-link>
            </li>
            <li class="nav-item">
              <router-link tag="a" :to="{ name: 'site_create' }" class="nav-link active"
                ><i class="fa fa-fw fa-plus"></i>Création sites
              </router-link>
            </li>

            <li class="nav-item">
              <router-link tag="a" :to="{ name: 'admin_view' }" class="nav-link active"
                ><i class="fa fa-fw fa-users"></i>Attribution accès
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("viewLogUser");
  },

  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },

  methods: {
    logout() {
      this.$swal({
        buttonsStyling: true,
        title: "Déconnexion !",
        text: `Etes-vous sûr de vouloir vous déconnecter de votre compte ?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("logout");
          this.$router.go(this.$router.push({ name: "login" }));
        } else return;
      });
    },
  },
};
</script>
