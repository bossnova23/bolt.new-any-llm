import type { ProviderInfo } from '~/types/model';
import type { ModelInfo } from '~/utils/types';

interface ModelSelectorProps {
  model?: string;
  setModel?: (model: string) => void;
  provider?: ProviderInfo;
  setProvider?: (provider: ProviderInfo) => void;
  modelList: ModelInfo[];
  providerList: ProviderInfo[];
}

export const ModelSelector = ({
  setModel,
  setProvider,
  modelList,
  providerList,
}: ModelSelectorProps) => {
  // Set Claude 3.5 Sonnet as the default model
  const claudeProvider = providerList.find(p => p.name === 'anthropic');
  const claudeModel = modelList.find(m => m.name === 'claude-3-sonnet-20240229');
  
  if (claudeProvider && claudeModel) {
    setProvider?.(claudeProvider);
    setModel?.(claudeModel.name);
  }

  // Return null since we don't need to display anything
  return null;
};
