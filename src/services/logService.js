// import * as Sentry from '@sentry/react';
// import {Integrations} from '@sentry/tracing';

function init() {
  // Sentry.init({
  //   dsn: 'https://ccde6642b4d24fd8a5838abea6797c86@o973659.ingest.sentry.io/5925056',
  //   integrations: [new Integrations.BrowserTracing()],

  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,
  // });
}

function log(error) {
    // Sentry.captureException(error);
    console.log(error);
}

export default {
    init,
    log
}
