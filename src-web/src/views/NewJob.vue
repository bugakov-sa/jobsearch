<template>
  <edit-job-form @save-click="save" @cancel-click="cancel"></edit-job-form>
</template>

<script>
import router from '../router'
import EditJobForm from '../views/EditJobForm.vue'

export default {
  name: 'NewJob',
  components: {
    'edit-job-form': EditJobForm
  },
  methods: {
    save (job) {
      var options = {
        method: 'post',
        body: JSON.stringify(job),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
      fetch('/api/job', options).then(r => {
        if (!r.ok) {
          r.text().then(t => alert(t))
        } else {
          router.push({ name: 'JobsList' })
        }
      })
    },
    cancel () {
      router.push({ name: 'JobsList' })
    }
  }
}
</script>
