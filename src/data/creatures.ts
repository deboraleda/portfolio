export type CreatureType = 'beetle' | 'butterfly' | 'bee' | 'moth' | 'firefly';

export interface CreatureConfig {
  type: CreatureType;
  label: string;
}

export const CREATURE_TYPES: CreatureType[] = ['beetle', 'butterfly', 'bee', 'moth', 'firefly'];

export function randomCreatureType(): CreatureType {
  return CREATURE_TYPES[Math.floor(Math.random() * CREATURE_TYPES.length)];
}
