(function($) {

// 1. HEADER
// -----------------------------------------
	



// &__logoWrap
// -----------------------------------------




// slider
// -----------------------------------------
$('.herro__slider').owlCarousel({
	items: 1,
	itemsDesktop : [1199,1],
	itemsDesktopSmall : [980,1],
	itemsTablet: [768,1],
	itemsMobile : [479,1],
	autoPlay: true,
	pagination: true

});




// form
// -----------------------------------------
addSearcElem();
$('.form__input_searchEl').on('click', dropSubmenu);
$('.form__input_submenu').on('click', 'li', changeDropmenuValue);
$('.form__genderTablet').on('click', 'div', btnToggle);
$('.form__btn').on('click', submitForm);










// 2. MAIN
// -----------------------------------------
$('.userList__carousel').owlCarousel({
	items: 5,
	itemsDesktop : [1199,5],
	itemsDesktopSmall : [980,5],
	itemsTablet: [768,5],
	itemsMobile : [479,3],
	autoPlay: false,
	pagination: false,
	navigation: true
})


$('.userList__link').css({
	'font-size': 18
});
$('.owl-prev').empty().addClass('fa fa-arrow-left').css({
	'font-size': 25
});
$('.owl-next').empty().addClass('fa fa-arrow-right').css({
	'font-size': 25
});







// userInfo
// -----------------------------------------
$('.tabs__link').on('click', switchTabs); 



// let line = new ProgressBar.Line('.tabs__progressBar', {
// 	strokeWidth: 4,
// 	easing: 'easeInOut',
// 	duration: 1400,
// 	color: 'gray',
// 	background: 'linear-gradient(0deg, #94c516 4%,#72aa00 50%, #8eb92a 51%, #a8c732 92%, #b9ce44 100%)',
// 	trailColor: '',
// 	trailWidth: 1,
// 	svgStyle: {width: '100%', height: '100%'}
// });


// line.animate(1.0);


$('.tabs__step').each((key, val) => {
	$(val).css({
		'z-index': 10-key
	})
});

$('.tabs__step').on('click', stepClick);



$('.tabs__mixerLimit').mousedown( mixerMove );







// useInstructions
// -----------------------------------------




// 3. FOOTER
// -----------------------------------------









// ===============================================
// header
// ===============================================

function addSearcElem(){
	let inputElem = $('.form__input_search').children();
	let  searchElem = 	`<span class="form__inputTarget"></span>
						<span class="form__input_searchEl"></span>`;
	$(inputElem).append(searchElem);
}




function dropSubmenu(){
	let dropMenu = $(this).closest('.form__input').find('.form__input_submenu');
	if($(dropMenu).is(':visible')){
		closeSubmenu(dropMenu);
	}else{
		openSubmenu(dropMenu);
	}
}



function openSubmenu(dropMenu){
	$(dropMenu).slideDown(500);
}

function closeSubmenu(dropMenu){
	$(dropMenu).slideUp(400);
}

function changeDropmenuValue(e){
	let dropMenu = $(this).closest('.form__input').find('.form__input_submenu');
	let mainMenu = $(this).closest('.form__input').find('.form__inputTarget');
	let text = $(e.target).text();

	$(mainMenu).text(text);
	closeSubmenu(dropMenu);
}

function btnToggle(){
	if($(this).hasClass('form__boy')){
		$(this).toggleClass('form__boy_active');
		$(this).siblings('.form__girl').removeClass('form__girl_active');
	}
	else{
		$(this).toggleClass('form__girl_active');	
		$(this).siblings('.form__boy').removeClass('form__boy_active');
	}
}








// ===============================================
// submitForm
// ===============================================

function submitForm(e){
	
	cleanEnvironment();

	const userInfoSubmit = {
		userGender: '',
		searchGender: '',
		userName: '',
		birthDay: '',
		birthMonth: '',
		birthYear: '',
		userCity: '',
		coolCheckbox: '',
		lifeGoodCheckbox: '',
		drink: ''
	}



	let genderBtn = $('.form__genderTablet');
	let inputName = $('#form__nameInput');
	let birthDaySelect = $('.form__input_date .form__inputTarget');
	let birthMonthSelect = $('.form__input_month .form__inputTarget');
	let birthYearSelect = $('.form__input_year .form__inputTarget');
	let citySelect = $('.form__input_city .form__inputTarget');
	let fieldArr = [$('.form__input_date')[0], $('.form__input_month')[0], $('.form__input_year')[0], $('.form__input_city')[0]];


	userInfoSubmit.userGender = getGenderVal(genderBtn[0]);
	userInfoSubmit.searchGender = getGenderVal(genderBtn[1]);
	userInfoSubmit.userName = $(inputName).val().toLowerCase();
	userInfoSubmit.birthDay = $(birthDaySelect).text().trim();
	userInfoSubmit.birthMonth = $(birthMonthSelect).text().trim();
	userInfoSubmit.birthYear = $(birthYearSelect).text().trim();
	userInfoSubmit.userCity = $(citySelect).text().trim();
	userInfoSubmit.coolCheckbox = $("#meCool").is(':checked');
	userInfoSubmit.lifeGoodCheckbox = $("#lifeGood").is(':checked');
	userInfoSubmit.drink = $('input[type="radio"]:checked').val();
	
	
		

	validateLine(!userInfoSubmit.userGender || !userInfoSubmit.searchGender, genderBtn);
	validateLine(userInfoSubmit.userName === '', inputName);
	validateLine(userInfoSubmit.birthDay === '' 
				|| userInfoSubmit.birthMonth === ''
				|| userInfoSubmit.birthYear === '' , birthDaySelect);
	validateLine(userInfoSubmit.userCity === '', citySelect);

	inputErrorHightlight(inputName, fieldArr);

	sendFormObj(userInfoSubmit);




	function cleanEnvironment(){
		
		e.preventDefault();
		$('.form__form .fa-times, .form__form .fa-check').remove();
		
	}


	function inputErrorHightlight(input, arr){

		if(input.val() === ''){
			input.css({
				'box-shadow':'0px 0px 5px red'
			})
		}
		else{
			input.css({
				'box-shadow':'-1px -1px 1px rgba(0,0,0,.34)'
			});
			
		}



		$(arr).each(function(key, val){
			if($(val).find('.form__inputTarget').text().trim() === ''){

				$(val).css({
					'box-shadow':'0px 0px 5px red'
				});

			}
			else{
				$(val).css({
					'box-shadow':'-1px -1px 1px rgba(0,0,0,.34)'
				});
				
			}

		});
	}



	function cleanErrorHightlight(elem){
		
		$(elem).css({
			'box-shadow':'-1px -1px 1px rgba(0,0,0,.34)'
		});

	}
	


	function errorHightlight(elem){


			$(elem).css({
				'box-shadow':'0px 0px 5px red'
			})
		
	}


	function sendFormObj(obj){
		let checkAmount = $('.form__form .fa-check').length;

		if(checkAmount === 4){

			// to sending...
			console.dir(obj);

		}
		else{
			return
		}

	}


	function validateLine(condition, elem){

		if(condition){

			errorShow(elem);

		}
		else{

			successShow(elem);

		}
	}




	function getGenderVal(elem){
		
		if ( $(elem).children().hasClass('form__girl_active'))
		{
			cleanErrorHightlight(elem)
			return 'girl';
		}
		else if ( $( elem ).children().hasClass('form__boy_active'))
		{
			cleanErrorHightlight(elem)
			return 'boy';
		}
		else
		{
			errorHightlight(elem);
			return;
		}
	}



	function errorShow(elem){



		let parentEl = $(elem).closest('[data-error]');
		let errorText = parentEl.attr('data-error');

		parentEl.find('.fa').remove();

		
		parentEl.css({
			'position': 'relative'
		}).append('<i class="fa fa-times"><span class="hint"></span></i>');


		$(parentEl).find('.hint').text(errorText);


		$('.fa-times').css({
			'position': 'absolute',
			'right': -30,
			'display':'block',
			'color': 'red',
			'font-size': 30
		}).hover(
			function(){
				$(this).find('.hint').show();
			},
			function(){
				$(this).find('.hint').hide();	
			}
		)
	}



	function successShow(elem){
		let parentEl = $(elem).closest('[data-error]');
		
		parentEl.css({
			'position': 'relative'
		}).append('<i class="fa fa-check" aria-hidden="true"></i>');

		$('.fa-check').css({
			'position': 'absolute',
			'right': -35,
			'color': 'green',
			'font-size': 30
		})
		
	}
}






// ===============================================
// tabs
// ===============================================
function switchTabs(e){
	e.preventDefault();
	
	$('.tabs__link_active').removeClass('tabs__link_active')
	$(this).addClass('tabs__link_active');


	let attrVal = $(this).attr('href');
	$('.tabs__list').hide();
	$(attrVal).show();
	
}



function stepClick(e){
	
	e.preventDefault();

	let curentNumb = $(this).attr('data-number');


	$('.tabs__step_active').removeClass('tabs__step_active');
	$(this).removeClass('tabs__step_done').addClass('tabs__step_active');
	

	$('.tabs__step').each((key, val) => {
		if(key+1 < curentNumb){
			$(val).addClass('tabs__step_done');
		}
		else{
			$(val).removeClass('tabs__step_done');
		}
	})
	changeProgressbarVal(curentNumb);
}



function changeProgressbarVal(num){
	$('.tabs__progressState').animate({
		'width': (num * 20)+'%'
	}, 700);

	$('.tabs__progressVal').text(num*20);
}






// ===============================================
// mixer
// ===============================================
function mixerMove(e){
	
	let elem = $(this).closest('.tabs__mixerLimit');
	let flag = true;
	let position = parseFloat(elem.css('left'));
	let maxWidth = elem.closest('.tabs__mixerWrap').width();
	let state = $('.tabs__mixerState');
	let firstEl = $('.tabs__mixerLimit_min');
	let lastEl = $('.tabs__mixerLimit_max');
	let myLeft;
	let stateWidth;


	let moveEl = function(newE){
		myLeft = position + newE.pageX - e.pageX;
		
		checkLeftPosition();
		changeStateWidth();

		elem.css({
			'left': myLeft
		});
			
	}

	let changeStateWidth = function(){
		state.css({
			'left': parseFloat(firstEl.css('left')) + 5,
			'width': parseFloat(lastEl.css('left')) - parseFloat(firstEl.css('left'))
		})

		stateWidth = parseFloat(lastEl.css('left')) - parseFloat(firstEl.css('left'));
		console.log(`state - ${stateWidth - 5}`);
		console.log(`all - ${maxWidth}`);
	}


	let checkLeftPosition = function(){
		if(elem.hasClass('tabs__mixerLimit_min')){
			if(myLeft > parseFloat(lastEl.css('left')) - 15){
				myLeft = (parseFloat(lastEl.css('left')) - 15);
			}
		}else{
			if(myLeft < parseFloat(firstEl.css('left')) + 15){
				myLeft = (parseFloat(firstEl.css('left')) + 15);
			}
		}

		if(myLeft < 0){
			myLeft = -5;
		}
		if(myLeft > maxWidth){
			myLeft = maxWidth;
		}
	}


	let moveOver = function(){
		flag = false;
	}

	$(document).mousemove( function(e){
		if(flag){
			moveEl(e) 
		}
	});

	$(document).mouseup( moveOver );
}







})(jQuery);