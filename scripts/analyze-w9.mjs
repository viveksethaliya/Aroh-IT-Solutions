import fs from 'fs';

function analyze(prefix, pathName) {
  console.log(`\n=== Analyzing ${pathName} ===`);
  const lhData = JSON.parse(fs.readFileSync(`${prefix}.json`, 'utf8'));
  const traceData = JSON.parse(fs.readFileSync(`${prefix}-0.trace.json`, 'utf8'));

  const breakdown = lhData.audits['mainthread-work-breakdown']?.details?.items || [];
  const styleLayout = breakdown.find(i => i.group === 'styleLayout')?.duration || 0;

  const events = traceData.traceEvents;
  const targets = ['ScheduleStyleRecalculation', 'UpdateLayoutTree', 'InvalidateLayout', 'Layout', 'UpdateLayerTree', 'HitTest', 'PrePaint'];
  let traceSum = 0;
  events.forEach(e => {
    if (targets.includes(e.name) && e.dur) {
      traceSum += (e.dur / 1000);
    }
  });

  console.log(`LH styleLayout: ${styleLayout.toFixed(2)} ms`);
  console.log(`Trace sum: ${traceSum.toFixed(2)} ms`);
  console.log(`Ratio: ${(traceSum / styleLayout).toFixed(2)}`);

  console.log('\n--- LCP Details ---');
  
  const lcpBreakdown = lhData.audits['lcp-breakdown-insight']?.details?.items || [];
  const table = lcpBreakdown.find(i => i.type === 'table');
  if (table) {
    table.items.forEach(i => console.log(`${i.label}: ${i.duration} ms`));
  }
  
  const node = lcpBreakdown.find(i => i.type === 'node');
  if (node) {
    console.log(`LCP Element: ${node.snippet} - ${node.nodeLabel}`);
  }

  const prioritize = lhData.audits['prioritize-lcp-image'];
  if (prioritize && prioritize.details && prioritize.details.items && prioritize.details.items.length > 0) {
    console.log('Prioritize LCP Image:', prioritize.details.items[0]);
  } else {
    console.log('Prioritize LCP Image: Not present/No issues');
  }

  if (pathName === '/') {
    console.log('\n--- Config ---');
    console.log('configSettings.formFactor:', lhData.configSettings?.formFactor);
    console.log('environment.benchmarkIndex:', lhData.environment?.benchmarkIndex);
  }
}

analyze('lh-w9-home', '/');
if (fs.existsSync('lh-w9-contact.json')) {
  analyze('lh-w9-contact', '/contact');
}
