import React from 'react';
import AutoComplete from '../dist/bundle';
import ReactDOM from 'react-dom';

let Index = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },
  handleSelect(selectedItem) {
    this.setState({
      'value': selectedItem.name
    });
  },
  render() {
    let wrapperStyle = {
      textAlign: 'center',
      marginTop: 42
    };

    let source = [{
      name: 'Arthur C. Clarke',
    }, {
      name: 'Philip K. Dick'
    }, {
      name: 'Robert A. Henlein'
    }, {
      name: 'Ursula K. Leguin'
    }, {
      name: 'Kim Stanley Robinson'
    }, {
      name: 'Isaac Asimov'
    }];
    // this function will be run while rendering auto complete list
    // list items you will see is basically ReactDOM.createElement(itemFn)
    // this can be a stateless React component or ES6 class
    let itemFn = (props) => <div style={{ padding: 8,
      background: props.highlighted ? '#9b4dca' : 'white', // notice the prop higlighted, it will be true if item is currently hovered
      color: props.highlighted ? '#fff' : '#000',  }}>
      {props.name}
    </div>;

    return (
      <div style={wrapperStyle}>
        <AutoComplete
          source={source}
          itemComponent={itemFn}
          onSelect={(item) => this.handleSelect(item)}
          width={400}
        >
          {
            /*
              put your input as you like, this plugin does not create input
            */
          }
          <input
            style={{ border: '2px solid #e5e5e5', width: 400, padding: 12, outline: 'none', height: 42 }}
            type="text"
            onChange={(e) => { this.setState({ value: e.target.value }); }}
            value={ this.state.value }
            placeholder="type your favorite Sci-Fi author"
          />
        </AutoComplete>

      </div>
    );
  }
});

ReactDOM.render(<Index />, document.getElementById('app'));

