// Subpage 전체 탭메뉴
var $tabAnchor = $('.sub_banner ul li');
var $tabPanel = $('.tabs_panel');

$tabAnchor.click(function (e) {
  $tabAnchor.find('a').removeClass('active');
  $(this).find('a').addClass('active');

  var $targetIdx = $(this).index();
  $tabPanel.hide();
  $tabPanel.eq($targetIdx).show();
});

// 열자마자 첫번째 페이지가 나오게
$tabPanel.eq(0).trigger('click');

// 오늘 본 상품 (사이드 메뉴)
if ($('.right_menu').length) {
  var today = new Swiper('.right_menu .today_slide', {
    slidesPerView: 2,
    spaceBetween: 5,
    direction: 'vertical',
    loop: false,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
    navigation: {
      nextEl: '.right_menu .swiper-button-next',
      prevEl: '.right_menu .swiper-button-prev',
    },
  });

  $(window).scroll(function () {
    var $Wscroll = $(this).scrollTop();
    var $Rightmenu = $('.right_menu');
    // 스크롤하면 따라 움직이게
    if ($('.bread_item').length) {
      $Rightmenu.css('top', $Wscroll - 1600);
    } //빵 메뉴안에서
    else if ($('.detail_inner').length) {
      $Rightmenu.css('top', $Wscroll + 100);
    } //상세페이지에서
    else {
      $Rightmenu.css('top', $Wscroll - 400);
    } //그 이외 페이지
  });
}

// 상세페이지 시작
if ($('.detail_inner').length) {
  // 썸네일 이미지 바꾸기
  var $thumbs = $('.thumbs');
  var $bigThumb = $thumbs.find('.big_thumb');
  var $smallThumbList = $thumbs.find('.thumb_img li');

  $smallThumbList.click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    var $targetImgPath = $(this).find('img').attr('src');

    $bigThumb.find('img').attr('src', $targetImgPath);
  });

  // THUMB 슬라이드
  var thumbslide = new Swiper('.small_thumb .swiper-container', {
    slidesPerView: 3,
    spaceBetween: 5,
    direction: 'horizontal',
    loop: false,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
    navigation: {
      nextEl: '.small_thumb .swiper-button-next',
      prevEl: '.small_thumb .swiper-button-prev',
    },
  });

  // 옵션 선택시 detail INFO 보이게
  var $detailInfo = $('.detail_info'),
    $itemPrice = $detailInfo
      .find('.unit_price')
      .text()
      .replace('원', '')
      .replace(',', ''),
    $detailSelect = $detailInfo.find('.detail_option select'),
    $Selected = $detailInfo.find('.selected_item'),
    $SelectX = $detailInfo.find('.delete'),
    $itemQtyBtn = $detailInfo.find('.item_qty'),
    $itemQtyInput = $detailInfo.find('input'),
    $totalPrice = $detailInfo.find('.item_total_price'),
    $optionPrice = parseInt(
      $detailInfo
        .find('.option .qty_price')
        .text()
        .replace('원', '')
        .replace(',', ''),
      ($finalPrice = $('.totalPrc'))
    );
  //calctotal()
  function calcTotal() {
    $totalPrice.text(
      ($itemQtyInput.val() * $itemPrice).toLocaleString('en') + '원'
    );
    $finalPrice.text(
      ($itemQtyInput.val() * $itemPrice + $optionPrice).toLocaleString('en') +
        '원'
    );
  }

  $detailSelect.change(function () {
    if ($detailSelect.val() == '없음') {
      $Selected.hide();
      $Selected.eq(0).show();
      $optionPrice = 0;
      calcTotal();
    } else {
      $Selected.show();
      $optionPrice = parseInt(
        $detailInfo
          .find('.option .qty_price')
          .text()
          .replace('원', '')
          .replace(',', ''),
        ($finalPrice = $('.totalPrc'))
      );
      calcTotal();
    }
  });
  // delete 클릭시 없어지게
  $SelectX.click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('optdel')) {
      $Selected.hide();
      $optionPrice = parseInt(
        $detailInfo
          .find('.option .qty_price')
          .text()
          .replace('원', '')
          .replace(',', ''),
        ($finalPrice = $('.totalPrc'))
      );
      calcTotal();
    } else {
      $(this).closest('.selected_item').hide();
      $finalPrice.text('4,900원');
    }
  });

  // 수량 버튼
  $itemQtyBtn.find('a').click(function (e) {
    e.preventDefault();
    calcTotal();
    var $currentCount = $itemQtyInput.val();
    if ($(this).hasClass('plus')) {
      // currentCount++;
      $itemQtyInput.val(++$currentCount);
    } else {
      if ($currentCount > 1) {
        // currentCount--;
        $itemQtyInput.val(--$currentCount);
        calcTotal();
      }
    }
  });

  // 리뷰 more btn
  $('#detail3 .review .more').click(function () {
    $(this).hide();
    $(this).siblings('.more_txt').slideDown();
  });

  // 상세페이지 탭메뉴
  var $detailTap = $('.detail_tap li a');
  $detailTap.click(function (e) {
    e.preventDefault();
    $detailTap.removeClass('active');
    var $thisClass = '.' + $(this).attr('class');
    $($thisClass).addClass('active');
    var datailId = $(this).attr('href');
    var Destination = $(datailId).offset().top;
    $('html').stop().animate({ scrollTop: Destination });
  });
} // 상세페이지 끝

