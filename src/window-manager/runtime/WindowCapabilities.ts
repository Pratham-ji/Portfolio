export interface WindowCapabilities {
  move: boolean;
  resize: boolean;
  maximize: boolean;
  minimize: boolean;
  fullscreen: boolean;
  snap: boolean;
  pin: boolean;
  float: boolean;
  close?: boolean;
}

export const DefaultCapabilities: WindowCapabilities = {
  move: true,
  resize: true,
  maximize: true,
  minimize: true,
  fullscreen: true,
  snap: true,
  pin: false,
  float: false,
};
