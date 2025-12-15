import '@testing-library/jest-dom';

// Polyfill canvas context for jsdom
// eslint-disable-next-line @typescript-eslint/no-explicit-any
HTMLCanvasElement.prototype.getContext = (function () {
  return ({} as unknown) as CanvasRenderingContext2D;
}) as any;
