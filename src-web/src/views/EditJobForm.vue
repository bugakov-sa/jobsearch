<template>
  <div class="job_form">
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
</template>

<script>
export default {
  name: 'EditJobForm',
  props: ['job'],
  data: function () {
    var jobCopy = { links: [] }
    if (this.job) {
      Object.assign(jobCopy, this.job)
      jobCopy.links = Array.from(this.job.links)
    }
    return {
      editingJob: jobCopy,
      newJobLink: ''
    }
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
    save () {
      this.$emit('save-click', this.editingJob)
    },
    cancel () {
      this.$emit('cancel-click', this.editingJob)
    }
  }
}
</script>
