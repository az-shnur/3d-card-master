let textFieldX = document.querySelector("#gyro-x");
let textFieldY = document.querySelector("#gyro-y");
let textFieldZ = document.querySelector("#gyro-z");
textFieldX.focus();

let textDivGyroX = document.querySelector("#gyrox");
let textDivGyroY = document.querySelector("#gyroy");
let textDivGyroZ = document.querySelector("#gyroz");

let topLayer = document.querySelector("#top");
let midLayer = document.querySelector("#mid");
let botLayer = document.querySelector("#bot");

let lightLayer = document.querySelector("#bg-light");
let shadowLayer = document.querySelector("#bg-shadow");
let colorLayer = document.querySelector("#bg-color");

let colorLayerHue = 120;
let colorLayerSat = 45;
let colorLayerLum = 45;
let gradientAngle = 30;

let colorLayerColor = `hsl(${colorLayerHue}, ${colorLayerSat}%, ${colorLayerLum}%)`;
let shadowLayerColor = `${colorLayerHue + 20}, ${colorLayerSat + 20}%, ${colorLayerLum - 20}%`;
let lightLayerColor = `${colorLayerHue - 20}, ${colorLayerSat +20 }%, ${colorLayerLum + 15}%`;


colorLayer.style.background = `${colorLayerColor}`;
botLayer.style.background = `
    linear-gradient(0deg, 
    hsl(${colorLayerHue + 20}, ${colorLayerSat + 20}%, ${colorLayerLum - 30}%),
    hsl(${colorLayerHue - 20}, ${colorLayerSat +20 }%, ${colorLayerLum + 30}%))`;


let lightLayerOpacity;
let shadowLayerOpacity;

textFieldX.value = 15;
textFieldY.value = 0;
textFieldZ.value = 0;

let cardRotationX;
let cardRotationY;
let cardRotationZ;


// Set text field value from keyboard ================================================

textFieldX.addEventListener("keydown", ChangeTextFieldValue);
textFieldY.addEventListener("keydown", ChangeTextFieldValue);
textFieldZ.addEventListener("keydown", ChangeTextFieldValue);

function ChangeTextFieldValue(e) {
    
    if (e.code == "ArrowUp" ) {
        this.value++;
    };

    if (e.code == "ArrowDown" ) {
        this.value--;
    };
    
    if (e.shiftKey && e.code == "ArrowUp" ) {
        this.value = Number(this.value) + 9;
    };

    if (e.shiftKey && e.code == "ArrowDown" ) {
        this.value = Number(this.value) - 9;
    };
}


// Getting angles from inputs ====================================================================================

textFieldX.addEventListener("keyup", GetAnglesFromTextFields);
textFieldY.addEventListener("keyup", GetAnglesFromTextFields);
textFieldZ.addEventListener("keyup", GetAnglesFromTextFields);

function GetAnglesFromTextFields() {
    cardRotationX = Number(textFieldX.value);
    cardRotationY = Number(textFieldY.value);
    cardRotationZ = Number(textFieldZ.value);
    console.log(cardRotationX);
    console.log(cardRotationY);
    console.log(cardRotationZ);
    RotateCard();
}





function RotateCard() {
    RotateLayers();
    RotateGradient();
};



function RotateLayers() {
    topLayer.style.transform = `rotateX(${cardRotationX}deg) rotateY(${cardRotationY}deg) rotateZ(0deg) translateZ(12px)`;
    midLayer.style.transform = `rotateX(${cardRotationX}deg) rotateY(${cardRotationY}deg) rotateZ(0deg) translateZ(8px)`;
    botLayer.style.transform = `rotateX(${cardRotationX}deg) rotateY(${cardRotationY}deg) rotateZ(0deg) translateZ(2px)`;
}

function RotateGradient() {
    
    // gradientAngle = Number(cardRotationZ * (-1) + 45);
    
    lightLayerOpacity = ((cardRotationX + cardRotationY * 2) * (5))/100;
    shadowLayerOpacity = ((cardRotationX + cardRotationY* 2) * (-5))/100;

    lightLayer.style.background  = `linear-gradient(${gradientAngle}deg, hsla(${lightLayerColor},0) 20%, hsla(${lightLayerColor},${lightLayerOpacity}))`;
    shadowLayer.style.background  = `linear-gradient(${gradientAngle}deg, hsla(${shadowLayerColor},${shadowLayerOpacity}) 20%, hsla(${shadowLayerColor},0))`;
}

// GetAnglesFromTextFields();
// RotateLayers();
// RotateGradient() 




// Getting gyroscope values ================================================================================================

window.addEventListener('deviceorientation', function(event) {
    showGyroscopeValuesOnScreen();

    if (Math.round(event.beta) < 40 && Math.round(event.beta) > 20 ) {
        cardRotationX = Math.round(event.beta)*(-1) + 30;
    }

    if (Math.round(event.beta) > 40) {
        cardRotationX = -10;
    }

    if (Math.round(event.beta) < 20) {
        cardRotationX = 10;
    }




    if (Math.round(event.gamma) < 5 && Math.round(event.gamma) > -5 ) {
        cardRotationY = Math.round(event.gamma);
    }

    if (Math.round(event.gamma) > 5) {
        cardRotationY = 5;
    }

    if (Math.round(event.gamma) < -5) {
        cardRotationY = -5;
    }




    if (Math.round(event.alpha) < 5 && Math.round(event.alpha) >= 0 ) {
        cardRotationZ = Math.round(event.alpha);
    }

    if (Math.round(event.alpha) < 360 && Math.round(event.alpha) > 355 ) {
        cardRotationZ = Math.round(event.alpha);
    }

    if (Math.round(event.alpha) > 5 && Math.round(event.alpha) < 180 ) {
        cardRotationZ = 5;
    }

    if (Math.round(event.alpha) > 180 && Math.round(event.alpha) < 355 )  {
        cardRotationZ = 355;
    }

    setGyroscopeValuesToTextfield();
    RotateCard();
});

function showGyroscopeValuesOnScreen() {
    textDivGyroX.textContent = `X = ${Math.round(event.beta)}`
    textDivGyroY.textContent = `Y = ${Math.round(event.gamma)}`
    textDivGyroZ.textContent = `Z = ${Math.round(event.alpha)}`
}

function setGyroscopeValuesToTextfield() {
    textFieldX.value = cardRotationX;
    textFieldY.value = cardRotationY;
    textFieldZ.value = cardRotationZ;
}



RotateCard();