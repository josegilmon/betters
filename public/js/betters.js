var menuManager = function() {

	var items = [{
			id: 0,
			title: 'Inicio',
			url: 'index.html'
		},
		{
			id: 1,
			title: 'Clasificación',
			url: 'clasificacion.html'
		},
		{
			id: 2,
			title: 'Jornada',
			url: 'jornada.html'
		}
	];

	return {
		init: function(selected) {
			var _this = this;
			items.forEach(function(menuItem) {
				var elem = $('<li>' + menuItem.title + '</li>')
					.addClass( selected === menuItem.id ? 'menuItem selected' : 'menuItem')
					.click(function(ev) {
						$('.menuItem').removeClass('selected');
						$(this).addClass('selected');
						_this.onClick(menuItem);
					});

				$('nav > ul').append(elem);
			});
		},
		onClick: function(menuItem) {
			console.log(menuItem.title + " clicked!");
		}
	};
};

$(document).ready(function listReady(e) {

	var menu = new menuManager();
	menu.init(0);

	var fixtures = Fixtures();

	fixtures.load(1);
	fixtures.print('#fixtures');

	for (var i = 5; i > 0; i--) {
		var elem = $('<li data-matchday="'+ i +'"><a href="#">'+ i +'</a></li>')
			.click(function() {
				fixtures.load( $(this).data('matchday') );
			});
		$('ul.pagination').prepend(elem);
	}

});