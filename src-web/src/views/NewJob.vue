<template>
  <div class="job_form">
    <p>Название вакансии<br><input type="text" v-model="newJob.name"/></p>
    <p>Название компании<br><input type="text" v-model="newJob.companyName"/></p>
    <p>Ссылка на описание вакансии<br><input type="text" v-model="newJob.link"/></p>
    <p>Ошибки разобраны<input type="checkbox" v-model="newJob.worked"/></p>
    <p>Заметки<br><textarea v-model="newJob.notes"></textarea></p>
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
      newJob: {}
    }
  },
  methods: {
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
