$(function() {

    var itemTemplateVacancy = function(value, item) {
        var nameIsPresent = !!value && !!value.name;
        var linkIsPresent = !!value && !!value.link;
        var companyIsPresent = !!value && !!value.companyName;
        var res = $('<td>')
        if(companyIsPresent) {
            res.append(value.companyName).append($('<br>'))
        }
        if(linkIsPresent) {
            var resLink = $('<a>').attr('href', value.link)
            if(nameIsPresent) {
                res.append(resLink.text(value.name))
            }
            else {
                res.append(resLink.text(value.link))
            }
        }
        else {
            if(nameIsPresent) {
                res.append(value.name)
            }
        }
        return res
    }
    var insertTemplateVacancy = function() {
        return $('<td>')
            .append('Ссылка на вакансию')
            .append($('<input>')
                .attr('id', 'vacancyLinkInsertInput')
                .attr('type', 'text')
            )
            .append('Название вакансии')
            .append($('<input>')
                .attr('id', 'vacancyNameInsertInput')
                .attr('type', 'text')
            )
            .append('Название компании')
            .append($('<input>')
                .attr('id', 'companyNameInsertInput')
                .attr('type', 'text')
            )
    }
    var insertValueVacancy = function() {
        var vacancyLink = document.getElementById("vacancyLinkInsertInput").value;
        var vacancyName = document.getElementById("vacancyNameInsertInput").value;
        var companyName = document.getElementById("companyNameInsertInput").value;
        return {'link': vacancyLink, 'name': vacancyName, 'companyName': companyName}
    }
    var editTemplateVacancy = function(value, item) {
        var vacancyLink = ((value != null) && (value.link != null)) ? value.link : '';
        var vacancyName = ((value != null) && (value.name != null)) ? value.name : '';
        var companyName = ((value != null) && (value.name != null)) ? value.companyName : '';
        return $('<td>')
            .append('Ссылка на вакансию')
            .append($('<input>')
                .attr('id', 'vacancyLinkInput')
                .attr('type', 'text')
                .attr('value', vacancyLink)
            )
            .append('Название вакансии')
            .append($('<input>')
                .attr('id', 'vacancyNameInput')
                .attr('type', 'text')
                .attr('value', vacancyName)
            )
            .append('Название компании')
            .append($('<input>')
                .attr('id', 'companyNameInput')
                .attr('type', 'text')
                .attr('value', companyName)
            )
    }
    var editValueVacancy = function() {
        var vacancyLink = document.getElementById("vacancyLinkInput").value;
        var vacancyName = document.getElementById("vacancyNameInput").value;
        var companyName = document.getElementById("companyNameInput").value;
        return {'link': vacancyLink, 'name': vacancyName, 'companyName': companyName}
    }

    $("#jsGrid").jsGrid({
        width: "100%",

        autoload: true,

        editButton: true,
        deleteButton: true,
        clearFilterButton: true,
        modeSwitchButton: true,

        inserting: true,
        filtering: false,
        editing: true,
        sorting: false,
        deleteConfirm: function(item) {
            return "Удалить запись (" + item.companyName + ")?";
        },
        rowClick: function(arg) {},
        onItemInserted: function(arg) {
            $("#jsGrid").jsGrid("sort", { field: "createdAt", order: "desc" });
        },

        controller: {
            loadData: function(filter) {
                var deferred = $.Deferred();
                if(typeof filter.bugsProcessed === 'undefined') {
                    filter.bugsProcessed = "true,false"
                }
                filter.sort = "createdAt,desc";
                $.ajax({
                    url: "api/jobs",
                    dataType: 'json',
                    data: filter,
                    success: function(data) {
                        deferred.resolve(data._embedded.jobs);
                    }
                });
                return deferred.promise();
            },
            insertItem: function(item) {
                var deferred = $.Deferred();
                delete item.createdAt;
                $.ajax({
                    type: "post",
                    url: "api/jobs",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(item),
                    dataType: "json",
                    success: function(data) {
                        deferred.resolve(data);
                    }
                });
                return deferred.promise();
            },
            updateItem: function(item) {
                var deferred = $.Deferred();
                $.ajax({
                    type: "put",
                    url: "api/jobs/" + item.techId,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(item),
                    dataType: "json",
                    success: function(data) {
                        deferred.resolve(data);
                    }
                });
                return deferred.promise();
            },
            deleteItem: function(item) {
                var deferred = $.Deferred();
                $.ajax({
                    type: "delete",
                    url: "api/jobs/" + item.techId,
                    dataType: "json",
                    success: function(data) {
                        deferred.resolve();
                    }
                });
                return deferred.promise();
            }
        },
        fields: [
            { name: "techId", type: "text", visible: false },
            {
                name: "createdAt",
                title: "Дата записи",
                align: "center",
                itemTemplate: function(value, item) {
                    var options = {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    };
                    var createdDate = new Date(value).toLocaleString(options).split(",")[0];
                    return $('<td>').append($('<p>').text(createdDate));
                },
                editing: false,
                width: 60
            },
            {
                name: "vacancy",
                title: "Вакансия",
                type: "text",
                width: 200,
                itemTemplate: itemTemplateVacancy,
                insertTemplate: insertTemplateVacancy,
                insertValue: insertValueVacancy,
                editTemplate: editTemplateVacancy,
                editValue: editValueVacancy
            },
            {
                name: "dialogDescription",
                type: "textarea",
                title: "История общения",
                width: 500,
                validate: "required",
                cellRenderer: function(value, item) {
                    var cell = $('<td>');
                    var lines = value.split(/\r\n|\n\r|\n|\r/);
                    lines.forEach(function(item) {
                        cell.append($('<p>').text(item));
                    });
                    return cell;
                },
                filtering: true
            },
            { name: "bugsProcessed", type: "checkbox", title: "Разбор ошибок",  width: 50 },
            { type: "control" }
        ]
    });
});