type addCatalogsReferencesBasedOnStateInformationParamsType = {
    collectionName: string;
    state: any;
    data: any;
    excludeReferences: String[];
};

const addReferencesToObjectFromStateInformation = ({
    collectionName,
    state,
    data,
    excludeReferences,
}: addCatalogsReferencesBasedOnStateInformationParamsType) => {
    const catalogs = state.catalogs;

    const objectWithReferences = Object.entries(data).reduce<Record<string, any>>(
        (acc, [key, value]) => {
            if (
                key.startsWith("id_") &&
                !excludeReferences.includes(key)
            ) {
                const reference = key.replace("id_", "");
                console.log('reference: ', reference);
                const id = Object.keys(value as { id: string, [key: string]: any } | string)?.length ? (value as { id: string, [key: string]: any })?.id : (value as string)?.split("/")?.[1];
                acc[reference] = catalogs[reference].find(
                    (catalog: { id: string }) => catalog.id === id
                );
                acc[key] = value;
            } else {
                acc[key] = value;
            }
            return acc;
        },
        {}
    );

    return objectWithReferences;
};

const addCatalogsReferencesBasedOnStateInformation = ({
    collectionName,
    state,
    data,
    excludeReferences,
}: addCatalogsReferencesBasedOnStateInformationParamsType) => {
    if (data?.length) {
        return data?.map((element: any) => addReferencesToObjectFromStateInformation({
            collectionName,
            state,
            data: element,
            excludeReferences,
        }))
    } else {
        return addReferencesToObjectFromStateInformation({
            collectionName,
            state,
            data,
            excludeReferences,
        });
    }
};

export {
    addCatalogsReferencesBasedOnStateInformation
}