
const JOBS_LIST_MODE = 0;
const JOB_DETAILS_MODE = 1;
const NEW_JOB_MODE = 2;

var pageState = {
    mode: JOBS_LIST_MODE,
    jobs: null,
    job: null,

    loadJobs: function() {
        $.ajax({
            url: "api/jobs",
            dataType: 'json',
            success: function(data) {
                pageState.jobs = data._embedded.jobs;
                pageState.mode = JOBS_LIST_MODE;
                pageState.job = null;
            }
        });
    },
    setJobsListMode: function() {
        this.loadJobs();
    },
    setJobDetailsMode: function(job) {
        this.job = job;
        this.mode = JOB_DETAILS_MODE;
    },
    setNewJobMode: function() {
        this.mode = NEW_JOB_MODE;
    },
    isJobsListMode: function() {
        return this.mode == JOBS_LIST_MODE;
    },
    isJobDetailsMode: function() {
        return this.mode == JOB_DETAILS_MODE;
    },
    isNewJobMode: function() {
        return this.mode == NEW_JOB_MODE;
    }
}

var jobs_header_template = '\
<div class="jobs_header">\
    <div v-if="sharedState.isJobsListMode()">\
        <button v-on:click="goToNewJobView">Новая вакансия</button>\
    </div>\
    <div v-if="sharedState.isJobDetailsMode() || sharedState.isNewJobMode()">\
        <button v-on:click="sharedState.setJobsListMode()">Список вакансий</button>\
    </div>\
</div>\
';
const jobsHeader = {
    data: function() {
        return { sharedState: pageState }
    },
    methods: {
        goToNewJobView() {
            this.sharedState.setNewJobMode();
        }
    },
    template: jobs_header_template
};

var jobs_list_template = '\
<div v-if="sharedState.isJobsListMode()">\
    <div v-for="job in sharedState.jobs">\
        <div class="job_list_item">\
            <button v-on:click="sharedState.setJobDetailsMode(job)">Детали</button>\
            <input type="checkbox" v-model="job.bugsProcessed" disabled/>\
            {{job.vacancy.name}} ({{job.vacancy.companyName}})\
        </div>\
    </div>\
</div>\
';
const jobsList = {
    data: function() {
        return { sharedState: pageState }
    },
    template: jobs_list_template
};

var new_job_template =
'<div class="job_form" v-if="sharedState.isNewJobMode()">' +
    '<p>Название вакансии<br>' +
    '<input type="text" v-model="newJob.name"/></p>' +
    '<p>Название компании<br>' +
    '<input type="text" v-model="newJob.companyName"/></p>' +
    '<p>Ссылка на описание вакансии<br>' +
    '<input type="text" v-model="newJob.link"/></p>' +
    '<p>Ошибки разобраны ' +
    '<input type="checkbox" v-model="newJob.bugsProcessed"/></p>' +
    '<p>История общения<br>' +
    '<textarea v-model="newJob.dialogDescription"/></textarea></p>' +
    '<p><button @click="save">Сохранить</button><button @click="cancel">Отменить</button></p>' +
'</div>';
const newJob = {
  data: function() {
    return {
        newJob: {},
        sharedState: pageState
    }
  },
  methods: {
    save() {
        var newJob = {
            'vacancy': {
                'name': this.newJob.name,
                'companyName': this.newJob.companyName,
                'link': this.newJob.link
            },
            'bugsProcessed': this.newJob.bugsProcessed,
            'dialogDescription': this.newJob.dialogDescription
        };
        this.newJob = {};
        var component = this;
         $.ajax({
            type: "post",
            url: "api/jobs/",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(newJob),
            dataType: "json",
            success: function(data) {
                component.sharedState.setJobsListMode();
            }
        });
    },
    cancel() {
        this.newJob = {};
        this.sharedState.setJobsListMode();
    }
  },
  template: new_job_template
};

