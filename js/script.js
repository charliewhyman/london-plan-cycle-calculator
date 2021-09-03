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

const shortStayParkingStandards = [
    {subLandUse:'food retail above 100sqm', higherStandards:true, Boundary1:750, Ratio1:20, Boundary2:Infinity, Ratio2:150},
    {subLandUse:'food retail above 100sqm', higherStandards:false, Boundary1:750, Ratio1:40, Boundary2:Infinity, Ratio2:300},

    {subLandUse:'non-food retail above 100sqm', higherStandards:true, Boundary1:1000, Ratio1:60, Boundary2:Infinity, Ratio2:500},
    {subLandUse:'non-food retail above 100sqm', higherStandards:false, Boundary1:1000, Ratio1:125, Boundary2:Infinity, Ratio2:1000},
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
        let landUseClassSelection = landUseClassSel.options[landUseClassSel.selectedIndex].text;
        
        if (landUseClassSelection == 'Select Class') {
            return;
        } else {
            let landUseDefinitionsArray = landUseDefinitions.filter(function(e) {
                return e.landUse === landUseClassSel.options[landUseClassSel.selectedIndex].text;
            })
            let subLandUseArray = landUseDefinitionsArray.map(object => object.subLandUse);
            subLandUseClassSel.options.length = 0;
            subLandUseClassSel.options[subLandUseClassSel.options.length] = new Option('Select Sub-Class');
            for (let index = 0; index < subLandUseArray.length; index++) {
                const subLandUseClass = subLandUseArray[index];
                subLandUseClassSel.options[subLandUseClassSel.options.length] = new Option(subLandUseClass, subLandUseClass);
            };
        }
        
    };

    const resetForm = () => {
        landUseClassSel.selectedIndex = 0;
        subLandUseClassSel.selectedIndex = 0;
        landUseClassCell.textContent = '';
        landUseSubClassCell.textContent = '';
        let quantumTypeElement = document.getElementById('quantumType');
        quantumTypeElement.textContent = '';
    };

    const fillCalculatorCells = () => {
        let landUseClassSelection = landUseClassSel.options[landUseClassSel.selectedIndex].text;
        let landUseClassCell = document.getElementById('landUseClassCell');
        let subLandUseClassSelection = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let landUseSubClassCell = document.getElementById('landUseSubClassCell');

        if (landUseClassSelection == 'Select Class' && subLandUseClassSelection == 'Select Sub-Class') {
            landUseClassCell.textContent = '';
            landUseSubClassCell.textContent = '';

        } else if (landUseClassSelection === 'Select Class' && subLandUseClassSelection !== 'Select Sub-Class') {
            console.log('test1')
            resetForm();
            return;

        } else if (landUseClassSelection !== 'Select Class' && subLandUseClassSelection === 'Select Sub-Class') {
            subLandUseClassSel.selectedIndex = 0;
            console.log('test2')

        } else {
            landUseClassCell.textContent = landUseClassSelection;
            landUseSubClassCell.textContent = subLandUseClassSelection;
            logicController.setQuantumType();
            logicController.calculateShortStayParking();
        };
    };

    landUseClassSel.addEventListener('change',fillSubDropdowns);
    landUseClassSel.addEventListener('change',fillCalculatorCells);
    subLandUseClassSel.addEventListener('change',fillCalculatorCells);
    
    return {   
        fillDropdowns,
        fillSubDropdowns,
        resetForm,
        fillCalculatorCells,
    };    
})();

displayController.fillDropdowns();
displayController.fillCalculatorCells();

//define logic controller for calculator
const logicController = (() => {
    let quantumTypeElement = document.getElementById('quantumType');
    let inputQuantum = document.getElementById('quantumInput').value;

    //create a function to populate and link the cascading dropdowns
    const setQuantumType = () => {
        let selectedSubLandUse = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let selectedLandUseObject = landUseDefinitions[landUseDefinitions.map(function (item) { return item.subLandUse; }).indexOf(selectedSubLandUse)];
        let selectedQuantumType = selectedLandUseObject.quantumType;

        //set the 'Quantum Type' cell based on the selected sub-class
        quantumTypeElement.textContent = selectedQuantumType;
    };

    //calculate the required number of short-stay cycle parking spaces, based on the input quantum and selections
    const calculateShortStayParking = () => {
        let selectedSubLandUse = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let higherStandardsSelection = document.querySelector('input[name="choice-radio"]:checked').value;        ;
        console.log(higherStandardsSelection)
        let roundedShortStayParking = 'Enter quantum';
        let parkingStandardsResult = shortStayParkingStandards.find(x => x.subLandUse === selectedSubLandUse && x.higherStandards == higherStandardsSelection)

        //if statement to determine required number of parking spaces
        

        return roundedShortStayParking;

    };

    //calculate the required number of long-stay cycle parking spaces, based on the input quantum and selections
    const calculateLongStayParking = () => {
        
    };

    const updateOutput = () => {
        //update the short stay parking output box
        let shortStayOutputElement = document.getElementById('shortStayParkingOutput');
        shortStayOutputElement.value = calculateShortStayParking();
        shortStayOutputElement.setAttribute('readonly', 'readonly');

        //update the long stay parking output box
        let longStayOutputElement = document.getElementById('longStayParkingOutput');
        longStayOutputElement.value = calculateLongStayParking();
        longStayOutputElement.setAttribute('readonly', 'readonly');
    };
    
    return {   
        setQuantumType,
        calculateShortStayParking,
        calculateLongStayParking,
        updateOutput
    };    
})();

logicController.updateOutput();