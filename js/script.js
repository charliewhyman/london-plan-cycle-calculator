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
   {landUse:'D1', subLandUse:'primary schools / secondary schools/ sixth form colleges', quantumType:'FTE staff'},
   {landUse:'D1', subLandUse:'universities and colleges', quantumType:'FTE staff'},
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

    {subLandUse:'nurseries', boundary:0, lowerRatio:8, upperRatio:8},

    {subLandUse:'primary schools / secondary schools/ sixth form colleges', boundary:0, lowerRatio:8, upperRatio:8},

    {subLandUse:'universities and colleges', boundary:0, lowerRatio:4, upperRatio:20},

    {subLandUse:'health centre, including dentists', boundary:0, lowerRatio:5, upperRatio:5},

    {subLandUse:'other (e.g. library, church, etc.)', boundary:0, lowerRatio:8, upperRatio:8},

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
    var outputElements = document.getElementsByClassName('longStayOutput');
    let calculatorTable = document.getElementById('calculatorTable');
    let primaryQuantumTypeElement = document.getElementById('quantumType');


    //save the initial state of the table
    var originalHTML = calculatorTable.innerHTML;

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


    //define a function to create new rows in the calculator table, including an offset parameter to account for merged cells
    const generateTableCells = (numCells, offset) => {
        let landUseTBody = calculatorTable.getElementsByTagName('tbody')[0];

        let numNewRows = numCells;
        let numColumns = calculatorTable.rows[0].cells.length;
        for (let index = 0; index < numNewRows -1; index++) {
            var row = landUseTBody.insertRow(-1);
            for (let index = 1; index < numColumns - offset; index++) {
                var cell = row.insertCell(-1);
                cell.id = index;
            };
        };
    };

    const addStudentsRow = () => {
        let landUseClassSelection = landUseClassSel.options[landUseClassSel.selectedIndex].text;
        let landUseClassCell = document.getElementById('landUseClassCell');
        let subLandUseClassSelection = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let landUseSubClassCell = document.getElementById('landUseSubClassCell');

        generateTableCells(2,1);

         //merge the Use Class and Sub-Class cells
         calculatorTable.rows[1].cells[0].rowSpan = 2;
         calculatorTable.rows[1].cells[1].rowSpan = 2;

         //set Use Class and Land Use class text
         landUseClassCell.textContent = landUseClassSelection;
         landUseSubClassCell.textContent = subLandUseClassSelection;

        let studentInput = document.createElement("INPUT");
        studentInput.setAttribute('type', 'number');
        studentInput.id = 'studentInput';
        calculatorTable.rows[2].cells[0].appendChild(studentInput);
        
        calculatorTable.rows[1].cells[3].textContent = 'FTE Staff';
        calculatorTable.rows[2].cells[1].textContent = 'Students';
    };

    const fillCalculatorCells = () => {
        let landUseClassSelection = landUseClassSel.options[landUseClassSel.selectedIndex].text;
        let landUseClassCell = document.getElementById('landUseClassCell');
        let subLandUseClassSelection = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let landUseSubClassCell = document.getElementById('landUseSubClassCell');
        let shortStayOutputLabel = document.getElementById('shortStayOutputLabel');
        shortStayOutputLabel.textContent = 'Required short-stay'

        //reset table rows
        while(calculatorTable.rows.length > 2) {
            calculatorTable.deleteRow(-1);
          };

        //show all output boxes to start
        for(var i = 0; i < outputElements.length; i++){
            var a = outputElements[i];
            a.style.display = 'inline-block';
        };   

        if (landUseClassSelection == 'Select Class' && subLandUseClassSelection == 'Select Sub-Class') {
            landUseClassCell.textContent = '';
            landUseSubClassCell.textContent = '';

        } else if (landUseClassSelection === 'Select Class' && subLandUseClassSelection !== 'Select Sub-Class') {
            resetForm();
            return;

        } else if (landUseClassSelection !== 'Select Class' && subLandUseClassSelection === 'Select Sub-Class') {
            subLandUseClassSel.selectedIndex = 0;

        } else if (subLandUseClassSelection == 'dwellings (all)')  {
            //insert extra rows for bedrooms input
            generateTableCells(3,1);

            //merge the Use Class and Sub-Class cells
            calculatorTable.rows[1].cells[0].rowSpan = 3;
            calculatorTable.rows[1].cells[1].rowSpan = 3;

            //add quantum inputs in new rows
            let newInputOne = document.createElement("INPUT");
            newInputOne.setAttribute('type', 'number');
            newInputOne.id = 'quantumInputTwo';
            calculatorTable.rows[2].cells[0].appendChild(newInputOne);

            let newInputTwo = document.createElement("INPUT");
            newInputTwo.setAttribute('type', 'number');
            newInputTwo.id = 'quantumInputThree';
            calculatorTable.rows[3].cells[0].appendChild(newInputTwo);

            //set Use Class and Land Use class text
            landUseClassCell.textContent = landUseClassSelection;
            landUseSubClassCell.textContent = subLandUseClassSelection;
            //set the Quantum Type cell text
            calculatorTable.rows[1].cells[3].textContent = 'studio / 1 person 1 bedroom dwelling';
            calculatorTable.rows[2].cells[1].textContent = '2 person 1 bedroom dwelling';
            calculatorTable.rows[3].cells[1].textContent = 'all other dwellings';

            //calculate required parking
            logicController.calculateShortStayParking();
            logicController.calculateLongStayParking();


        //separate if statement for nurseries, as they use a different requirement (1 space per 8 FTE staff + 1 space per 8 students)
        } else if (subLandUseClassSelection == 'nurseries') { 
            addStudentsRow();
            //Hide one of the input boxes, as the requirement does not correspond to short- or long- stay parking
            for(var i = 0; i < outputElements.length; i++){
                var a = outputElements[i];
                a.style.display = 'none';
            };

            shortStayOutputLabel.textContent = 'Total spaces';
            //calculate required parking
            logicController.calculateShortStayParking();
            logicController.calculateLongStayParking();
        } else if (subLandUseClassSelection == 'primary schools / secondary schools/ sixth form colleges' || subLandUseClassSelection == 'universities and colleges') {
            addStudentsRow();
            //set the Quantum Type cell text
            displayController.setQuantumType();
            //calculate required parking
            logicController.calculateShortStayParking();
            logicController.calculateLongStayParking();
        } else {

            //set Use Class and Land Use class text
            landUseClassCell.textContent = landUseClassSelection;
            landUseSubClassCell.textContent = subLandUseClassSelection;
            //set the Quantum Type cell text
            displayController.setQuantumType();
            //calculate required parking
            logicController.calculateShortStayParking();
            logicController.calculateLongStayParking();
        };
    };
    

    //define a function to set the 'quantum type' cell based on the selected sub-class
    const setQuantumType = () => {
        let selectedSubLandUse = subLandUseClassSel.options[subLandUseClassSel.selectedIndex].text;
        let selectedLandUseObject = landUseDefinitions[landUseDefinitions.map(function (item) { return item.subLandUse; }).indexOf(selectedSubLandUse)];
        let selectedQuantumType = selectedLandUseObject.quantumType;

        //set the 'Quantum Type' cell based on the selected sub-class        
        primaryQuantumTypeElement.textContent = selectedQuantumType;
    };

    const resetForm = () => {
        landUseClassSel.selectedIndex = 0;
        subLandUseClassSel.selectedIndex = 0;
        landUseClassCell.textContent = '';
        landUseSubClassCell.textContent = '';
        primaryQuantumTypeElement.textContent = '';

    };

    return {  
        fillDropdowns,
        fillSubDropdowns,
        addStudentsRow,
        generateTableCells,
        fillCalculatorCells,
        setQuantumType,
        resetForm,
    };    
})();

