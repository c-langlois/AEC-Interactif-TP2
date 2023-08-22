



function Product(props) {

  function getPomotions() {
    fetch(`https://insta-api-api.0vxq7h.easypanel.host/products/promotions`)
    .then(response => response.json())
      .then(response => {
        
      })
      .catch((error) => console.log('Erreur lors du chargement des données: ', error));
  }
  useEffect(() => {
    getPromotions();
  }, [])

}