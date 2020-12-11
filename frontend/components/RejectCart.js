import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from './Items';

// useless compnent whatever 

class RejectCart extends Component {
   
    render() {
        return (
        
             
            <button onClick = {() => {
                if (confirm('GET YOUR HANDS OFF MY STUFF!!!!!!!!!!!')) {
                    // do nothing
                }
            }}>
                {this.props.children} </button>
            
        
        );
                
        
        
    }
}

export default RejectCart;