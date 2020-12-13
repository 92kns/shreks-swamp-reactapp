import React, { Component } from 'react';
import {Mutation, Query} from 'react-apollo';
import Form from './styles/Form';
import gql from 'graphql-tag';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import {ALL_ITEMS_QUERY} from './Items';
import { RenameRootFields } from 'graphql-tools';
import { render } from 'nprogress';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
            $title: String!
            $description: String!
            $price: Int!
            $image: String
            $largeImage:String
            ) {
        createItem(
            title: $title
            description: $description   
            price: $price
            image: $image
            largeImage: $largeImage

        )
        {
            id
            }
    }

`;



class CreateItem extends Component {
    // constructor() {}

    state = {
        title: 'Cool swamp item',
        description: 'Probably belongs in a swamp',
        image: 'shrek.jpg',
        largeImage: 'large-shrek.jpg',
        price: 1000,
      };
    // state = {
    //     title: 'yeet',
    //     description: 'yeeter',
    //     image: 'yeet dotwinnipeg',
    //     largeImage: 'yeet big',
    //     price: 0,
    // };

    // events for State
    handleChange = (e) => {
        const {name, type, value} = e.target;
        // console.log({name,type,value});
        // const val = type === 'mi,n'
        const val = type === ' number'? parseFloat(value): value;
        // this.setState({title: e.target.value});'
        this.setState({[name] : val});

    };

    uploadFile = async e => {
        console.log('uploading!');
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'shreksswamp');



        const res =  await
         fetch('https://api.cloudinary.com/v1_1/dd5ugvqym/image/upload',
         {method: 'POST',
         body: data});

        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage:file.eager[0].secure_url
        });

    };

     hello =  () => {
        // alert('hiii');
       
        
        const {data, error, loading} = Query({ALL_ITEMS_QUERY});
        alert('wtf');
        alert(data.items.length);
        // Query query = ({query ALL_ITEMS_QUERY})
        //     {({data, error, loading}) =>
        //     {
        //         console.log('why cant go inside here')
        //         alert(data.items.length)
        //     }
            
    };

    render() {
        return(
        <Query query = {ALL_ITEMS_QUERY}>

            {({data, error, loading}) => {
                if (data.items.length > 12) {
                <p>SORRY NO MORE ITEMS</p>;
                // console.log('yeeeeet');
                // alert('yote')
                confirm('SORRY SWAMP IS FULL. DELETE ITEMS FROM ITEMS PAGE FIRST')
                Router.push({
                    pathname: '/items'
                });
                // return
                }
  
            
        return (

            
            <Mutation mutation = {CREATE_ITEM_MUTATION}
            variables = {this.state}>

                {(createItem, {loading,error}) => (
            <Form
            
            onSubmit={async e => {
                // this.hello()
                // stop the form from submitting
                console.log("Hello world   1!");
                e.preventDefault();
                console.log("Hello world! 2");
                // console.log(this.state);
                // call mutation
                const res = await createItem();
                console.log("Hello world! 3");
                // nav to the single item page
                console.log(res);
                Router.push({
                    pathname: '/items',
                    query: { id: res.data.createItem.id},
                });
             }}>
                 <Error error = {error}/>
                <fieldset disabled= {loading} aria-busy={loading}>
                    <label htmlFor="file">
                        Image
                        <input 
                        type="file" 
                        id="file" 
                        name="file" 
                        placeholder = "Upload an image"
                        // required value = {this.state.image}
                        onChange = {this.uploadFile}/>

                        {/* preview image to user */}
                        {this.state.image && <img
                        width = "200" 
                        src = {this.state.image}
                        alt="Upload Preview" />}
                    </label>

                    <label htmlFor="title">
                        Title
                        <input 
                        type="title" 
                        id="title" 
                        name="title" 
                        placeholder = "Title"
                        required value = {this.state.title}
                        onChange = {this.handleChange}/>
                    </label>

                    <label htmlFor="price">
                        Price
                        <input
                        type="number" 
                        id="price" 
                        name="price" 
                        placeholder = "Price"
                        required value = {this.state.price}
                        onChange = {this.handleChange}/>
                    </label>

                    <label htmlFor="description">
                        Description
                        {/* <input type="text"  */}
                        <textarea
                        id="description" 
                        name="description" 
                        placeholder = "Enter a Description"
                        required value = {this.state.description}
                        onChange = {this.handleChange}/>
                    </label>

                    <button type = "submit">THROW INTO SWAMP</button>
                </fieldset>
                {/* <h2>swamp an item</h2> */}
            </Form>
            )}</Mutation>
        );
    }}
    </Query>);
    }
}

export default CreateItem;
export {CREATE_ITEM_MUTATION};