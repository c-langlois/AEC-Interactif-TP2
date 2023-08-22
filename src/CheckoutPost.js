import React, { useState } from 'react';
import CheckoutReplyFromServer from './CheckoutReplyFromServer';
import { useQuery } from "@tanstack/react-query";

function CheckoutPost(props) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [updatedFormData, setUpdatedFormData] = useState('');

    const { isLoading, error, data } = useQuery({
        queryKey: ['checkoutData'],
        queryFn: () =>
            fetch('https://insta-api-api.0vxq7h.easypanel.host/checkout').then(
                (res) => res.json(),
            ),
    })
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return 'An error has occurred: ' + error.message;

    let total = 0; 

    data.products.map(product => {
        return total = total + (product.discountedPrice * product.quantity); 
    }) 

    let totalWithShipping = 0;
    let msgShippingMethod = '';

    if (total < 10000 ) {
        if (props.formData.shippingMode === "standard") {
            totalWithShipping = total + 1000;
            msgShippingMethod = "Standard - 10$";
        } else if (props.formData.shippingMode === "express") {
            totalWithShipping = total + 2000;
            msgShippingMethod = "Express - 20$";
        } else if (props.formData.shippingMode === "pickup") {
            totalWithShipping = total;
            msgShippingMethod = "Main propre - 0$";
        }
    } else { 
        totalWithShipping = total;
        msgShippingMethod = "Gratuit";
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setUpdatedFormData({
            ...props.formData,
            cartId: data.cartId,
            total: totalWithShipping
        });

        setFormSubmitted(true);
    };

    return (
        <div>
            {formSubmitted ? (
                <CheckoutReplyFromServer updatedFormData={updatedFormData}/>
            ) : (
            <>
                <h2 className="checkout-subtitle">Votre panier</h2>
                {data.products.map(product => (
                <div key={product.id} className="d-flex flex-column align-items-center">
                    <div className="productConteneurCheckout">
                        <img src={product.image} alt={product.name} className="imageShowCart"/>
                        <div className="card-body">
                            <div className="ficheShowCart"></div>
                            <h4 className="titleProductShow">{product.name} </h4>
                            <p className="card-text">{(product.discountedPrice / 100).toFixed(2)}$</p>
                        </div>
                        <div className="card-body">
                            <p className="card-text d-flex justify-content-end">Qté</p>
                            <p className="card-text d-flex justify-content-end">{product.quantity}</p>
                        </div>
                    </div>
                </div>
                ))} 
                <div className="d-flex flex-column align-items-center">
                    <div className="productConteneurCheckout">
                        <div className="d-flex flex-column align-items-end w-100 justify-content-end">
                            <div className="bold">Total</div>
                            <div className="">{(total / 100).toFixed(2)}$</div>

                            <div className="bold">Mode d'expédition</div>
                            <div className="">{msgShippingMethod}</div>

                            <div className="bold">Total avec livraison</div>
                            <div>{(totalWithShipping / 100).toFixed(2)}$</div>
                        </div>
                    </div>
                </div>

                <form className="coffee-modal" onSubmit={handleSubmit}>
                    <h2 className="checkout-subtitle">Vos informations</h2>
                    <div className="checkout-form">
                        <div className="textDescription">Courriel</div>
                        <div className="text-dimmed">{props.formData.contactEmail}</div>

                        <div className="textDescription">Nom du contact</div>
                        <div className="text-dimmed">{props.formData.contactName}</div>

                        <div className="textDescription">Prénom</div>
                        <div className="text-dimmed">{props.formData.contactFirstName}</div>

                        <div className="textDescription">Nom de famille</div>
                        <div className="text-dimmed">{props.formData.contactLastName}</div>

                        <div className="textDescription">Adresse (ligne 1)</div>
                        <div className="text-dimmed">{props.formData.addressLine1}</div>

                        <div className="textDescription">Adresse (ligne 2)</div>
                        <div className="text-dimmed">{props.formData.addressLine2}</div>

                        <div className="textDescription">Ville</div>
                        <div className="text-dimmed">{props.formData.city}</div>

                        <div className="textDescription">Province</div>
                        <div className="text-dimmed">{props.formData.province}</div>

                        <div className="textDescription">Code postal</div>
                        <div className="text-dimmed">{props.formData.postalCode}</div>

                        <div className="textDescription">Téléphone de contact</div>
                        <div className="text-dimmed">{props.formData.contactPhone}</div>

                        <div className="textDescription">Numéro de carte de crédit</div>
                        <div className="text-dimmed">{props.formData.creditCardNumber}</div>

                        <div className="textDescription">Mois d'expiration</div>
                        <div className="text-dimmed">{props.formData.creditCardExpirationMonth}</div>

                        <div className="textDescription">Année d'expiration</div>
                        <div className="text-dimmed">{props.formData.creditCardExpirationYear}</div>

                        <div className="textDescription">Code de sécurité (CVV)</div>
                        <div className="text-dimmed">{props.formData.creditCardCvv}</div>
                    </div>

                    <input id="btnListWish" type="submit" value="Confirmation"/>
                </form>
            </>
            )}
        </div>
    );

}

export default CheckoutPost;