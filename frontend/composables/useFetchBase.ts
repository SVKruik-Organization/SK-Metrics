export const useFetchBase = async () => {
    const fetchBase = ref<boolean>(false);
    await new Promise<void>(async (resolve) => {
        watchEffect(async () => {
            try {
                const response = await fetch("/", {
                    method: "GET"
                });
                fetchBase.value = response.ok;
            } catch (error) {
                fetchBase.value = false;
            }
            resolve();
        });
    });

    return fetchBase
}