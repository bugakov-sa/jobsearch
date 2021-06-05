<template>
  <div>
    <div class="job_form" v-if="!editing">
      <p>Название вакансии<br><input type="text" v-model="job.name" readonly/></p>
      <p>Название компании<br><input type="text" v-model="job.companyName" readonly/></p>
      <p v-if="hasLink">Ссылка на описание вакансии<br><a :href="job.link" v-text="job.link"/></p>
      <p>Ошибки разобраны <input type="checkbox" v-model="job.worked" disabled/></p>
      <p>Заметки<br><textarea v-model="job.notes" readonly></textarea></p>
      <p>
        <button @click="edit"><font-awesome-icon icon="pen"/> Изменить</button>
        <button @click="remove"><font-awesome-icon icon="trash-alt"/> Удалить</button>
      </p>
    </div>
    <div class="job_form" v-else>
      <p>Название вакансии<br><input type="text" v-model="editingJob.name"/></p>
      <p>Название компании<br><input type="text" v-model="editingJob.companyName"/></p>
      <p>Ссылка на описание вакансии<br><input type="text" v-model="editingJob.link"/></p>
      <p>Ошибки разобраны <input type="checkbox" v-model="editingJob.worked"/></p>
      <p>Заметки<br><textarea v-model="editingJob.notes"></textarea></p>
      <p>
        <button @click="save"><font-awesome-icon icon="save"/> Сохранить</button>
        <button @click="cancel"><font-awesome-icon icon="window-close"/> Отменить</button>
      </p>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'JobDetails',
  data: function () {
    return {
      job: {},
      editing: false,
      editingJob: {}
    }
  },
  computed: {
    hasLink () {
      var link = this.job.link
      return link && link.length > 0
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
      this.editingJob = {
        name: this.job.name,
        link: this.job.link,
        companyName: this.job.companyName,
        worked: this.job.worked,
        notes: this.job.notes
      }
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
    save () {
      this.job.name = this.editingJob.name
      this.job.link = this.editingJob.link
      this.job.companyName = this.editingJob.companyName
      this.job.worked = this.editingJob.worked
      this.job.notes = this.editingJob.notes
      var options = {
        method: 'put',
        body: JSON.stringify(this.job),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
      var component = this
      fetch('/api/job/' + this.$route.params.jobId, options).then(r => {
        component.editing = false
      })
    },
    cancel () {
      this.editing = false
      this.editingJob = null
    }
  }
}
</script>
