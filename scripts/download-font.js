const fs = require('fs');

(async () => {
  try {
    // We request Archivo Condensed, weight 700.
    // CSS API v2 syntax: family=Archivo:wdth,wght@68,700
    // To get TTF, we provide an old user agent.
    const cssRes = await fetch('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@68,700', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1' // Old Firefox gets WOFF or TTF. Let's use Safari 5 for TTF.
      }
    });
    
    // Actually, Safari 4/5 gets TTF: 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
    const cssResTTF = await fetch('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@68,700', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
      }
    });

    const css = await cssResTTF.text();
    console.log("CSS Response:\n", css);
    
    const match = css.match(/url\((https:\/\/[^)]+)\)/);
    if (match && match[1]) {
      const fontUrl = match[1];
      console.log("Downloading TTF from:", fontUrl);
      const fontRes = await fetch(fontUrl);
      const buffer = await fontRes.arrayBuffer();
      fs.writeFileSync('src/app/Archivo_Condensed-Bold.ttf', Buffer.from(buffer));
      console.log("Saved TTF.");
    } else {
      console.error("No URL found in CSS.");
    }
  } catch (e) {
    console.error(e);
  }
})();
