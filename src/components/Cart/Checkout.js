import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const isEmpty = (value) => value.trim() === "";

	const isFiveCharacters = (value) => value.trim().length === 5;

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredPostalCodeIsValid = isFiveCharacters(enteredPostalCode);
		const enteredCityIsValid = !isEmpty(enteredCity);

		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postalCode: enteredPostalCodeIsValid,
			city: enteredCityIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalCodeIsValid &&
			enteredCityIsValid;

		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
		});
	};

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={classes.control}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputsValidity.name && <p>Please enter a valid name.</p>}
			</div>
			<div className={classes.control}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!formInputsValidity.street && <p>Please enter a valid street.</p>}
			</div>
			<div className={classes.control}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeInputRef} />
				{!formInputsValidity.postalCode && (
					<p>Please enter a valid postal code.</p>
				)}
			</div>
			<div className={classes.control}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputsValidity.city && <p>Please enter a valid city.</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
