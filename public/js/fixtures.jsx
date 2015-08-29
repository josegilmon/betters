var If = React.createClass({
  render: function() {
    if (this.props.condition) {
      return this.props.children;
    } else {
      return false;
    }
  }
});

var FixtureCard = React.createClass({
  render: function() {

    var imgPath = 'img/teams/big/';
    var imgExt = '.jpg';

    var date = new Date(this.props.fixture.date.replace(/[Z]/gi, ""));
    var homeTeam = teams[this.props.fixture.homeTeamName];
    var awayTeam = teams[this.props.fixture.awayTeamName];

    return (
      <div className="fixtureCard row">
        <div className="col l12 center-align">
          { date.toLocaleString('latn') }
        </div>
        <div className="col l2">
          <img src={ imgPath + homeTeam.code + imgExt } className="responsive-img" />
        </div>
        <div className="col l4">
          { this.props.fixture.homeTeamName }
        </div>
        <div className="col l4 right-align">
          { this.props.fixture.awayTeamName }
        </div>
        <div className="col l2">
            <img src={ imgPath + awayTeam.code + imgExt } className="responsive-img" />
        </div>
      </div>
    );
  }
});

var FixtureList = React.createClass({
  render: function() {
    var fixtureNodes = this.props.data.map(function(fixture) {
      return (
        <div className="col s12 m6 l4">
          <div className="card">
            <FixtureCard fixture={fixture}></FixtureCard>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        {fixtureNodes}
      </div>
    );
  }
});

var FixturePagination = React.createClass({
  selectPage: function (ev) {
    ev.preventDefault();
    var page = $(ev.currentTarget).data('page');
    this.props.onPageSelected(page);
  },
  render: function () {
    var pages = [];
    var maxJornadas = 8;

    // Añadimos la navegación a la primera página
    pages.push(
      <li className={this.props.page === 1 ? "disabled" : "waves-effect" } onClick={this.selectPage} dataPage="1">
        <a href="" ><i className="material-icons">chevron_left</i></a>
      </li>
    );
    // Añadimos la navegación de las páginas 1 a n
    for (var i = 1; i <= maxJornadas; i++) {
      pages.push( i == this.props.page ? (
          <li key={'page_' + i}>{i}</li>
        ) : (
          <li key={'page_' + i} onClick={this.selectPage} data-page={i}><a href="#">{i}</a></li>
        )
      );
    }
    // Añadimos la navegación a la última página
    pages.push(
      <li className={ this.props.page >= maxJornadas ? "disabled" : "waves-effect" } onClick={this.selectPage} data-page={maxJornadas}>
        <a href=""><i className="material-icons">chevron_right</i></a>
      </li>
    );
    // <li onClick={this.selectPage} data-page="{maxJornadas}"><a href="#">&gt;&gt;</a></li>

    return (
      <ul className="pagination">
        {pages}
      </ul>
    );
  }
});

var FixtureBox = React.createClass({
  getInitialState: function () {
    return {
      data: [],
      jornada: 1
    };
  },
  loadFixtures: function (day) {
    $.getJSON('/api/fixtures/' + (day || ''), function(response) {
        this.setState({ data: response.fixtures.slice() });
      }.bind(this)
    );
  },
  componentDidMount: function() {
    this.loadFixtures(this.state.jornada);
  },
  changeJornada: function (day) {
    this.setState({ jornada: day });
    this.loadFixtures(day);
  },
  render: function () {
    return (
      <div className="col l12">
        <section>
          <h1>Jornada {this.state.jornada}</h1>
          <FixtureList data={this.state.data} />
          <FixturePagination page={this.state.jornada} onPageSelected={this.changeJornada} />
        </section>
      </div>
    );
  }
});

React.render(
  <FixtureBox />,
  document.getElementById('container')
);
/*
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
    }
  };
};
*/
