import { TerminalIcon } from 'lucide-react'; // Placeholder OS icon
import { useShell } from '../context';

export const StartButton: React.FC = () => {
  const { toggleStartMenu } = useShell();

  return (
    <button
      onClick={toggleStartMenu}
      className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition-colors text-os-blue"
      aria-label="Start Menu"
    >
      <TerminalIcon size={24} />
    </button>
  );
};
