import styled from 'styled-components'

const StyledForm = styled.div`

    background: #383838;
    color: #41EFBD;
    padding: 3rem;
    font-family: 'Poppins', sans-serif;
    border-radius: 40px;

    h1 {
        text-align: center;
    }

    .add-button {
        background: #FF7694;
    }

    .send-button {
        background: #41EFBD;
    }


`;

const Form = ({addressArray, setArray}) => {

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
        <StyledForm>
            <div className="container">
                <div className="row justify-content-around">
                    <h1>Adresses Minter</h1>
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
        </StyledForm>
    );
}

export default Form;