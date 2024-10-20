import { useSdk } from "@directus/extensions-sdk";
import { readMe } from "@directus/sdk";

export function useGetCurrentUser() {

    const sdk = useSdk();

    const getUser = async () => {
        const result = await sdk.request(readMe());
        return result;
    };

    return { getUser }
}