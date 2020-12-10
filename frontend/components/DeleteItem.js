import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
            
        }
    }

`;

class DeleteItem extends Component {
    update = (cache, payload) => {
        // manually update cache client side to match server side mutation
        // read item with gql query
        const data = cache.readQuery({query : ALL_ITEMS_QUERY});
        // match deletd item out
        // why don't we use a hashmap instead??? sus
        data.items = data.items.filter(item => item.id 
            !== payload.data.deleteItem.id);
            // put items back
        cache.writeQuery({query: ALL_ITEMS_QUERY, data});
    };
    render() {
        return (
        <Mutation
         mutation = {DELETE_ITEM_MUTATION}
         variables = {{id : this.props.id}}
         update = {this.update}
         >
             {(deleteItem, {error}) => (
            <button onClick = {() => {
                if (confirm('you wanna remove this item from the swamp?')) {
                    deleteItem();
                }
            }}>
                {this.props.children} </button>
            )}
        </Mutation>
        );
                
        
        
    }
}

export default DeleteItem;