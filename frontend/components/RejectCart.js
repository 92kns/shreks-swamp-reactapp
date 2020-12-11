import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from './Items';

// useless compnent whatever 

class RejectCart extends Component {
   
    render() {
        return (
        
             
            <button onClick = {() => {
                if (confirm('Get your hands off my stuff!')) {
                    // do nothing
                }
            }}>
                {this.props.children} </button>
            
        
        );
                
        
        
    }
}

export default RejectCart;