import React from "react";
import { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	// const cartItems = [{ id: "c1", name: "Sushi", amount: 2, price: 12.98 }];

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	return (
		<Modal onClose={props.onClose}>
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
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					Close
				</button>
				{cartCtx.items.length > 0 && (
					<button className={classes.button}>Order</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
