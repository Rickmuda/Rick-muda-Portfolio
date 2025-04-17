<template>
  <div class="clicker-game">
    <h2>{{ $t('clickTheRick') }}</h2>
    <p>{{ $t('score') }}: {{ clickerScore }}</p>
    <img
      src="/src/assets/img/minigame.webp"
      alt="Click Me"
      class="clicker-image"
      @click="incrementScore"
    />
    <div class="upgrades">
      <h3>{{ $t('upgrades') }}</h3>
      <div class="upgrade" v-for="(upgrade, index) in upgrades" :key="index">
        <p>{{ upgrade.name }}</p>
        <p>{{ $t('cost') }}: {{ upgrade.cost }}</p>
        <p v-if="upgrade.multiplier">{{ $t('nextMultiplier') }}: x{{ upgrade.multiplier }}</p>
        <p v-if="upgrade.autoClick">{{ $t('autoClicks') }}: +{{ upgrade.autoClick }}/{{ $t('sec') }}</p>
        <button
          :disabled="clickerScore < upgrade.cost"
          @click="purchaseUpgrade(index)"
        >
          {{ $t('buy') }}
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
        { name: this.$t('doubleClicks'), cost: 10, multiplier: 2 },
        { name: this.$t('autoClicker'), cost: 50, autoClick: 1 },
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
