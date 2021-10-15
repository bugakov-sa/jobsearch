<template>
  <div>
    <div v-bind:key="job.techId" v-for="job in jobs">
      <div class="job_list_item">
        <input type="checkbox" v-model="job.worked" disabled/>
        <router-link :to="{name: 'JobDetails', params: {jobId: job.id}}">
          {{job.name}} ({{job.companyName}})
        </router-link>
        <span class="job_preview">{{getJobNotesPreview(job)}}</span>
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
    },
    getJobNotesPreview (job) {
      var lines = job.notes.trim().split('\n')
      var lastLine = lines[lines.length - 1]
      var lengthBeforeCut = lastLine.length
      lastLine = lastLine.substring(0, 50)
      if (lastLine.length < lengthBeforeCut) {
        lastLine = lastLine + '...'
      }
      return lastLine
    }
  }
}
</script>

<style scoped>
a {
    margin-left:1%;
}
.job_preview {
    padding-left: 1%;
}
</style>
