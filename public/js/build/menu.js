var MenuItem = React.createClass({displayName: "MenuItem",
  render: function() {

    var _this = this;
    var navigate = function() {
      location.href = _this.props.data.url;
    };

    return (
      React.createElement("li", {className: "active"}, React.createElement("a", {href: navigate}, this.props.data.title))
    );
  }
});

var MenuManager = React.createClass({displayName: "MenuManager",
  getInitialState: function() {
    return {
      items: [
        {
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
      ]
    };
  },
  render: function() {
    var menuItems = this.state.items.map(function (item) {
      return (
        React.createElement(MenuItem, {data: item, key: item.id})
      );
    });
    return (
      React.createElement("div", {className: "navbar-fixed green darken-3"}, 
        React.createElement("a", {href: "#", className: "brand-logo right"}, "Logo"), 
        React.createElement("ul", {id: "nav-mobile", className: "left hide-on-med-and-down"}, 
          menuItems
        )
      )
    );
  }
});

React.render(
  React.createElement(MenuManager, null),
  $('nav')[0]
);
