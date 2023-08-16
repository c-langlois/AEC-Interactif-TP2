import React, {useState} from 'react';

function CoffeeAdd(props) {
    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formUrl, setFormUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const cafeData = {
            name: formName,
            description: formDescription,
            pictureUrl: formUrl
        };
        
        fetch("https://insta-api-api.0vxq7h.easypanel.host/coffees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cafeData)
        })
        .then(response => response.json())
        .then(() => {
            props.handleClose();
            props.getCoffee();
        })
        .catch((error) => console.log('Erreur lors du chargement des données: ', error));
    }

    return (
        <div className="conteneurCoffeeDetails">
            <form className="coffee-modal" onSubmit={handleSubmit}>
                <span className="title-coffee-modal">Ajouter un café</span>
                <div className="coffee-form">
                    <label className="textDescription" htmlFor="name">Nom</label>
                    <input type="text" name="name" onChange={(e) => setFormName(e.target.value)} required></input>
                    <label className="textDescription" htmlFor="description">Description</label>
                    <input type="text" name="description" onChange={(e) => setFormDescription(e.target.value)} required></input>
                    <label className="textDescription" htmlFor="url">URL</label>
                    <input type="url" name="url" onChange={(e) => setFormUrl(e.target.value)} required></input>
                </div>
                <input id="btnListWish" type="submit" value="Soumettre"/>
            </form>
        </div>
    )
}

export default CoffeeAdd;