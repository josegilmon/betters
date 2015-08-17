var MenuItem = React.createClass({
  render: function() {
    return (
      <li className="" ><a href={this.props.data.url}>{this.props.data.title}</a></li>
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
