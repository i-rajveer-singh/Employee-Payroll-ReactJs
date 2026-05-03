// UC6: Demonstrate Async Concepts

export const simulateNetworkCallCallback = (callback) => {
    setTimeout(() => {
        callback("Data loaded via Callback!");
    }, 1000);
};

export const simulateNetworkCallPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data loaded via Promise!");
        }, 1000);
    });
};

export const simulateNetworkCallAsyncAwait = async () => {
    try {
        const data = await simulateNetworkCallPromise();
        return "Data loaded via Async/Await -> " + data;
    } catch (e) {
        throw new Error(e);
    }
};

// To test these, import them in any component and call them.
