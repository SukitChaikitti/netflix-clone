import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './Planscreen.css';
import {loadStripe} from '@stripe/stripe-js';

function Planscreen() {

    const [products , setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription , setSubscription] = useState(null);

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers').doc(user.uid).collection('checkout_sessions').add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });

        docRef.onSnapshot(async(snap) => {
            const {error , sessionId} = snap.data();

            if(error) {
                alert(error.message)
            }

            if(sessionId) {
                const stripe = await loadStripe('pk_test_51JMpWIDb3U5SpQnNYwdwOO3N3tono9OxUZblFRjVoaM5hW5WzhfogoJwvGj6RFvsaLGh2wLf7RLFMctGwfJdJ92I00dNerifDm');
                stripe.redirectToCheckout({ sessionId});
            }
        })
    };

    useEffect(() => {
        db.collection('customers').doc(user.uid).collection('subscriptions').get().then((quertSnapShot) => {
            quertSnapShot.forEach(async subscription => {

                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start
                })

            })
            
            
        })
    }, [user.uid]);

    useEffect(() => {
        db.collection('products').where('active','==',true).get().then(querySnapShot => {
            const products = {};
            querySnapShot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                });
            })
            setProducts(products);
        });

        
    }, []);

    console.log(products);
    console.log(subscription);

    return (
        <div className = 'plan'>
            <br/>
            {subscription && <p>Renewal date:{new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId , productData]) => {
                console.log(productData);
                console.log(subscription.role)
                const  isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);


                return (
                    <div key = {productId} className = {`${isCurrentPackage && 'plan__container--disabled'} plan__container`} >
                        <div className = 'plan__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick = {() => !isCurrentPackage && loadCheckout(productData.prices.priceId)} className = 'plan__button'>{isCurrentPackage ? 'Current Package':'Subscribe'}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Planscreen
