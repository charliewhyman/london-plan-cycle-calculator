'use strict';

//define an object for the land use classes/sub-classes, to use in the cascading dropdowns
/* const landUseDefinitions = {
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
} */

const newLandUseDefinitions = [
   {landUse:'A1', subLandUse:'food retail above 100sqm'},
   {landUse:'A1', subLandUse:'non-food retail above 100sqm'},
   {landUse:'A2-A5', subLandUse:'financial / professional services; cafes & restaurants; drinking establishments; take-aways above 100 sqm'},
   {landUse:'B1', subLandUse:'business offices'},
   {landUse:'B1', subLandUse:'light industry and research and development'},
   {landUse:'B2-B8', subLandUse:'general industrial, storage or distribution'},
   {landUse:'C1', subLandUse:'hotels'},
   {landUse:'C2', subLandUse:'hospitals'},
   {landUse:'C2', subLandUse:'care homes / secure accommodation'},
   {landUse:'C3-C4', subLandUse:'dwellings (all)'},
   {landUse:'D1', subLandUse:'nurseries'},
   {landUse:'D1', subLandUse:'primary schools / secondary schools/ sixth form colleges'},
   {landUse:'D1', subLandUse:'universities and colleges'},
   {landUse:'D1', subLandUse:'health centre, including dentists'},
   {landUse:'D1', subLandUse:'health centre, including dentists'},
   {landUse:'D2', subLandUse:'sports (e.g. sports hall, swimming, gymnasium, etc.)'},
   {landUse:'D2', subLandUse:'other (e.g. cinema, bingo, etc.)'},
   {landUse:'Other', subLandUse:'Student accomodation'},
   {landUse:'Other', subLandUse:'Older persons housing'},    
]

//create a display controller function
const displayController = (() => {
    let landUseClassSel = document.getElementById('landUseClassSel');
    let landUseSubClassSel = document.getElementById('landUseSubClassSel');
    //create a function to populate and link the cascading dropdowns
    const fillDropdowns = () => {
        let landUseArray = newLandUseDefinitions.map(object => object.landUse);
        let uniqueLandUses = [...new Set(landUseArray)];

        for (let index = 0; index < uniqueLandUses.length; index++) {
            const landUseClass = uniqueLandUses[index];
            landUseClassSel.options[landUseClassSel.options.length] = new Option(landUseClass, landUseClass);
        };
    };
    
    const fillSubDropdowns = () => {
        let newLandUseDefinitionsArray = newLandUseDefinitions.filter(function(e) {
            return e.landUse === landUseClassSel.options[landUseClassSel.selectedIndex].text;;
        })
        let subLandUseArray = newLandUseDefinitionsArray.map(object => object.subLandUse);

        for (let index = 0; index < subLandUseArray.length; index++) {
            const subLandUseClass = subLandUseArray[index];
            landUseSubClassSel.options[landUseSubClassSel.options.length] = new Option(subLandUseClass, subLandUseClass);
        };
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
    
    landUseClassSel.addEventListener('change',fillSubDropdowns);
    landUseSubClassSel.addEventListener('change',fillCalculatorCells);
    
    return {   
        fillDropdowns,
        fillSubDropdowns,
        fillCalculatorCells
    };    
})();

displayController.fillDropdowns();
displayController.fillCalculatorCells();

//define logic controller for calculator