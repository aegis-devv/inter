const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let ffmpegPath = process.env.FFMPEG_PATH;
if (!ffmpegPath) {
  try {
    ffmpegPath = require('ffmpeg-static');
  } catch (e) {
    ffmpegPath = 'ffmpeg';
  }
}

console.log('Using FFmpeg at:', ffmpegPath);

// Find input mp4 video in root
const rootFiles = fs.readdirSync(path.join(__dirname, '..'));
const mp4File = rootFiles.find(f => f.toLowerCase().endsWith('.mp4'));
if (!mp4File) {
  console.error('Error: No .mp4 video found in project root directory.');
  process.exit(1);
}
const inputVideo = path.join(__dirname, '..', mp4File);
console.log('Processing video source:', inputVideo);

const publicDir = path.join(__dirname, '..', 'public');
const sequenceDir = path.join(publicDir, 'sequence');
const desktopDir = path.join(sequenceDir, 'desktop');
const mobileDir = path.join(sequenceDir, 'mobile');
const manifestPath = path.join(sequenceDir, 'manifest.json');

fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(mobileDir, { recursive: true });

function runCommand(cmd, args, silent = false) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: silent ? 'ignore' : 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed: ${args.join(' ')} (code ${code})`));
    });
    proc.on('error', reject);
  });
}

async function main() {
  console.log('--- Cleaning previous frame sequences ---');
  for (const dir of [desktopDir, mobileDir]) {
    if (fs.existsSync(dir)) {
      for (const f of fs.readdirSync(dir)) {
        if (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) {
          fs.unlinkSync(path.join(dir, f));
        }
      }
    }
  }

  console.log('--- Step 1: Desktop High-Definition 60fps Tier (1920x1080 with Unsharp Enhancement) ---');
  // High-fidelity motion-compensated interpolation at 60fps, 1920x1080 Lanczos upscale with gentle unsharp mask for crystal-clear clarity
  await runCommand(ffmpegPath, [
    '-y',
    '-i', inputVideo,
    '-filter:v', "minterpolate='mi_mode=blend:fps=60',scale=1920:1080:flags=lanczos,unsharp=5:5:0.85:5:5:0.0",
    '-vcodec', 'libwebp',
    '-q:v', '92',
    '-preset', 'photo',
    path.join(desktopDir, 'frame_%04d.webp')
  ]);

  const desktopFrames = fs.readdirSync(desktopDir).filter(f => f.endsWith('.webp')).sort();
  console.log(`✓ Generated ${desktopFrames.length} High-Definition Desktop frames.`);

  if (desktopFrames.length === 0) {
    throw new Error('No frames were generated for Desktop tier.');
  }

  console.log('--- Step 2: Mobile Subsampled Tier (960x540) ---');
  const selectedDesktopIndices = [];
  for (let i = 0; i < desktopFrames.length; i += 3) {
    selectedDesktopIndices.push(i);
  }
  if (selectedDesktopIndices[selectedDesktopIndices.length - 1] !== desktopFrames.length - 1) {
    selectedDesktopIndices.push(desktopFrames.length - 1);
  }

  const CONCURRENCY = 8;
  const queue = selectedDesktopIndices.map((dIdx, mIdx) => ({ dIdx, mIdx }));

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) break;
      const { dIdx, mIdx } = item;
      const srcFile = path.join(desktopDir, desktopFrames[dIdx]);
      const mobileNum = String(mIdx + 1).padStart(4, '0');
      const dstFile = path.join(mobileDir, `frame_${mobileNum}.webp`);

      await runCommand(ffmpegPath, [
        '-y',
        '-i', srcFile,
        '-vf', 'scale=960:540:flags=lanczos',
        '-vcodec', 'libwebp',
        '-q:v', '85',
        dstFile
      ], true);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  const mobileFrames = fs.readdirSync(mobileDir).filter(f => f.endsWith('.webp')).sort();
  console.log(`✓ Generated ${mobileFrames.length} Mobile frames.`);

  // Write Manifest
  const manifest = {
    desktop: {
      count: desktopFrames.length,
      width: 1920,
      height: 1080,
      prefix: '/sequence/desktop/frame_',
      suffix: '.webp'
    },
    mobile: {
      count: mobileFrames.length,
      width: 960,
      height: 540,
      prefix: '/sequence/mobile/frame_',
      suffix: '.webp'
    }
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('✓ High-Definition Manifest written to public/sequence/manifest.json');
}

main().catch((err) => {
  console.error('Frame extraction failed:', err);
  process.exit(1);
});
