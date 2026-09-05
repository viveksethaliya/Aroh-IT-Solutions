import fs from 'fs';

const data = JSON.parse(fs.readFileSync('lh-w7-contact-0.trace.json', 'utf8'));
const events = data.traceEvents;

const targets = ['UpdateLayoutTree', 'Layout', 'RecalculateStyles', 'ParseAuthorStyleSheet'];
const totals = { UpdateLayoutTree: 0, Layout: 0, RecalculateStyles: 0, ParseAuthorStyleSheet: 0 };

const eventList = { UpdateLayoutTree: [], Layout: [] };

events.forEach(e => {
  if (targets.includes(e.name) && e.dur) {
    totals[e.name] += e.dur;
    if (e.name === 'UpdateLayoutTree' || e.name === 'Layout') {
      eventList[e.name].push(e);
    }
  }
});

console.log('=== Total Durations (ms) ===');
Object.entries(totals).forEach(([name, dur]) => {
  console.log(`${name}: ${(dur / 1000).toFixed(2)} ms`);
});

console.log('\n=== Top 10 UpdateLayoutTree ===');
eventList['UpdateLayoutTree'].sort((a, b) => b.dur - a.dur).slice(0, 10).forEach(e => {
  const stack = e.args?.beginData?.stackTrace?.[0];
  const url = stack ? `${stack.url}:${stack.lineNumber}` : 'No stack';
  console.log(`Dur: ${(e.dur / 1000).toFixed(2)}ms, Elements: ${e.args?.elementCount || '?'}, Stack: ${url}`);
});

console.log('\n=== Top 10 Layout ===');
eventList['Layout'].sort((a, b) => b.dur - a.dur).slice(0, 10).forEach(e => {
  const dirty = e.args?.beginData?.dirtyObjects || '?';
  const root = e.args?.endData?.layoutRoots?.[0]?.nodeName || '?';
  console.log(`Dur: ${(e.dur / 1000).toFixed(2)}ms, Dirty: ${dirty}, Root: ${root}`);
});
