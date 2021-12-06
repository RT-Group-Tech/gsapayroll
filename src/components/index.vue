<template>
  <div class="dashboard-main-wrapper">
    <!-- start header -->
    <d-header />
    <!-- start sidebar menu -->
    <sidebar />
    <!-- end sidebar menu -->
    <!-- start page container -->
    <div class="dashboard-wrapper">
      <!-- start page content -->
      <transition :key="$route.fullPath" name="slide">
        <router-view />
      </transition>
    </div>
    <!-- end page container -->
  </div>
</template>

<script>
import sidebar from "@/components/layouts/sidebar";
import dHeader from "@/components/layouts/header";
export default {
  name: "index",
  components: {
    sidebar,
    dHeader,
  },
};
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
/* Enter and leave animations can use different */
/* durations and timing functions.*/
.fade-enter-active {
  transition: all 0.2s ease;
}
.fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
.slide-enter.enter,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slideback-leave-active,
.sldeback-enter-active {
  transition: all 0.2s ease;
}
.slideback-enter {
  transform: translate(-100%, 0);
}
.slideback-leave-to {
  transform: translate(100%, 0);
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
</style>
