import { localStorage } from "@/utils";
import Firebase, { firestore, storage, FieldValue } from "@/config/firebase"; // Import the Firestore and Storage instances
import tokens from "@/config/tokens";
import { isArrayOfObjects } from "./array";
import moment from "moment";
import { Timestamp } from "firebase/firestore";

import {
  DocumentData as FirebaseDocumentData,
  QueryDocumentSnapshot,
  WhereFilterOp,
} from "@firebase/firestore-types";

export const defaultFilter = [
  { field: "deleted", condition: "==", value: false },
  { field: "isActive", condition: "==", value: true },
];

type Filter = {
  field: string;
  condition: Firebase.firestore.WhereFilterOp;
  value: any;
  reference?: boolean;
};

type Pagination = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  lastVisible: Firebase.firestore.DocumentSnapshot;
};

type ReferenceType = {
  refCollectionName: string;
  refProperty: string;
  refPropertyKey?: string;
  refDataRender: string;
};

type ObjectReferenceType = {
  data: any | any[];
  references: ReferenceType[];
};

type GetDataParams = {
  collectionName: string;
  filterBy?: Filter[];
  docId?: string;
  orderByField?: string;
  orderDirection?: Firebase.firestore.OrderByDirection;
  limit?: number;
  lastVisible?: Firebase.firestore.DocumentSnapshot;
  currentPage?: number;
  references?: ReferenceType[];
};

type InsertParams = {
  collectionName: string;
  reference?: {
    field: string;
    collection: string;
    docId: string;
  };
  data: any;
};

type BatchInsertParams = {
  collectionName: string;
  reference?: {
    field: string;
    collection: string;
    docId: string;
  };
  arrayOfElements: any;
};

type BatchUpdateParams = {
  collectionName: string;
  docKey: string;
  arrayOfElements: any;
};

type UpdateParams = {
  collectionName: string;
  docId?: string;
  data: any;
  filterBy?: Filter[];
};

type MergeDataToRecordParams = {
  collectionName: string;
  docId: string;
  data: any;
};

type DeleteParams = {
  collectionName: string;
  docId?: string;
  filterBy?: Filter[];
};

type DownloadParams = {
  fileUrl: string;
  fileName?: string;
};

type UploadParams = {
  file: File;
  path?: string;
};

type UserCredential = Firebase.auth.UserCredential | undefined;

type LoginUserData = {
  id_user?: string | undefined;
  id_role?: { value: string };
  id_organization?: string;
  id_branch?: string;
  isActive?: boolean;
  role?: any;
  permissions?: any[];
  organizationData?: any;
  branchData?: any;
  userCredential?: UserCredential;
};

type convertReferenceToIdType = {
  referenceObject: any;
};

type InsertDocumentParams = {
  collectionName: string;
  data: Record<string, any>;
  showAlert?: boolean;
  excludeReferences?: string[];
};

type DocumentData = Record<string, any>;

type FilterBy = {
  field: string;
  condition: Firebase.firestore.WhereFilterOp;
  value: any;
  reference?: boolean;
};

type GetAllDocumentsParams = {
  collectionName: string;
  filterBy?: FilterBy[];
  orderByField?: string;
  orderDirection?: "desc" | "asc";
  limit?: number;
  excludeReferences?: string[];
};

type GetDocumentByIdParams = {
  collectionName: string;
  docId: string;
  includeReferences?: boolean;
  excludeReferences?: string[];
};

type UpdateDocumentParams = {
  collectionName: string;
  data: Record<string, any>;
  filterBy?: FilterBy[];
};

async function doParallelQueries(queries: any[]) {
  const arrayOfQueries = queries.map(async (query) => {
    return await query();
  });

  return Promise.allSettled(arrayOfQueries);
}

function filteredFulfilledOnly(queries: any[]) {
  return queries.reduce((prev, curr) => {
    if (curr.status === "fulfilled") return { ...prev, ...curr.value };
  }, {});
}

