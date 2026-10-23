import fs from "fs";
import path from "path";
import exifr from "exifr";

const IMAGES_DIR = path.resolve(process.cwd(), "public/images/photography");
const OUTPUT_FILE = path.resolve(process.cwd(), "src/data/photo-metadata.json");

// Direct binary dimension readers for 100% accuracy without dependencies
function getImageDimensions(buffer, ext) {
  try {
    if (ext === ".jpg" || ext === ".jpeg") {
      let i = 2;
      while (i < buffer.length - 8) {
        if (buffer[i] !== 0xff) {
          i++;
          continue;
        }
        const marker = buffer[i + 1];
        // SOF0 to SOF3 markers
        if (marker >= 0xc0 && marker <= 0xc3) {
          const height = buffer.readUInt16BE(i + 5);
          const width = buffer.readUInt16BE(i + 7);
          return { width, height };
        }
        if (marker === 0xd9 || marker === 0xda) break; // EOI or SOS
        const len = buffer.readUInt16BE(i + 2);
        i += 2 + len;
      }
    } else if (ext === ".png") {
      if (buffer.length >= 24) {
        const width = buffer.readUInt32BE(16);
        const height = buffer.readUInt32BE(20);
        return { width, height };
      }
    } else if (ext === ".webp") {
      if (buffer.length >= 30) {
        // Simple VP8 / VP8L / VP8X parsing
        const format = buffer.toString("ascii", 12, 16);
        if (format === "VP8 ") {
          const width = buffer.readUInt16LE(26) & 0x3fff;
          const height = buffer.readUInt16LE(28) & 0x3fff;
          return { width, height };
        } else if (format === "VP8L") {
          const b0 = buffer[21];
          const b1 = buffer[22];
          const b2 = buffer[23];
          const b3 = buffer[24];
          const width = 1 + (((b1 & 0x3f) << 8) | b0);
          const height = 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
          return { width, height };
        }
      }
    }
  } catch {
    // Ignore binary read errors, fall back to exifr
  }
  return null;
}

function formatShutterSpeed(seconds) {
  if (!seconds) return undefined;
  if (seconds >= 1) return `${seconds.toFixed(1)}s`;
  const denominator = Math.round(1 / seconds);
  return `1/${denominator}s`;
}

function formatAperture(fNumber) {
  if (!fNumber) return undefined;
  return `ƒ/${fNumber.toFixed(1).replace(/\.0$/, "")}`;
}

function formatFocalLength(focalLength, focalLengthIn35mm) {
  if (focalLengthIn35mm) return `${Math.round(focalLengthIn35mm)}mm`;
  if (focalLength) return `${Math.round(focalLength)}mm`;
  return undefined;
}

function calculateAspectRatio(width, height) {
  if (!width || !height) return "aspect-[3/4]";
  const ratio = width / height;

  // Portrait ratios (smartphone 3:4, standard 4:5, widescreen vertical 9:16)
  if (ratio < 0.95) {
    if (Math.abs(ratio - 0.75) < 0.03) return "aspect-[3/4]"; // 3:4
    if (Math.abs(ratio - 0.8) < 0.03) return "aspect-[4/5]";  // 4:5
    if (Math.abs(ratio - 0.5625) < 0.05) return "aspect-[9/16]"; // 9:16
    return `aspect-[${width}/${height}]`;
  }

  // Landscape ratios (smartphone 4:3, 3:2, 16:9)
  if (Math.abs(ratio - 1.333) < 0.03) return "aspect-[4/3]"; // 4:3
  if (Math.abs(ratio - 1.5) < 0.03) return "aspect-[3/2]";   // 3:2
  if (Math.abs(ratio - 1.777) < 0.05) return "aspect-[16/9]"; // 16:9
  return `aspect-[${width}/${height}]`;
}

