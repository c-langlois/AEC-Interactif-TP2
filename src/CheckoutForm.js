import React, { useState } from 'react';
import CheckoutPost from './CheckoutPost';

function CheckoutForm({cartLength}) {

    const [formContactEmail, setFormContactEmail] = useState('');
    const [formContactName, setFormContactName] = useState('');
    const [formContactFirstName, setFormContactFirstName] = useState('');
    const [formContactLastName, setFormContactLastName] = useState('');
    const [formAddressLine1, setFormAddressLine1] = useState('');
    const [formAddressLine2, setFormAddressLine2] = useState('');
    const [formCity, setFormCity] = useState('');
    const [formProvince, setFormProvince] = useState('');
    const [formPostalCode, setFormPostalCode] = useState('');
    const [formContactPhone, setFormContactPhone] = useState('');
    const [formCreditCardNumber, setFormCreditCardNumber] = useState('');
    const [formCreditCardExpirationMonth, setFormCreditCardExpirationMonth] = useState('');
    const [formCreditCardExpirationYear, setFormCreditCardExpirationYear] = useState('');
    const [formCreditCardCvv, setFormCreditCardCvv] = useState('');
    const [formShippingMode, setFormShippingMode] = useState('');

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [errors, setErrors] = useState({
        formContactEmail: '',
        formContactName: '',
        formContactFirstName: '',
        formContactLastName: '',
        formAddressLine1: '',
        formCity: '',
        formProvince: '',
        formPostalCode: '',
        formContactPhone: '',
        formCreditCardNumber: '',
        formCreditCardExpirationMonth: '',
        formCreditCardExpirationYear: '',
        formCreditCardCvv: ''
    });

    const formData = {
        contactEmail: formContactEmail,
        contactName: formContactName,
        contactFirstName: formContactFirstName,
        contactLastName: formContactLastName,
        addressLine1: formAddressLine1,
        addressLine2: formAddressLine2,
        city: formCity,
        province: formProvince,
        postalCode: formPostalCode,
        contactPhone: formContactPhone,
        creditCardNumber: formCreditCardNumber,
        creditCardExpirationMonth: formCreditCardExpirationMonth,
        creditCardExpirationYear: formCreditCardExpirationYear,
        creditCardCvv: formCreditCardCvv,
        shippingMode: formShippingMode
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (formContactEmail === '' || !emailRegex.test(formContactEmail)) {
            newErrors.formContactEmail = 'Courriel n\'est pas valide.';
        }
        if (formContactName === '') {
            newErrors.formContactName = 'Nom du contact doit être remplis';
        }
        if (formContactFirstName === '') {
            newErrors.formContactFirstName = 'Prénom doit être remplis';
        }
        if (formContactLastName === '') {
            newErrors.formContactLastName = 'Nom de famille doit être remplis';
        }
        if (formAddressLine1 === '') {
            newErrors.formAddressLine1 = 'Adresse (ligne 1) doit être remplis';
        }
        if (formCity === '') {
            newErrors.formCity = 'Ville doit être remplis';
        }
        if (formProvince === '') {
            newErrors.formProvince = 'Province doit être remplis';
        }
        const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        if (formPostalCode === '' || !postalCodeRegex.test(formPostalCode)) {
            newErrors.formPostalCode = 'Code postal n\'est pas valide.';
        }
        const phoneRegex = /^(\+1\s?)?(\d{3}|\(\d{3}\))[-.\s]?\d{3}[-.\s]?\d{4}(\s?(ext|x|ext.)\s?\d{2,5})?$/;
        if (formContactPhone === '' || !phoneRegex.test(formContactPhone)) {
            newErrors.formContactPhone = 'Téléphone n\'est pas valide';
        }
        const creditCardNumberRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        if (formCreditCardNumber === '' || !creditCardNumberRegex.test(formCreditCardNumber)) {
            newErrors.formCreditCardNumber = 'Numéro de carte de crédit n\'est pas valide.';
        }
        const creditCardMonthRegex = /^(?:[1-9]|1[0-2])$/;
        if (formCreditCardExpirationMonth === '' || !creditCardMonthRegex.test(formCreditCardExpirationMonth)) {
            newErrors.formCreditCardExpirationMonth = 'Mois d\'expiration n\'est pas valide.';
        }
        const creditCardYearRegex = /^(?:2[3-9]|[3-9]\d+)$/;
        if (formCreditCardExpirationYear === '' || !creditCardYearRegex.test(formCreditCardExpirationYear)) {
            newErrors.formCreditCardExpirationYear = 'Année d\'expiration n\'est pas valide.';
        }
        const cvvRegex = /^[0-9]{3}$/;
        if (formCreditCardCvv === '' || !cvvRegex.test(formCreditCardCvv)) {
            newErrors.formCreditCardCvv = 'Code de sécurité (CVV) n\'est pas valide.';
        }
        
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            setFormSubmitted(true);
        }
    };

    return (
        <div className="panier">
            <div className="titlePage">
                <h1>Régler la facture{' '}</h1>
            </div>
            {cartLength ? (<>
                {formSubmitted && Object.keys(errors).length === 0 ? (
                <CheckoutPost formData={formData} />
                ) : (
                <form className="checkout" onSubmit={handleFormSubmit}>
                    <h2 className="checkout-subtitle">Informations</h2>
                    <div>
                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="contactEmail">Courriel</label>
                                <input type="email" name="contactEmail" value={formContactEmail} onChange={(e) => setFormContactEmail(e.target.value)} required />
                            </div>
                            {errors.formContactEmail && <div className="error">{errors.formContactEmail}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="contactName">Nom du contact</label>
                                <input type="text" name="contactName" value={formContactName} onChange={(e) => setFormContactName(e.target.value)} required />
                            </div>
                            {errors.formContactName && <div className="error">{errors.formContactName}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="firstName">Prénom</label>
                                <input type="text" name="contactFirstName" value={formContactFirstName} onChange={(e) => setFormContactFirstName(e.target.value)} required />
                            </div>
                            {errors.formContactFirstName && <div className="error">{errors.formContactFirstName}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="lastName">Nom de famille</label>
                                <input type="text" name="contactLastName" value={formContactLastName} onChange={(e) => setFormContactLastName(e.target.value)} required />
                            </div>
                            {errors.formContactLastName && <div className="error">{errors.formContactLastName}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="addressLine1">Adresse (ligne 1)</label>
                                <input type="text" name="addressLine1" value={formAddressLine1} onChange={(e) => setFormAddressLine1(e.target.value)} required />
                            </div>
                            {errors.formAddressLine1 && <div className="error">{errors.formAddressLine1}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="addressLine2">Adresse (ligne 2)</label>
                                <input type="text" name="addressLine2" value={formAddressLine2} onChange={(e) => setFormAddressLine2(e.target.value)} />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="city">Ville</label>
                                <input type="text" name="city" value={formCity} onChange={(e) => setFormCity(e.target.value)} required />
                            </div>
                            {errors.formCity && <div className="error">{errors.formCity}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="province">Province</label>
                                <select name="province" value={formProvince} onChange={(e) => setFormProvince(e.target.value)}required >
                                    <option value="">Province ou un territoire</option>
                                    <option value="AB">Alberta</option>
                                    <option value="BC">Colombie-Britannique</option>
                                    <option value="MB">Manitoba</option>
                                    <option value="NB">Nouveau-Brunswick</option>
                                    <option value="NL">Terre-Neuve-et-Labrador</option>
                                    <option value="NS">Nouvelle-Écosse</option>
                                    <option value="NT">Territoires du Nord-Ouest</option>
                                    <option value="NU">Nunavut</option>
                                    <option value="ON">Ontario</option>
                                    <option value="PE">Île-du-Prince-Édouard</option>
                                    <option value="QC">Québec</option>
                                    <option value="SK">Saskatchewan</option>
                                    <option value="YT">Yukon</option>
                                </select>
                            </div>
                            {errors.formProvince && <div className="error">{errors.formProvince}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="postalCode">Code postal</label>
                                <input type="text" name="postalCode" value={formPostalCode} onChange={(e) => setFormPostalCode(e.target.value)} required />
                            </div>
                            {errors.formPostalCode && <div className="error">{errors.formPostalCode}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="contactPhone">Téléphone de contact</label>
                                <input type="tel" name="contactPhone" value={formContactPhone} onChange={(e) => setFormContactPhone(e.target.value)} required />
                            </div>
                            {errors.formContactPhone && <div className="error">{errors.formContactPhone}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="creditCardNumber">Numéro de carte de crédit</label>
                                <input type="text" name="creditCardNumber" value={formCreditCardNumber} onChange={(e) => setFormCreditCardNumber(e.target.value)} required />
                            </div>
                            {errors.formCreditCardNumber && <div className="error">{errors.formCreditCardNumber}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="creditCardExpirationMonth">Mois d'expiration</label>
                                <input type="text" name="creditCardExpirationMonth" value={formCreditCardExpirationMonth} onChange={(e) => setFormCreditCardExpirationMonth(e.target.value)} required />
                            </div>
                            {errors.formCreditCardExpirationMonth && <div className="error">{errors.formCreditCardExpirationMonth}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="creditCardExpirationYear">Année d'expiration</label>
                                <input type="text" name="creditCardExpirationYear" value={formCreditCardExpirationYear} onChange={(e) => setFormCreditCardExpirationYear(e.target.value)} required />
                            </div>    
                            {errors.formCreditCardExpirationYear && <div className="error">{errors.formCreditCardExpirationYear}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="creditCardCvv">Code de sécurité (CVV)</label>
                                <input type="text" name="creditCardCvv" value={formCreditCardCvv} onChange={(e) => setFormCreditCardCvv(e.target.value)} required />
                            </div>
                            {errors.formCreditCardCvv && <div className="error">{errors.formCreditCardCvv}</div>}
                        </div>

                        <div className="input-wrapper">
                            <div className="checkout-form">
                                <label className="textDescription" htmlFor="shippingMode">Mode d'expédition</label>
                                <select name="shippingMode" value={formShippingMode} onChange={(e) => setFormShippingMode(e.target.value)} required>
                                    <option value="">Mode d'expédition</option>
                                    <option value="standard">Standard - 10$</option>
                                    <option value="express">Express - 20$</option>
                                    <option value="pickup">En personne - Gratuit</option>
                                </select>
                            </div>
                            {errors.formShippingMode && <div className="error">{errors.formShippingMode}</div>}
                        </div>
                    </div>
                    <input id="btnListWish" type="submit" value="Soumettre"/>
                </form>
                )}</>
            ) : (
                <div className='sousTitle'>Le panier est vide.</div>
            )}
      </div>

    )
}

export default CheckoutForm;