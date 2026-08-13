export interface MeasurementInput {
  bustCm: number;
  lengthCm: number;
  easeCm: number;
}

export interface SquareSizeConfig {
  primaryCm: number;
  secondaryCm: number;
}

export interface CalculatedGrid {
  totalWidthCm: number;
  totalHeightCm: number;
  columns: number;
  rows: number;
  primarySquareCount: number;
  secondarySquareCount: number;
  borderWidthCm: number;
  sewingSequence: string[];
}

export function calculateGrannyGrid(
  measurements: MeasurementInput,
  squares: SquareSizeConfig
): CalculatedGrid {
  const targetWidth = (measurements.bustCm / 2) + measurements.easeCm;
  const targetHeight = measurements.lengthCm;

  const cols = Math.max(1, Math.floor(targetWidth / squares.primaryCm));
  const rows = Math.max(1, Math.floor(targetHeight / squares.primaryCm));

  const remainingWidth = Math.max(0, targetWidth - (cols * squares.primaryCm));
  let secondaryCountPerRow = 0;

  if (squares.secondaryCm > 0 && remainingWidth >= squares.secondaryCm) {
    secondaryCountPerRow = Math.floor(remainingWidth / squares.secondaryCm);
  }

  const unusedSpace = remainingWidth - (secondaryCountPerRow * squares.secondaryCm);
  const borderWidth = unusedSpace / 2;

  const totalPrimaryFront = cols * rows;
  const totalSecondaryFront = secondaryCountPerRow * rows;

  const instructions = [
    `Crochet ${totalPrimaryFront * 2} main granny squares (${squares.primaryCm}cm x ${squares.primaryCm}cm) for front and back panels.`,
    totalSecondaryFront > 0
      ? `Crochet ${totalSecondaryFront * 2} accent squares (${squares.secondaryCm}cm x ${squares.secondaryCm}cm) to fill the side margins.`
      : `No accent squares needed for this measurement combination.`,
    `Arrange the front panel into a grid of ${cols} main column(s) wide by ${rows} row(s) high.`,
    `Place ${secondaryCountPerRow} accent square(s) along the outer edge of each row.`,
    `Join squares using mattress stitch or flat slip stitch join: join vertical columns first, then join horizontal rows.`,
    borderWidth > 0
      ? `Add ${Math.round(borderWidth * 10) / 10}cm of single crochet rounds around the outer edge to reach exact target width.`
      : `Outer edges match your measurements exact; proceed straight to seaming.`
  ];

  return {
    totalWidthCm: targetWidth,
    totalHeightCm: targetHeight,
    columns: cols,
    rows: rows,
    primarySquareCount: totalPrimaryFront * 2,
    secondarySquareCount: totalSecondaryFront * 2,
    borderWidthCm: borderWidth,
    sewingSequence: instructions
  };
}
