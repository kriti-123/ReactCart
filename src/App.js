import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from "firebase";
class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading:true
    }
    this.db = firebase.firestore();
  }
  componentDidMount(){
  //   firebase
  //   .firestore()
  //   .collection('products')
  //   .get()
  //   .then((snapshot) => {
  //        console.log(snapshot);
         
  //        snapshot.docs.map((doc)=>{
  //          console.log(doc.data());

  //         const products = snapshot.docs.map((doc)=>{
  //           const data = doc.data();
  //           data['id'] = doc.id;
  //           return data;
            
  //                   })

  //         this.setState({
  //           products:products,
  //           loading:false
  //         })


  //   })
  //   })
    
    this.db
    .collection('products')
    .where('price','>=',234)
    .orderBy('price','asc')
    .onSnapshot((snapshot)=>{
      console.log(snapshot);
         
      snapshot.docs.map((doc)=>{
        console.log(doc.data());
        })
          const products = snapshot.docs.map((doc)=>{
            const data = doc.data();
            data['id'] = doc.id;
            return data;
            })
            this.setState({
            products:products,
            loading:false
          })

       })
    }


  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // })
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty:products[index].qty + 1
    })
    .then(()=>{
        console.log("updated");
    })
    .catch((error)=>{
       console.log(error);
    })
  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // })
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty:products[index].qty - 1
    })
    .then(()=>{
        console.log("updated");
    })
    .catch((error)=>{
       console.log(error);
    })
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items
    // })
    const docRef = this.db.collection('products').doc(id);
    docRef
    .delete()
    .then(()=>{
      console.log("deleted");
    })
    .catch((error)=>{
      console.log(error);
   })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }
  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if(product.qty>0){
      cartTotal = cartTotal + product.qty * product.price
      }
      return ''
    })

    return cartTotal;
  }
  addProduct = ()=>{
    this.db 
    .collection('products')
    .add({
      img:'',
      price:234,
      qty:23,
      title:"washing machine"
    })
    .then((docref)=>{
      console.log("product is added ",docref);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  render () {
    const { products,loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct}>add Product</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Product</h1>}
        <div>TOTAL:{this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;

