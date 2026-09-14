const DEFAULT_USER_REFERENCE = "demo-user";

export async function getWatchlistIds(): Promise<number[]> {
    const response = await fetch(
        `/api/watchlist/ids?userReference=${DEFAULT_USER_REFERENCE}`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch watchlist.");
    }

    return response.json();
}

export async function addWatchlistId(listingId: number): Promise<void> {
    const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            listingId,
            userReference: DEFAULT_USER_REFERENCE,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to save listing.");
    }
}

export async function removeWatchlistId(listingId: number): Promise<void> {
    const response = await fetch(
        `/api/watchlist/${listingId}?userReference=${DEFAULT_USER_REFERENCE}`,
        {
            method: "DELETE",
        },
    );

    if (!response.ok) {
        throw new Error("Failed to remove listing.");
    }
}

export async function toggleWatchlistId(
    listingId: number,
    currentIds: number[],
): Promise<number[]> {
    if (currentIds.includes(listingId)) {
        await removeWatchlistId(listingId);
        return currentIds.filter((id) => id !== listingId);
    }

    await addWatchlistId(listingId);
    return [...currentIds, listingId];
}
