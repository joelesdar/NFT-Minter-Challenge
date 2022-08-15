import React from 'react';
import { DivForm } from './styles';
import { ImageUploader } from '../ImageUploader';

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
                    <ImageUploader/>
                    <div className="col-10 col-md-8 mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" id="addressValue" aria-describedby="emailHelp" onChange={e => saveAddress(e.target.value)}/>
                    </div>
                    <div className="col-10 col-md-8">
                        <a className="btn add-button" onClick={e => setArray([...addressArray, address])}>Add Address </a>
                        <h3>Minted addresses:</h3>
                        {
                            addressArray.map(address => 
                                <p>{address}</p>
                        )}
                    </div>
                        <button type="submit" className="btn send-button">Send addresses</button>
                </div>
            </div>
        </DivForm>
    );
}