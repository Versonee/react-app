import React, {useState} from "react";
import {useHistory} from "react-router";

const ShoppingCart = (props) =>{
    const [shopList,setShopList] = useState(props.shopList || []);
    let history = useHistory();
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
        history.push("/payment");
    }
    return(
        <div className="shopping-cart">
            <div className="cart-title">Koszyk</div>
            <div className="shop-items">
                {shopList.map((value, index)=>{
                    return(
                        <div key={"shop-item-"+index} className="item">
                            <div className="arrow">z</div>
                            <div className="from">{value.portLink.startingPort.name}, {value.portLink.startingPort.planet.name}</div>
                            <div className="arrow">do</div>
                            <div className="to">{value.portLink.endPort.name}, {value.portLink.endPort.planet.name}</div>
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
                        <div className="description">Suma:</div>
                        <div className="price">{getTotalCost()}</div>
                    </div>
                    <div className="buy-button" onClick={createOrder}>płacę</div>
                </div>
            }
            {shopList.length === 0 &&
                <div className="empty-message">Twój koszyk jest pusty.</div>
            }

        </div>
    )
}
export default ShoppingCart;
