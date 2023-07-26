




 var swiper = new Swiper ('.swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
        0:{
            slidesPerView: 1,
        },
      480: {
        slidesPerView: 1,
    
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024:{
        slidesPerView: 3,
        spaceBetween: 30,
      }
    },
    // Optional parameters   


  })