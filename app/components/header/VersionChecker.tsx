import { useEffect, useState } from 'react';

interface VersionInfo {
  latest_commit: string;
  current_commit: string;
  needs_update: boolean;
}

export function VersionChecker() {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        console.log('Checking version...');

        // Get the latest commit from GitHub API
        const response = await fetch('https://api.github.com/repos/coleam00/bolt.new-any-llm/commits/main');

        if (!response.ok) {
          throw new Error('Failed to fetch latest commit');
        }

        const data = (await response.json()) as {
          commit: { author: { name: string } };
          parents: { sha: string }[];
          sha: string;
        };

        /*
         * If the latest commit is from GitHub Actions updating commit.json,
         * use the parent commit instead as that's the actual code change
         */
        const latestCommit =
          data.commit.author.name === 'github-actions[bot]' && data.parents.length > 0 ? data.parents[0].sha : data.sha;

        console.log('Latest commit:', latestCommit);

        // Get the current commit from our commit.json
        const currentCommitResponse = await fetch('/commit.json');

        if (!currentCommitResponse.ok) {
          throw new Error('Failed to fetch current commit');
        }

        const currentCommitData = (await currentCommitResponse.json()) as { commit: string };
        const currentCommit = currentCommitData.commit;
        console.log('Current commit:', currentCommit);

        setVersionInfo({
          latest_commit: latestCommit,
          current_commit: currentCommit,
          needs_update: latestCommit !== currentCommit,
        });
        setError(null);
      } catch (error) {
        console.error('Error checking version:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    // Check version every hour
    checkVersion();

    const interval = setInterval(checkVersion, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
        Checking for updates...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-2 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
        Error checking for updates: {error}
      </div>
    );
  }

  if (!versionInfo) {
    return null;
  }

  return (
    <div
      className={`px-2 py-1 text-sm ${
        versionInfo.needs_update
          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      }`}
    >
      {versionInfo.needs_update ? (
        <>
          <span>Update available! </span>
          <a
            href="https://github.com/coleam00/bolt.new-any-llm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-600 dark:hover:text-yellow-400"
          >
            Click here
          </a>
          <span> to get the latest version.</span>
        </>
      ) : (
        <span>✓ You're running the latest version!</span>
      )}
      <span className="ml-2 opacity-60">(Current: {versionInfo.current_commit.slice(0, 7)})</span>
    </div>
  );
}
