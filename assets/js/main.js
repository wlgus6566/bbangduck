'use strict';

// Loading Animation
var $loadingWrap = $('.loading');
var $progressText = $loadingWrap.find('.progress-text');
var imgLoad = imagesLoaded('body');
var imgTotalLength = imgLoad.images.length;
var imgLoaded = 0;
var current = 0;

var progressTimer = setInterval(updateProgress, 1000 / 60);
imgLoad.on('progress', function () {
  imgLoaded++; //이미지 1개씩 로드될 때마다 할 일
});
function updateProgress() {
  var target = (imgLoaded / imgTotalLength) * 100;
  current += (target - current) * 0.1;
  // target이 너무 빨리 100이 되면 천천히 진행되게끔 => current += (target - current) * 0.1;
  $progressText.text(Math.floor(current) + '%');

  if (current > 99.9) {
    clearInterval(progressTimer);
    $progressText.animate(
      { opacity: 0 },
      {
        duration: 250,
        complete: function () {
          $loadingWrap.animate(
            { top: '-100%' },
            { easing: 'easeInBack' },
            1200
          );
        },
      }
    );
  }
} //updateProgress

// 메인 슬라이드
var $slideBanner = $('.slidebanner');
var $stopBtn = $('#main_banner .stop_btn a');

var $mainSlide = $slideBanner.bxSlider({
  auto: true,
  pause: 4500,
  pager: true,
  controls: false,
  onSliderLoad: function (currentIndex) {
    $slideBanner.find('.main_banner').eq(currentIndex).addClass('active');
  },
  onSlideAfter: function ($slideElement) {
    $slideElement.addClass('active').siblings().removeClass('active');
  },
});

$('.bx-pager-link').each(function () {
  $(this).html('<em></em>');
});

window.addEventListener('resize', () => {
  $('.bx-pager-link').each(function () {
    $(this).html('<em></em>');
  });
});

$stopBtn.click(function (e) {
  e.preventDefault();
  if ($(this).find('.fas').hasClass('fa-pause')) {
    $(this).find('.fas').removeClass('fa-pause');
    $(this).find('.fas').addClass('fa-play');
    $mainSlide.stopAuto();
    $('.bx-pager-link em').each(function () {
      $(this).css({
        'animation-play-state': 'paused',
        '-webkit-animation-play-state': 'paused',
      });
    });
  } else {
    $(this).find('.fas').addClass('fa-pause');
    $(this).find('.fas').removeClass('fa-play');
    $mainSlide.startAuto();
    $('.bx-pager-link em').each(function () {
      $(this).css({
        'animation-play-state': 'running',
        '-webkit-animation-play-state': 'running',
      });
    });
  }
});

// forwho 슬라이드
var slideWrapper = document.getElementsByClassName('container'),
  sliderContainer = document.getElementsByClassName('forwho_slide_container'),
  slides = document.getElementsByClassName('forwho_slide'),
  slideCount = slides.length,
  currentIndex = 0,
  timer = undefined,
  navPrev = document.getElementsByClassName('forwho_prev'),
  navNext = document.getElementsByClassName('forwho_next'),
  slidePagerBtn = document.querySelectorAll('#forwho .pager span');

if (slideWrapper.length) {
  for (var i = 0; i < slideCount; i++) {
    slides[i].style.left = i * 100 + '%';
  }

  function goToForwhoSlide(idx) {
    sliderContainer[0].classList.add('animated');
    sliderContainer[0].style.left = idx * -100 + '%';
    currentIndex = idx;

    for (var j = 0; j < slidePagerBtn.length; j++) {
      slidePagerBtn[j].classList.remove('active');
    }
    slidePagerBtn[idx].classList.add('active');
  }

  navNext[0].addEventListener('click', function (e) {
    e.preventDefault();
    if (currentIndex == slideCount - 1) {
      goToForwhoSlide(0);
    } else {
      goToForwhoSlide(currentIndex + 1);
    }
  });
  navPrev[0].addEventListener('click', function (e) {
    e.preventDefault();
    if (currentIndex == 0) {
      goToForwhoSlide(slideCount - 1);
    } else {
      goToForwhoSlide(currentIndex - 1);
    }
  });

  goToForwhoSlide(0);

  function startAutoSlide() {
    var timer = setInterval(function () {
      var nextIdx = (currentIndex + 1) % slideCount;
      goToForwhoSlide(nextIdx);
    }, 3500);
  }
  startAutoSlide();

  // pager로 슬라이드 이동하기
  for (var i = 0; i < slidePagerBtn.length; i++) {
    slidePagerBtn[i].addEventListener('click', function (e) {
      var pagerNum = e.target.innerText - 1;
      goToForwhoSlide(pagerNum);
    });
  }
} //for who 슬라이드

