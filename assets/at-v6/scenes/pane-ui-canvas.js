/* ============================================================================
   ARCH1CAT HYDRA-V6 — scenes/pane-ui-canvas.js
   Retina 1024x640 WorkPaneUI 2D Texture Renderer (Full Latin + Cyrillic Support)
   ============================================================================ */

export function drawPaneUICanvas(canvas, project, lang = 'en') {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const loc = project[lang] || project.en;
  const accent = `#${project.uiColor || '00f2fe'}`;

  ctx.clearRect(0, 0, W, H);

  // Subtle corner technical registration marks + index
  ctx.font = '600 20px "Space Mono", monospace';
  ctx.fillStyle = 'rgba(210, 230, 255, 0.54)';
  ctx.textAlign = 'left';
  ctx.fillText(`// ${project.index}`, 56, 62);
  ctx.textAlign = 'right';
  ctx.fillText(loc.client, W - 56, 62);

  // Center emblem / glyph with soft cyan halo
  ctx.save();
  ctx.textAlign = 'center';
  ctx.shadowColor = accent;
  ctx.shadowBlur = 18;
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 34px "Space Mono", monospace';
  ctx.fillText(project.glyph || '◈', W * 0.5, 224);
  ctx.restore();

  // Stacked 2-line uppercase title with #06080c contrast bar + 2px underline
  const lines = loc.titleLines || [loc.titleFlat];
  ctx.font = '700 74px "Space Mono", "JetBrains Mono", monospace';
  ctx.textAlign = 'center';

  lines.forEach((line, idx) => {
    const y = 322 + idx * 84;
    const metrics = ctx.measureText(line);
    const bw = metrics.width + 38;
    ctx.fillStyle = 'rgba(6, 8, 12, 0.64)';
    ctx.fillRect((W - bw) * 0.5, y - 62, bw, 74);

    ctx.save();
    ctx.shadowColor = 'rgba(130, 235, 255, 0.65)';
    ctx.shadowBlur = 22;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(line, W * 0.5, y);
    ctx.restore();
  });

  // Crisp architectural underline
  const lineBottomY = 322 + (lines.length - 1) * 84 + 28;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.74)';
  ctx.fillRect(W * 0.5 - 92, lineBottomY, 184, 2.5);

  // Bottom micro-telemetry row
  ctx.font = '500 18px "Space Mono", monospace';
  ctx.fillStyle = 'rgba(195, 215, 240, 0.70)';
  ctx.fillText(loc.meta, W * 0.5, H - 46);
}
