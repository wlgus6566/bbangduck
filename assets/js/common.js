//최상단 배너
var $btnClose = $('.topline .btn_close');

$btnClose.click(function (e) {
  e.preventDefault();
  $('.topline').hide(300);
});

// 사이드바

var $topLine = $('.topline');
var $topLineOn = true;

$topLine.find('.btn_close').click(function () {
  $topLineOn = false;
});

$('.hamburgerLabel').click(function () {
  if (!$topLineOn) {
    $('.hamburgerLabel').css('top', '43%');
    $topLineOn = true;
  }
});

$(window).on('beforeunload', function () {
  $("input:checkbox[id='hamburger']").attr('checked', false);
});

//header 스크롤이벤트
$(window).scroll(function () {
  if ($(window).scrollTop() > 50) {
    $('header').addClass('active');
  } else {
    $('header').removeClass('active');
  }
  //Gototop나타나게
  if ($(window).scrollTop() > 300) {
    $('.gototop').addClass('show');
  } else {
    $('.gototop').removeClass('show');
  }
});

//Gototop클릭
$('.gototop').click(function (e) {
  e.preventDefault();
  $('html,body').stop().animate({ scrollTop: 0 }, 500);
});

//// best bread 판매순, 리뷰순 클릭 ////
var $bestItems = $('.best-order > div');
var $optBtn = $('#bestbread .button button');

$optBtn.click(function () {
  $optBtn.removeClass('active');
  $(this).addClass('active');

  var $optIdx = $(this).index();
  $bestItems.hide();
  $bestItems.eq($optIdx).show();
});
$optBtn.eq(0).trigger('click');

//// 햄버거 버튼 서브메뉴 ////
var $toogleMenu = $('.mobile_menu_list > li');
$toogleMenu.click(function () {
  $(this).find('ul').slideToggle();
});
