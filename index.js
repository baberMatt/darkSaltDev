const btn = document.getElementById("start")
const target = document.getElementById("target")
const glitch = document.getElementById("glitch")
const consoleBox = document.getElementById("consoleBox")
const darkSalt = document.getElementById("darkSalt")
const salt = document.getElementById("salt")
const dust = document.getElementById("dust")

const totalWidth = window.innerWidth;
let buildSize = 2300;

const targetRect = target.getBoundingClientRect();
const targetWidth = Math.floor(targetRect.width);
const targetHeight = Math.floor(targetRect.height);
const totalTarget = targetWidth * targetHeight;

const saltRect = salt.getBoundingClientRect();
const saltWidth = Math.floor(saltRect.width);
const saltHeight = Math.floor(saltRect.height);
const adjSaltHeight = Math.floor(saltHeight * .7)
const saltHalf = saltWidth / 2;
const saltBottom = saltRect.bottom
const totalSalt = saltWidth * saltHeight;

const dustRect = dust.getBoundingClientRect();
const dustWidth = Math.floor(dustRect.width)
const dustHeight = Math.floor(dustRect.height)

let countArray = [];
let pileArray1 = [];
let pileArray2 = [];

let startingCount = 0;
let cloudCount = 0;
let count = 0;
let pileCount1 = 0;
let pileCount2 = 0;

console.log(`totalWidth = ${totalWidth}`)
console.log(`targetWidth = ${targetWidth} & targetHeight = ${targetHeight}`)
console.log(`saltWidth = ${saltWidth} & saltHeight = ${saltHeight}`)
console.log(`dustWidth = ${dustWidth} & dustHeight = ${dustHeight}`)

window.onresize = function(){ location.reload(); }

if (totalWidth > 1550) {
    buildSize = 4400;
}

if (totalWidth < 390) {
    buildSize = 2100;
}


for (i = 1; i < totalTarget; i++) {
    countArray.push(i)
}

function populatePile1() {
    for (i = 0; i < saltWidth; i++) {
        pileArray1.push(i)
    }
}
populatePile1();

function populatePile2() {
    for (i = 0; i < saltWidth; i++) {
        pileArray2.push(i)
    }
}

startingCount = countArray.length

function randomIndex() {
    let random = countArray[Math.floor(Math.random() * countArray.length)];
    countArray.splice(random, 20)
    countArray.splice(random + targetWidth, 20)
    countArray.splice((targetWidth * 2) + random, 20)
    countArray.splice((targetWidth * 3) + random, 20)
    return random
}

function getSaltPile1X() {
    if (pileArray1.length === 0) {
        pileCount1 += 8;
        populatePile1();
    }
    let i = Math.floor(Math.random() * pileArray1.length)
    let x = Math.floor(pileArray1[i])
    pileArray1.splice(i, 1)
    return x;
}

function getSaltPile2X() {
    if (pileArray2.length === 0) {
        pileCount2 += 8;
        populatePile2();
    }
    let i = Math.floor(Math.random() * pileArray2.length)
    let x = Math.floor(pileArray2[i])
    pileArray2.splice(i, 1)
    return x;
}


function startMask() {

    darkSalt.classList.remove("darkSaltShadow")

    // setInterval(() => {
    //     let quarterLeft = startingCount * .60;
    //     if (countArray.length > quarterLeft) {
    //         let current = randomIndex();
    //         createNewBlip(current)
    //         createNewSalt(current)
    //         for (i = 0; i < 8; i++) {
    //             buildSaltPile(getSaltPile1X(), pileCount1);
    //         }
    //         for (i = 0; i < 8; i++) {
    //             buildSaltPile(getSaltPile2X(), pileCount2);
    //         }
    //         if (pileArray2.length < saltHalf) {
    //             buildSaltPile(getSaltPile2X(), pileCount2);
    //             buildSaltPile(getSaltPile2X(), pileCount2);
    //             buildSaltPile(getSaltPile2X(), pileCount2);
    //             buildSaltPile(getSaltPile2X(), pileCount2);
    //         } else {
    //             buildSaltPile(getSaltPile1X(), pileCount1);
    //             buildSaltPile(getSaltPile1X(), pileCount1);
    //             buildSaltPile(getSaltPile1X(), pileCount1);
    //             buildSaltPile(getSaltPile1X(), pileCount1);
    //         }
    //     }
    //     else {
    //         darkSalt.style.transition = "opacity .7s"
    //         darkSalt.style.opacity = "0";
    //         return
    //     }
    // }, 1);

    let blipInt = setInterval(() => {
        setTimeout(() => {
            darkSalt.style.transition = "opacity .3s"
            darkSalt.style.opacity = "0";
            clearInterval(blipInt)
        }, buildSize);
        let current = randomIndex();
        createNewBlip(current)
        createNewSalt(current)
        setTimeout(() => {
            for (i = 0; i < 8; i++) {
                buildSaltPile(getSaltPile1X(), pileCount1);
            }
            for (i = 0; i < 8; i++) {
                buildSaltPile(getSaltPile2X(), pileCount2);
            }
            if (pileArray2.length < saltHalf) {
                buildSaltPile(getSaltPile2X(), pileCount2);
                buildSaltPile(getSaltPile2X(), pileCount2);
                buildSaltPile(getSaltPile2X(), pileCount2);
                buildSaltPile(getSaltPile2X(), pileCount2);
            } else {
                buildSaltPile(getSaltPile1X(), pileCount1);
                buildSaltPile(getSaltPile1X(), pileCount1);
                buildSaltPile(getSaltPile1X(), pileCount1);
                buildSaltPile(getSaltPile1X(), pileCount1);
            }
        }, 800);
    }, 10);

    function getX(position) {
        let n = position / 100;
        let m = n - Math.floor(n)
        m = m.toFixed(2)
        let x = m * targetWidth
        return x;
    }
    function getY(position) {
        let y = Math.ceil(position / targetWidth)
        return y;
    }


    function createNewBlip(position) {

        let newBlip = document.createElement("div")
        newBlip.classList.add("blip")
        newBlip.id = `blip${count}`;

        let x = getX(position)
        let y = getY(position)
        newBlip.style.top = y + "px";
        newBlip.style.left = x + "px";
        
        target.appendChild(newBlip)
    }

    function createNewSalt(position) {

        let newSalt = document.createElement("div")
        newSalt.classList.add('salt')
        newSalt.id = `salt${count}`;

        let x = getX(position)
        let y = getY(position)
        newSalt.style.top = y + "px";
        newSalt.style.left = x + "px";
        
        target.appendChild(newSalt)

        let j = Math.floor((Math.random() * 3) + 1);
        newSalt.classList.add(`saltSize${j}`)
        newSalt.style.animation = `salt${j} 1.2s ease-in forwards`;
        setTimeout(() => {
            newSalt.remove();
        }, 1100)
        count++
    }
}

