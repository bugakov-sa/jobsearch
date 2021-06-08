<template>
  <div class="job_form">
    <p>Название вакансии<br><input type="text" v-model="newJob.name"/></p>
    <p>Название компании<br><input type="text" v-model="newJob.companyName"/></p>
    Ссылки
    <p><input type="text" v-model="newJobLink"/><button @click="addLink"><font-awesome-icon icon="plus-square"/></button></p>
    <div v-bind:key="i" v-for="(jobLink, i) in newJob.links">
      <button @click="removeLink(i)"><font-awesome-icon icon="trash-alt"/></button><a :href="jobLink.link" v-text="jobLink.link"/>
    </div>
    <br><p>Ошибки разобраны<input type="checkbox" v-model="newJob.worked"/></p>
    <p>Заметки<textarea v-model="newJob.notes"></textarea></p>
    <p>
      <button @click="save"><font-awesome-icon icon="save"/> Сохранить</button>
      <button @click="cancel"><font-awesome-icon icon="window-close"/> Отменить</button>
    </p>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'NewJob',
  data: function () {
    return {
      newJob: { links: [] },
      newJobLink: ''
    }
  },
  methods: {
    addLink () {
      if (this.newJobLink.length > 0) {
        this.newJob.links.unshift({ link: this.newJobLink })
        this.newJobLink = ''
      }
    },
    removeLink (i) {
      this.newJob.links.splice(i, 1)
    },
    save () {
      var options = {
        method: 'post',
        body: JSON.stringify(this.newJob),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
      fetch('/api/job', options).then(r => {
        router.push({ name: 'JobsList' })
      })
    },
    cancel () {
      router.push({ name: 'JobsList' })
    }
  }
}
</script>
