/**
	Singha Beerfinder
 	Copyright 2017 Boon Rawd Brewery Company Limited.
	Author: Boon Rawd Brewery Company Limited.
**/


jQuery(document).ready(function() {
	
	"use strict";
	
	/* =============================================
	Page loading transition
	================================================ */
	$('a').each(function() {
		var linkEmpty = $(this).attr("href");
		
		$(this).addClass("move-transition");
		if ($(this).hasClass("no-transition")) {
			$(this).removeClass("move-transition");
		}
		if (linkEmpty == "#") {
			$(this).removeClass("move-transition");
		}
	});
	
	var timeonLoad = 1300,
		moveTransition = $('.move-transition');
	
	setTimeout(function(){
		$('.loading-element').fadeOut(300);
		$('#page-loading').addClass("pageLoaded");
	}, 800);
	
	moveTransition.on("click", function(e){
		e.preventDefault();
		$('#page-move').addClass('beforeLoad');
		
		var linkDirection = $(this).attr('href');
		setTimeout(function(){
			window.location = linkDirection;
		}, 300);
	});
	
	
	/* =============================================
	Custom Data Attribute
	================================================ */
	var bgImage = ".bg-image";
	
	$(bgImage).css('background-image', function () {
		var bg = ('url(' + $(this).data("bg-image") + ')');
		return bg;
	});
	
	
	/* =============================================
	Bottom menu setting
	================================================ */
	var menuBottom = $('#menu-bottom li');
		
	menuBottom.on("click", function() {
		menuBottom.each(function() {
			$(this).removeClass("menu-active");
		});
		$(this).addClass("menu-active");
	});
	
	
	/* =============================================
	Modal setting
	================================================ */
	var modal = $('.modal'),
		modalContent = $('.modal-content'),
		modalOpen = $('.modal-open'),
		modalClose = $('.modal-close');
	
	$(window).on("resize", function() {
		var windowHeight = $(window).height();
		$('.modal-content').outerHeight(windowHeight - 20);
		$('.modal-terms .modal-content').outerHeight(windowHeight - 40);
		$('.modal-terms-box').outerHeight(windowHeight - 96);
	}).resize();
	
	modalOpen.on("click", function(event){
		event.preventDefault();
		modal.show();
	});
	
	modalClose.on("click", function(event){
		event.preventDefault();
		modal.hide();
	});
	
	modal.on("click", function(){
		modal.hide();
	});
	
	modalContent.on("click", function(event){
		event.stopPropagation();
	});
	
	
	/* =============================================
	Quiz progress bar setting
	================================================ */
	var quizProgress = $('.quiz-progress'),
		progressBar = $('.progress-bar'),
		quizProgressWidth = quizProgress.width(),
		percentage = progressBar.attr('data-percentage')+'%';
	
	progressBar.animate({
		width: percentage
	});
	
	/* Test click correct answer */
	$('.correct a').on( "click", function(e) {
		e.preventDefault();
		progressBar.css("width", '+=' + (0.125 * quizProgress.width()));
		
		setTimeout(function(){
			if (progressBar.width() >= quizProgressWidth) {
				//Finished
			}
		}, 1000);
	});
	
	
	/* =============================================
	Number animation
	================================================ */
	/*
	var numCount = $('.num-count');
	
	numCount.prop('Counter',-1).animate({
		Counter: numCount.text()
	}, {
		duration: 600,
		easing: 'swing',
		step: function (now) {
			numCount.text(Math.ceil(now));
		}
	});
	
	
	/* =============================================
	Fixed Route svg width on fixed container
	================================================ */
	$(window).on("resize", function() {
		setTimeout(function(){
			var routeSvgContainerWidth = $('.route-svg-container.parent-fixed').width(),
				routeSvgContent = $('.parent-fixed .route-svg-content');
			routeSvgContent.width(routeSvgContainerWidth);
		}, 400);
	});
	
	
	/* =============================================
	Route transition settings
	================================================ */
	$('.route-transition .base-marker').on("click", function() {
		$('.route-transition .base-marker').each(function() {
			$(this).removeClass("base-active")
		});
		$(this).addClass("base-active baseClick");
		
		var groupActive = $(".group-active").clone();
		var groupUnActive = $(".group-unactive:first").clone();

		$('.group-active').each(function() {
			$(this).replaceWith(groupUnActive);
		});
		$(this).find(".group-unactive").replaceWith(groupActive);
    });
	
	
	/* =============================================
	Slide menu setting
	================================================ */
	var $menu = $("#slide-menu").mmenu({
		offCanvas: {
			pageSelector: "#container-wrapper",
			position: "right"
		},
		extensions: [ "theme-dark","fx-menu-slide","shadow-page"]
	}, {
		classNames: {
            selected: "slide-menu-active"
		}
	});
	
	var $burger = $("#burger"),
		$menuTop = $("#menu-top"),
		wrapOffsetTop = $("#content-wrapper.offset-top"),
		eleTransparent = $(".element-transparent"),
		API = $menu.data( "mmenu" );
	
	$('#burger span:nth-child(2)').on( "click", function() {
		API.open();
	});
	
	$('#burger span:first-child').on( "click", function() {
		API.close();
	});
	
	API.bind( "open:finish", function() {
		$burger.addClass( "burger-close" );
		$menuTop.addClass( "move-top" );
		wrapOffsetTop.addClass("no-offset");
		eleTransparent.addClass("add-transparent");
		
		function notifying() {
			var slideMenuHeight = $('#slide-menu').height();
			var menuListHeight = $('#slide-menu .mm-panel ul').height();
			$('.notify-inset').fadeIn();
			$('.notify-inset').slimScroll({
				distance: '3px',
				height: slideMenuHeight - menuListHeight - 50,
				touchScrollStep : 100
			});
		}
		notifying();
		
		$(window).on("resize", function() {
			notifying();
		});
	});
	
	API.bind( "close:finish", function() {
		$burger.removeClass( "burger-close" );
		$menuTop.removeClass( "move-top" );
		wrapOffsetTop.removeClass("no-offset");
		eleTransparent.removeClass("add-transparent");
		$('.notify-inset').hide();
	});
	
	var notifying = $('.notifying').detach();
	$('#slide-menu .mm-panel ul').after('<div class="menu-notify"></div>');
	$('.menu-notify').append(notifying);
	
	
	/* =============================================
	Profile edit input auto focus
	================================================ */
	$('.profile-edit form input[name=Name]').focus();
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		var mobileInput = $('.profile-edit input');
		mobileInput.addClass("mobileInput");
		$('.profile-edit form input[name=Name]').addClass("autoFocus");
	}
	
	$('.mobileInput').on("click", function() {
		$('.mobileInput').each(function() {
			$(this).removeClass("autoFocus");
		});

		$(this).blur(function(){
			$(this).addClass("autoFocus");
		});
	});
	
	
	/* =============================================
	Add fixed elements after mmenu loaded
	================================================ */
	$('body').prepend('<div id="page-move"></div>');
	$('body').prepend('<div id="disable-devices"><div class="vertical-wrap"><div class="large-devices"><img src="images/svg/tablet.svg" alt=""/>not yet available<span>on this device</span></div><div class="rotate-device"><img src="images/svg/rotate-device.svg" alt=""/>Rotate your phone<span>for best experience with Singha Beerfinder</span></div></div></div>');
	
	
	/* =============================================
	SlimScroll setting
	================================================ */
	$(window).on("resize", function() {
		$('.custom-scroll').slimScroll({
			distance: '3px',
			height: 'auto',
			touchScrollStep : 100
		});
	}).resize();
	
	$('.route-box .modal-open').on( "click", function() {
		$(window).on("resize", function() {
			var pfRouteModalHeight = $('.profile-routes-completed .modal-content').height(),
				routeModalTopHeight = $('.route-modal-heading').outerHeight(),
				modalInnerHeight = pfRouteModalHeight - routeModalTopHeight;
					
			$('.profile-modal-scroll').slimScroll({
				distance: '3px',
				height: modalInnerHeight,
				touchScrollStep : 100
			});
		}).resize();
	});
	
	
	/* =============================================
	OWL carousel setting
	================================================ */
	$(".owl-carousel.home-carousel").owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		autoplayTimeout: 7000
	});
	
	$(window).on("resize", function() {
		var windowHeight = $(window).height();
		$('.home-carousel .carousel-item').outerHeight(windowHeight);
		
		setTimeout(function(){
			$(".owl-carousel.home-carousel").trigger('refresh.owl.carousel');
		}, 400);
	}).resize();
	
	
	/* =============================================
	jQuery Isotope setting
	================================================ */
	var rewardItems = $('.reward-item-row');
	
	rewardItems.imagesLoaded( function(){
		rewardItems.isotope({
			itemSelector : '.reward-item-col',
			transitionDuration: '0.8s'
		});
		
		$(window).on("resize", function() {
			setTimeout(function(){
				rewardItems.isotope( 'reloadItems' ).isotope();
			}, 500);
		});
	});
	
	
	/* =============================================
	Route detail tabs setting
	================================================ */
	$('.route-details-container').tabulous({
		effect: 'custom'
    });
	
	
	/* =============================================
	Route animation setting
	================================================ */
	function routeAnimate() {
	
		var routeSingle = $('.route-svg-single .route-svg-content'),
			routeList = $('.route-svg-list .route-svg-content');
		
		routeSingle.addClass("svgSingle");
		routeList.addClass("svgList");
			
		var baseCircle = $('.base-marker').find("circle");
		baseCircle.attr("data-ignore","true");
		
		var routeCallback = function (routeFinished) {
			routeFinished.el.classList.add('route-finished');
		};
		
		var routeSvgList = document.getElementsByClassName("svgList");
		
		for (var i = routeSvgList.length - 1; i >= 0; i--) {
			new Vivus(routeSvgList[i], {
				type: 'sync',
				duration: 80,
				animTimingFunction: Vivus.EASE_OUT,
				onReady: function (routeFit) {
					routeFit.el.setAttribute('width', '100%');
					routeFit.el.setAttribute('height', '100%');
				}
			}, routeCallback);
		}
		
		var routeSvgSingle = document.getElementsByClassName("svgSingle");
		
		for (var i = routeSvgSingle.length - 1; i >= 0; i--) {
			new Vivus(routeSvgSingle[i], {
				type: 'sync',
				duration: 80,
				animTimingFunction: Vivus.EASE_OUT,
				onReady: function (routeFit) {
					routeFit.el.setAttribute('width', '100%');
					routeFit.el.setAttribute('height', '100%');
				}
			});
		}
		
		setTimeout(function(){
			routeSingle.addClass("route-finished");
		}, 900);
	
	}
	
	setTimeout(function(){
		routeAnimate();
	}, timeonLoad);
	
});