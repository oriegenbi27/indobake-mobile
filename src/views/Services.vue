<template>
  <div>
    Pengajuan Service
  </div>
</template>

<script>
export default {
  name: 'Service',
  components: {
  },
  data: () => ({
    data: [],
    total: []
  }),
  watch: {
  },
  mounted () {
    // this.LoadService()
  },
  methods: {
    LoadService () {
      this.$store.dispatch('PENGAJUAN_SERVIS_GET')
        .then((res) => {
          if (res.status) {
            this.data = res.data.data.data || []
            this.total = parseInt(res.data.data.total)
          } else {
            this.$store.commit('SNACKBAR', {
              show: true,
              text: 'Something went wrong!'
            })
          }
        })
    }
  }
}
</script>

<style lang="scss">
</style>
