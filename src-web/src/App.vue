<template>
  <div id="app" class="jobs">
    <div class="jobs_header">
      <div class="container">
        <div class="row">
          <div class="col-10">
            <router-link :to="{name: 'JobsList'}">Список вакансий</router-link> |
            <router-link :to="{name: 'NewJob'}">Новая вакансия</router-link>
          </div>
          <div class="col-2">
            <div class="user-header">
              <p>Вход</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="job_center">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}
.jobs {
    margin-left: 20%;
    margin-right: 20%;
}
.jobs_header {
    padding-top: 2%;
    padding-bottom: 1%;
    padding-left: 1%;
    padding-right: 1%;
    margin: 1%;
    background-color: #ebf5fb;
    font-weight: bold;
}
.user-header {
    text-align: right;
}
.job_center {
    padding: 2%;
    margin: 1%;
    background-color: #ebf5fb ;
}
a {
  color: #2c3e50;
}
a.router-link-exact-active {
  color: #42b983;
}
</style>

<style>
.job_list_item {
    padding-bottom: 20px;
}
button {
    background-color: #e5e7e9;
    margin-right: 10px;
}
input {
    background-color: #fcf3cf;
}
.job_form > p > input[type=text] {
    width: 50%;
    margin-right: 1%;
}
.job_form > div > input[type=text] {
    width: 50%;
}
.job_form > p > textarea {
    width: 100%;
    height: 10em;
    background-color: #fcf3cf;
}
</style>
