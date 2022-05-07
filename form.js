
// FORM MAIN FUNCTIONS --> TIMER 

// defino el número inicial
var n = 0;


// main container
let main = document.getElementById('main-form-container');

// back face container
let backFace = document.getElementById('grats-face');


// close button
let closeButton = document.getElementById('close');


// Counter
var cont = document.getElementById("number");


// Value element
let valueElment = document.getElementById('value');

// main index value
let index = JSON.parse(localStorage.getItem('index'));

// Submit button
let buttonForm = document.getElementById('btn-submit');

// date input
let dateInput = document.getElementById('dateInput');

// Dates values
let yElement = document.getElementById('yElement');
let zElement = document.getElementById('zElement');


// PopUp button EY

let popButton = document.getElementById('pupUpButton');





// Date calcualtion
let d = new Date();

let month = d.getMonth();
let date = d.getDate();
let day = d.getDay();
let year = d.getFullYear();

let Months = ["1", "2", "3", "4", "5", "6", "7","8","9","10", "11", "12"];

console.log(Months[month] + " / " + date + " / " + year);

// Varaible related to the 1st month 
let y = JSON.parse(localStorage.getItem('y'));
// Varaible related to the 2nd month 
let z = JSON.parse(localStorage.getItem('z'));



lapseCounter();

function lapseCounter() {
    window.setInterval(function () {

        // igualo valores del núumero inicial del contador
        cont.innerHTML = n;

        // Incremento el número 
        n++;


        // HERE WE PUT THE DATE CONDITIONAL ----> 1st A DATE MUST BE PROVIDED
        if ( (Months[month]==4) && (yElement.innerText==0)) {
            // alert('1st month test submited');
            index=0;
            y=1;
            z=0;
            savingMonthValues ();
        } else if ((Months[month]==5) && (zElement.innerText==0)) {
            // alert('2nd month test submited');
            index=0;
            y=0;
            z=1;
            savingMonthValues ();
        }

        popButton.addEventListener('click', function () {
            index=0;
            backFace.className = ('none');
            buttonForm.style.opacity='1';
            localStorage.setItem('index', JSON.stringify(index));
            index = JSON.parse(localStorage.getItem('index'));
            valueElment.innerText = index;
            // igualo valores del núumero inicial del contador
            cont.innerHTML = 3;
            apearForm();
        })


        // stored value
        apearForm();
        function apearForm () {
            if (valueElment.innerText == 0) {
                if (cont.innerHTML == 3) {
                    console.log('Time up');
    
                    main.style.top='0';
                    main.style.left='0';
    
                    buttonForm.parentElement.style.display='flex';
    
                    buttonForm.addEventListener('click', function () {
                        console.log('click');
                        buttonForm.style.opacity='0';
                        backFace.className = ('showingBackface');
                        index = 1;
                        pepe()
    
                    })
                    closeButton.addEventListener('click', function () {
                        console.log('click');
                        main.style.top='-200vh';
                        index = 1;
                        pepe()
    
                    })
    
                };
            }
        }
        

    // Time
    }, 1000);
}




// Storage
pepe()
function pepe() {
    localStorage.setItem('index', JSON.stringify(index));
    console.log('Saved value : ' + localStorage.index);

    index = JSON.parse(localStorage.getItem('index'));
    valueElment.innerHTML = index;

}


// Month values storage
savingMonthValues ();
function savingMonthValues () {
    localStorage.setItem('index', JSON.stringify(index));
    localStorage.setItem('y', JSON.stringify(y));
    localStorage.setItem('z', JSON.stringify(z));

    // Main form storage
    index = JSON.parse(localStorage.getItem('index'));
    valueElment.innerHTML = index;

    // Date one storage
    y = JSON.parse(localStorage.getItem('y'));
    yElement.innerHTML = y;

    // Date two storage
    z = JSON.parse(localStorage.getItem('z'));
    zElement.innerHTML = z;
}





// FORM POST - USERFLOW AND JSON

$(function () {
    $('#btn-submit').click(function () {
        dateInput.value = Months[month] + " / " + date + " / " + year;
        var formData = { name: $("#dateInput").val(), job: $("#format").val(), comment: $("#comment").val() };
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            url: "https://prod-112.westeurope.logic.azure.com:443/workflows/b6a4bab4b4fa4ae3a91ab25984514cc7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YPmxXIl5Z08Mvj78fLX0kWaPxZIXgvFylgM_F7f55y0",
            data: JSON.stringify(formData),
        });

    });
});

let myForm = $('#form');

let testButton = document.getElementById('test');
let testButtonTwo = document.getElementById('testTwo');

let inputTest = document.getElementById('format');

testButton.addEventListener('click', function () {
    console.log('click');
    inputTest.value = 'yes';
    console.log(inputTest.value);
    testButton.className = ('onClick');
    testButtonTwo.className = ('borderNone');

})

testButtonTwo.addEventListener('click', function () {
    console.log('click');
    inputTest.value = 'No';
    console.log(inputTest.value);
    testButtonTwo.className = ('onClick');
    testButton.className = ('borderNone');

})






