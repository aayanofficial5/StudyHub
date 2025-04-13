import {createSlice} from "@reduxjs/toolkit"

const  initialState = {
  totalItems : localStorage.getItem("totalItems") || 2
}


const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers:{
    //set total items
    setTotalItems(state,action){
      state.totalItems = action.payload;
    },
    //addToCart
    //removeFromCart
    //resetCart
  }
})

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;


