import fs from 'fs';
const data = JSON.parse(fs.readFileSync('lh-w7-contact-0.trace.json', 'utf8'));
const events = data.traceEvents;
const targets = ['ScheduleStyleRecalculation', 'UpdateLayoutTree', 'InvalidateLayout', 'Layout', 'UpdateLayerTree', 'HitTest', 'PrePaint'];
const totals = {};
targets.forEach(t => totals[t] = 0);
events.forEach(e => {
  if (targets.includes(e.name) && e.dur) {
    totals[e.name] += e.dur;
  }
});
let sum = 0;
console.log('=== Trace Parsed Durations (ms) ===');
Object.entries(totals).forEach(([name, dur]) => {
  const ms = dur / 1000;
  sum += ms;
  console.log(`${name}: ${ms.toFixed(2)} ms`);
});
console.log(`Total: ${sum.toFixed(2)} ms`);
