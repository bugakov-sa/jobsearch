
const ANSWER_GOOD = 2;
const ANSWER_WEAK = 1;
const ANSWER_NO = 0;

var app = new Vue({
    el: '#app',
    data: function() {
        return {
            questions:[{
                id: 1,
                text: 'Как работает ключевое слово volatile?',
                answer_rating: ANSWER_GOOD,
                worked: false,
                tags: ['Concurrency']
            }, {
                id: 2,
                text: 'Что происходит после ввода в браузере google.com и нажатия enter?',
                answer_rating: ANSWER_WEAK,
                worked: false,
                tags: ['Сетевые протоколы']
            }, {
                id: 3,
                text: 'Сколько длится rollback после вставки большого количества строк?',
                answer_rating: ANSWER_WEAK,
                worked: false,
                tags: ['Базы данных', 'SQL']
            }]
        }
    },
    methods: {
        styleOfQuestion(q) {
            if(!q.worked && q.answer_rating === ANSWER_NO)
                return 'high_critical';
            if(!q.worked && q.answer_rating === ANSWER_WEAK)
                return 'low_critical';
            return 'no_critical';
        }
    },
    template: '\
<div class="questions_list">\
    <div v-for="q in questions" v-bind:class="styleOfQuestion(q)">\
        <td><input type="checkbox" disabled v-bind:checked="q.worked"></input></td><td>{{q.text}}<br>\
        <button class="question_tag" v-for="t in q.tags" disabled>{{t}}</button></td>\
    </div>\
</div>\
'
});