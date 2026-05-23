export const parseId = (
    value: string | string[] | undefined
): number => {
    if (!value || Array.isArray(value)) {
        throw new Error("INVALID_ID");
    }

    const id = Number(value);

    if (!Number.isSafeInteger(id) || id <= 0) {
        throw new Error("INVALID_ID");
    }

    return id;
};
