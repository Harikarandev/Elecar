new WOW().init()
const slides = document.querySelectorAll(".slide")
let currentSlide = 0

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.transform = "translateX(0)"
    } else {
      slide.style.transform = "translateX(100%)"
    }
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

setInterval(nextSlide, 3000)



const optionBoxes = document.querySelectorAll(".option-box")

optionBoxes.forEach((optionBox) => {
  optionBox.addEventListener("click", () => {
    optionBoxes.forEach((box) => {
      box.classList.remove("selected")
      box.classList.add("unselected-option")
    })

    optionBox.classList.add("selected")
  })
})

const image = document.getElementById('zoomImage');
const info1 = document.getElementsByClassName('info-1');
const info2 = document.getElementsByClassName('info-2');
const info3 = document.getElementsByClassName('info-3');

let zoomed = false;

image.addEventListener('click', function() {
    if (zoomed) {
        image.style.transform = 'scale(1)';
        // info1.style.display = 'none';
        // info2.style.display = 'none';
        // info2.style.display = 'none';

    } else {
        image.style.transform = 'scale(1.5)';
        // info1.style.display = 'block';
        // info2.style.display = 'block';
        // info2.style.display = 'block';
    }
    zoomed = !zoomed;
});

document
  .querySelector("#open-nav-button")
  .addEventListener("click", function () {
    document.querySelector(".mobile-nav").style.display = "block"
  });

document.querySelector(".close-icon").addEventListener("click", function () {
  document.querySelector(".mobile-nav").style.display = "none"
});


  function hidenav() {
    var navContent = document.querySelector('.mobile-nav');
    navContent.style.display = "none";
  }

const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 500) {
      scrollTop.style.display = "block";
    } else {
      scrollTop.style.display = "none";
    }
});

scrollTop.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items:3,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [979, 2],
    itemsTablet:	[768,2],
    responsive:true
  })

loadCars('All');


$('.option-box').on('click', function() {
    var selectedOption = $(this).data('value');
    loadCars(selectedOption);
});

function loadCars(option) {
    var url = 'cars.json';
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(data) {
            var filteredCars = (option === 'All') ? data : data.filter(function(car) {
                return car.carname === option;
            });

            $('.featured-cars').empty();
            if (filteredCars.length > 0) {
              $.each(filteredCars, function(index, car) {
                var cardHTML = `
                  <div class="menu-card" id="${index}">
                    <div class="card-heading">
                      <h3>${car.carname}</h3>
                      <span>${car.carmodel}</span>
                    </div>
                    <div class="card-img">
                      <img src="${car['car-img']}" alt="">
                    </div>
                    <div class="card-actions">
                      ${car.price}
                    </div>
                    <div class="card-shop">
                      <img src="Imgs/Shop.png" alt="">
                    </div>
                  </div>
                `;

                $('.featured-cars').append('<div class="card-box">' + cardHTML + '</div>');
            }); 
          }else{
            var noCarsCardHTML = `
                <div class="no-menu-card" style="height:302px">
                    <div class="card-heading">
                        <h3>Coming soon!</h3>
                    </div>
    
                    <div class="loading">
                      <span class="loader"></span>
                      <span class="loader"></span>
                    </div>
                    
                    <div class="card-actions">
                        $ ___ , ___
                    </div>
                    <div class="card-shop">
                        <img src="Imgs/Shop.png" alt="">
                    </div>
                </div>
            `;
            $('.featured-cars').append('<div class="card-box" >' + noCarsCardHTML + '</div>');
          }
            
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}
});
