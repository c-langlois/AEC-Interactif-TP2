import React, { useState, useEffect } from 'react';
import { useMutation } from "@tanstack/react-query";

function CheckoutReplyFromServer({ updatedFormData }) {
    const [ replyFromServer, setReplyFromServer ] = useState(false);

    const checkoutMutation = useMutation((updatedFormData) =>
        fetch('https://insta-api-api.0vxq7h.easypanel.host/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
        }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); 
        })
    );

    const handleSubmit = async () => {
        try {
            const responseString = await checkoutMutation.mutateAsync(updatedFormData);
            console.log('API Response:', responseString);
            setReplyFromServer(true);
        } catch (error) {
            console.error('Error during data loading:', error);
            setReplyFromServer(`Error during data loading: ${error}`);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="mt-3 p-3">
            {replyFromServer ? (
                <>
                    <div className="display-3 mt-3 mb-3">Merci pour votre achat.</div>
                    <div className="mt-3 mb-3">Un courriel de confirmation devrait être dans vos courriel au {updatedFormData.contactEmail} sous peu. Si il n'y est pas, regardez dans vos indésirables.</div>
                    <div className="mt-3 mb-3">Numéro de confirmation: {updatedFormData.cartId}</div>
                    <div>Merci d'avoir fait affaire avec nous!</div>
                </>
            ) : (
                <div>Erreur: {replyFromServer}</div>
            )}
        </div>
    )
}

export default CheckoutReplyFromServer;