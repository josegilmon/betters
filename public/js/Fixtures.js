var Fixtures = function Fixtures() {
  return {
    fixtures: [],

    load: function load (day) {

      var _this = this;

      $.ajax({
          headers: { 'X-Auth-Token': '97a03c48247f456f8d1d9c8fd7de5ce6' },
          url: 'http://api.football-data.org/alpha/soccerseasons/399/fixtures?matchday=' + (day || 1),
          dataType: 'json',
          type: 'GET'
        })
        .done(function(response) {
          _this.fixtures = response.fixtures.slice();
          _this.print('#fixtures', true);
        });
    },

    print: function print(container, bClear) {

      var $container = $(container);

      bClear && $container.empty();

      this.fixtures.forEach(function printFixture(fixture) {
        var date = new Date(fixture.date);
        $container.append('<li>' + fixture.homeTeamName + ' - ' + fixture.awayTeamName + '(' + date.getHours() + ':' + date.getMinutes() + ')</li>');
      });
    }
  };
}