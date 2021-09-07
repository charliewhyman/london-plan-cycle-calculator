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
   {landUse:'D1', subLandUse:'nurseries', quantumType:'FTE staff/students'},
   {landUse:'D1', subLandUse:'primary schools / secondary schools/ sixth form colleges', quantumType:'FTE staff/students'},
   {landUse:'D1', subLandUse:'universities and colleges', quantumType:'FTE staff/students'},
   {landUse:'D1', subLandUse:'health centre, including dentists', quantumType:'FTE staff'},
   {landUse:'D1', subLandUse:'other (e.g. library, church, etc.)', quantumType:'FTE staff'},
   {landUse:'D2', subLandUse:'sports (e.g. sports hall, swimming, gymnasium, etc.)', quantumType:'FTE staff'},
   {landUse:'D2', subLandUse:'other (e.g. cinema, bingo, etc.)', quantumType:'FTE staff'},
   {landUse:'Other', subLandUse:'Student accomodation', quantumType:'bedrooms'},
   {landUse:'Other', subLandUse:'Older persons housing', quantumType:'bedrooms'},    
]

const shortStayParkingStandards = [
    {subLandUse:'food retail above 100sqm', higherStandards:true, boundary:750, lowerRatio:20, upperRatio:150},
    {subLandUse:'food retail above 100sqm', higherStandards:false, boundary:750, lowerRatio:40, upperRatio:300},

    {subLandUse:'non-food retail above 100sqm', higherStandards:true, boundary:1000, lowerRatio:60, upperRatio:500},
    {subLandUse:'non-food retail above 100sqm', higherStandards:false, boundary:1000, lowerRatio:125, upperRatio:1000},

    {subLandUse:'financial / professional services; cafes & restaurants; drinking establishments; take-aways above 100 sqm', higherStandards:true, boundary:0, lowerRatio:20, upperRatio:20},
    {subLandUse:'financial / professional services; cafes & restaurants; drinking establishments; take-aways above 100 sqm', higherStandards:false, boundary:0, lowerRatio:40, upperRatio:40},

    {subLandUse:'business offices', boundary:5000, lowerRatio:500, upperRatio:5000},

    {subLandUse:'light industry and research and development', boundary:0, lowerRatio:1000, upperRatio:1000},

    {subLandUse:'general industrial, storage or distribution', boundary:0, lowerRatio:1000, upperRatio:1000},

    {subLandUse:'hotels', boundary:0, lowerRatio:50, upperRatio:50},

    {subLandUse:'hospitals', boundary:0, lowerRatio:30, upperRatio:30},

    {subLandUse:'care homes / secure accommodation', boundary:0, lowerRatio:20, upperRatio:20},

    {subLandUse:'dwellings (all)', higherStandards:true, lowerBoundary:5, upperBoundary:40, lowerSpaces:2, upperRatio:40},
    {subLandUse:'dwellings (all)', higherStandards:false, lowerBoundary:5, upperBoundary:40, lowerSpaces:2, upperRatio:40},

    {subLandUse:'nurseries', boundary:0, lowerRatio:8, upperRatio:8, secondaryQuantumType:'Students', secondaryRatio:8},

    {subLandUse:'primary schools / secondary schools/ sixth form colleges', boundary:0, lowerRatio:100, upperRatio:100},

    {subLandUse:'universities and colleges', boundary:0, lowerRatio:7, upperRatio:7},

    {subLandUse:'health centre, including dentists', boundary:0, lowerRatio:3, upperRatio:3},

    {subLandUse:'other (e.g. library, church, etc.)', boundary:0, lowerRatio:100, upperRatio:100},

    {subLandUse:'sports (e.g. sports hall, swimming, gymnasium, etc.)', boundary:0, lowerRatio:100, upperRatio:100},

    {subLandUse:'other (e.g. cinema, bingo, etc.)', boundary:0, lowerRatio:30, upperRatio:30},

    {subLandUse:'Student accomodation', boundary:0, lowerRatio:40, upperRatio:40},

    {subLandUse:'Older persons housing', boundary:0, lowerRatio:40, upperRatio:40},
 ]

 const longStayParkingStandards = [
    {subLandUse:'food retail above 100sqm', boundary:0, lowerRatio:175, upperRatio:175},

    {subLandUse:'non-food retail above 100sqm', boundary:1000, lowerRatio:250, upperRatio:1000},

    {subLandUse:'financial / professional services; cafes & restaurants; drinking establishments; take-aways above 100 sqm', boundary:0, lowerRatio:175, upperRatio:175},

    {subLandUse:'business offices', higherStandards:true, boundary:0, lowerRatio:75, upperRatio:75},
    {subLandUse:'business offices', higherStandards:false, boundary:0, lowerRatio:150, upperRatio:150},

    {subLandUse:'light industry and research and development', boundary:0, lowerRatio:250, upperRatio:250},

    {subLandUse:'general industrial, storage or distribution', boundary:0, lowerRatio:500, upperRatio:500},

    {subLandUse:'hotels', boundary:0, lowerRatio:20, upperRatio:20},

    {subLandUse:'hospitals', boundary:0, lowerRatio:5, upperRatio:5},

    {subLandUse:'care homes / secure accommodation', boundary:0, lowerRatio:5, upperRatio:5},

    {subLandUse:'dwellings (all)', onePersonOneBedroomRatio:1, twoPersonOneBedroomRatio:1.5, twoBedroomsPlusRatio:2},

    {subLandUse:'nurseries', boundary:0, lowerRatio:8, upperRatio:8, secondaryQuantumType:'Students', secondaryRatio:8},

    {subLandUse:'primary schools / secondary schools/ sixth form colleges', boundary:0, lowerRatio:8, upperRatio:8, secondaryQuantumType:'Students', secondaryRatio:8},

    {subLandUse:'universities and colleges', boundary:0, lowerRatio:4, upperRatio:4, secondaryQuantumType:'Students', secondaryRatio:20},

    {subLandUse:'health centre, including dentists', boundary:0, lowerRatio:5, upperRatio:5},

    {subLandUse:'sports (e.g. sports hall, swimming, gymnasium, etc.)', boundary:0, lowerRatio:8, upperRatio:8},

    {subLandUse:'other (e.g. cinema, bingo, etc.)', boundary:0, lowerRatio:8, upperRatio:8},

    {subLandUse:'Student accomodation', boundary:0, lowerRatio:0.75, upperRatio:0.75},

    {subLandUse:'Older persons housing', boundary:0, lowerRatio:10, upperRatio:10},
 ]

