//------------- Nøgle karrusel ---------------//

// Variable
const karrusel_img1 = document.getElementById("karrusel1");
const karrusel_img2 = document.getElementById("karrusel2");
const karrusel_img3 = document.getElementById("karrusel3");
//const karrusel_img4 = document.getElementById("karrusel4");
const karrusel_img5 = document.getElementById("karrusel5");
const karrusel_img6 = document.getElementById("karrusel6");
const karussel = document.getElementById("karussel")


// Arrays
const karrusel = [karrusel_img1, karrusel_img2, karrusel_img3, karrusel_img5, karrusel_img6];

karrusel[0].style.display = "block";
karrusel[1].style.display = "none";
karrusel[2].style.display = "none";
//karrusel[3].style.display = "none";
karrusel[3].style.display = "none";
karrusel[4].style.display = "none";

// Knapper:
karussel.addEventListener("click", naesteBillede);
karrusel_img6.addEventListener("click", naesteside)

// Funktioner:
function naesteBillede(){
    karrusel[0].style.display = "none"; 
    karrusel.push(karrusel[0]); 
    karrusel.shift(); 
    karrusel[0].style.display = "block"; 
}

function naesteside (){
    document.getElementById("video_section").scrollIntoView({
        behavior: "smooth"
    });
        
}
//----------------------------------------------------------------//


// https://benfrain.com/automatically-play-and-pause-video-as-it-enters-and-leaves-the-viewport-screen/
// js function til at afspille video når den er synlig og pause når den ikke er.

function playPauseVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        
        video.muted = false; //mute og unmute her
        
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {
                let observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                entry.intersectionRatio !== 1 &&
                                !video.paused
                            ) {
                                video.pause();
                            } else if (video.paused) {
                                video.play();
                            }
                        });
                    },
                    { threshold: 0.2 }
                );
                observer.observe(video);
            });
        }
    });
}

//Her køres functionen
playPauseVideo();

//------------------------------------------------//

//-------------------- Afspildning af countdown når den er i view -------------------------//



// Konfigurering af Intersection Observer
var options = {
    threshold: 0.5 // Når 50% er synlig sætter den igang
};

var observer = new IntersectionObserver(handleIntersection, options);

// Start observering af nedtællingscontaineren 
observer.observe(nedtællingsTekstContainer);

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        // Hvis elementet er synligt, start nedtællingen, ellers stop den
        if (entry.isIntersecting) {
            startCountdown();
        } else {
            stopCountdown();
        }
    });
}

var nedtællingsTekstElement = document.getElementById("nedtællingsTekst");
var nedtællingsTekstContainer = document.getElementById("infographic_cocktail");
var count = 20;

function startCountdown() {
    intervalId = setInterval(nedtælling, 150); //hvor hurtigt intervallet går nedad
}

function stopCountdown() {
    clearInterval(intervalId);
}

// hvis nedtællingstallet er lig med eller lavere end 3 så vises denne tekst
function nedtælling() {
    if (count >= 3) {
        nedtællingsTekstElement.innerHTML = count + " Min ";
        count--;
    } else {
        clearInterval(intervalId);
        nedtællingsTekstElement.innerHTML = "2,7 Min";
        visTekstStreng();
    }
}

//---------------------------------------------------------//

// Billede galleri
const carouselList = document.querySelector(".carousel__list");
const carouselItems = document.querySelectorAll(".carousel__item");
const elems = Array.from(carouselItems);

carouselList.addEventListener("click", function (event) {
  var newActive = event.target;
  var isItem = newActive.closest(".carousel__item");

  if (!isItem || newActive.classList.contains("carousel__item_active")) {
    return;
  }

  update(newActive);
});

const update = function (newActive) {
  const newActivePos = newActive.dataset.pos;

  const current = elems.find((elem) => elem.dataset.pos === "0");
  const prev = elems.find((elem) => elem.dataset.pos === "-1");
  const next = elems.find((elem) => elem.dataset.pos === "1");

  if (current) current.classList.remove("carousel__item_active");

  [current, prev, next].forEach((item) => {
    const itemPos = item.dataset.pos;

    item.dataset.pos = getPos(itemPos, newActivePos);
  });
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) >= 2) {
    return -current;
  }

  return diff;
};

//--------------- Lille billede karussel ---------------//

const lille_carouselList = document.querySelector(".lille_carousel__list");
const lille_carouselItems = document.querySelectorAll(".lille_carousel__item");
const lille_elems = Array.from(lille_carouselItems);

lille_carouselList.addEventListener("click", function (event) {
  var newActive = event.target;
  var isItem = newActive.closest(".lille_carousel__item");

  if (!isItem || newActive.classList.contains("lille_carousel__item_active")) {
    return;
  }

  lille_update(newActive);
});

