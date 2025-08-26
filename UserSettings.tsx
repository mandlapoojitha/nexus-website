import type React from 'react';

import type { CustomComponentProps } from 'aurora/externalContext';
import { useEffect } from 'react';

const UserSettings: React.FC<CustomComponentProps> = () => {
  useEffect(() => {
    const smallTag = document.querySelector(
      '[data-testid="ActionPanel.CloseAccount"] article small'
    );
    smallTag.innerHTML = smallTag.textContent;
  }, []);

  return null;
};

export default UserSettings;
