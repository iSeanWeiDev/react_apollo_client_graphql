import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import graphql from '@app/graphql';

export const useGroupingQuery = (variables) => {
  const [loadedData, setloadedData] = useState(null);

  const { loading, error, data } = useQuery(graphql.queries.grouping, {
    variables,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (!loading && !error) {
      setloadedData(data.grouping);
    }
  }, [loading, error, data]);

  return loadedData;
};
