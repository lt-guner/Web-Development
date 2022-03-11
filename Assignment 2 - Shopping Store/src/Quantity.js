import React, {useState} from 'react';
import { FiPlus, FiMinus } from "react-icons/fi";

function Quantity() {

    // the quantity constant state from userState is set 0 and setQuantity function is declared to update the state as needed
    // incrementQuantity and decrementQuantity functions are used to chage the quantity state when by 1 and cannot be less than 0 or greater than 10
    // this are tied to onClick in the HTML code below with the icons from react-icons
    const [quantity, setQuantity] = useState(0);
    const incrementQuantity = () => ((quantity<10) ? (setQuantity(quantity+1)):(setQuantity(10)));;
    let decrementQuantity = () => ((quantity>0) ? (setQuantity(quantity-1)):(setQuantity(0)));
    
    return (
      <div> 
        <FiMinus onClick={decrementQuantity} />
        <label>{quantity}</label>
        <FiPlus onClick={incrementQuantity}/>
      </div>
    );
  }

export default Quantity;
