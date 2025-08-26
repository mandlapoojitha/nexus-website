import type { CustomComponentProps } from 'aurora/externalContext';
import type React from 'react';
import { useEffect } from 'react';

const UserFieldsHandler: React.FC<CustomComponentProps> = ({ auroraContext }) => {
  const { pageContext, utils } = auroraContext;
  const { id: userId } = pageContext.authUser;
  const { getFromInternalApi } = utils;

  useEffect(() => {
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(async entry => {
        if (entry.name.includes('UpdateUserPersonalInfo') || entry.name.includes('UpdateSsoUser')) {
          try {
            const customEndpointUrl = `/endpoints/UpdateTime?id=${userId}`;
            const response = await getFromInternalApi(customEndpointUrl);
            if (!response.ok) {
              throw new Error(`Failed to fetch: ${response.status}`);
            }
          } catch (error) {
            console.error('Error while fetching or processing data:', error);
          }
        }
      });
    });

    observer.observe({ type: 'resource', buffered: true });

    return () => observer.disconnect();
  }, [getFromInternalApi, userId]);

  return null;
};

export default UserFieldsHandler;
