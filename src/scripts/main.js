window.onscroll = function() {
    const header = document.querySelector('.js-header');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add('header_scrolled');
    } else {
        header.classList.remove('header_scrolled');
    }
};

window.onload = function () {
    const hamburger = document.querySelector('.js-mobile-menu-trigger');
    const mobileMenu = document.querySelector('.js-mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('mobile-menu_opened')
    })

    initSlider();
    liqPay();
}

const initSlider = () => {
    const slider = document.querySelector('.slider');

    if (!slider) {
        return;
    }

    const sliderItems = slider.querySelectorAll('.slider__item');

    sliderItems.forEach((item) => {
        item.addEventListener('click', () => {

            if (item.classList.contains('slider__item_next')) {
                const current = slider.querySelector('.slider__item_current');
                const prev = slider.querySelector('.slider__item_prev');
                current.classList.remove('slider__item_current');
                current.classList.add('slider__item_prev');
                prev.classList.remove('slider__item_prev');
                prev.classList.add('slider__item_next');
                item.classList.remove('slider__item_next');
                item.classList.add('slider__item_current');
            }

            if (item.classList.contains('slider__item_prev')) {
                const current = slider.querySelector('.slider__item_current');
                const next = slider.querySelector('.slider__item_next');
                current.classList.remove('slider__item_current');
                current.classList.add('slider__item_next');
                next.classList.remove('slider__item_next');
                next.classList.add('slider__item_prev');
                item.classList.remove('slider__item_prev');
                item.classList.add('slider__item_current');
            }
        })
    })
}

const liqPay = () => {
    const json_string = {"public_key":"i18843633034","version":"3","action":"pay","amount":"3","currency":"UAH","description":"test","order_id":"000001"};
    const data = btoa(json_string);

    console.log('data', data)
}