var job_details_template =
    '<div v-if="sharedState.isJobDetailsMode()">' +
        '<div class="job_form" v-if="!editing">' +
            '<p>Название вакансии<br>' +
            '<input type="text" v-model="sharedState.job.vacancy.name" readonly/></p>' +
            '<p>Название компании<br>' +
            '<input type="text" v-model="sharedState.job.vacancy.companyName" readonly/></p>' +
            '<p>Ссылка на описание вакансии<br>' +
            '<input type="text" v-model="sharedState.job.vacancy.link" readonly/></p>' +
            '<p>Ошибки разобраны ' +
            '<input type="checkbox" v-model="sharedState.job.bugsProcessed" disabled/></p>' +
            '<p>История общения<br>' +
            '<textarea v-model="sharedState.job.dialogDescription" readonly/></textarea></p>' +
            '<p><button @click="edit">Изменить</button><button @click="remove">Удалить</button></p>' +
        '</div>' +
        '<div class="job_form" v-else>' +
            '<p>Название вакансии<br>' +
            '<input type="text" v-model="editingJob.name"/></p>' +
            '<p>Название компании<br>' +
            '<input type="text" v-model="editingJob.companyName"/></p>' +
            '<p>Ссылка на описание вакансии<br>' +
            '<input type="text" v-model="editingJob.link"/></p>' +
            '<p>Ошибки разобраны ' +
            '<input type="checkbox" v-model="editingJob.bugsProcessed"/></p>' +
            '<p>История общения<br>' +
            '<textarea v-model="editingJob.dialogDescription"/></textarea></p>' +
            '<p><button @click="save">Сохранить</button><button @click="cancel">Отменить</button></p>' +
        '</div>' +
    '</div>';
const jobDetails = {
  data: function() {
    return {
        editing: false,
        editingJob: null,
        sharedState: pageState
    }
  },
  methods: {
    edit() {
        this.editingJob = {
            name: this.sharedState.job.vacancy.name,
            link: this.sharedState.job.vacancy.link,
            companyName: this.sharedState.job.vacancy.companyName,
            bugsProcessed: this.sharedState.job.bugsProcessed,
            dialogDescription: this.sharedState.job.dialogDescription
        }
        this.editing = true;
    },
    remove() {
        if(confirm('Удалить вакансию ' + this.sharedState.job.vacancy.name + '?')) {
            var component = this;
            $.ajax({
                type: "delete",
                url: "api/jobs/" + this.sharedState.job.techId,
                dataType: "json",
                success: function(data) {
                    component.sharedState.setJobsListMode();
                }
            });
        }
    },
    save() {
        this.sharedState.job.vacancy.name = this.editingJob.name;
        this.sharedState.job.vacancy.link = this.editingJob.link;
        this.sharedState.job.vacancy.companyName = this.editingJob.companyName;
        this.sharedState.job.bugsProcessed = this.editingJob.bugsProcessed;
        this.sharedState.job.dialogDescription = this.editingJob.dialogDescription;
        var component = this;
         $.ajax({
            type: "put",
            url: "api/jobs/" + this.sharedState.job.techId,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.sharedState.job),
            dataType: "json",
            success: function(data) {
                component.editing = false;
            }
        });
    },
    cancel() {
        this.editing = false;
        this.editingJob = null;
    }
  },
  template: job_details_template
};

var jobs_template =
    '<div class="jobs">' +
        '<jobs_header></jobs_header>' +
        '<div class="job_center" >' +
            //'<component :is="currentView"></component>' +
            '<jobs_list></jobs_list>' +
            '<job_details></job_details>' +
            '<new_job></new_job>' +
        '</div>' +
    '</div>';
var app = new Vue({
    el: '#app',
    data: function() {
        return {
            currentView: jobsList
        }
    },
    components: {
        'jobs_header': jobsHeader,
        'jobs_list': jobsList,
        'job_details': jobDetails,
        'new_job': newJob
    },
    template: jobs_template
});

pageState.loadJobs();