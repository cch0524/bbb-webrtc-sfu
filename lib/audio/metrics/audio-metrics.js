const { Gauge, Counter, } = require('prom-client');
const { injectMetrics, AudioPrometheusAgent } = require('./index.js');

const SFUA_NAMES = {
  SESSIONS: 'sfu_audio_sessions',
  REQS: 'sfu_audio_reqs_total',
  ERRORS: 'sfu_audio_errors_total',
}

let AUDIO_METRICS;
const buildDefaultMetrics = () => {
  if (AUDIO_METRICS == null) {
    AUDIO_METRICS = {
      [SFUA_NAMES.SESSIONS]: new Gauge({
        name: SFUA_NAMES.SESSIONS,
        help: 'Number of active sessions in the audio module',
      }),

      [SFUA_NAMES.REQS]: new Counter({
        name: SFUA_NAMES.REQS,
        help: 'Total requisitions received by the audio module',
      }),

      [SFUA_NAMES.ERRORS]: new Counter({
        name: SFUA_NAMES.ERRORS,
        help: 'Total error responses generated by the audio module',
        labelNames: ['method', 'errorCode'],
      }),
    }
  }

  return AUDIO_METRICS;
};

injectMetrics(buildDefaultMetrics());

module.exports = {
  SFUA_NAMES,
  AUDIO_METRICS,
  PrometheusAgent: AudioPrometheusAgent,
};