const parallelQueryFormatter = async (
  data: any | any[],
  element: ReferenceType
) => {
  // if object to read the references is an array
  if (
    data?.[element.refProperty]?.length &&
    typeof data?.[element.refProperty] !== "string"
  ) {
    // if object to read the references is an array of objects
    if (
      isArrayOfObjects(data?.[element.refProperty]) &&
      element.refPropertyKey
    ) {
      const arrayOfReferences = await Promise.all(
        (data?.[element.refProperty] || [])?.map(async (item: any) => {
          const queryResult = await firestore
            .collection(element.refCollectionName)
            .doc(item?.[element.refPropertyKey!])
            .get();
          return { ...item, ...queryResult.data() };
        })
      );
      return { [element.refDataRender]: arrayOfReferences };
    } else {
      const arrayOfReferences = await Promise.all(
        data?.[element.refProperty]?.map(async (id: string | undefined) => {
          const queryResult = await firestore
            .collection(element.refCollectionName)
            .doc(id)
            .get();
          return queryResult.data();
        })
      );
      return { [element.refDataRender]: arrayOfReferences };
    }
  } else {
    // if reference is a single object
    if (data?.[element.refProperty]) {
      const queryResult = await firestore
        .collection(element.refCollectionName)
        .doc(data?.[element.refProperty])
        .get();
      return { [element.refDataRender]: queryResult.data() };
    } else {
      if (Array.isArray(data?.[element.refProperty])) {
        return { [element.refDataRender]: [] };
      } else {
        return { [element.refDataRender]: {} };
      }
    }
  }
};

async function getObjectReferences({
  data,
  references,
}: ObjectReferenceType): Promise<any> {
  try {
    // if its an array
    if (data?.length) {
      const arrayOfData = data.reduce(
        async (previousValuePromise: any, item: any) => {
          const resolvedPreviousValue = await previousValuePromise;

          const result = await doParallelQueries(
            references.map(
              (element) => async () =>
                await parallelQueryFormatter(item, element)
            )
          );

          const newValue = [
            ...resolvedPreviousValue,
            {
              ...item,
              ...filteredFulfilledOnly(result),
            },
          ];
          return newValue;
        },
        []
      );
      return arrayOfData;
    }

    // If its an object
    const result = await doParallelQueries(
      references.map(
        (element) => async () => await parallelQueryFormatter(data, element)
      )
    );

    const newValue = {
      ...data,
      ...filteredFulfilledOnly(result),
    };

    return newValue;
  } catch (error) {
    return null;
  }
}

