import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const manageAreaRoutes = ({
    router,
    currentPath,
    resource,
    pushCriteria,
    currentPathPreProcess,
}: {
    router: AppRouterInstance;
    currentPath: string;
    resource: string;
    pushCriteria: (currentPath: string) => boolean;
    currentPathPreProcess?: (currentPath: string) => string;
}): void => {
    if (pushCriteria(currentPath)) {
        const newPath = currentPathPreProcess
            ? `${currentPathPreProcess(currentPath)}/${resource}`
            : `${currentPath}/${resource}`;
        router.push(newPath);
    }
};