function buildSaltPile(xPosition, yPosition) {

    let newSaltPile = document.createElement("div")
    newSaltPile.classList.add('saltPile')
    newSaltPile.id = `saltPile${count}`;

    let x = xPosition;
    let y = saltHeight - yPosition;
    newSaltPile.style.top = y + "px";
    newSaltPile.style.left = x + "px";
    let j = Math.floor((Math.random() * 10) + 1);
   
    switch (j) {
        case 7:
            newSaltPile.classList.add('saltPileColor1')
            break;
        case 9:
            newSaltPile.classList.add('saltPileColor2')
            break;
        case 10:
            newSaltPile.classList.add('saltPileColor3')
            break;
        default:
            break;
    }
    salt.appendChild(newSaltPile)

}

function buildDustCloud() {
    let xCount = 0;
    let sizeCount = 0;
    let xToUse = [-10, 90, 50, 5, 70, 35, 20]
    let sizeToUse = [3, 3, 3, 5, 5, 4, 4]
    let buildClouds = setInterval(() => {

        let newCloud = document.createElement("div")
        newCloud.classList.add('cloud')
        newCloud.id = `cloud${cloudCount}`

        let x = xToUse[xCount]
        let y = -30;
        newCloud.style.top = y + "%";
        newCloud.style.left = x + "%";
        xCount++

        dust.appendChild(newCloud)

        growCloud(cloudCount, sizeToUse[sizeCount])
        sizeCount++
        cloudCount++
        if (xCount > 6) {
            clearInterval(buildClouds)
        }

    }, 200);

    setTimeout(() => {
        clearInterval(buildClouds)
    }, 3500);

    setTimeout(() => {
        let addParticles = setInterval(() => {
            createParticle();
        }, 75);

        setTimeout(() => {
            clearInterval(addParticles)
        }, 2000);
    
    }, 750);   
}

function growCloud(currentCloud, growSize) {

    let cloudToGrow = document.getElementById(`cloud${currentCloud}`)
    window.getComputedStyle(cloudToGrow).transform;
    cloudToGrow.style.transform = `scale(${growSize})`;
    let time = growSize * 1000;
    let time2 = time + 7000;
    let time3 = time2 + - 2500;

    setTimeout(() => {
        moveDust(cloudToGrow)
    }, time);
    setTimeout(() => {
        cloudToGrow.style.transform = `scale(.1)`;
    }, time2);
    setTimeout(() => {
        cloudToGrow.style.opacity = `0`
    }, time3 );
}

function moveDust(targetCloud) {

    let cloudToMove = targetCloud
    function moveLeft() {
        cloudToMove.style.transform = "translateX(-20px)";
        rightTimer = setTimeout(() => {
            moveRight();
        }, 3000);
        setTimeout(() => {
            clearTimeout(rightTimer)
        }, 5000);
    }

    function moveRight() {
        cloudToMove.style.transform = "translateX(20px)";
        leftTimer = setTimeout(() => {
            moveLeft();
        }, 3000);
        setTimeout(() => {
            clearTimeout(leftTimer)
        }, 5000);
    }
    moveLeft()

}

function createParticle() {
    let newParticle = document.createElement("div")
    let n = Math.ceil(Math.random() * 3)
    newParticle.classList.add(`particleStyle${n}`)
    newParticle.id = `particle${count}`;

    let x = Math.ceil(Math.random() * dustWidth);
    let y = Math.ceil(Math.random() * dustHeight);
    newParticle.style.top = y + "px";
    newParticle.style.left = x + "px";
    
    if ( x <= (dustWidth * .33)) {
        newParticle.style.animation = `particle1 1.2s ease-in forwards`;
    }
    if ( x >= (dustWidth * .34) && x <= (dustWidth * .65)) {
        newParticle.style.animation = `particle2 1.2s ease-in forwards`;
    }
    if ( x >= (dustWidth * .66)) {
        newParticle.style.animation = `particle3 1.2s ease-in forwards`;
    }
    
    dust.appendChild(newParticle)
    setTimeout(() => {
        newParticle.remove()
    }, 1150);
}


function toggleFullscreen() {
    let elem = document.querySelector("video");

    if (!document.fullscreenElement) {
        consoleBox.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

darkSalt.addEventListener("click", function () {
    startMask();
    setTimeout(() => {
        buildDustCloud();
    }, 50);

})

glitch.onclick = function () {
    consoleBox.classList.remove("collapse")
    toggleFullscreen();
}





