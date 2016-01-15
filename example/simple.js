import React from 'react';
import AutoComplete from '../src/AutoComplete';
import ReactDOM from 'react-dom';

let Index = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },
  /**
   * function when an item selected on Autocomplete
   * @param  {Object} selectedItem object containing selected item will be { value: SOURCE_ARRAY_ITEM }
   * @return you may need to set it as input value
   */
  handleSelect(selectedItem) {
    this.setState({
      'value': selectedItem.value
    });
  },

  render() {
    let wrapperStyle = {
      textAlign: 'center',
      marginTop: 42
    };

    // source is array of strings you want to list
    let source = ['Arthur C. Clarke', 'Philip K. Dick', 'Robert A. Henlein', 'Ursula K. Leguin', 'Kim Stanley Robinson', 'Isaac Asimov'];

    /*
     * itemFn will be created while rendering auto complete list
     *
     * <ul>
     *   React.createElement(itemFn, {...props})
     * </ul>
     *
     * this may be a pure function or a React class
     *
     * notice props object in function;
     * prop.highlighted will be ture if item is currently hovered or navigated with up/down keys otherwise undefined
     * props.value will be selected string
     */
    let itemFn = (props) => <div style={{ padding: 8,
      background: props.highlighted ? '#9b4dca' : 'white', // notice the prop higlighted, it will be true if item is currently hovered
      color: props.highlighted ? '#fff' : '#000',  }}>
      {props.value}
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
              put your input as you like, this plugin does not create it but binds key events
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