// 장바구니 시작
// function calcCartTotal() {}
if ($('.cart_inner').length) {
  var $cart = $('.cart_inner');
  var $shipBfTotal = $cart.find('#totalprice');
  var $grandTotal = $cart.find('#resultVal');
  var $eachTotalVal = 0;
  var $grandTotalVal = 0;
  var $shipping = parseInt(
    $cart.find('#deliveryprice').text().replace('원', '').replace(',', '')
  );
  var $cartList = $cart.find('tbody tr');

  function calCartTotal() {
    if ($cartList.length > 0) {
      $cartList = $cart.find('tbody tr');
      var $grandTotalVal = 0;
      $cartList.each(function () {
        var $eachPrice = parseInt(
          $(this).find('.each_price').text().replace('원', '').replace(',', '')
        );
        var $eachCount = $(this).find('.qtyinput').val();
        var $eachTotal = $(this).find('.eachtotal');
        $eachTotal.text($eachPrice * $eachCount);
        $grandTotalVal += $eachPrice * $eachCount;
        $shipBfTotal.text($grandTotalVal.toLocaleString('en'));
        $grandTotal.text(($grandTotalVal + $shipping).toLocaleString('en'));
      }); //each
    } //장바구니에 1개이상 담겼다면 할일 끝
    else {
      $cartList = $cart.find('tbody tr');
      console.log($cartList.length);
    }
  } //calCartTotal
  calCartTotal();

  // all버튼 클릭 시작
  var $allCheckbtn = $cart.find('input#all_check');
  var $cartCheckbtn = $cart.find('.check_t input');
  var $qtybtn = $cart.find('.amount_w > a');
  var $eachtotal = $cart.find('.eachtotal');

  $allCheckbtn.click(function () {
    if ($(this).is(':checked')) {
      $cartCheckbtn.prop('checked', true);
    } else {
      $cartCheckbtn.prop('checked', false);
    }
  }); // all버튼 클릭 끝

  //  수량버튼 클릭시작
  $qtybtn.click(function (e) {
    e.preventDefault();
    var $qtnInput = $(this).siblings('input');
    var count = $qtnInput.val();
    if ($(this).hasClass('amount_down')) {
      $qtnInput.val(--count);
      if ($qtnInput.val() < 1) {
        $qtnInput.val(1);
        alert('더 이상 줄일 수 없습니다. 상품을 삭제해 주세요.');
      } //0이하일 때
    } else {
      $qtnInput.val(++count);
    }
    calCartTotal();
  }); // 수량버튼 클릭 끝

  //삭제버튼 클릭 시작
  if ($('.check_t input:checked').length) {
    $('.cart_del').click(function (e) {
      e.preventDefault();
    });
  } else {
    $('.cart_del').click(function (e) {
      e.preventDefault();
      var userAction = confirm('정말로 삭제하실 건가요?');
      if (userAction == true) {
        $('.check_t input:checked').closest('tr').remove();
        calCartTotal(); //사용자가 yes했을 때
      }
    });
  }
  //삭제버튼 클릭 끝
} //장바구니 끝

