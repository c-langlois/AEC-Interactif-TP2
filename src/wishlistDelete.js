export function deleteProduct(productId, wishlistItems, setWishlistItems) {
    fetch(`https://insta-api-api.0vxq7h.easypanel.host/wishlist/delete-product/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(() => {
        const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
        setWishlistItems(updatedWishlist);
    })
    .catch(error => {
        console.error('Erreur lors de la suppression du produit:', error);
    });
}
