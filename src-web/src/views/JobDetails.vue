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
    <div class="job_form" v-else>
      <p>Название вакансии<br><input type="text" v-model="editingJob.name"/></p>
      <p>Название компании<br><input type="text" v-model="editingJob.companyName"/></p>
      Ссылки
      <p><input type="text" v-model="newJobLink"/><button @click="addLink"><font-awesome-icon icon="plus-square"/></button></p>
      <div v-bind:key="i" v-for="(jobLink, i) in editingJob.links">
        <button @click="removeLink(i)"><font-awesome-icon icon="trash-alt"/></button><a :href="jobLink.link" v-text="jobLink.link"/>
      </div>
      <br><p>Ошибки разобраны <input type="checkbox" v-model="editingJob.worked"/></p>
      <p>Заметки<textarea v-model="editingJob.notes"></textarea></p>
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
      newJobLink: '',
      editing: false,
      editingJob: {}
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
    addLink () {
      if (this.newJobLink.length > 0) {
        this.editingJob.links.unshift({ link: this.newJobLink })
        this.newJobLink = ''
      }
    },
    removeLink (i) {
      this.editingJob.links.splice(i, 1)
    },
    edit () {
      this.editingJob = {
        name: this.job.name,
        companyName: this.job.companyName,
        worked: this.job.worked,
        notes: this.job.notes,
        links: Array.from(this.job.links)
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
      this.job.companyName = this.editingJob.companyName
      this.job.worked = this.editingJob.worked
      this.job.notes = this.editingJob.notes
      this.job.links = Array.from(this.editingJob.links)
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