// FAQ시작
var $faqList = $('.faq_list li');
if ($faqList.length) {
  $faqList.each(function () {
    var $thisList = $(this);
    $thisList.find('.q_plus').click(function () {
      $faqList.removeClass('active');
      $thisList.toggleClass('active');
      $thisList.find('.answer').slideToggle();
    });
  });
} // FAQ끝

//REVIEW시작
if ($('.review_inner').length) {
  var $ReviewAll = $('.review_inner .review ul');
  var $reviewTap = $('.detail_tap li a');

  $ReviewAll.find('li').click(function () {
    $(this).toggleClass('active');
  });

  $reviewTap.click(function (e) {
    e.preventDefault();
    $reviewTap.removeClass('active');
    $(this).addClass('active');
    //all클릭하면 ul에 pho_re 있고 다 보이게
    //포토리뷰 선택하면 pho_re 있고 p만 보이게
    //베스트리뷰 선택하면 pho_re 있고 p,b만 보이게
    //일반리뷰 선택하면 pho_re빼고 n만 보이게
    if ($(this).hasClass('tap4')) {
      $ReviewAll.removeClass('pho_re');
      $ReviewAll.find('li').hide();
      $ReviewAll.find('li.n').show();
    } else {
      if ($(this).hasClass('tap3')) {
        $ReviewAll.addClass('pho_re');
        $ReviewAll.find('li').hide();
        $ReviewAll.find('li.p').show();
      }
      if ($(this).hasClass('tap2')) {
        $ReviewAll.addClass('pho_re');
        $ReviewAll.find('li').hide();
        $ReviewAll.find('li.p.b').show();
      }
      if ($(this).hasClass('tap1')) {
        $ReviewAll.addClass('pho_re');
        $ReviewAll.find('li').show();
      }
    }
  });

  $('.review_modal .pic').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  }); //모달 슬라이드

  $('.review_inner #detail3 .review ul li').click(function () {
    $('.review_modal').addClass('on');
  });
  $('.review_modal .close').click(function () {
    $('.review_modal').removeClass('on');
  });
  $('.modal_bg').click(function () {
    $('.review_modal').removeClass('on');
  });
} //REVIEW끝

// 브랜드스토리 4free scroll event
$(window).scroll(function () {
  var wScroll = $(this).scrollTop();
  if ($('.free_box').length) {
    var freeBox = $('.free_box > div');
    var free = $('.free');
    if (wScroll >= free.offset().top) {
      freeBox.each(function (i) {
        freeBox.eq(i).addClass('showup');
      });
    }
  } //free_box.length

  if ($('.bs_cont01').length) {
    var BsCon01 = $('.bs_con01-left h3, .bs_con01-left p, .bs_con01-right ');
    var BsCon01Box = $('.bs_cont01');
    if (wScroll >= BsCon01Box.offset().top - 50) {
      BsCon01.each(function (i) {
        BsCon01.eq(i).addClass('showup');
      });
    }

    var BsCon02 = $('.bs_con02-right h3, .bs_con02-right p');
    var BsCon02Box = $('.bs_cont02');
    if (wScroll >= BsCon02Box.offset().top - 400) {
      BsCon02.each(function (i) {
        BsCon02.eq(i).addClass('showup');
      });
    }

    var BsCon03 = $('.bs_cont03 h3, .bs_cont03 p');
    var BsCon03Box = $('.bs_cont03');
    if (wScroll >= BsCon03Box.offset().top - 300) {
      BsCon03.each(function (i) {
        BsCon03.eq(i).addClass('showup');
      });
    }

    var BsCon04 = $('.bs_con04-right h3, .bs_con04-right p, .bs_con04-left');
    var BsCon04Box = $('.bs_cont04');
    if (wScroll >= BsCon04Box.offset().top - 300) {
      BsCon04.each(function (i) {
        BsCon04.eq(i).addClass('showup');
      });
    }
  }

  //아몬드 scroll event
  if ($('.almond-cont').length) {
    var AlmondBox = $('.almond-cont');
    var AlmondImg = $('.almond-cont > img');

    if (wScroll >= AlmondBox.offset().top - 220) {
      AlmondImg.each(function (i) {
        AlmondImg.eq(i).addClass('slideleft');
      });
    }
    $('.almond-nut1 label').click(function () {
      $('.almond-cont span').hide();
    });
  }

  // 케이크예약
  if ($('.reserve-ok').length) {
    var reserveLeft = $('.reserve-left > p');
    var reserveRight = $('.reserve-right');

    reserveLeft.each(function (i, item) {
      if (wScroll >= $(item).offset().top - 500) {
        $(item).addClass('visible');
      }
    });
  } //케이크예약 끝

  //맞춤추천
  if ($('.rec_inner').length) {
    $('#recommend').addClass('showup');
  } //맞춤추천
}); //스크롤이벤트

