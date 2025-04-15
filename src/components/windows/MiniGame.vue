<template>
  <div class="clicker-game">
    <h2>Click the Rick</h2>
    <p>Score: {{ clickerScore }}</p>
    <img
      src="/src/assets/img/minigame.png"
      alt="Click Me"
      class="clicker-image"
      @click="incrementScore"
    />
    <div class="upgrades">
      <h3>Upgrades</h3>
      <div class="upgrade" v-for="(upgrade, index) in upgrades" :key="index">
        <p>{{ upgrade.name }}</p>
        <p>Cost: {{ upgrade.cost }}</p>
        <p v-if="upgrade.multiplier">Next Multiplier: x{{ upgrade.multiplier }}</p>
        <p v-if="upgrade.autoClick">Auto Clicks: +{{ upgrade.autoClick }}/sec</p>
        <button
          :disabled="clickerScore < upgrade.cost"
          @click="purchaseUpgrade(index)"
        >
          Buy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickerScore: 0,
      upgrades: [
        { name: "Double Clicks", cost: 10, multiplier: 2 },
        { name: "Auto Clicker", cost: 50, autoClick: 1 },
      ],
      pointsPerClick: 1,
      autoClickInterval: null,
    };
  },
  methods: {
    incrementScore() {
      this.clickerScore += this.pointsPerClick;
    },
    purchaseUpgrade(index) {
      const upgrade = this.upgrades[index];
      if (this.clickerScore >= upgrade.cost) {
        this.clickerScore -= upgrade.cost;
        if (upgrade.multiplier) {
          this.pointsPerClick *= upgrade.multiplier;
        }
        if (upgrade.autoClick) {
          this.startAutoClicker(upgrade.autoClick);
        }
      }
    },
    startAutoClicker(autoClickRate) {
      if (this.autoClickInterval) {
        clearInterval(this.autoClickInterval);
      }
      this.autoClickInterval = setInterval(() => {
        this.clickerScore += autoClickRate;
      }, 1000);
    },
  },
  beforeUnmount() {
    if (this.autoClickInterval) {
      clearInterval(this.autoClickInterval);
    }
  },
};
</script>
