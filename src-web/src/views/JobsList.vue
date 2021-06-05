<template>
  <div>
    <div v-bind:key="job.techId" v-for="job in jobs">
      <div class="job_list_item">
        <input type="checkbox" v-model="job.worked" disabled/>
        <router-link :to="{name: 'JobDetails', params: {jobId: job.id}}">
          {{job.name}} ({{job.companyName}})
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'JobsList',
  data: function () {
    return {
      jobs: []
    }
  },
  created: function () {
    var component = this
    fetch('/api/job').then(r => r.json()).then(data => {
      component.jobs = data
    })
  },
  methods: {
    goToJobDetails (job) {
      router.push({ name: 'JobDetails', params: { jobId: job.id } })
    }
  }
}
</script>

<style scoped>
a {
    margin-left:1%;
}
</style>
