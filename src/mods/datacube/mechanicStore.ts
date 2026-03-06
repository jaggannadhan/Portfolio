/**
 * Shared mutable store for the mechanic's world position.
 * Written by Mechanic.tsx useFrame, read by FloorText.tsx useFrame.
 * No React subscription needed — read directly in render loops.
 */
export const mechanicPos = { x: 0, z: 0 };