//
if ($('.rec_inner').length) {
  $('.rec_inner .btn-effect').click(function () {
    $('.bottom').addClass('stop');
  }); //맞춤추천 화살표

  var $recStep = $('.rec_step');
  $('.rec_btn').click(function () {
    $recStep.find('.choice1').slideDown(500);
  });
  $('.choice1_box li').click(function (e) {
    e.preventDefault();
    $('.choice1_box li').removeClass('active');
    $(this).addClass('active');
    $recStep.find('.choice2').slideDown(500);
  });
  $('.choice2 .ch_icon').click(function (e) {
    e.preventDefault();
    $('.choice2 .ch_icon').removeClass('active');
    $(this).addClass('active');
    $recStep.find('.choice3').slideDown(500);
  });
  $('.choice3 .ch_al_icon').click(function (e) {
    e.preventDefault();
    $recStep.find('.choice4').add('.result_btn').slideDown(500);
    if ($(this).hasClass('no_aly')) {
      $('.no_aly').toggleClass('active').siblings().removeClass('active');
    } else {
      $(this).toggleClass('active');
    }
  });
  $('.choice4 .ch_icon').click(function (e) {
    e.preventDefault();
    var $thisTxt = $(this).text();
    $(this).toggleClass('active');
    var $prefered = $('.prefered');
    var Class = $(this).attr('data-class');

    var Select = $prefered.children('.' + Class);
    Select.toggleClass('active');
  });
  $('.result_btn .result_btn').click(function (e) {
    e.preventDefault();
    $recStep.find('.recommend_result').slideDown(500);
  });
} //맞춤추천 끝

// 설탕 TAB메뉴 클릭 EVENT
$('.alter-boxes > div').click(function () {
  $('.alter-boxes > div').removeClass('clicked');
  $(this).addClass('clicked');

  $('.alternatives > div').fadeToggle();
  $('.alternatives > div').removeClass('clicked');
  $('#' + $(this).data('id')).addClass('clicked');
});
// 빵 메뉴 네비 - (모바일, 태블릿)
$('.menu_nav').click(function () {
  $('.menu_side > ul').slideToggle();
});

// 메뉴 더보기 버튼
$('.menu_more_btn').click(function () {
  $(this).hide();
  $('.items.items-more').addClass('show');
});

// 쿠키, 케잌메뉴 판매순, 리뷰순, 신규순 클릭
var $cookieItems = $('.cookie-cake-items  ul');
var $optPanel = $('.breadmenu .opt li');

$optPanel.click(function (e) {
  e.preventDefault();
  var $optIdx = $(this).index();
  $optPanel.find('a').removeClass('active');
  $(this).find('a').addClass('active');

  $cookieItems.hide();
  $cookieItems.eq($optIdx).show();
});

// 빵메뉴 판매순, 리뷰순, 신규순 클릭
var $breadItems = $('.bread_item_wrap > div');

