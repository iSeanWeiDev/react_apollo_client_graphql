import {
  Grouping,
  CreateGrouping,
  DeleteDocument,
  UpdateGrouping,
  GroupingAdd,
  DocumentDelete,
  GroupingUpdate
} from './Grouping.gql';

import { Tracking, UpsertTracking } from './Tracking.gql';

export default {
  queries: {
    grouping: Grouping,
    tracking: Tracking
  },
  mutations: {
    createGrouping: CreateGrouping,
    deleteDocument: DeleteDocument,
    updateGrouping: UpdateGrouping,
    upsertTracking: UpsertTracking
  },
  subscriptions: {
    groupingAdd: GroupingAdd,
    documentDelete: DocumentDelete,
    groupingUpdate: GroupingUpdate
  }
};
