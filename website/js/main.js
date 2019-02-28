const publicationsDisplayed = 10;

/* ---- mixitup.js our work sorting ---- */
$('#thework').mixItUp({
	animation: {
		duration: 1000
	}
});

/* ---- our ideology hover ---- */
$('.process-box').hover(function () {
	$(this).find('.process-intro').hide();
	$(this).find('.process-content').fadeIn();
}, function () {
	$(this).find('.process-content').hide();
	$(this).find('.process-intro').fadeIn();
});

/* ---- our work gallery ---- */
$('#work').magnificPopup({
	delegate: 'a.zoom',
	type: 'image',
	fixedContentPos: false,
	removalDelay: 300,
	mainClass: 'mfp-fade',
	gallery: {
		enabled: true,
		preload: [0, 2]
	}
});

/* ---- popup image ---- */
$('.popup-img').magnificPopup({
	type: 'image',
	removalDelay: 300,
	mainClass: 'mfp-fade'
});

/* ---- popup video ---- */
$(document).ready(function () {
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
});

/* ---- nav smooth scroll ---- */
$(document).ready(function () {
	$('.scroll-link').on('click', function (event) {
		event.preventDefault();
		var sectionID = $(this).attr("data-id");
		scrollToID('#' + sectionID, 750);
	});
	$('.scroll-top').on('click', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 1200);
	});
});

/* ---- navbar offset ---- */
function scrollToID(id, speed) {
	var offSet = 69;
	var targetOffset = $(id).offset().top - offSet;
	$('html,body').animate({
		scrollTop: targetOffset
	}, speed);
}

/* ---- close mobile nav on click ---- */
$(document).on('click', '.navbar-collapse.in', function (e) {
	if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
		$(this).collapse('hide');
	}
});

$(document).ready(function () {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	$.getJSON("json/publications.json", publications => {

		var publicationsTemplate = _.template(" \
			<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-6\"> \
				<h3><%= title %></h3> \
				<p> \
					<%= authors %> \
					<br> \
					<%= venue %>, <%= date.monthTxt %> <%= date.year %> | <a target=\"_blank\" href=\"<%= links.pdf %>\">Download PDF</a> | <a target=\"_blank\" href=\"<%= links.abstract %>\">View Abstract</a> \
				</p> \
			</div> \
		");

		publications = publications.sort((a, b) => a.date.year * 100 + a.date.month < b.date.year * 100 + b.date.month);
		publications = publications.slice(0, publicationsDisplayed);

		var publicationsHtmlContent = publications
			.map(publication => {
				publication.date.monthTxt = months[publication.date.month];

				return publicationsTemplate(publication)
			})
			.reduce((accum, self) => accum + self);

		$publicationsContainer = $("#publications");
		$publicationsContainer.empty();
		$publicationsContainer.html(publicationsHtmlContent);
	});
	
	$.getJSON("json/people.json", people => {

		var peopleTemplate = _.template(" \
			<div class=\"col-xs-12 col-sm-6 col-md-3 col-lg-3 text-center topReveal\"> \
				<div class=\"team-member-box-2\"> \
					<div class=\"team-image-wrapper rotateTopReveal\"> \
						<a target=\"_blank\" href=\"<%= website %>\"> \
							<img src=\"<%= image %>\" alt=\"<%= name %>\" class=\"img-responsive img-circle team-member-img text-center\"> \
						</a> \
					</div> \
					<h3><%= name %></h3> \
					<p class=\"mb15\"><%= position %></p> \
				</div> \
			</div> \
		");

		var peopleHtmlContent = people
			.map(publication => peopleTemplate(publication))
			.reduce((accum, self) => accum + self);

		$peopleContainer = $("#people");
		$peopleContainer.empty();
		$peopleContainer.html(peopleHtmlContent);
	});
	
	
	
});
