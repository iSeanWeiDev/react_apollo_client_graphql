import React, { useState, useContext, createContext } from 'react';
import { useSubscription } from '@apollo/client';
import graphql from '@app/graphql';

const AppStateContext = createContext(null);
AppStateContext.displayName = 'AppStateContext';

const initialState = {};

const AppStateProvider = ({ ...props }) => {
  const [state, setState] = useState(initialState);

  const value = [state, setState];

  useSubscription(graphql.subscriptions.groupingAdd, {
    onSubscriptionData: ({
      client,
      subscriptionData: {
        data: { groupingAdd }
      }
    }) => {
      const existData = client.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: groupingAdd.schemaType
        }
      });

      const tmp = existData ? existData.grouping.slice() : [];
      client.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: groupingAdd.schemaType
        },
        data: {
          grouping: [...tmp, groupingAdd]
        }
      });
    }
  });

  useSubscription(graphql.subscriptions.groupingUpdate, {
    onSubscriptionData: ({
      client,
      subscriptionData: {
        data: { groupingUpdate }
      }
    }) => {
      const existData = client.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: groupingUpdate.schemaType
        }
      });

      let tmp = existData ? existData.grouping.slice() : [];
      const idx = tmp.findIndex((el) => el['_id'] === groupingUpdate['_id']);
      if (idx > -1) {
        tmp[idx] = groupingUpdate;
      }

      client.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: groupingUpdate.schemaType
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  // useSubscription(
  //   graphql.subscriptions.documentDelete, {
  //   onSubscriptionData: ({
  //     client,
  //     subscriptionData: { data: { documentDelete } }
  //   }) => {
  //     const existData = client.readQuery({
  //       query: graphql.queries.grouping,
  //       variables: {
  //         schemaType: groupingUpdate.schemaType
  //       }
  //     });

  //     let tmp = existData ? existData.grouping.slice() : [];
  //     const idx = tmp.findIndex(el => el['_id'] === groupingUpdate['_id']);
  //     if (idx > -1) {
  //       tmp[idx] = groupingUpdate;
  //     }

  //     client.writeQuery({
  //       query: graphql.queries.grouping,
  //       variables: {
  //         schemaType: groupingUpdate.schemaType
  //       },
  //       data: {
  //         grouping: tmp
  //       }
  //     });
  //   }
  // });

  return <AppStateContext.Provider value={value} {...props} />;
};

const useAppStateContext = () => {
  return useContext(AppStateContext);
};

export { AppStateProvider, useAppStateContext };
