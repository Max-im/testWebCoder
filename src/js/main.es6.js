(function($) {

// 1. HEADER
// -----------------------------------------
	



// &__logoWrap
// -----------------------------------------




// slider
// -----------------------------------------
$('.herro__slider').owlCarousel({
	items: 1,
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


const userInfoSubmit = {
	userGender: '',
	searchGender: '',
	userName: '',
	userAge: {
		day: '',
		month: '',
		year: ''
	},
	userCity: '',
	coolCheckbox: '',
	lifeGoodCheckbox: '',
	drinkRadio: ''
}







// 2. MAIN
// -----------------------------------------




// userInfo
// -----------------------------------------




// useInstructions
// -----------------------------------------




// 3. FOOTER
// -----------------------------------------






})(jQuery);



// FUNCTIONS
// -----------------------------------------
function addSearcElem(){
	let inputElem = $('.form__input_search').children();
	let  searchElem = '<span class="form__inputTarget"></span><span class="form__input_searchEl"></span>'
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
	e.preventDefault();
	let userGender = validGender(0);
	let searchGender = validGender(1);
	let userName = validInput();


	if(!userGender || !searchGender ){
		showError('.form__forIAm');
	}
			
}

function showError(elem, forBoxShadow){
	let text = $(elem).attr('data-error');
	$(elem).append('<i class="error fa fa-times"></i>');
	$(elem).append('<p class="errorText">'+text+'</p>');

	console.log('text', text);
			

	$(forBoxShadow).css({
		boxShadow: '0 0 5px red'
	});
	setTimeout(()=>{
		$('.error').remove()
		$(forBoxShadow).css({
			boxShadow: 'none'
		});
	}, 6000);
}


function validGender(i){
	let elem = $('.form__forIAmWrap').children('.form__genderTablet')[i];
	if($(elem).children('div').hasClass("form__girl_active")){

		return 'girl';

	}else if($(elem).children('div').hasClass("form__boy_active")){
		
		return 'boy';

	}else{

		return;
				
	}
}


function validInput(){
	if($('#form__nameInput').val() == ''){

		showError('.form__forName', '#form__nameInput');

	}else{

		return $('#form__nameInput').val();

	}
}