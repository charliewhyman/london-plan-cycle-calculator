'use strict';

//define an object for the land use classes/sub-classes, to use in the cascading dropdowns
var landUseDefinitions = {
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

//create a display controller function
const displayController = (() => {
    //create a function to populate and link the cascading dropdowns
    const fillDropdowns = () => {
        var landUseClassSel = document.getElementById('landUseClassSel');
        let landUseSubClassSel = document.getElementById('landUseSubClassSel');

        for (let landUseClass in landUseDefinitions) {
            landUseClassSel.options[landUseClassSel.options.length] = new Option(landUseClass, landUseClass);
        }
        const fillSubDropdown = function () {
            landUseSubClassSel.length = 1; // remove all options in dropdown first
            if (this.selectedIndex < 1) return;
            let fieldList = landUseDefinitions[this.value];
            for (let field in fieldList) {
                landUseSubClassSel.options[landUseSubClassSel.options.length] = new Option(fieldList[field], field);
            }
        }
        landUseClassSel.addEventListener('change',fillSubDropdown);
        landUseSubClassSel.addEventListener('change',fillCalculatorCells);


    };

    const fillCalculatorCells = () => {
        let landUseClassSelection = landUseClassSel.options[landUseClassSel.selectedIndex].text;
        let landUseSubClassSelection = landUseSubClassSel.options[landUseSubClassSel.selectedIndex].text;
        let landUseClassCell = document.getElementById('landUseClassCell');
        let landUseSubClassCell = document.getElementById('landUseSubClassCell');

        if (landUseClassSelection == 'Select Class') {
            return;
        } else {
            landUseClassCell.textContent = landUseClassSelection;
        };
        if (landUseSubClassSelection == 'Select Sub-Class') {
            return;
        } else {
            landUseSubClassCell.textContent = landUseSubClassSelection;
        };


    };

    return {   
        fillDropdowns,
        fillCalculatorCells
    };
})();

displayController.fillDropdowns();
displayController.fillCalculatorCells();






