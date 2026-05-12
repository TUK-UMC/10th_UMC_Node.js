export const parseBigInt = (
    value: string | string[] | undefined
): bigint => {
    if (!value || Array.isArray(value)) {
        throw new Error("INVALID_ID");
    }

    return BigInt(value);
};