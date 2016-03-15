"use strict";
var savingService = (function () {
    function registerNewInsurer() {
        var insuranceType = document.getElementById("insuranceType").value;
        var policyNumber = document.getElementById("policyNumber").value;
        var name = document.getElementById("name").value;
        var dataPicker = document.getElementById("dataPicker").value;
        var premium = document.getElementById("premium").value;
        var discount = document.getElementById("discount").value;

        if (!validationForInsuranceType()) {
            alert("Номер полиса не соответствует формату");
        } else {
            if (insuranceType && policyNumber && name && dataPicker && premium && discount) {
                var newInsurer = new Insurer(insuranceType, policyNumber, name, dataPicker, premium, discount);
                moduleLS.save(newInsurer);
                saveTableRow(newInsurer);
            } else {
                alert("Заполнены не все поля");
            }
        }
    }

    function saveTableRow(insurer) {
        var table = document.getElementById("regTable");
        var row = table.insertRow();

        var idCell = row.insertCell(0);
        var insuranceTypeCell = row.insertCell(1);
        var policyNumberCell = row.insertCell(2);
        var nameCell = row.insertCell(3);
        var dataPickerCell = row.insertCell(4);
        var premiumCell = row.insertCell(5);
        var discountCell = row.insertCell(6);

        idCell.innerHTML = insurer._id;
        insuranceTypeCell.innerHTML = insurer._insuranceType;
        policyNumberCell.innerHTML = insurer._policyNumber;
        nameCell.innerHTML = insurer._name;
        dataPickerCell.innerHTML = insurer._dataPicker;
        premiumCell.innerHTML = insurer._premium;
        discountCell.innerHTML = insurer._discount;

        window.onload = deleteAndHighlightRow();
    }

    function loadTableFromLocalStorage() {
        var arr = moduleLS.load();
        arr.forEach(function (item) {
            saveTableRow(item);
        });
    }

    function deleteAndHighlightRow() {
        var table = document.getElementById("regTable");
        highlightTableRows(table);
        var rows = table.getElementsByTagName("tr");
        for (var i = 1; i < rows.length; i++) {
            var row = table.rows[i];
            row.onclick = function (targetRow) {
                return function () {
                    var cell = targetRow.getElementsByTagName("td")[0];
                    var id = cell.innerHTML;
                    if (confirm("Удалить строку с id = " + id + " ?")) {
                        moduleLS.delete(id);
                        deleteRow(row);
                        location.reload();
                    }
                };
            }(row);
        }
    }

    function deleteRow(target) {
        var row = target.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }

    function highlightTableRows(table) {
        var hoverClass = "hoverRow";
        table.onmouseover = table.onmouseout = function (e) {
            if (!e) {
                e = window.event;
            }
            var elem = e.target || e.srcElement;
            if (elem.parentNode.tagName == 'TR') {
                var row = elem.parentNode;
                row.className = (e.type == "mouseover" ? row.className = hoverClass : row.className = " ");
            }
        };
    }

    function deleteAllTableRows() {
        if (confirm("Вы действительно хотите удалить все записи?")) {
            moduleLS.deleteAll();
            location.reload();
        }
    }

    function validationForInsuranceType() {
        var type = document.getElementById("insuranceType").value;
        var value = document.getElementById("policyNumber").value;
        var patternKASKO = /^[0][0-4][0-9][aA][tT][-][0-2][0-9][/][0-9]{5}$/;
        var patternOSAGO = /^[aAbBcCeExX][aAbBcCeExX][aAbBcCeExX][0-9]{10}$/;
        var patternDAGO = /^[0][0-4][0-9][gG][oO][-][0-2][0-9][/][0-9]{5}$/;
        var result = false;
        if (type === "КАСКО") {
            result = patternKASKO.test(value);
        }
        if (type === "ОСАГО") {
            result = patternOSAGO.test(value);
        }
        if (type === "ДАГО") {
            result = patternDAGO.test(value);
        }
        return result;
    }


    return {
        register: registerNewInsurer,
        loadTable: loadTableFromLocalStorage,
        deleteAll: deleteAllTableRows
    };
})();