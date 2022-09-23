import React from "react";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);
	const [btnHighlight, setBtnHighlight] = useState(false);
	const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
		return currentNumber + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ""}`;
	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}
		setBtnHighlight(true);

		const timer = setTimeout(() => {
			setBtnHighlight(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cartCtx.items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
