import Vue from 'vue'
import VueRouter from 'vue-router'
import JobsList from '../views/JobsList.vue'
import NewJob from '../views/NewJob.vue'
import JobDetails from '../views/JobDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'JobsList',
    component: JobsList
  },
  {
    path: '/job/new',
    name: 'NewJob',
    component: NewJob
  },
  {
    path: '/job/:jobId',
    name: 'JobDetails',
    component: JobDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
