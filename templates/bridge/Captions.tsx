// Word-by-word captions for vertical shorts. One word at a time, centred, bold white with a dark outline,
// timed to the voice word timings (words.json). Render it as the LAST child of the composition, as a plain
// DOM overlay on top of the three.js canvas, so ink / lens blur / bloom / grade never touch it.
//
//   import {Captions, normalizeWords} from './Captions';
//   import rawWords from './words.json';
//   const WORDS = normalizeWords(rawWords);
//   ...
//   <Captions words={WORDS} />
//
// All pixel sizes are for a 1080 x 1920 frame and scale with the real frame height / 1920.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';

/** Any of the common speech-to-text shapes: {word|text, start|start_time, end|end_time}, seconds or milliseconds. */
export type RawWord = {
  word?: string;
  text?: string;
  start?: number;
  end?: number;
  start_time?: number;
  end_time?: number;
  type?: string; // ElevenLabs Scribe marks gaps as type: 'spacing'; those are skipped
};
export type Word = {text: string; start: number; end: number}; // seconds

/** Convert STT output to clean `Word[]` in seconds. If a time is above 600 the whole file is treated as ms. */
export function normalizeWords(raw: RawWord[]): Word[] {
  const items = raw
    .filter((w) => w.type !== 'spacing' && w.type !== 'audio_event')
    .map((w) => ({
      text: String(w.text ?? w.word ?? '').trim(),
      start: Number(w.start ?? w.start_time ?? 0),
      end: Number(w.end ?? w.end_time ?? w.start ?? w.start_time ?? 0),
    }))
    .filter((w) => w.text.length > 0);
  const maxT = items.reduce((m, w) => Math.max(m, w.end), 0);
  const k = maxT > 600 ? 1 / 1000 : 1;
  return items.map((w) => ({text: w.text, start: w.start * k, end: w.end * k})).sort((a, b) => a.start - b.start);
}

export type CaptionsProps = {
  words: Word[];
  /** Vertical position of the caption centre as % of frame height. 68 sits below faces and inside the safe area
   *  (bottom 15 % is reserved for platform UI). A function lets a shot move it when a face is in the way. */
  yPercent?: number | ((frame: number) => number);
  fontSize?: number; // px at 1080 wide
  stroke?: number; // outline px at 1080 wide
  maxWidthPercent?: number; // keep inside the 6 % side margins
  uppercase?: boolean;
  /** Words matching this regex are drawn in the accent colour (numbers, names, punch words). */
  highlight?: RegExp;
  color?: string;
  accent?: string;
  /** Keep the last word visible this long (s) when the next word starts later than that. */
  holdAfter?: number;
  /** Frames the caption appears BEFORE the word is heard (visual lands 0-3 frames ahead of the word). */
  lead?: number;
  fontFamily?: string;
};

export const Captions: React.FC<CaptionsProps> = ({
  words,
  yPercent = 68,
  fontSize = 84,
  stroke = 9,
  maxWidthPercent = 86,
  uppercase = false,
  highlight = /\d|[A-Z]{2,}/,
  color = '#ffffff',
  accent = '#ffd84a',
  holdAfter = 0.18,
  lead = 1,
  fontFamily = "Impact, 'Arial Black', 'Segoe UI Black', 'Helvetica Neue', Arial, sans-serif",
}) => {
  const frame = useCurrentFrame();
  const {fps, height} = useVideoConfig();
  const s = height / 1920;
  const t = (frame + lead) / fps;

  // last word that has started
  let i = -1;
  for (let k = 0; k < words.length; k++) {
    if (words[k].start <= t) i = k;
    else break;
  }
  if (i < 0) return null;
  const w = words[i];
  const next = words[i + 1];
  const visibleUntil = Math.min(next ? next.start : Infinity, w.end + holdAfter);
  if (t > visibleUntil) return null;

  // small pop-in over 6 frames: 0.8 -> 1.08 -> 1
  const since = Math.max(0, Math.round((t - w.start) * fps));
  const scale = interpolate(since, [0, 3, 6], [0.8, 1.08, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = typeof yPercent === 'function' ? yPercent(frame) : yPercent;
  const text = uppercase ? w.text.toUpperCase() : w.text;
  const hot = highlight.test(w.text);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: `${(100 - maxWidthPercent) / 2}%`,
          width: `${maxWidthPercent}%`,
          top: `${y}%`,
          transform: `translateY(-50%) scale(${scale})`,
          textAlign: 'center',
          fontFamily,
          fontWeight: 900,
          fontSize: fontSize * s,
          lineHeight: 1.05,
          letterSpacing: 1 * s,
          color: hot ? accent : color,
          WebkitTextStroke: `${stroke * s}px #0b0a0c`,
          paintOrder: 'stroke fill',
          textShadow: `0 ${6 * s}px 0 rgba(0,0,0,0.35)`,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
