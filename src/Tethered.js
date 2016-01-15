import React from 'react';
import Tether from 'tether';
import assign from 'object-assign';
import ReactDOM from 'react-dom';

export default class ReactTether extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: this.props.visible };
  }

  componentWillMount() {
    let tetheredContainer = document.createElement('div');
    tetheredContainer.id = 'react-tethered-container';
    tetheredContainer.className = 'tethered_container';
    tetheredContainer.style.width = this.props.width + 'px';
    this._tetherContainer = tetheredContainer;
    document.querySelector('body').appendChild(this._tetherContainer);
  }

  componentDidMount() {
    this._renderTether();
  }

  componentDidUpdate() {
    this._renderTether();
  }


  render() {
    let newProps = {};
    if(this.props.toggleOnClick) {
      if(this.props.children.props.onClick !== undefined) {
        if(typeof this.props.children.props.onClick === 'function') {
          let onClickFn = this.props.children.props.onClick;
          newProps.onClick = this.toggleVisibilityByClick;
          newProps.onClick = (e) => {
            onClickFn(e);
            this.toggleVisibilityByClick(e);
          };
        }
      }
    }
    let el = React.cloneElement(
      this.props.children,
      newProps
    );
    return el;
  }

  _tetherComponent() {
    let { className } = this.props;
    if(this.props.visible) {
      return (
        <div className={className}>
          {this.props.attachmentElement}
        </div>
      );
    }
    return <span></span>;
  }

  _tetherOptions = () => {
    let options = assign({}, {
      element: this._tetherContainer,
      target: ReactDOM.findDOMNode(this)
    }, { ...this.props });
    return options;
  }

  _renderTether() {
    ReactDOM.render(this._tetherComponent(), this._tetherContainer);
    if(this._tether !== null && this._tether !== undefined) {
      this._tether.setOptions(this._tetherOptions());
    } else {
      this._tether = new Tether(this._tetherOptions());
    }
  }

  toggleVisibilityByClick = () => {
    this.setState({
      visible: !this.state.visible
    });
  }
}