//define logic controller for calculator
const logicController = (() => {
    //create a function to populate and link the cascading dropdowns
   

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
        } else if (selectedSubLandUse === 'dwellings (all)') {
            let onePersonOneBedroomInput = inputQuantum;
            let twoPersonOneBedroomInput = document.getElementById('quantumInputTwo').value;
            let twoBedroomsPlusInput = document.getElementById('quantumInputThree').value;

            inputQuantum = +onePersonOneBedroomInput + +twoPersonOneBedroomInput + +twoBedroomsPlusInput;

            if (inputQuantum < parkingStandardsResult.lowerBoundary) {
                roundedShortStayParking = 0;
            } else if (selectedSubLandUse === 'dwellings (all)' && inputQuantum <= parkingStandardsResult.upperBoundary) {
                roundedShortStayParking = parkingStandardsResult.lowerSpaces;
            } else if (selectedSubLandUse === 'dwellings (all)') {
                roundedShortStayParking = parkingStandardsResult.lowerSpaces + (inputQuantum - parkingStandardsResult.upperBoundary)/(parkingStandardsResult.upperRatio);
                roundedShortStayParking = Math.ceil(roundedShortStayParking);
        };
        
    // handle nursery land use case (FTE Staff + Students)
        } else if (selectedSubLandUse == 'nurseries') {
            inputQuantum = parseInt(inputQuantum,10);
            let studentInputQuantum = document.getElementById('studentInput').value || 0;
            studentInputQuantum = parseInt(studentInputQuantum,10);
        
            let staffParking = (inputQuantum/parkingStandardsResult.lowerRatio);

            let studentParking = (studentInputQuantum/parkingStandardsResult.upperRatio);
            //round up
            roundedShortStayParking = Math.ceil(staffParking + studentParking);
    // handle primary school land use case (FTE Staff + Students for long-stay, Students only for short-case)
        } else if (selectedSubLandUse == 'primary schools / secondary schools/ sixth form colleges' || selectedSubLandUse == 'universities and colleges') {
            inputQuantum = parseInt(inputQuantum,10);
            let studentInputQuantum = document.getElementById('studentInput').value || 0;
            if (studentInputQuantum >= 0) {
                studentInputQuantum = parseInt(studentInputQuantum,10);
        
                let studentParking = (studentInputQuantum/parkingStandardsResult.upperRatio);
                //round up
                roundedShortStayParking = Math.ceil(studentParking);
            };    
  
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

        // if statement to return the rounded number of parking spaces
        //return a message if no sub class is selected or no quantum input
        if (selectedSubLandUse === 'Select Sub-Class') {
            roundedLongStayParking = 'Select Sub-Class'
        } else if (inputQuantum <= 0) {
            roundedLongStayParking = 'Enter Quantum'

        // handle primary school land use case (FTE Staff + Students for long-stay, Students only for short-case)
        } else if (selectedSubLandUse == 'primary schools / secondary schools/ sixth form colleges' || selectedSubLandUse == 'universities and colleges') {
            inputQuantum = parseInt(inputQuantum,10);
            let studentInputQuantum = document.getElementById('studentInput').value || 0;
            if (studentInputQuantum >= 0) {
                studentInputQuantum = parseInt(studentInputQuantum,10);
            
                let staffParking = (inputQuantum/parkingStandardsResult.lowerRatio);

                let studentParking = (studentInputQuantum/parkingStandardsResult.upperRatio);
                //round up
                roundedLongStayParking = Math.ceil(staffParking + studentParking);
            }; 

        //handle dwellings case- "• 1 space per studio or 1 person 1 bedroom dwelling, 1.5 spaces per 2 person 1 bedroom dwelling, 2 spaces per all other dwellings"
        } else if (selectedSubLandUse === 'dwellings (all)') {
            let onePersonOneBedroomInput = inputQuantum;
            let twoPersonOneBedroomInput = document.getElementById('quantumInputTwo').value;
            let twoBedroomsPlusInput = document.getElementById('quantumInputThree').value;

            let onePersonOneBedroomParking = onePersonOneBedroomInput*parkingStandardsResult.onePersonOneBedroomRatio;
            let twoPersonOneBedroomParking = twoPersonOneBedroomInput*parkingStandardsResult.twoPersonOneBedroomRatio;
            let twoBedroomsPlusParking = twoBedroomsPlusInput*parkingStandardsResult.twoBedroomsPlusRatio;

            roundedLongStayParking = onePersonOneBedroomParking + twoPersonOneBedroomParking + twoBedroomsPlusParking;
            roundedLongStayParking = Math.ceil(roundedLongStayParking);

        //handle all other cases
        } else if (inputQuantum > parkingStandardsResult.boundary) {
            inputQuantum = parseInt(inputQuantum,10);
            //calculate the portion up to the boundary
            roundedLongStayParking +=(parkingStandardsResult.boundary)/(parkingStandardsResult.lowerRatio);

            //calculate the remaining portion of the quantum
            let remainder = inputQuantum - parkingStandardsResult.boundary;
            roundedLongStayParking += (remainder)/(parkingStandardsResult.upperRatio);

            //round up
            roundedLongStayParking = Math.ceil(roundedLongStayParking);

        } else {
            inputQuantum = parseInt(inputQuantum,10);

            roundedLongStayParking = (inputQuantum)/(parkingStandardsResult.lowerRatio);
            roundedLongStayParking = Math.ceil(roundedLongStayParking);
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