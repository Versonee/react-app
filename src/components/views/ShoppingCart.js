import React, {useState} from "react";

const ShoppingCart = (props) =>{
    const [shopList,setShopList] = useState(props.shopList || []);
    // const generateItem = () =>{
    //     let newShopItems=shopList;
    //     newShopItems.push(new ShopItem("a",10, ));
    //     window.localStorage.setItem("shopping-card-list",JSON.stringify(newShopItems));
    //     setShopList([...newShopItems]);
    // }
    const getTotalCost = () =>{
        let cost=0;
        shopList.forEach((value)=>{
            cost+=parseFloat(value.ticketPrice);
        })
        return cost;
    }
    const removeItem = (item) => {
        // shopList.pop(item)
        shopList.splice(shopList.indexOf(item), 1);
        setShopList([...shopList]);
        props.removeTrigger(shopList);
    }
    const createOrder=()=>{
        console.log("złożono zamówienie");
    }
    return(
        <div className="shopping-cart">
            <div className="cart-title">Shopping cart</div>
            <div className="shop-items">
                {shopList.map((value, index)=>{
                    return(
                        <div key={"shop-item-"+index} className="item">
                            <div className="from">{value.portLink.startingPort.name}</div>
                            <div className="arrow">to</div>
                            <div className="to">{value.portLink.endPort.name}</div>
                            <div className="price">
                                <div className="amount">{parseFloat(value.ticketPrice)}</div>
                                <div className="currency">PLN</div>
                            </div>
                            <div className="remove-item-container">
                                <div onClick={()=>removeItem(value)} className="remove-item">+</div>
                            </div>
                        </div>
                        );
                })}
            </div>
            {shopList.length > 0 &&
                <div className="summary">
                    <div className="total-cost">
                        <div className="description">Total:</div>
                        <div className="price">{getTotalCost()}</div>
                        <div className="currency">PLN</div>
                    </div>
                    <div className="buy-button" onClick={createOrder}>confirm</div>
                </div>
            }
            {shopList.length === 0 &&
                <div className="empty-message">Your basket is empty</div>
            }

        </div>
    )
}
export default ShoppingCart;
