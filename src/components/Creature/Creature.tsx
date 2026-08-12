import type { CreatureType } from '../../data/creatures';
import { BeetleSVG } from './BeetleSVG';

interface CreatureProps {
  type: CreatureType;
  walking: boolean;
  size?: number;
  className?: string;
}

// Dispatcher — add more creature SVGs here as they're built.
export const Creature: React.FC<CreatureProps> = ({ type, walking, size = 40, className }) => {
  switch (type) {
    case 'beetle':
    default:
      return <BeetleSVG walking={walking} size={size} className={className} />;
  }
};
