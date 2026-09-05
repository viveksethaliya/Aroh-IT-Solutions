import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Aroh IT Solutions';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  let fontData: ArrayBuffer | null = null;
  
  try {
    fontData = await fetch(
      new URL('./Archivo_Condensed-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
  } catch (error) {
    console.error('Failed to load local Archivo font for OG image', error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          color: '#ffffff',
          fontFamily: fontData ? '"Archivo"' : 'sans-serif',
          margin: 0,
        }}
      >
        <div style={{ display: 'flex', fontSize: 24, fontWeight: 'bold' }}>
          Aroh IT Solutions
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: '900px',
          }}
        >
          Software that holds up when the load arrives.
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#A3A3A3' }}>
          Product engineering studio, Ahmedabad and Vancouver
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: 'Archivo',
              data: fontData,
              weight: 700,
              style: 'normal',
            },
          ]
        : undefined,
    }
  );
}