async function getDataFrom({
  collectionName,
  filterBy = [],
  orderByField,
  orderDirection = "desc",
  limit,
  excludeReferences = [],
}: GetAllDocumentsParams): Promise<{
  data: DocumentData[];
  totalItems: number;
}> {
  try {
    let data: DocumentData[] = [];
    filterBy.push({ field: "deleted", condition: "==", value: false });

    let query: Firebase.firestore.Query<Firebase.firestore.DocumentData> =
      firestore.collection(collectionName);

    const processedFilterBy = await Promise.all(
      filterBy.map(async (filter) => {
        if (filter.reference) {
          const fieldName = filter.field;
          if (fieldName.startsWith("id_")) {
            const refCollectionName = fieldName.substring(3);
            const refDoc = await firestore
              .collection(refCollectionName)
              .doc(filter.value as string)
              .get();
            filter.value = firestore
              .collection(refCollectionName)
              .doc(refDoc.id);
          }
        }
        return filter;
      })
    );
    console.log('processedFilterBy: ', processedFilterBy);

    processedFilterBy.forEach((filter) => {
      query = query.where(filter.field, filter.condition, filter.value);
    });

    if (orderByField) {
      query = query.orderBy(orderByField, orderDirection);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const snapshot = await query.get();
    const totalItems = snapshot.size;

    const resolveReferences = async (
      docData: DocumentData
    ): Promise<DocumentData> => {
      const resolvedData = { ...docData };
      const referenceFields = Object.keys(resolvedData).filter(
        (key) =>
          key.startsWith("id_") &&
          resolvedData[key] &&
          (typeof resolvedData[key] === "string" ||
            typeof resolvedData[key] === "object") &&
          key.replace("id_", "") !== collectionName &&
          !excludeReferences.includes(key)
      );

      const referencePromises = referenceFields.map(async (key) => {
        const refCollectionName = key.replace("id_", "");
        const refDocData = await getDocumentById({
          collectionName: refCollectionName,
          docId:
            typeof resolvedData[key] === "object"
              ? (resolvedData[key] as Firebase.firestore.DocumentReference).id
              : (resolvedData[key] as string),
          includeReferences: false,
        });

        resolvedData[key] = refDocData.id;
        resolvedData[key.replace("id_", "")] = refDocData;
      });

      excludeReferences.forEach((key) => {
        resolvedData[key] = resolvedData[key].id;
      });

      await Promise.all(referencePromises);

      return resolvedData;
    };

    const documents = await Promise.all(
      snapshot.docs.map(async (doc: QueryDocumentSnapshot) => {
        const docData = doc.data();
        const resolvedData = await resolveReferences(docData);
        return { id: doc.id, ...resolvedData };
      })
    );

    data = documents;

    return { data, totalItems };
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}

async function getDataById({
  collectionName,
  docId,
}: Pick<GetDataParams, "collectionName" | "docId">): Promise<any> {
  try {
    const docRef = firestore.collection(collectionName).doc(docId);
    const docSnapshot = await docRef.get();
    const data = docSnapshot.data();
    return { id: docSnapshot.id, ...data };
  } catch (error) {
    console.error("Error fetching data by docId:", error);
    return {};
  }
}

const getDocumentById = async ({
  collectionName,
  docId,
  includeReferences = true,
  excludeReferences = [],
}: GetDocumentByIdParams): Promise<DocumentData> => {
  try {
    const docRef = firestore.collection(collectionName).doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.error("doc not found");
      return {};
    }

    const data = doc.data() as DocumentData;
    const result: DocumentData = { id: doc.id, ...data };

    if (includeReferences && data) {
      const referenceFields = Object.entries(data).filter(
        ([key, _]) =>
          key.startsWith("id_") &&
          key !== `id_${collectionName.toLowerCase()}` &&
          !excludeReferences.includes(key)
      );

      const safeReferenceFields = referenceFields.filter(
        ([_, value]) => value !== null && value !== undefined
      );

      if (safeReferenceFields.length === 0) {
        console.warn("No valid reference fields found in the document.");
      }

      const referencePromises = referenceFields.map(async ([key, value]) => {
        let refDoc;
        if (value && typeof value === "object") {
          refDoc = await value.get();
        } else {
          const refCollectionName = key.replace("id_", "");
          const refDocRef = firestore
            .collection(refCollectionName)
            .doc(value as string);
          refDoc = await refDocRef.get();
        }

        if (refDoc.exists) {
          const refData = refDoc.data() as DocumentData;
          result[key] = value && typeof value === "object" ? value : refDoc.ref;
          result[key.replace("id_", "")] = refData;
        }
      });

      await Promise.all(referencePromises);
    }

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        result[key] = value;
      });
    }

    Object.keys(result).forEach((key) => {
      if (
        key.startsWith("id_") &&
        result[key] &&
        typeof result[key] === "object" &&
        "id" in result[key]
      ) {
        result[key] = result[key].id;
      }
    });

    return result;
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