function readCameraDevice(make, model) {
  if (!model && !make) return null;
  const m = (model || "").trim();
  const mk = (make || "").trim();

  if (m && mk) {
    // If the model already includes the manufacturer (e.g. "Apple iPhone...", "Google Pixel..."), return as-is
    if (m.toLowerCase().startsWith(mk.toLowerCase())) {
      return m;
    }
    return `${mk} ${m}`;
  }

  return m || mk || null;
}

async function inspectPhoto(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  const ext = path.extname(filename).toLowerCase();

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const binaryDimensions = getImageDimensions(fileBuffer, ext);

    const exif = await exifr.parse(fileBuffer, {
      tiff: true,
      xmp: true,
      icc: true,
      jfif: true,
      mergeOutput: true,
    }).catch(() => null);

    const width = binaryDimensions?.width || exif?.ImageWidth || exif?.ExifImageWidth;
    const height = binaryDimensions?.height || exif?.ImageHeight || exif?.ExifImageHeight;

    const hasRealExif = Boolean(exif?.Make || exif?.Model || exif?.FNumber || exif?.ExposureTime);

    const camera = readCameraDevice(exif?.Make, exif?.Model);
    const aperture = formatAperture(exif?.FNumber);
    const shutterSpeed = formatShutterSpeed(exif?.ExposureTime);
    const focalLength = formatFocalLength(exif?.FocalLength, exif?.FocalLengthIn35mmFormat);
    const iso = exif?.ISO ? String(exif.ISO) : undefined;
    const dateTime = exif?.DateTimeOriginal ? new Date(exif.DateTimeOriginal).toISOString() : undefined;

    return {
      filename,
      hasRealExif,
      width,
      height,
      aspectRatio: width && height ? calculateAspectRatio(width, height) : "aspect-[3/4]",
      camera: camera || null,
      optics: hasRealExif
        ? {
            focalLength,
            aperture,
            shutterSpeed,
            iso,
          }
        : null,
      dateTime,
      rawExif: hasRealExif
        ? {
            Make: exif?.Make,
            Model: exif?.Model,
            LensModel: exif?.LensModel,
            FNumber: exif?.FNumber,
            ExposureTime: exif?.ExposureTime,
            ISO: exif?.ISO,
            FocalLength: exif?.FocalLength,
          }
        : null,
    };
  } catch (err) {
    return {
      filename,
      hasRealExif: false,
      error: err.message,
    };
  }
}

async function main() {
  console.log(`\n======================================================`);
  console.log(`📷 Reading photo metadata from: ${IMAGES_DIR}`);
  console.log(`======================================================\n`);

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  });

  const results = {};

  // Web-optimised copies have no EXIF. Never overwrite real EXIF captured earlier from the originals.
  let existing = {};
  try {
    existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
  } catch {
    existing = {};
  }

  for (const file of files) {
    const info = await inspectPhoto(file);
    if (!info.hasRealExif && existing[file]?.hasRealExif) {
      console.log(`↺ [KEEPING EARLIER REAL EXIF] ${file}\n`);
      results[file] = existing[file];
      continue;
    }
    results[file] = info;

    if (info.hasRealExif) {
      console.log(`✓ [REAL EXIF DETECTED] ${file}`);
      console.log(`  Device:  ${info.camera}`);
      console.log(`  Optics:  ${[info.optics.focalLength, info.optics.aperture, info.optics.shutterSpeed, info.optics.iso ? `ISO ${info.optics.iso}` : null].filter(Boolean).join(" · ")}`);
      console.log(`  Aspect:  ${info.aspectRatio} (${info.width}x${info.height})\n`);
    } else {
      console.log(`ℹ [WEB-OPTIMIZED / EXIF STRIPPED] ${file}`);
      console.log(`  Device:  [No EXIF header in file]`);
      console.log(`  Aspect:  ${info.aspectRatio} (${info.width}x${info.height})\n`);
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");
  console.log(`======================================================`);
  console.log(`✨ Verified photo metadata exported to:`);
  console.log(`   ${OUTPUT_FILE}`);
  console.log(`======================================================\n`);
}

main().catch(console.error);
