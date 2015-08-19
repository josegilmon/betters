var MenuItem = React.createClass({
  render: function() {

    var _this = this;
    var navigate = function() {
      location.href = _this.props.data.url;
    };

    return (
      <li className="" onClick={navigate}>{this.props.data.title}</li>
    );
  }
});

var MenuManager = React.createClass({
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
        <MenuItem data={item} key={item.id} />
      );
    });
    return (
      <ul>
        {menuItems}
      </ul>
    );
  }
});

React.render(
  <MenuManager />,
  $('nav')[0]
);
