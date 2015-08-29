var If = React.createClass({displayName: "If",
  render: function() {
    if (this.props.condition) {
      return this.props.children;
    } else {
      return false;
    }
  }
});

var FixtureCard = React.createClass({displayName: "FixtureCard",
  render: function() {

    var imgPath = 'img/teams/big/';
    var imgExt = '.jpg';

    var date = new Date(this.props.fixture.date.replace(/[Z]/gi, ""));
    var homeTeam = teams[this.props.fixture.homeTeamName];
    var awayTeam = teams[this.props.fixture.awayTeamName];

    return (
      React.createElement("div", {className: "fixtureCard row"}, 
        React.createElement("div", {className: "col l12 center-align"}, 
           date.toLocaleString('latn') 
        ), 
        React.createElement("div", {className: "col l2"}, 
          React.createElement("img", {src:  imgPath + homeTeam.code + imgExt, className: "responsive-img"})
        ), 
        React.createElement("div", {className: "col l4"}, 
           this.props.fixture.homeTeamName
        ), 
        React.createElement("div", {className: "col l4 right-align"}, 
           this.props.fixture.awayTeamName
        ), 
        React.createElement("div", {className: "col l2"}, 
            React.createElement("img", {src:  imgPath + awayTeam.code + imgExt, className: "responsive-img"})
        )
      )
    );
  }
});

var FixtureList = React.createClass({displayName: "FixtureList",
  render: function() {
    var fixtureNodes = this.props.data.map(function(fixture) {
      return (
        React.createElement("div", {className: "col s12 m6 l4"}, 
          React.createElement("div", {className: "card"}, 
            React.createElement(FixtureCard, {fixture: fixture})
          )
        )
      );
    });

    return (
      React.createElement("div", {className: "row"}, 
        fixtureNodes
      )
    );
  }
});

var FixturePagination = React.createClass({displayName: "FixturePagination",
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
      React.createElement("li", {className: this.props.page === 1 ? "disabled" : "waves-effect", onClick: this.selectPage, dataPage: "1"}, 
        React.createElement("a", {href: ""}, React.createElement("i", {className: "material-icons"}, "chevron_left"))
      )
    );
    // Añadimos la navegación de las páginas 1 a n
    for (var i = 1; i <= maxJornadas; i++) {
      pages.push( i == this.props.page ? (
          React.createElement("li", {key: 'page_' + i}, i)
        ) : (
          React.createElement("li", {key: 'page_' + i, onClick: this.selectPage, "data-page": i}, React.createElement("a", {href: "#"}, i))
        )
      );
    }
    // Añadimos la navegación a la última página
    pages.push(
      React.createElement("li", {className:  this.props.page >= maxJornadas ? "disabled" : "waves-effect", onClick: this.selectPage, "data-page": maxJornadas}, 
        React.createElement("a", {href: ""}, React.createElement("i", {className: "material-icons"}, "chevron_right"))
      )
    );
    // <li onClick={this.selectPage} data-page="{maxJornadas}"><a href="#">&gt;&gt;</a></li>

    return (
      React.createElement("ul", {className: "pagination"}, 
        pages
      )
    );
  }
});

var FixtureBox = React.createClass({displayName: "FixtureBox",
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
      React.createElement("div", {className: "col l12"}, 
        React.createElement("section", null, 
          React.createElement("h1", null, "Jornada ", this.state.jornada), 
          React.createElement(FixtureList, {data: this.state.data}), 
          React.createElement(FixturePagination, {page: this.state.jornada, onPageSelected: this.changeJornada})
        )
      )
    );
  }
});

React.render(
  React.createElement(FixtureBox, null),
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
