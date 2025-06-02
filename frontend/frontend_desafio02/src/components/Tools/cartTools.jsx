export const addOrUpdateProduct = (cart, product) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
        return cart.map((item) =>
            item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
    }
    return [...cart, { ...product, count: 1 }];
};

export const updateProductQuantity = (cart, productId, amount) => {
    return cart.map((item) =>
        item.id === productId
            ? { ...item, count: item.count + amount >= 0 ? item.count + amount : 0 } // Así no baja de 0, corrección de Jerlib.
            : item
    );
};

export const removeProduct = (cart, productId) => {
    return cart.filter((item) => item.id !== productId);
};

export const calculateTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.price * item.count, 0);
};
