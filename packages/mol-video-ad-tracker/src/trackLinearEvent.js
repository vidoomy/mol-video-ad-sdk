import {
  getClickThrough,
  getImpressionUri,
  getLinearTrackingEvents
} from 'mol-vast-selectors';
import pixelTracker from './helpers/pixelTracker';
import trackError from './helpers/trackError';
import createLinearEventTracker from './helpers/createLinearEventTracker';
import {
  clickThrough,
  complete,
  firstQuartile,
  fullscreen,
  impression,
  midpoint,
  mute,
  pause,
  playerCollapse,
  playerExpand,
  resume,
  rewind,
  skip,
  start,
  thirdQuartile,
  unmute,
  error
} from './linearEvents';

/*
  VPAID LINEAR TRACKING EVENTS

  * acceptInvitationLinear, <= Not used in VAST maybe for VPAID
  * otherAdInteraction, <= Not used in VAST maybe for VPAID?
  * timeSpentViewing, <= Not used in VAST maybe for VPAID?

  VAST LINEAR TRACKING EVENTS

  * impression,  <= emit called with eventName and adUint
  * iconView, <= emit called with eventName, adUnit, iconDefinition
  * iconClick, <= emit called with eventName, adUnit, iconDefinition
  * progress, <= emit called with eventName, adUint and {accumulated: NUMBER, contentplayhead: FORMATED_STRING}

  ALREADY SUPPORTED

  ALREADY TESTED
  * error, <= it will be called with an error object or undefined
  * clickThrough, <= emit called with eventName and adUint
  * complete,  <= emit called with eventName and adUint
  * firstQuartile,  <= emit called with eventName and adUint
  * fullscreen,  <= emit called with eventName and adUint
  * midpoint,  <= emit called with eventName and adUint
  * mute, <= emit called with eventName and adUint
  * pause,  <= emit called with eventName and adUint
  * playerCollapse, <= emit called with eventName and adUint
  * playerExpand, <= emit called with eventName and adUint
  * resume, <= emit called with eventName and adUint
  * rewind, <= emit called with eventName and adUint
  * start, <= emit called with eventName and adUint
  * thirdQuartile,  <= emit called with eventName and adUint
  * unmute <= emit called with eventName and adUint
  * skip, <= emit called with eventName and adUint
  */

const linearTrakingEventSelector = (event) => (ad) => getLinearTrackingEvents(ad, event);
const linearTrackers = {
  [clickThrough]: createLinearEventTracker(getClickThrough),
  [complete]: createLinearEventTracker(linearTrakingEventSelector(complete)),
  [error]: trackError,
  [firstQuartile]: createLinearEventTracker(linearTrakingEventSelector(firstQuartile)),
  [fullscreen]: createLinearEventTracker(linearTrakingEventSelector(fullscreen)),
  [impression]: createLinearEventTracker(getImpressionUri),
  [midpoint]: createLinearEventTracker(linearTrakingEventSelector(midpoint)),
  [mute]: createLinearEventTracker(linearTrakingEventSelector(mute)),
  [pause]: createLinearEventTracker(linearTrakingEventSelector(pause)),
  [playerCollapse]: createLinearEventTracker(linearTrakingEventSelector(playerCollapse)),
  [playerExpand]: createLinearEventTracker(linearTrakingEventSelector(playerExpand)),
  [resume]: createLinearEventTracker(linearTrakingEventSelector(resume)),
  [rewind]: createLinearEventTracker(linearTrakingEventSelector(rewind)),
  [skip]: createLinearEventTracker(linearTrakingEventSelector(skip)),
  [start]: createLinearEventTracker(linearTrakingEventSelector(start)),
  [thirdQuartile]: createLinearEventTracker(linearTrakingEventSelector(thirdQuartile)),
  [unmute]: createLinearEventTracker(linearTrakingEventSelector(unmute))
};

const trackLinearEvent = (event, vastChain, {data, errorCode, tracker = pixelTracker, logger = console} = {}) => {
  const linearTracker = linearTrackers[event];

  if (linearTracker) {
    linearTracker(vastChain, {
      data: {
        ...data,
        errorCode
      },
      tracker
    });
  } else {
    logger.error(`Event '${event}' is not trackable`);
  }
};

export default trackLinearEvent;
