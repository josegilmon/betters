
var FixtureScore = React.createClass({
  handleClick: function (score) {
    this.setState({data: score});
  },
  getInitialState: function () {
    return {data: -1};
  },
  componentDidMount: function() {
    var score = this.props.score;
    if (score != undefined) {
      this.setState({data: score > 3 ? 'M' : score});
    }
  },
  render: function () {

    var _this = this;
    var scores = ['0','1','2','M'];
    var scoreTable = scores.map(function (score) {
      var css = _this.state.data == score ? 'selected' : '';
      var clickHandler = _this.handleClick.bind(_this, score);
      return (
        <span className={css} onClick={clickHandler}>{score}</span>
      );
    });

    return (
      <span className={"fixture-score-grid " + this.props.side}>
        {scoreTable}
      </span>
    );
  }
});

var FixtureCard = React.createClass({
  handleHomeScore: function (score) {
    this.props.fixture.result.goalsHomeTeam = score;
  },
  handleAwayScore: function (score) {
    this.props.fixture.result.goalsAwayTeam = score;
  },
  render: function() {

    var imgExt = '.jpg';
    var imgPath = 'img/teams/big/';
    var dateOptions = { weekday: 'long', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };

    var date = new Date(this.props.fixture.date.replace(/[Z]/gi, ""));
    var homeTeam = teams[this.props.fixture.homeTeamName];
    var awayTeam = teams[this.props.fixture.awayTeamName];
    var score = this.props.fixture.result;

    return (
      <div className="card">
        <div className="card-content fixture-card row">
          <p className="card-title">
            <h6 className="black-text center-align">{ date.toLocaleString('es-ES', dateOptions) }</h6>
          </p>
          <div>
            <div className="match-card col s6">
              <h6>{ homeTeam.shortName }</h6>
              <div className="row">
                <img src={ imgPath + homeTeam.code + imgExt } className="responsive-img col s4" />
                <FixtureScore className="col s2" side="right" score={score.goalsHomeTeam} />
              </div>
            </div>
            <div className="match-card col s6 right-align">
              <h6>{ awayTeam.shortName }</h6>
              <div className="row">
                <FixtureScore className="col s2" side="left" score={score.goalsAwayTeam}/>
                <img src={ imgPath + awayTeam.code + imgExt } className="responsive-img col s4 right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var FixtureList = React.createClass({
  render: function() {
    var fixtureNodes = this.props.data.map(function(fixture) {
      return (
        <div className="col m12 l6">
          <FixtureCard fixture={fixture}></FixtureCard>
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
        <a href=""><i className="material-icons">chevron_left</i></a>
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
          <h2>Jornada {this.state.jornada}</h2>
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
