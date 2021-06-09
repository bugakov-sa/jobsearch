<template>
  <div>
    <div class="job_form" v-if="!editing">
      <p>Название вакансии<br><input type="text" v-model="job.name" readonly/></p>
      <p>Название компании<br><input type="text" v-model="job.companyName" readonly/></p>
      <div v-if="hasJobLinks">Ссылки
        <div v-bind:key="i" v-for="(jobLink, i) in job.links">
          <a :href="jobLink.link" v-text="jobLink.link"/>
        </div>
      </div>
      <br><p>Ошибки разобраны <input type="checkbox" v-model="job.worked" disabled/></p>
      <p>Заметки<textarea v-model="job.notes" readonly></textarea></p>
      <p>
        <button @click="edit"><font-awesome-icon icon="pen"/> Изменить</button>
        <button @click="remove"><font-awesome-icon icon="trash-alt"/> Удалить</button>
      </p>
    </div>
    <edit-job-form :job="job" @save-click="save" @cancel-click="cancel" v-else></edit-job-form>
  </div>
</template>

<script>
import router from '../router'
import EditJobForm from '../views/EditJobForm.vue'

export default {
  name: 'JobDetails',
  components: {
    'edit-job-form': EditJobForm
  },
  data: function () {
    return {
      job: {},
      editing: false
    }
  },
  computed: {
    hasJobLinks () {
      var links = this.job.links
      return links && links.length > 0
    }
  },
  created: function () {
    var component = this
    fetch('/api/job/' + this.$route.params.jobId).then(r => r.json()).then(data => {
      component.job = data
    })
  },
  methods: {
    edit () {
      this.editing = true
    },
    remove () {
      if (confirm('Удалить вакансию ' + this.job.name + '?')) {
        var options = {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
        fetch('/api/job/' + this.$route.params.jobId, options).then(r => {
          router.push({ name: 'JobsList' })
        })
      }
    },
    save (job) {
      var options = {
        method: 'put',
        body: JSON.stringify(job),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
      var component = this
      fetch('/api/job/' + this.$route.params.jobId, options).then(r => r.json()).then(data => {
        this.job = data
        component.editing = false
      })
    },
    cancel () {
      this.editing = false
    }
  }
}
</script>