const insertInto = async ({
  collectionName,
  data,
  excludeReferences = [],
}: InsertDocumentParams): Promise<any> => {
  try {
    // const userData = sessionStorage.getItemWithDecryption(tokens.User);
    const createdBy = 99999;
    const idField = `id_${collectionName.toLowerCase()}`;
    const collectionRef = firestore.collection(collectionName);
    const newId = data.id || collectionRef.doc().id;
    const newDocRef = collectionRef.doc(newId);

    const processedData = Object.entries(data).reduce<Record<string, any>>(
      (acc, [key, value]) => {
        if (key.startsWith("id_") && typeof value === "string") {
          const refCollectionName = key.replace("id_", "");
          acc[key] = firestore.doc(`${refCollectionName}/${value}`);
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    await newDocRef.set({
      ...processedData,
      [idField]: newId,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      deleted: false,
      isActive: true,
      createdBy,
    });

    const result = await getDocumentById({
      collectionName,
      docId: newId,
      excludeReferences,
    });
    return { data: result };
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

async function copyCollection(
  oldCollection: string,
  newCollection: string,
  createIdField: boolean = false
): Promise<void> {
  try {
    const oldCollectionRef = firestore.collection(oldCollection);
    const newCollectionRef = firestore.collection(newCollection);

    const snapshot = await oldCollectionRef.get();

    const writeBatch = firestore.batch();
    const maxBatchSize = 500; // Firestore batch write limit
    let operationCount = 0;

    for (const doc of snapshot.docs) {
      const newDocRef = newCollectionRef.doc(doc.id);
      const docData = doc.data();

      if (createIdField) {
        docData[`id_${newCollection}`] = doc.id;
      }

      writeBatch.set(newDocRef, docData);
      operationCount++;

      if (operationCount === maxBatchSize) {
        await writeBatch.commit();
        operationCount = 0;
      }
    }

    if (operationCount > 0) {
      await writeBatch.commit();
    }

    console.log(
      `Collection '${oldCollection}' successfully copied to '${newCollection}'${createIdField ? " with id field" : ""
      }`
    );
  } catch (error) {
    console.error("Error copying collection:", error);
    throw error;
  }
}

async function batchInsert({
  collectionName,
  arrayOfElements,
}: BatchInsertParams): Promise<any> {
  const batch = firestore.batch();
  const results: { id: string; data: any }[] = [];

  const createdBy = 99999;

  const defaultFields = {
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    deleted: false,
    isActive: true,
    createdBy,
  };
  const idField = `id_${collectionName.toLowerCase()}`;

  arrayOfElements.forEach((data: any) => {
    const collectionRef = firestore.collection(collectionName);
    const newId = data.id || collectionRef.doc().id;
    const docRef = collectionRef.doc(newId);

    // const docRef = firestore.collection(collectionName).doc(); // Automatically generates a unique ID
    batch.set(docRef, { ...data, ...defaultFields, [idField]: newId, });
    results.push({ id: docRef.id, data: { ...data, ...defaultFields, [idField]: newId } });
  });
  try {
    await batch.commit(); // Commit the batch
    console.log("Batch insert successful!");
    return results.map((result) => ({
      id: result.id,
      ...result.data,
      insertedStatus: "success",
    }));
  } catch (error: any) {
    console.error("Error with batch insert:", error);
    return [];
  }
}

async function batchUpdate({
  collectionName,
  docKey,
  arrayOfElements,
}: BatchUpdateParams): Promise<any> {
  const batch = firestore.batch();
  const results: any[] = [];

  const defaultFields = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  arrayOfElements.forEach((data: any) => {
    const docRef = firestore.collection(collectionName).doc(data[docKey]);
    batch.update(docRef, { ...data, ...defaultFields });
    results.push({ ...data, ...defaultFields });
  });

  try {
    await batch.commit(); // Commit the batch
    console.log("Batch update successful!");
    return results.map((result) => ({
      ...result,
      updateStatus: "success",
    }));
  } catch (error: any) {
    console.error("Error with batch update:", error);
    return results.map((result) => ({
      id: result.id,
      updateStatus: "failed",
      error: error.message,
    }));
  }
}

async function updateRecordBy({
  collectionName,
  data,
  filterBy = [],
}: UpdateDocumentParams): Promise<{ data: any[] }> {
  try {
    // const userData = sessionStorage.getItemWithDecryption(tokens.User);
    const updatedBy = 99999;
    const collectionRef = firestore.collection(collectionName);
    filterBy.push({ field: "deleted", condition: "==", value: false });

    let dataWithReferences: Record<string, any> = Object.entries(data).reduce(
      (acc: Record<string, any>, [key, value]) => {
        if (
          key.startsWith("id_") &&
          typeof value === "string" &&
          key !== `id_${collectionName.toLowerCase()}`
        ) {
          const refCollectionName = key.replace("id_", "");
          acc[key] = firestore.doc(`${refCollectionName}/${value}`);
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    let documentIds: string[] = [];
    let query: Firebase.firestore.Query | null = null;

    if (filterBy.length > 0) {
      query = collectionRef;
      filterBy.forEach((filter) => {
        if (query) {
          query = query.where(filter.field, filter.condition, filter.value);
        }
      });
    }

    if (!query) {
      throw new Error("Query not defined. Provide filters.");
    }

    const snapshot = await query.get();
    documentIds = snapshot.docs.map((doc) => doc.id);
    console.log("documentIds", documentIds);
    const updatePromises = documentIds.map(async (id) => {
      const docRef = collectionRef.doc(id);
      await docRef.update({
        ...dataWithReferences,
        updatedBy,
        updatedAt: FieldValue.serverTimestamp(),
      });
      const updatedDoc = await getDocumentById({
        collectionName,
        docId: id,
      });
      return updatedDoc;
    });

    const updatedDocuments = await Promise.all(updatePromises);

    return { data: updatedDocuments };
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error(
      `Error updating data: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

async function mergeDataToRecordById({
  collectionName,
  docId,
  data,
}: MergeDataToRecordParams): Promise<any> {
  try {
    const docRef = firestore.collection(collectionName).doc(docId);
    console.log("mergeDataToRecordById>data: ", data);
    await docRef.update(data);
    return { id: docId, ...data };
  } catch (error) {
    console.log("error: ", error);
    const err: Error = error as Error;
    console.error("Error merging data:", err.message);
    throw new Error("Error mergin data");
  }
}

async function deleteRecordBy({
  collectionName,
  docId,
  filterBy = [],
}: DeleteParams): Promise<{ id?: string; ids?: string[] } | null> {
  try {
    const userData = localStorage.getItemWithDecryption(tokens.User);
    const deletedBy = userData?.id_user ?? 99999;
    const collectionRef = firestore.collection(collectionName);

    if (docId) {
      const documentRef = collectionRef.doc(docId);
      await documentRef.update({
        deletedAt: FieldValue.serverTimestamp(),
        deleted: true,
        isActive: false,
        deletedBy,
      });
      return { id: docId };
    } else if (filterBy.length > 0) {
      let query: Firebase.firestore.Query = collectionRef;

      // Process filters to handle references
      const processedFilters = await Promise.all(
        filterBy.map(async (filter) => {
          const fieldName = filter.field;
          if (fieldName.startsWith("id_")) {
            // Get collection name from field
            const refCollectionName = fieldName.substring(3);
            // Get reference to document
            const refDoc = await firestore
              .collection(refCollectionName)
              .doc(filter.value as string)
              .get();
            // Update filter value to be document reference
            return {
              ...filter,
              value: firestore.collection(refCollectionName).doc(refDoc.id),
            };
          }
          return filter;
        })
      );

      processedFilters.forEach((filter) => {
        query = query.where(filter.field, filter.condition, filter.value);
      });

      const querySnapshot = await query.get();
      const batch = firestore.batch();

      querySnapshot.forEach((doc) => {
        const docRef = collectionRef.doc(doc.id);
        batch.update(docRef, {
          deletedAt: FieldValue.serverTimestamp(),
          deleted: true,
          isActive: false,
          deletedBy,
        });
      });

      await batch.commit();

      const deletedIds = querySnapshot.docs.map((doc) => doc.id);
      return { ids: deletedIds };
    } else {
      throw new Error("Either docId or filterBy must be provided.");
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    throw new Error("Error deleting record");
  }
}

async function downloadFile({
  fileUrl,
  fileName,
}: DownloadParams): Promise<void> {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}

async function uploadFile({
  file,
  path = "media",
}: UploadParams): Promise<string> {
  try {
    const storageRef = storage.ref(`/${path}/${Date.now()}_${file.name}`);
    const snapshot = await storageRef.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

async function massiveUpdate(
  collectionName: string,
  data: any
): Promise<any[]> {
  try {
    const querySnapshot = await firestore.collection(collectionName).get();
    const updatePromises = querySnapshot.docs.map((docSnapshot) => {
      const docRef = docSnapshot.ref;
      return docRef.update({ ...data });
    });
    await Promise.all(updatePromises);
    console.log("All documents have been updated.");
    return data;
  } catch (error) {
    console.error("Error updating data:", error);
    return [];
  }
}

function convertReferenceToId({
  referenceObject,
}: convertReferenceToIdType): string {
  console.log('referenceObject: ', referenceObject);
  return referenceObject?.id;
}

const loginUser = async (
  email: string,
  password: string
): Promise<LoginUserData | undefined> => {
  try {
    let userData: LoginUserData | undefined;
    const userCredential: UserCredential | undefined =
      await Firebase.auth().signInWithEmailAndPassword(email, password);

    if (!userCredential) throw new Error("User not found");

    if (userCredential) {
      const res = await getDataFrom({
        collectionName: "user",
        filterBy: [
          {
            field: "id_user",
            condition: "==",
            value: userCredential.user!.uid,
          },
          { field: "isActive", condition: "==", value: true },
        ],
      });
      userData = res.data[0];

      if (userData?.id_role) {
        const res = await getDataFrom({
          collectionName: "role",
          filterBy: [
            {
              field: "id_role",
              condition: "==",
              value: userData.id_role.value,
            },
            {
              field: "isActive",
              condition: "==",
              value: true,
            },
          ],
        });

        if (res.data.length) {
          userData.role = res.data[0];
          userData.permissions = userData.role.permissions?.reduce(
            (acc: any, per: any) => {
              const subject = per.subject;
              const actions = per.actions;
              actions.forEach((action: any) => {
                acc.push({
                  subject,
                  action,
                });
              });
              return acc;
            },
            [] as any[]
          );
        }
      }

      if (userData?.id_organization) {
        const res = await getDataFrom({
          collectionName: "organization",
          filterBy: [
            {
              field: "id_organization",
              condition: "==",
              value: userData.id_organization,
            },
            {
              field: "isActive",
              condition: "==",
              value: true,
            },
          ],
        });
        userData.organizationData = res.data[0];
      }
      if (userData?.id_branch) {
        const res = await getDataFrom({
          collectionName: "branch",
          filterBy: [
            {
              field: "id_branch",
              condition: "==",
              value: userData.id_branch,
            },
            {
              field: "isActive",
              condition: "==",
              value: true,
            },
          ],
        });
        userData.branchData = res.data[0];
      }
    }

    return { ...userData, userCredential };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const formatFirebaseTimestamp = (date: any) =>
  new Date(date.seconds * 1000 + date.nanoseconds / 1000000);

// const formatFirebaseTimestamp = (timestamp: any, format = "DD/MM/YYYY") => {
//   console.log({ timestamp });
//   if (timestamp instanceof Timestamp) {
//     return moment.utc(timestamp.toDate()).format(format);
//   }
//   return "";
// };

export {
  deleteRecordBy,
  downloadFile,
  formatFirebaseTimestamp,
  getDataFrom,
  insertInto,
  batchInsert,
  loginUser,
  massiveUpdate,
  updateRecordBy,
  batchUpdate,
  uploadFile,
  getObjectReferences,
  mergeDataToRecordById,
  convertReferenceToId,
  getDataById,
  copyCollection,
};