$optPanel.click(function (e) {
  e.preventDefault();
  var $optIdx = $(this).index();
  $breadItems.hide();
  $breadItems.eq($optIdx).show();
  $('.items.items-more').removeClass('show');
});
// 열자마자 신규등록순이 나오게
$optPanel.eq(0).trigger('click');

// 로그인 탭
var $loginTap = $('.primary-tab > li > a');
$loginInput = $('.login-inputs > div');
$loginTap.click(function (e) {
  e.preventDefault();

  $loginTap.removeClass('active');
  $(this).addClass('active');

  var $loginTarget = $(this).attr('href');
  $loginInput.hide();
  $($loginTarget).show();
});
// 열자마자 회원 로그인이 나오게
$loginTap.eq(0).trigger('click');

// 케익예약폼 유효성
var $reservation_fields = $('.reservation-field'),
  $reservation_input = $reservation_fields.find('input');

//$('input,select,textarea').click....

$reservation_input.click(function () {
  $reservation_fields.removeClass('active');
  $(this).closest('.reservation-field').addClass('active');
});

// 이메일 선택
var $clientEmail_domain = $('.clientEmail_domain'),
  $EmailSelect = $('.select_domain');
$EmailSelect.click(function () {
  var domain = $(this).val();
  $clientEmail_domain.val(domain);
});

// 로그인폼 유효성
// 회원
var $btnSubmit = $('#login-member button');
var $login_Input = $('#login-member input');

$btnSubmit.click(function () {
  $login_Input.each(function () {
    var $value = $(this).val();
    if ($value == '') {
      $(this).addClass('error');
      $(this).next().show(300);
    } else {
      $(this).removeClass('error');
      $(this).next().hide(300);
    }
  }); //each
  var $errorCount = $('.error').length;
  if ($errorCount > 0) {
    $btnSubmit.prop('disabled', true).text('폼을 완성해주세요');
  }
});

$login_Input.click(function () {
  $(this).removeClass('error');
  $(this).next().hide(300);
  $btnSubmit.prop('disabled', false).text('로그인');
});

// 비회원
var $btnSubmit_non = $('#login-non-member button');
var $login_Input_non = $('#login-non-member input');

$btnSubmit_non.click(function () {
  $login_Input_non.each(function () {
    var $value = $(this).val();
    if ($value == '') {
      $(this).addClass('error');
      $(this).next().show(300);
    } else {
      $(this).removeClass('error');
      $(this).next().hide(300);
    }
  }); //each
  var $errorCount = $('.error').length;
  if ($errorCount > 0) {
    $btnSubmit_non.prop('disabled', true).text('폼을 완성해주세요');
  }
});

$login_Input_non.click(function () {
  $(this).removeClass('error');
  $(this).next().hide(300);
  $btnSubmit_non.prop('disabled', false).text('로그인');
});

// 회원가입 - agree checkbox
var $JoinInput = $('#join input');
var $JoinAllInput = $('.checkall input');

$JoinAllInput.click(function () {
  if ($(this).is(':checked')) {
    $JoinInput.prop('checked', true);
  } else {
    $JoinInput.prop('checked', false);
  }
});

// 회원가입 - form
//select박스 첫번째 선택
$('#birthMonth option:eq(0)').prop('selected', true);
$('#birthDay option:eq(0)').prop('selected', true);

// 회원가입 유효성
var $finish_btn = $('#finish_btn button');
var $joinForm_Input = $('#join input');
var $MsgDont = $('.msg-dont');

$finish_btn.click(function () {
  $joinForm_Input.each(function () {
    var $value = $(this).val();
    if ($value == '') {
      $(this).parent('.join_input').next('.msg-dont').show(300);
    } else {
      $(this).parent('.join_input').next('.msg-dont').hide(300);
    }
  }); //each

  var $dontCount = $MsgDont.length;
  if ($dontCount > 0) {
    $finish_btn.prop('disabled', true).text('폼을 완성해주세요');
  }
});

$joinForm_Input.each(function () {
  $joinForm_Input.click(function () {
    $(this).parent('.join_input').next('.msg-dont').hide(300);
    $finish_btn.prop('disabled', false).text('가입 완료하기');
  });
});
