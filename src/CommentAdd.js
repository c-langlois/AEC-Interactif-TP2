import React, { useState } from 'react';

function CommentAdd(props) {
const [comment, setComment] = useState('');
const [errors, setErrors] = useState({
    comment: '',
});

const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform validation
    const newErrors = {};
    if (!comment.trim()) {
        newErrors.comment = 'Le champ Rédigez votre commentaire est requis.';
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        const commentData = {
            content: comment,
            productId: props.id,
        };
       
        fetch("https://insta-api-api.0vxq7h.easypanel.host/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentData)
        })
        .then(response => response.json())
        .then(() => {
            props.handleClose();
            props.handleCloseAddComment();
        })
        .catch((error) => console.log('Erreur lors du chargement des données: ', error));
    }
};



    return (
        <div className="container">
            <div className="box-container">
                <h1>Ajouter un commentaire</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="comment-form-main">
                    <textarea
                        className="comment-form-textarea"
                        name="comment"
                        placeholder="Rédigez votre commentaire"
                        cols="30"
                        rows="10"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                        {errors.comment && <p className="text-danger">{errors.comment}</p>}
                    <button id="btnListWish" type="submit" name="submit">
                        Soumettre
                    </button>
                </div>
                </form>
            </div>

        </div>
    );
}

export default CommentAdd;