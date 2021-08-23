'use strict';

var landUseObject = {
    'A1': ['food retail above 100sqm', 'non-food retail above 100sqm'],
    'A2-A5': ['financial / professional services; cafes & restaurants; drinking establishments; take-aways above 100 sqm'],
    'B1': ['business offices'],
    'B1': ['light industry and research and development'],
    'B2-B8': ['general industrial, storage or distribution'],
    'C1': ['hotels'],
    'C2': ['hospitals'],
    'C2': ['care homes / secure accommodation'],
    'C3-C4': ['dwellings (all)'],
    'D1': ['nurseries'],
    'D1': ['primary schools / secondary schools/ sixth form colleges'],
    'D1': ['universities and colleges'],
    'D1': ['health centre, including dentists'],
    'D1': ['other (e.g. library, church, etc.)'],
    'D2': ['sports (e.g. sports hall, swimming, gymnasium, etc.)'],
    'D2': ['other (e.g. cinema, bingo, etc.)'],
    'Student accomodation': ['Student accomodation'],
    'Older persons housing': ['Older persons housing'],
}

window.onload = function () {
    var landUseClassSel = document.getElementById('landUseClassSel'),
        landUseSubClassSel = document.getElementById('landUseSubClassSel')
    for (var landUseClass in landUseObject) {
        landUseClassSel.options[landUseClassSel.options.length] = new Option(landUseClass, landUseClass);
    }
    landUseClassSel.onchange = function () {
        landUseSubClassSel.length = 1; // remove all options bar first
        if (this.selectedIndex < 1) return; // done  
        var ft = landUseObject[this.value];
        for (var field in landUseObject[this.value]) {
            landUseSubClassSel.options[landUseSubClassSel.options.length] = new Option(ft[field], field);
        }
    }
    landUseClassSel.onchange();
}