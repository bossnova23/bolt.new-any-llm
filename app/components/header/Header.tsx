import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import { VersionChecker } from './VersionChecker';

export function Header() {
  const chat = useStore(chatStore);

  return (
    <>
      <ClientOnly>{() => <VersionChecker />}</ClientOnly>
      <header
        className={classNames(
          'flex items-center bg-bolt-elements-background-depth-1 p-5 border-b h-[var(--header-height)]',
          {
            'border-transparent': !chat.started,
            'border-bolt-elements-borderColor': chat.started,
          },
        )}
      >
        <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
          <div className="i-ph:sidebar-simple-duotone text-xl" />
          <a href="/" className="text-2xl font-semibold text-accent flex items-center">
            BossNova AI
          </a>
        </div>
        {chat.started && ( // Display ChatDescription and HeaderActionButtons only when the chat has started.
          <>
            <span className="flex-1 px-4 truncate text-center text-bolt-elements-textPrimary">
              <ClientOnly>{() => <ChatDescription />}</ClientOnly>
            </span>
            <ClientOnly>
              {() => (
                <div className="mr-1">
                  <HeaderActionButtons />
                </div>
              )}
            </ClientOnly>
          </>
        )}
      </header>
    </>
  );
}