// TIME SALE
const countDownTimer = function (id, date) {
  var _vDate = new Date(date);
  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  var timer;

  function showRemaining() {
    var now = new Date();
    var disDt = _vDate - now;

    if (disDt < 0) {
      clearInterval(timer);
      document.getElementById(id).textContent = '해당 이벤트가 종료되었습니다!';
      return;
    }
    var days = Math.floor(disDt / _day);
    var hours = Math.floor((disDt % _day) / _hour);
    var minutes = Math.floor((disDt % _hour) / _minute);
    var seconds = Math.floor((disDt % _minute) / _second);

    document.getElementById(id).textContent = '';
    document.getElementById(id).textContent += hours + ':';
    document.getElementById(id).textContent += minutes + ':';
    document.getElementById(id).textContent += seconds;
  }
  timer = setInterval(showRemaining, 1000);
};

var dateObj = new Date();
dateObj.setDate(dateObj.getDate() + 2);

countDownTimer('timer', dateObj);

//pick 슬라이드

$('.pick_slider').bxSlider({
  minSlides: 1,
  maxSlides: 4,
  slideWidth: 263,
  slideMargin: 6,
  moveSlides: 2,
  pager: false,
  auto: true,
  pause: 2000,
});

//////스크롤이벤트 /////

$(window).scroll(function () {
  var wScroll = $(this).scrollTop();
  var wHeight = $(this).height();
  var noworriesBox = $('.fourfree > div');
  var noworries = $('#noworries');
  var recommendOffset = $('.brandAndcake');
  var recommendBox = $('#recommend');

  console.log();
  noworriesBox.each(function (i) {
    if (wScroll >= noworries.offset().top - wHeight / 3) {
      noworriesBox.addClass('showup');
    }
  });

  if (wScroll >= recommendOffset.offset().top - wHeight / 3) {
    recommendBox.addClass('showup');
  }
});

var today = new Date(); // 오늘 날짜
var date = new Date();

function beforem() {
  //이전 달을 today에 값을 저장
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  build(); //만들기
}

function nextm() {
  //다음 달을 today에 저장
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  build();
}

function build() {
  var nMonth = new Date(today.getFullYear(), today.getMonth(), 1); //현재달의 첫째 날
  var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //현재 달의 마지막 날
  var tbcal = document.getElementById('calendar'); // 테이블 달력을 만들 테이블
  var yearmonth = document.getElementById('yearmonth'); //  년도와 월 출력할곳
  yearmonth.innerHTML =
    today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월'; //년도와 월 출력

  if (today.getMonth() + 1 == 12) {
    //  눌렀을 때 월이 넘어가는 곳
    before.innerHTML = today.getMonth() + '월';
    next.innerHTML = '1월';
  } else if (today.getMonth() + 1 == 1) {
    //  1월 일 때
    before.innerHTML = '12월';
    next.innerHTML = today.getMonth() + 2 + '월';
  } //   12월 일 때
  else {
    before.innerHTML = today.getMonth() + '월';
    next.innerHTML = today.getMonth() + 2 + '월';
  }

  // 남은 테이블 줄 삭제
  while (tbcal.rows.length > 2) {
    tbcal.deleteRow(tbcal.rows.length - 1);
  }
  var row = null;
  row = tbcal.insertRow();
  var cnt = 0;

  // 1일 시작칸 찾기
  for (i = 0; i < nMonth.getDay(); i++) {
    cell = row.insertCell();
    cnt = cnt + 1;
  }

  // 달력 출력
  for (
    i = 1;
    i <= lastDate.getDate();
    i++ // 1일부터 마지막 일까지
  ) {
    cell = row.insertCell();
    cell.innerHTML = i;
    cnt = cnt + 1;
    if (cnt % 7 == 1) {
      //일요일 계산
      cell.innerHTML = '<font color=#FF9090>' + i; //일요일에 색
    }
    if (cnt % 7 == 0) {
      // 1주일이 7일 이므로 토요일 계산
      cell.innerHTML = '<font color=#7ED5E4>' + i; //토요일에 색
      row = calendar.insertRow(); // 줄 추가
    }
    if (
      today.getFullYear() == date.getFullYear() &&
      today.getMonth() == date.getMonth() &&
      i == date.getDate()
    ) {
      cell.bgColor = '#BCF1B1'; //오늘날짜배경색
    }
  }
}
