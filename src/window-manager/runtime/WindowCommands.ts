import { Bounds, WindowStateStatus } from './WindowTypes';
import { WindowStore } from './WindowStore';
import { WindowHistory } from './WindowHistory';

// Command Pattern for Geometry Mutations (5)

export interface WindowCommand {
  execute(): void;
  undo(): void;
}

export class MoveCommand implements WindowCommand {
  constructor(
    private windowId: string,
    private prevBounds: Bounds,
    private newBounds: Bounds
  ) {}

  execute() {
    WindowStore.updateBoundsInternal(this.windowId, this.newBounds);
  }

  undo() {
    WindowStore.updateBoundsInternal(this.windowId, this.prevBounds);
  }
}

export class ResizeCommand implements WindowCommand {
  constructor(
    private windowId: string,
    private prevBounds: Bounds,
    private newBounds: Bounds
  ) {}

  execute() {
    WindowStore.updateBoundsInternal(this.windowId, this.newBounds);
  }

  undo() {
    WindowStore.updateBoundsInternal(this.windowId, this.prevBounds);
  }
}

export class StateChangeCommand implements WindowCommand {
  constructor(
    private windowId: string,
    private prevState: WindowStateStatus,
    private newState: WindowStateStatus
  ) {}

  execute() {
    WindowStore.updateStateInternal(this.windowId, this.newState);
  }

  undo() {
    WindowStore.updateStateInternal(this.windowId, this.prevState);
  }
}

export const executeAndPushCommand = (command: WindowCommand) => {
  command.execute();
  WindowHistory.pushCommand(command);
};
