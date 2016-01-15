import React from 'react';
import Tethered from '../src/Tethered';
import ReactDOM from 'react-dom';
import Fuse from 'fuse.js';

export default class AutoComplete extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    itemComponent: React.PropTypes.func,
    source: React.PropTypes.array,
    keys: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    width: React.PropTypes.number
  }

  constructor(props) {
    super(props);

    let fuseSearchKeys = null;
    let fuseSource = null;

    let { source } = props;

    if(typeof source[0] === 'string') { // source is given as array of strings
      fuseSearchKeys = ['value'];
      fuseSource = source.map((value) => {
        return { value };
      });
    } else { // source is given as array of objects
      fuseSource = source;
      fuseSearchKeys = this.props.keys || Object.keys(this.props.source[0]);
    }
    let fuseOptions = {
      caseSensitive: false,
      includeScore: false,
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      keys: fuseSearchKeys
    };
    this.fuse = new Fuse(fuseSource, fuseOptions); // "list" is the item array

    this.state = {
      source: fuseSource,
      visible: false,
      highlightedItemIndex: null,
      keys: fuseSearchKeys
    };
  }

  componentDidMount() {
    this.inputEl = ReactDOM.findDOMNode(this);
    this.inputEl.addEventListener('keyup', this.handleKeyup);
  }

  componentWillReceiveProps() {
    this.setState({
      highlightedItemIndex: null
    });
  }

  componentWillUnmount() {
    this.inputEl.removeEventListener('keyup', this.handleKeyup);
  }

  handleKeyup = (e) => {
    let value = e.currentTarget.value;
    let { highlightedItemIndex } = this.state;
    if(e.keyCode === 40) { // going down
      if(highlightedItemIndex === this.state.source.length - 1) {
        return;
      }
      let newIdx = null;
      if(highlightedItemIndex === null) {
        newIdx = 0;
      } else {
        newIdx = highlightedItemIndex + 1;
      }
      this.setState({
        highlightedItemIndex: newIdx
      });
      return;
    }

    if(e.keyCode === 38) { // going up
      if(highlightedItemIndex === 0 || highlightedItemIndex === null) {
        return;
      }
      this.setState({
        highlightedItemIndex: highlightedItemIndex - 1
      });
      return;
    }

    if(e.keyCode === 13) { // on Enter
      if(highlightedItemIndex === null) {
        return;
      }
      this.setState({
        visible: false
      }, () => {
        this.props.onSelect(this.state.source[highlightedItemIndex]);
      });
      return;
    }

    this.setState({
      source: this.fuse.search(value),
      visible: true
    }, () => {
    });
  }

  handleListItemMouseOver(idx) {
    this.setState({
      highlightedItemIndex: idx
    });
  }

  handleListItemClick(item) {
    this.setState({
      visible: false
    }, () => {
      this.props.onSelect(item);
      // if(typeof item === 'object') {
        // this.props.onSelect({ value: item });
      // } else {
      // }
    });
  }

  render() {
    let listItems = this.state.source.map((value, idx) => {
      return (
        <li key={`typa_key_${idx}`}
          onMouseOver={() => this.handleListItemMouseOver(idx)}
          onClick={() => this.handleListItemClick(value)}
        >
          {
            React.createElement(this.props.itemComponent, {
              ...value,
              highlighted: idx === this.state.highlightedItemIndex
            })
          }
        </li>
      );
    });

    let list = (
      <ul
        style={{ margin: 0, padding: 0, listStyle: 'none', width: this.props.width || 'auto', background: '#fff' }}
        onKeyUp={() => { console.log('key up'); }}
        className="react-otocomplete-list"
      >
        {listItems}
      </ul>
    );
    return (
      <Tethered
        visible={this.state.visible}
        attachment="top left" // tether option
        targetAttachment="bottom left" // tether option
        attachmentElement={ <div>{ list }</div> } // this element will be positioned absolute
        toggleOnClick={ true } // attached element will be toggled
      >
        { this.props.children }
      </Tethered>
    );
  }
}
