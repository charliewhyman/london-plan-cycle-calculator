'use strict';

//define an object for the land use classes/sub-classes, to use in the cascading dropdowns
const landUseDefinitions = [
   {landUse:'A1', subLandUse:'food retail above 100sqm', quantumType:'sqm'},
   {landUse:'A1', subLandUse:'non-food retail above 100sqm', quantumType:'sqm'},
   {landUse:'A2-A5', subLandUse:'financial / professional services; cafes & restaurants; drinking establishments; take-aways above 100 sqm', quantumType:'sqm'},
   {landUse:'B1', subLandUse:'business offices', quantumType:'sqm'},
   {landUse:'B1', subLandUse:'light industry and research and development', quantumType:'sqm'},
   {landUse:'B2-B8', subLandUse:'general industrial, storage or distribution', quantumType:'sqm'},
   {landUse:'C1', subLandUse:'hotels', quantumType:'bedrooms'},
   {landUse:'C2', subLandUse:'hospitals', quantumType:'FTE staff'},
   {landUse:'C2', subLandUse:'care homes / secure accommodation', quantumType:'FTE staff'},
   {landUse:'C3-C4', subLandUse:'dwellings (all)', quantumType:'dwellings'},
   {landUse:'D1', subLandUse:'nurseries', quantumType:'FTE staff'},
   {landUse:'D1', subLandUse:'primary schools / secondary schools/ sixth form colleges', quantumType:'FTE staff'},
   {landUse:'D1', subLandUse:'universities and colleges', quantumType:'FTE staff'},
   {landUse:'D1', subLandUse:'health centre, including dentists', quantumType:'FTE staff'},
   {landUse:'D1', subLandUse:'health centre, including dentists', quantumType:'FTE staff'},
   {landUse:'D2', subLandUse:'sports (e.g. sports hall, swimming, gymnasium, etc.)', quantumType:'FTE staff'},
   {landUse:'D2', subLandUse:'other (e.g. cinema, bingo, etc.)', quantumType:'FTE staff'},
   {landUse:'Other', subLandUse:'Student accomodation', quantumType:'bedrooms'},
   {landUse:'Other', subLandUse:'Older persons housing', quantumType:'bedrooms'},    
]

//create a display controller function
const displayController = (() => {
    let landUseClassSel = document.getElementById('landUseClassSel');
    let subLandUseClassSel = document.getElementById('subLandUseClassSel');
    //create a function to populate and link the cascading dropdowns
    const fillDropdowns = () => {
        let landUseArray = landUseDefinitions.map(object => object.landUse);
        let uniqueLandUses = [...new Set(landUseArray)];

        for (let index = 0; index < uniqueLandUses.length; index++) {
            const landUseClass = uniqueLandUses[index];
            landUseClassSel.options[landUseClassSel.options.length] = new Option(landUseClass, landUseClass);
        };
    };
    
    const fillSubDropdowns = () => {
        subLandUseClassSel.innerText ='';
        let landUseDefinitionsArray = landUseDefinitions.filter(function(e) {
            return e.landUse === landUseClassSel.options[landUseClassSel.selectedIndex].text;
        })
        let subLandUseArray = landUseDefinitionsArray.map(object => object.subLandUse);

        for (let index = 0; index < subLandUseArray.length; index++) {
            const subLandUseClass = subLandUseArray[index];
            subLandUseClassSel.options[subLandUseClassSel.options.length] = new Option(subLandUseClass, subLandUseClass);
        };
        fillCalculatorCells();
    };

    const fillCalculatorCells = () => {
        let landUseClassSelection = landUseClassSel.options[landUseClassSel.selectedIndex].text;
        let subLandUseClassSelection = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let landUseClassCell = document.getElementById('landUseClassCell');
        let landUseSubClassCell = document.getElementById('landUseSubClassCell');

        if (landUseClassSelection == 'Select Class') {
            return;
        } else {
            landUseClassCell.textContent = landUseClassSelection;
        };
        if (subLandUseClassSelection == 'Select Sub-Class') {
            return;
        } else {
            landUseSubClassCell.textContent = subLandUseClassSelection;
            logicController.setQuantumType();
        };
    };
    
    landUseClassSel.addEventListener('change',fillSubDropdowns);
    subLandUseClassSel.addEventListener('change',fillCalculatorCells);
    
    return {   
        fillDropdowns,
        fillSubDropdowns,
        fillCalculatorCells
    };    
})();

displayController.fillDropdowns();
displayController.fillCalculatorCells();

//define logic controller for calculator
const logicController = (() => {
    
    //create a function to populate and link the cascading dropdowns
    const setQuantumType = () => {
        let selectedSubLandUse = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let quantumTypeElement = document.getElementById('quantumType');
        let selectedObject = landUseDefinitions[landUseDefinitions.map(function (item) { return item.subLandUse; }).indexOf(selectedSubLandUse)];
        let selectedQuantumType = selectedObject.quantumType;

        quantumTypeElement.textContent = selectedQuantumType;
    };
    
    return {   
        setQuantumType,
    };    
})();