const lille_update = function (newActive) {
  const newActivePos = newActive.dataset.pos;

  const current = lille_elems.find((elem) => elem.dataset.pos === "0");
  const prev = lille_elems.find((elem) => elem.dataset.pos === "-1");
  const next = lille_elems.find((elem) => elem.dataset.pos === "1");

  if (current) current.classList.remove("lille_carousel__item_active");

  [current, prev, next].forEach((item) => {
    const itemPos = item.dataset.pos;

    item.dataset.pos = lille_getPos(itemPos, newActivePos);
  });
};

const lille_getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) >= 2) {
    return -current;
  }

  return diff;
};

//----------------------------------------//

//----------- cocktail karussel ----------//

//variable
var currentSlide = 0;
var slides = document.querySelectorAll('.carousel_cocktail img');
var beskrivelseElement = document.getElementById('beskrivelse');
var overskriftElement = document.getElementById('overskrift');
var prevButton = document.getElementById('forrige');
var nextButton = document.getElementById('naeste');

//cocktail beskrivelser som skifter ved tryk på pile forrige og naeste
var beskrivelser = [
  "Vi specialiserer os i spændende cocktails akkompagneret af fantastisk værtskab. På den måde søger vi at skabe en atmosfære og stemning, der får dig til at komme tilbage weekend efter weekend. Gå på opdagelse i vores alsidige cocktailkort – vi er sikre på, at du finder noget, du kan lide! ",
  "Passionsfrugt cocktail med rom og et ‘smokey’ finish. En af vores favoritter, kan med fordel nydes i vores hyggelige udendørs område.",
  "Passionsfrugt, vanilje og appelsin - den perfekte letdrikkelige kombination af sødme og syrlighed. En dejlig og eksotisk cocktail, som skal nydes hos os, med alle dine venner!  ",
  "En boblende rabarbercocktail, med en poppende overraskelse. Lyserød, lækker og forfriskende, og du kan nærmest smage sommeren ved første slurk. Nydes ekstra godt i vores dejlige lounge område.",
  " Vi mener at vi laver byens bedste! En kombination af friskbrygget espresso, premium vodka, kaffelikør og sukker. En rigtig klassiker. Kom ned til os med dine venner, og bedøm om du er enig i, at det er byens bedste.",
  "Kombinerer den dybe, nøddeagtig smag af amaretto med en frisk citruskant fra saftig citron. Resultatet er en perfekt afbalanceret, sød og sur blanding, der helt sikkert vækker dine smagsløg.",
];

//Overskrifter som skifter ved tryk på forrige og naeste
var overskrifter = [
    "Cocktails",
    "Smokey Eruption",
    "Passionada",
    "Poppin Rhubarb",
    "Espresso Martini",
    "Amaretto Sour",

];

overskriftElement.textContent = overskrifter[currentSlide];
beskrivelseElement.textContent = beskrivelser[currentSlide];

function visSlide(n) {
  slides[currentSlide].style.display = 'none';
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].style.display = 'block';

  // Opdater beskrivelsen
  overskriftElement.textContent = overskrifter[currentSlide];
  beskrivelseElement.textContent = beskrivelser[currentSlide];
}

//forrige knap
prevButton.addEventListener('click', function() {
  visSlide(currentSlide - 1);
});

//naeste knap
nextButton.addEventListener('click', function() {
  visSlide(currentSlide + 1);
});

//Her køres funktionen
visSlide(currentSlide);

//----------------------------------//
// --------- Countdowns ----------- //

  //var count = 100;
  //var nedtællingsTekstElement = document.getElementById("nedtællingsTekst");

  //function nedtælling() {
    //if (count >= 3) {
      //nedtællingsTekstElement.innerHTML = count + " Min ";
      //count--;
   // } else {
      //clearInterval(intervalId);
      //nedtællingsTekstElement.innerHTML = "2,7 Min";
      //visTekstStreng();
   // }
  //}

  //function visTekstStreng() {
   // nedtællingsTekstElement.innerHTML = "2,7 Min";
 // }

  // Opret et interval, der kalder nedtælling-funktionen hvert sekund (1000 millisekunder).
  //var intervalId = setInterval(nedtælling, 100);

//------------------------ Nytår countdown ---------------------------//

// HTML-element, hvor nedtællingen skal vises
const countdownDisplay_nytar = document.getElementById('countdown_nytar');

// Beregn slutdatoen og tiden til nedtælling
const endDate = new Date('2023-12-31 23:59:59').getTime(); // Angiv din ønskede slutdato og tid
let interval_ID; // Variabel til at holde styr på intervallet

// Opdaterer nedtællingen og viser den i HTML-elementet
function updateCountdown() {
  const currentDate = new Date().getTime();
  const timeLeft = endDate - currentDate;

  if (timeLeft <= 0) {
    clearInterval(interval_ID); // Stop intervallet, hvis tiden er udløbet
    countdownDisplay_nytar.textContent = 'Godt nytår!!';
  } else {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownDisplay_nytar.textContent = `${days} dage ${hours} timer ${minutes} minutter ${seconds} sekunder`;
  }
}

// Start nedtællingen med et interval på 1000 ms (1 sekund)
interval_ID = setInterval(updateCountdown, 1000);

//-----------------------------------------------------------//


