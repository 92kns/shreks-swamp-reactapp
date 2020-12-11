import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import RejectCart from './RejectCart'

class Item extends Component {
    static propTypes = {
        items: PropTypes.object.isRequired,

    };

    render() {
        
        const item = this.props.item;
        return (
            <ItemStyles>
                {item.image && <img src={item.image} alt={item.title}/>}
                <Title>
                    <Link href = {{
                        pathname: '/item',
                        query:  {id: item.id},
                    }}>
                    <a> 
                    {item.title}
                    </a>
                    </Link>
                </Title>
                <PriceTag>
                    {formatMoney(item.price)}
                </PriceTag>
                <p>{item.description}</p>

                <div className="buttonList">
                    <Link href ={{
                        pathname:"update",
                        query: {id: item.id}
                    }}>
                    <a>Edit item</a>
                    </Link>
                    {/* <button>Add To Cart</button> */}
                    <RejectCart id = {item.id}>Add To Cart</RejectCart>
                    <DeleteItem id = {item.id}>Delete This Item</DeleteItem>

                </div>
            </ItemStyles>
        );
    }
}

// Item.propTypes = {

// };

export default Item;