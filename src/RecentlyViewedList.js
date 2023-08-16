import React from 'react';

function RecentlyViewedList(props) {
    const { suggestions, getSuggestions } = props;

    function deleteProduct(id){
        fetch(`https://insta-api-api.0vxq7h.easypanel.host/suggestions/recently-viewed-products/${id}`, {
            method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    getSuggestions();
                    
                  }
            })
            .catch(error => {
            console.error("Erreur lors de la suppression du produit:", error);
            });
    } 
    return (
        <>
          <div className="items-recently-viewed">
            {suggestions.map(product => (
              <div key={product.id} className="items-recently-viewed-card">
                <p>{product.name}</p>
                <img className="items-recently-viewed-img" src={product.image} alt={product.name} />
                <button className="btn-transparent">
                  <img
                    src="/icons/trash-can-solid.svg"
                    onClick={() => deleteProduct(product.id)}
                    className="coffee-icon"
                    alt="Trash can"
                  />
                </button>
              </div>
            ))}
          </div>
        </>
      );
}

export default RecentlyViewedList;