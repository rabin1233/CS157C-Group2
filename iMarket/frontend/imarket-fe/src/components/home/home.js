import React,{useState} from 'react'


function Home(){
    return(
        <div>
            <div class = "navigationBar">
                <a href='/'>Home</a>
                <a href="/login"> Login/SignUp </a>

            </div>
        <h1 align = "middle"><b>Welcome to iMarket</b></h1>
         <div>
             <p> 
                 Welcome to iMarket. Here, we offer customers opportunity to keep track of all the items they have bought 
                 in their own inventory for FREE of charge. We also offer customer a way to post and sell the items that 
                 they don't need anymore. 
             </p>
         </div>

        </div>


    )
}

export default Home