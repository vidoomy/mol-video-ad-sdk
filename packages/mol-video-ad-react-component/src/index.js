/* eslint-disable filenames/match-exported, react/sort-comp */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import loadVastChain from './helpers/loadVastChain';
import tryToStartAd from './helpers/tryToStartAd';
import makeCancelable from './helpers/makeCancelable';

const noop = () => {};

class MolVideoAd extends Component {
  static defaultProps = {
    children: undefined,
    height: undefined,
    logger: console,
    onComplete: noop,
    onLinearEvent: noop,
    onNonRecoverableError: noop,
    onRecoverableError: noop,
    onStart: noop,
    tracker: undefined,
    videoElement: undefined,
    width: undefined
  };

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    getTag: PropTypes.func.isRequired,
    height: PropTypes.number,
    logger: PropTypes.shape({
      error: PropTypes.func,
      log: PropTypes.func
    }),
    onComplete: PropTypes.func,
    onLinearEvent: PropTypes.func,
    onNonRecoverableError: PropTypes.func,
    onRecoverableError: PropTypes.func,
    onStart: PropTypes.func,
    tracker: PropTypes.func,
    videoElement: PropTypes.node,
    width: PropTypes.number
  };

  ref = (element) => {
    this.element = element;
  };

  constructor (props, context) {
    super(props, context);

    this.state = {
      ready: false
    };
  }

  componentDidMount () {
    this.adUnitPromise = this.startAd();
    this.stateUpdate = makeCancelable(this.adUnitPromise);
    // eslint-disable-next-line promise/always-return, promise/catch-or-return, promise/prefer-await-to-then
    this.stateUpdate.promise.then((adUnit) => {
      this.adUnit = adUnit;

      // eslint-disable-next-line react/no-set-state
      this.setState({
        ready: true
      });
    });
  }

  componentWillUnmount () {
    if (this.stateUpdate.isPending()) {
      this.stateUpdate.cancel();
    }
    const adUnit = this.adUnit;

    if (adUnit && !adUnit.isFinished()) {
      adUnit.cancel();
    }
  }

  componentDidUpdate (prevProps) {
    const {
      height,
      width,
      onStart
    } = this.props;

    const adUnit = this.adUnit;

    if (adUnit && this.state.ready) {
      if (height !== prevProps.height || width !== prevProps.width) {
        adUnit.resize();
      }

      onStart({
        adUnit,
        changeVolume: (newVolume) => adUnit.changeVolume(newVolume),
        pause: () => adUnit.pause(),
        resume: () => adUnit.resume()
      });
    }
  }

  async startAd () {
    const {
      getTag,
      logger,
      onComplete,
      onLinearEvent,
      onNonRecoverableError,
      onRecoverableError: onError,
      tracker,
      videoElement
    } = this.props;

    const options = {
      logger,
      onError,
      onLinearEvent,
      tracker,
      videoElement
    };

    try {
      const fetchVastChain = async () => loadVastChain(await Promise.resolve(getTag()));
      const adUnit = await tryToStartAd(fetchVastChain, this.element, options);

      adUnit.onError(onNonRecoverableError);
      adUnit.onComplete(onComplete);

      return adUnit;
    } catch (error) {
      onNonRecoverableError(error);

      throw error;
    }
  }

  render () {
    const {
      children,
      height,
      width
    } = this.props;

    const style = {
      height: height ? `${height}px` : '100%',
      width: width ? `${width}px` : '100%'
    };

    return <div style={style}>
      {!this.state.ready && children}
      {this.state.ready && <div ref={this.ref} />}
    </div>;
  }
}

export default MolVideoAd;
