import React from 'react';
import { 
    TopCategoriesByCountProducts, 
    TopProductsMoreExpensive 
} from "./cardsGraphs"
import { CountCategories, CountUsers, CountProducts } from './cardsGraphs/CardsCount';
import { UsersByCountProducts } from './cardsGraphs/usersByCountProducts';
import "./style.css"
export const Dashboard = () => {

    return (
        <div className='dashboard'>
            <div className='group-cards'>
                <CountUsers />
                <CountCategories />
                <CountProducts />
            </div>
            <div className='group-cards-graph'>
                <div className='cardGraph shadown-dash-default users-by-products'>
                    <div className='title'>
                        Users by products quantity
                    </div>
                    <div className='content-graph'>
                        <UsersByCountProducts />
                    </div>
                </div>
                <div className='cardGraph shadown-dash-default categories-by-quantity-products'>
                    <div className='title'>
                        Top 5 categories By Products quantity
                    </div>
                    <div className='content-graph'>
                        <TopCategoriesByCountProducts />
                    </div>
                </div>
                <div className='cardGraph shadown-dash-default products-more-expensive'>
                    <div className='title'>
                        Products more expensive
                    </div>
                    <div className='content-graph'>
                        <TopProductsMoreExpensive />
                    </div>
                </div>
            </div>
        </div>
    )    
}