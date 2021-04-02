import {
  Grouping,
  CreateGrouping,
  DeleteDocument,
  UpdateGrouping,
  GroupingAdd,
  DocumentDelete,
  GroupingUpdate
} from './Grouping.gql';

export default {
  queries: {
    grouping: Grouping
  },
  mutations: {
    createGrouping: CreateGrouping,
    deleteDocument: DeleteDocument,
    updateGrouping: UpdateGrouping
  },
  subscriptions: {
    groupingAdd: GroupingAdd,
    documentDelete: DocumentDelete,
    groupingUpdate: GroupingUpdate
  }
};
