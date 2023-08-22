import React, { useState, useEffect } from 'react';
import CommentAdd from './CommentAdd';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './index.css';

function ProductDetail(props){
  const { id, getSuggestions, productIdsInWishlist, discountedPrice, price, getWishlist } = props;
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [isInTheWishlist, setIsInTheWishlist] = useState(productIdsInWishlist.includes(id));
  const [commentDeleted, setCommentDeleted] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    getWishlist();
  }, [])

  const handleAddToWishlist = () => {

    fetch("https://insta-api-api.0vxq7h.easypanel.host/wishlist/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: product.id
      })
    })
    .then(response => response.json())
    .then(() => {
      getWishlist();
      setIsInTheWishlist(true);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout au Wishlist:', error);
    });
  };

  function handleDeleteComment(commentId) {
    fetch(`https://insta-api-api.0vxq7h.easypanel.host/comments/${commentId}`, {
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        setCommentDeleted(true);
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.id === commentId ? { ...comment, deleted: true } : comment
          )
        );
        getComment();
      }
    })
    .catch(error => {
      console.error("Erreur lors de la suppression du café:", error);
    });
  }

  function getProduct() {
    fetch(`https://insta-api-api.0vxq7h.easypanel.host/products/${id}`)
    .then(response => response.json())
      .then(response => {
        setProduct(response); 
        getSuggestions();
      })
      .catch((error) => console.log('Erreur lors du chargement des données: ', error));
  }
  useEffect(() => {
    getProduct();
  }, [])

  function handleCloseAddComment() {
    handleClose();
    getComment();
  }

  function getComment() {
    fetch(`https://insta-api-api.0vxq7h.easypanel.host/comments?productId=${id}`)
      .then(response => response.json())
      .then(response => {
        const updatedComments = response.map(comment => ({
          ...comment,
          deleted: false
        }));
        setComments(updatedComments);
      })
      .catch((error) => console.log('Erreur lors du chargement des données: ', error));
  }
  useEffect(() => {
    getComment();
  }, [])

  return (
    <div className="conteneurProductDetails">
      <h2 className="titleProductFiche">
        {product.name}
        </h2>
      <p className="textDescription" >{product.description}</p>
      <div className="product-image">
        <img className="coffee-img-mini" src={product.image} alt={product.name} />
      </div>
      <div className="sectionSousInfo">
        <p>Type: {product.category?.name}</p>
        <p>Couleur: {product.color?.name}</p>
        <p>Prix: {discountedPrice === price ? (product.price / 100).toFixed(2) + '$' : <><span className="old-price">{price.toFixed(2)}$</span><span className="new-price">{discountedPrice.toFixed(2)}$</span></>}</p>
      </div>
      {isInTheWishlist ? ('Déjà dans la liste de souhait') : (
              <button onClick={handleAddToWishlist} id="btnListWish">
                Ajouter à la liste de souhait
              </button>
      ) }
      <div className="comment-main">
        <p>Commentaire(s)</p>
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <p>{comment.content}</p>
            <div className="right-bottom">
              <button className="btn-transparent" onClick={() => {handleDeleteComment(comment.id)}} >
                <img src="/icons/trash-can-solid.svg" className="coffee-icon" alt="Trash can"/>
              </button>
            </div>
            <div>{comment.deleted && <p>Commentaire supprimé</p>}</div>
          </div>
        ))}
      </div>
      <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body><CommentAdd handleCloseAddComment={handleCloseAddComment} handleClose={handleClose} id={id}/></Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: 'chocolate', border: '0px', color: 'white', padding: '10px', borderRadius: '10px' }} variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
        </Modal>
        <Button onClick={handleShow} style={{ backgroundColor: 'chocolate', border: '0px', color: 'white', padding: '10px', borderRadius: '10px' }}>
          Ajouter un commentaire
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;