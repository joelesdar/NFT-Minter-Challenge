import React from 'react';
import { DivForm } from './styles';
import { ImageUploader } from '../ImageUploader';
import { Button } from '@web3uikit/core';

export const Form = ({addressArray, setArray}) => {

    let address;

    const saveAddress = (addressName) => {
        address = addressName;
        console.log(address);
    }

    // const handleNewAddress = () => {
    //     e.preventDefault();
    //     id++;
    //     setArray([
    //       ...address,
    //       id
    //     ]);
    //     console.log(addressArray);
    //   }

    // const sendArray = () => {
        
    // }

    return (
        <DivForm>
            <div className="container">
                <div className="row justify-content-around">
                    <h1>NFT Minter</h1>
                    <ImageUploader />
                </div>
            </div>
        </DivForm>
    );
}