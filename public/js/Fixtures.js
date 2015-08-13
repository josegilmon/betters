
var FixtureCard = React.createClass({
  render: function() {
    var date = new Date(this.props.fixture.date.replace(/[Z]/gi, ""));
    console.log( date );

    return (
      <li className="fixtureCard">
        <span>{ this.props.fixture.homeTeamName }</span>
        <span> - </span>
        <span>{ this.props.fixture.awayTeamName }</span>
        <br/>
        <p className="fixtureDate">{ date.toLocaleString('latn') }</p>
      </li>
    );
  }
});

var FixtureList = React.createClass({
  render: function() {
    var fixtureNodes = this.props.data.map(function (fixture) {
      return (
        <FixtureCard fixture={fixture}></FixtureCard>
      );
    });
    return (
      <ul className="fixtureList">
        {fixtureNodes}
      </ul>
    );
  }
});

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

      React.render(
        <FixtureList data={this.fixtures} />,
        $(container)[0]
      );
/*
      var $container = $(container);

      bClear && $container.empty();

      this.fixtures.forEach(function printFixture(fixture) {
        var date = new Date(fixture.date);
        $container.append('<li>' + fixture.homeTeamName + ' - ' + fixture.awayTeamName + '(' + date.getHours() + ':' + date.getMinutes() + ')</li>');
      });
*/
    }
  };
}