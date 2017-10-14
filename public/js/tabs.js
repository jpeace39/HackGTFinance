$(document).ready(function() {
	(function ($) {
		$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current')	//.tab ul.tabs .active li:eq(0).current li:eq(0) is the first option of the tabs...so start off the page loaded on that one. EZ

		$('.tab ul.tabs li a').click(function (g) {
			var tab = $(this).closest('.tab'),
				index = $(this).closest('li').index();
			//.tab ul.tabs li a....on click, execute function g where var tab is .this .tab; index is .this .li.index tells you which list index we're on. aka not the first one anymore

			tab.find('ul.tabs > li').removeClass('current');
			//then find the 'ul.tabs > li' class within tab. then remove the class 'current'
			$(this).closest('li').addClass('current')
			//then make whichever li is closest to the "this" and make it current.
			tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
			tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown(); //take the content for that tab's content and then slide it up or down, etc. whatever.

			g.preventDefault(); //cancels event if possible.
		} );
	})(jQuery);
});
