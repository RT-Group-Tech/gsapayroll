<template>
  <div>
    <x-loading v-if="isLoading" />
    <div class="splash-container">
      <div class="card" style="width: 400px">
        <div class="card-header text-center">
          <h2 style="font-weight: bold; text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2)">
            <span style="color: rgb(4, 4, 200)">GSA </span
            ><span style="color: rgb(4, 102, 119)">Payroll</span>
          </h2>
          <span class="splash-description"
            >Veuillez entrer vos identifiants de connexion SVP!</span
          >
        </div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <input
                class="form-control form-control-lg border-primary"
                id="username"
                type="text"
                placeholder="Email ou téléphone"
                autocomplete="off"
                v-model="user.identifiant"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control form-control-lg border-primary"
                id="password"
                type="password"
                placeholder="Mot de passe"
                v-model="user.pwd"
              />
            </div>

            <button
              type="submit"
              @click.prevent="login"
              class="btn btn-primary btn-lg btn-block"
            >
              CONNECTER
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      user: {
        identifiant: "",
        pwd: "",
      },
      isLoading: false,
    };
  },

  methods: {
    login() {
      if (this.user.identifiant === "") {
        this.$swal({
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          icon: "warning",
          title: "Identifiant(email ou n° de téléphone) requis !",
        });
        return;
      }
      if (this.user.pwd === "") {
        this.$swal({
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          icon: "warning",
          title: "Mot de passe requis !",
        });
        return;
      }
      let formData = new FormData();
      formData.append("identifiant", this.user.identifiant);
      formData.append("pass", this.user.pwd);
      this.isLoading = true;
      this.$axios
        .post("connexion/login", formData)
        .then((result) => {
          this.isLoading = false;
          console.log(JSON.stringify(result.data));
          let status = result.data.reponse.status;
          if (status === "success") {
            let userData = JSON.stringify(result.data.reponse.data);
            localStorage.setItem("user", userData);
            localStorage.setItem("accessToken", result.data.reponse.data.telephone);
            this.$router.go(this.$router.push({ name: "home" }));
          } else {
            this.$swal({
              showConfirmButton: false,
              position: "bottom_end",
              timer: 3000,
              timerProgressBar: false,
              icon: "error",
              title: "Mot de passe ou identifiant incorrect !",
            });
            return;
          }
        })
        .catch((err) => console.log("error from login" + err));
    },
  },
};
</script>

<style>
.splash-container {
  position: absolute;
  top: 30%;
  left: 50%;
  bottom: 50%;
  transform: translateX(-55%);
}
</style>