//create a display controller function
const displayController = (() => {
    let landUseClassSel = document.getElementById('landUseClassSel');
    let subLandUseClassSel = document.getElementById('subLandUseClassSel');
    let calculateButton = document.getElementById('calculateButton');
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
            resetForm();
            return;

        } else if (landUseClassSelection !== 'Select Class' && subLandUseClassSelection === 'Select Sub-Class') {
            subLandUseClassSel.selectedIndex = 0;

        } else {
            landUseClassCell.textContent = landUseClassSelection;
            landUseSubClassCell.textContent = subLandUseClassSelection;
            logicController.setQuantumType();
            logicController.calculateShortStayParking();
        };
    };

    return {   
        fillDropdowns,
        fillSubDropdowns,
        resetForm,
        fillCalculatorCells,
    };    
})();

//define logic controller for calculator
const logicController = (() => {
    let quantumTypeElement = document.getElementById('quantumType');
    //create a function to populate and link the cascading dropdowns
    const setQuantumType = () => {
        let selectedSubLandUse = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let selectedLandUseObject = landUseDefinitions[landUseDefinitions.map(function (item) { return item.subLandUse; }).indexOf(selectedSubLandUse)];
        let selectedQuantumType = selectedLandUseObject.quantumType;

        //set the 'Quantum Type' cell based on the selected sub-class
        quantumTypeElement.textContent = selectedQuantumType;
    };

    const toggleSecondaryOutputs = () => {
        let secondaryOutputs = document.getElementsByClassName('secondaryOutput');

        for(let i = 0; i < secondaryOutputs.length; i++) {
            
            if (secondaryOutputs[i].style.display === 'none') {
                console.log('1')
                secondaryOutputs[i].style.display = 'block';
            } else {
                console.log('2')
                secondaryOutputs[i].style.display = 'none';
            }
        };
    };

    //calculate the required number of short-stay cycle parking spaces, based on the input quantum and selections
    const calculateShortStayParking = () => {
        let inputQuantum = document.getElementById('quantumInput').value;
        let selectedSubLandUse = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let roundedShortStayParking = 0;
        let higherStandardsOption = document.querySelector('input[name="choice-radio"]:checked').value;
        let parkingStandardsResult = {};
        
        //if statement to look up the corresponding parking ratio for the selected sub land use
        if (shortStayParkingStandards.find(x => x.subLandUse === selectedSubLandUse && !('higherStandards' in x))) {
            parkingStandardsResult = shortStayParkingStandards.find(x => x.subLandUse === selectedSubLandUse && !('higherStandards' in x));
        } else if (shortStayParkingStandards.find(x => x.subLandUse === selectedSubLandUse && x.higherStandards == higherStandardsOption)) {
            parkingStandardsResult =shortStayParkingStandards.find(x => x.subLandUse === selectedSubLandUse && x.higherStandards == higherStandardsOption);
        };

        // if statement to return the rounded number of parking spaces
        
        //return a message if no sub class is selected or no quantum input
        if (selectedSubLandUse === 'Select Sub-Class') {
            roundedShortStayParking = 'Select Sub-Class'
        } else if (inputQuantum <= 0) {
            roundedShortStayParking = 'Enter Quantum'

        //handle dwellings case- "5 to 40 dwellings: 2 spaces, Thereafter: 1 space per 40 dwellings"
        } else if (selectedSubLandUse === 'dwellings (all)' && inputQuantum < parkingStandardsResult.lowerBoundary) {
            roundedShortStayParking = 0;
        } else if (selectedSubLandUse === 'dwellings (all)' && inputQuantum <= parkingStandardsResult.upperBoundary) {
            roundedShortStayParking = parkingStandardsResult.lowerSpaces;
        } else if (selectedSubLandUse === 'dwellings (all)') {
            roundedShortStayParking = parkingStandardsResult.lowerSpaces + (inputQuantum - parkingStandardsResult.upperBoundary)/(parkingStandardsResult.upperRatio);
            roundedShortStayParking = Math.ceil(roundedShortStayParking);

        //handle all other cases
        } else if (inputQuantum > parkingStandardsResult.boundary) {
            inputQuantum = parseInt(inputQuantum,10);
            //calculate the portion up to the boundary
            roundedShortStayParking +=(parkingStandardsResult.boundary)/(parkingStandardsResult.lowerRatio);

            //calculate the remaining portion of the quantum
            let remainder = inputQuantum - parkingStandardsResult.boundary;
            roundedShortStayParking += (remainder)/(parkingStandardsResult.upperRatio);

            //round up
            roundedShortStayParking = Math.ceil(roundedShortStayParking);

        } else {
            inputQuantum = parseInt(inputQuantum,10);

            roundedShortStayParking = (inputQuantum)/(parkingStandardsResult.lowerRatio);
            roundedShortStayParking = Math.ceil(roundedShortStayParking);
        };

        return roundedShortStayParking;
    };

    //calculate the required number of long-stay cycle parking spaces, based on the input quantum and selections
    const calculateLongStayParking = () => {
        let inputQuantum = document.getElementById('quantumInput').value;
        let selectedSubLandUse = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let roundedLongStayParking = 0;
        let higherStandardsOption = document.querySelector('input[name="choice-radio"]:checked').value;
        let parkingStandardsResult = {};
        
        //if statement to look up the corresponding parking ratio for the selected sub land use
        if (longStayParkingStandards.find(x => x.subLandUse === selectedSubLandUse && !('higherStandards' in x))) {
            parkingStandardsResult = longStayParkingStandards.find(x => x.subLandUse === selectedSubLandUse && !('higherStandards' in x));
        } else if (longStayParkingStandards.find(x => x.subLandUse === selectedSubLandUse && x.higherStandards == higherStandardsOption)) {
            parkingStandardsResult =longStayParkingStandards.find(x => x.subLandUse === selectedSubLandUse && x.higherStandards == higherStandardsOption);
        };

        // if statement to return the rounded number of parking spaces, if a sub class is selected and a quantum input
        if (selectedSubLandUse === 'Select Sub-Class') {
            roundedLongStayParking = 'Select Sub-Class'
        } else if (inputQuantum <= 0) {
            roundedLongStayParking = 'Enter Quantum'
        } else {
            inputQuantum = parseInt(inputQuantum,10)
            roundedLongStayParking = Math.round((parkingStandardsResult.boundary/parkingStandardsResult.lowerRatio)+(inputQuantum-parkingStandardsResult.boundary)/parkingStandardsResult.upperRatio);
        };

        return roundedLongStayParking;
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
        toggleSecondaryOutputs,
        calculateShortStayParking,
        calculateLongStayParking,
        updateOutput
    };    
})();

//add event listeners
landUseClassSel.addEventListener('change',displayController.fillSubDropdowns);
landUseClassSel.addEventListener('change',displayController.fillCalculatorCells);
subLandUseClassSel.addEventListener('change',displayController.fillCalculatorCells);
landUseClassSel.addEventListener('change',logicController.updateOutput);
subLandUseClassSel.addEventListener('change',logicController.updateOutput);
calculateButton.addEventListener('click',logicController.updateOutput);

//add event listeners for the 'higher standards' radio buttons
var radios = document.querySelectorAll('input[type=radio][name="choice-radio"]');
radios.forEach(radio => radio.addEventListener('change', () => logicController.updateOutput()));

//initial fill of dropdowns and table
displayController.fillDropdowns();
displayController.fillCalculatorCells();

logicController.updateOutput();