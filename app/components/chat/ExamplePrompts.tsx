import { useStore } from '@nanostores/react';
import { chatStore } from '~/lib/stores/chat';

export function ExamplePrompts() {
  const chat = useStore(chatStore);

  if (chat.started) {
    return null;
  }

  return (
    <div
      id="examples"
      className="flex flex-col gap-4 max-w-chat mx-auto px-4 lg:px-0 animate-fade-in animation-delay-400"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="text-left p-4 rounded-lg bg-bolt-elements-background-depth-2 hover:bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor text-bolt-elements-textPrimary transition-colors"
          onClick={() => {
            // TODO: Implement new project handler
          }}
        >
          <div className="font-medium mb-2">Start a new project</div>
          <div className="text-sm text-bolt-elements-textSecondary">
            Let me help you create something amazing from scratch
          </div>
        </button>
        <button
          className="text-left p-4 rounded-lg bg-bolt-elements-background-depth-2 hover:bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor text-bolt-elements-textPrimary transition-colors"
          onClick={() => {
            // TODO: Implement existing code handler
          }}
        >
          <div className="font-medium mb-2">Get help with existing code</div>
          <div className="text-sm text-bolt-elements-textSecondary">
            I can help you understand, debug, or improve your code
          </div>
        </button>
      </div>
    </div>
  );
}
