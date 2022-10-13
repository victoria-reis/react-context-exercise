import React from "react";
import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			"https://food-ordering-app-4406c-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit ? (
				<>
					<ul className={classes["cart-items"]}>
						{cartCtx.items.map((item) => {
							return (
								<CartItem
									key={item.id}
									name={item.name}
									amount={item.amount}
									price={item.price}
									onRemove={cartItemRemoveHandler.bind(null, item.id)}
									onAdd={cartItemAddHandler.bind(null, item)}
								/>
							);
						})}
					</ul>
					<div className={classes.total}>
						<span>Total Amount</span>
						<span>${cartCtx.totalAmount.toFixed(2)}</span>
					</div>
					{isCheckout && (
						<Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
					)}
					{!isCheckout && (
						<div className={classes.actions}>
							<button
								className={classes["button--alt"]}
								onClick={props.onClose}
							>
								Close
							</button>
							{cartCtx.items.length > 0 && (
								<button className={classes.button} onClick={orderHandler}>
									Order
								</button>
							)}
						</div>
					)}
				</>
			) : isSubmitting ? (
				<p>Sending order data...</p>
			) : didSubmit ? (
				<p>Successfully sent order!</p>
			) : null}
		</Modal>
	);
};

export default Cart;
