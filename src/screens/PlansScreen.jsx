import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./PlansScreen.css";
// import { useSelector } from "react-redux";
// import { selectUser } from "../features/userSlice";
// import { loadStripe } from "@stripe/react-stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  // const user = useSelector(selectUser);

  // Fetching prododuct data for display
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "products"), where("active", "==", true));
      const querySnapshot = await getDocs(q);

      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();

        // Access the "prices" subcollection within the specific product document
        const priceQuery = query(collection(productDoc.ref, "prices"));
        const priceSnap = await getDocs(priceQuery);

        const prices = [];
        priceSnap.forEach((price) => {
          prices.push({
            priceId: price.id,
            priceData: price.data(),
          });
        });
        products[productDoc.id].prices = prices;
      });
      setProducts(products);
    };
    console.log(products);
    fetchData();
  }, [products]);


  //THIS IS THE STRIPE FUCNTIONALITY, CAN'T GET IT TO WORK PROPERLY

  // const loadCheckout = async (priceId) => {
  //   try {
  //     const docRef = await addDoc(
  //       collection(db, `customers/${user.uid}/checkout_sessions`),
  //       {
  //         price: priceId,
  //         success_url: window.location.origin,
  //         cancel_url: window.location.origin,
  //       }
  //     );

  //     // You can access docRef.id to get the ID of the created document if needed.
  //     console.log("Document ID:", docRef.id);

  //     const stripe = await loadStripe(
  //       "pk_test_51OAInABhmtXXMEFxKC9fMSkm5oPovcxj3jg1RBUE5Q0FquIOm6XZBovep4cYGjYBlRbf3wj2QHfNfXNYyKUSnejT00zKC7Yxku"
  //     );

  //     const sessionId = (await docRef.get()).data().sessionId;

  //     stripe.redirectToCheckout({ sessionId });

  //   } catch (error) {
  //     alert(`An error occurred: ${error.message}`);
  //   }
  // };

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        // TODO add some logic to check if the user's subscription is active...
        return (
          <div className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button /* onClick={() => loadCheckout(productData.priceId) }*/>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
