/* eslint-disable promise/prefer-await-to-callbacks */
import {linearEvents} from 'mol-video-ad-tracker';
import Emitter from 'mol-tiny-emitter';
import {
  getClickThrough,
  getSkipoffset
} from 'mol-vast-selectors';
import findBestMedia from './helpers/media/findBestMedia';
import setupMetricHandlers from './helpers/metrics/setupMetricHandlers';
import setupIcons from './helpers/icons/setupIcons';
import getProgressEvents from './helpers/progress/getProgressEvents';

const {
  complete,
  iconClick,
  iconView,
  error: errorEvt
} = linearEvents;

const safeCallback = (callback, logger) => (...args) => {
  try {
    // eslint-disable-next-line callback-return
    callback(...args);
  } catch (error) {
    logger.error(error);
  }
};
const onErrorCallbacks = Symbol('onErrorCallbacks');
const onCompleteCallbacks = Symbol('onCompleteCallbacks');
const removeMetrichandlers = Symbol('removeMetrichandlers');
const removeIcons = Symbol('removeIcons');

class VastAdUnit extends Emitter {
  constructor (vastChain, videoAdContainer, {hooks = {}, logger = console} = {}) {
    super(logger);

    this.hooks = hooks;

    this.vastChain = vastChain;
    this.videoAdContainer = videoAdContainer;
    this.error = null;
    this.errorCode = null;
    this.assetUri = null;
    this[onErrorCallbacks] = [];
    this[onCompleteCallbacks] = [];

    this[removeIcons] = setupIcons(this.vastChain, {
      logger: this.logger,
      onIconClick: (icon) => this.emit(iconClick, iconClick, this, icon),
      onIconView: (icon) => this.emit(iconView, iconView, this, icon),
      videoAdContainer: this.videoAdContainer
    });
  }

  run () {
    const videoAdContainer = this.videoAdContainer;
    const {videoElement, element} = videoAdContainer;
    const inlineAd = this.vastChain[0].ad;
    const media = findBestMedia(inlineAd, videoElement, element);
    const skipoffset = getSkipoffset(inlineAd);
    const clickThroughUrl = getClickThrough(inlineAd);
    const progressEvents = getProgressEvents(this.vastChain);

    const handleMetric = (event, data) => {
      switch (event) {
      case complete: {
        this[onCompleteCallbacks].forEach((callback) => callback(this));
        break;
      }
      case errorEvt: {
        this.error = data;
        this.errorCode = this.error && this.error.errorCode ? this.error.errorCode : 405;
        this[onErrorCallbacks].forEach((callback) => callback(this, this.error));
        break;
      }
      }

      this.emit(event, event, this, data);
    };

    if (Boolean(media)) {
      videoElement.src = media.src;
      this.assetUri = media.src;

      // eslint-disable-next-line object-property-newline
      this[removeMetrichandlers] = setupMetricHandlers(videoAdContainer, handleMetric, {
        clickThroughUrl,
        progressEvents,
        skipoffset,
        ...this.hooks
      });

      videoElement.play();
    } else {
      const adUnitError = new Error('Can\'t find a suitable media to play');

      adUnitError.errorCode = 403;
      handleMetric(errorEvt, adUnitError);
    }
  }

  cancel () {
    const videoElement = this.videoAdContainer.videoElement;

    videoElement.pause();
  }

  onComplete (callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Expected a callback function');
    }

    this[onCompleteCallbacks].push(safeCallback(callback, this.logger));
  }

  onError (callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Expected a callback function');
    }

    this[onErrorCallbacks].push(safeCallback(callback, this.logger));
  }

  destroy () {
    this.videoAdContainer.videoElement.src = '';
    this[removeMetrichandlers]();

    this.vastChain = null;
    this.videoAdContainer = null;
    this.error = null;
    this.errorCode = null;
    this.assetUri = null;
    this[onErrorCallbacks] = null;
    this[onCompleteCallbacks] = null;
    this[removeMetrichandlers] = null;

    if (this[removeIcons]) {
      this[removeIcons]();
    }
  }
}

export default VastAdUnit;
