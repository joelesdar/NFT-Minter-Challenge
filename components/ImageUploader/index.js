import React, { useState, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import { DivUploader, DivCard, ImageWrapper, InputWrapper } from './styles';
import { Button, Input } from '@web3uikit/core';
import { abi, contractAddresses } from '../../contract';
import { useMoralis, useWeb3Contract } from 'react-moralis';

export const ImageUploader = () => {
  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const ethereumHistory = chainId in contractAddresses
    ? contractAddresses[chainId][0]
    : null;

  const [imagesObj, setImagesObj] = useState([]);
  const [imagesURI, setImagesURI] = useState([]);
  const [createNFTs, setCreateNFTs] = useState(false);
  const maxNumber = 5;
  const [tokensId, setTokensId] = useState([]);
  const [isLoadingSuccess, setIsLoadingSucess] = useState(false)

  // const dispatch = useNotification()

  const templateURI = {
    name: "",
    description: "",
    image: "",
    attributes: [
      {
        "trait-type": "AtributoUno",
        value: "",
      },
      {
        "trait-type": "AtributoDos",
        value: "",
      },
    ],
  }
  //
  //Get NFTs by Address
  const { runContractFunction: getTokensId } = useWeb3Contract({
    abi: abi,
    contractAddress: ethereumHistory,
    functionName: "getTokensId",
    params: {},
  })

  //Mint NFT
  const {
    runContractFunction: safeMint,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: ethereumHistory,
    functionName: "safeMint",
    params: { to: account, _ifpsUris: imagesURI },
  })

  const getAllMyTokensId = async () => {
    let tokensId = await getTokensId();

    let myTokensId = [];
    tokensId.map((t) => {
      myTokensId.push(parseInt(t));
    })

    setTokensId(myTokensId)
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      getAllMyTokensId()
    }
  }, [isWeb3Enabled]);

  const onChange = (imageList, addUpdateIndex) => {
    imageList.map((i) => {
      if (i.metadata == undefined) {
        i.metadata = templateURI;
      }
    })
    setImagesObj(imageList)
  }

  const onChangeMetaData = (index, field, idx, value) => {
    let newImages = [...imagesObj];
    if (field) newImages[index].metadata[field] = value;
    else newImages[index].metadata.attributes[idx].value = value;
    setImagesObj(newImages);
  }

  const UploadMetaData = async () => {
    //Upload Images To Pinata
    let urisimg = []
    await Promise.all(
      imagesObj.map(async (obj) => {
        await sendFileToIPFS(obj, urisimg)
      })
    )
    setImagesURI(urisimg)
  }

  const MinNFT = async () => {
    //Mintear NFT
    await safeMint({ onSuccess: handleSuccess })
  }

  const sendFileToIPFS = async (obj, urisimg) => {
    await fetch("https://pinata-api-heroku.herokuapp.com/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((response) => {
        urisimg.push(`ipfs://${response.IpfsHash}`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSuccess = async (tx) => {
    setIsLoadingSucess(true);
    await tx.wait(1);
    hadleNewNotification(tx);

    setIsLoadingSucess(false);
    //Limpiar Campos
    cleanInfo();

    setCreateNFTs(false);
    //Refrescar TokensId
    getAllMyTokensId();
  };

  const hadleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Completed!",
      title: "Tx Notification",
      position: "bottomR",
      icon: "bell",
    })
  };

  const cleanInfo = () => {
    setImagesObj([]);
    setImagesURI([]);
  };

  const [images, setImages] = useState([]);

  // const onChange = (imageList, addUpdateIndex) => {
  //   console.log(imageList, addUpdateIndex);
  //   setImages(imageList);
  // };

  return (
    <div className="container">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <DivUploader>
            <div className='row justify-content-center'>
              <div className="col-3">
                <Button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps} theme='colored' text='Click or Drop here' color='green' />
                &nbsp;
              </div>
              <div className="col-3">
                <Button onClick={onImageRemoveAll} theme='colored' text='Remove all' color='red' />
              </div>
              <div className="row justify-content-around">
                {imageList.map((image, index) => (
                  <DivCard key={index} className="col-12 col-md-5 col-lg-4 col-xl-3">
                    <ImageWrapper>
                      <img src={image.dataURL} alt="" />
                    </ImageWrapper>
                    <InputWrapper className="row justify-content-around">
                      <div className="col-10">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" id="addressValue" />
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" id="addressValue" />
                        <label className="form-label">Atribute</label>
                        <input type="text" className="form-control" id="addressValue" />
                      </div>
                      <Button onClick={() => onImageUpdate(index)} theme='colored' text='update' color='blue' />
                      <Button onClick={() => onImageRemove(index)} theme='colored' text='Remove' color='red' />
                    </InputWrapper>
                  </DivCard>
                ))}
              </div>
              <div className="row justify-content-center">
                <div className="col-3">
                  <Button onClick={
                    imagesURI.length == maxNumber
                      ? UploadMetaData
                      : function noRefCheck() {}
                    } theme='colored' text={
                      imagesObj.length == maxNumber
                        ? "Upload your NFT"
                        : `Please add ${maxNumber} images`
                    } color='yellow'
                    disabled={true}/>
                  <Button onClick={
                    imagesURI.length == maxNumber
                      ? MinNFT
                      : function noRefCheck() {}
                    } theme='colored'
                    text='Mint NFT'
                    color='green'/>
                </div>
              </div>
            </div>
          </DivUploader>
        )}
      </ImageUploading>
    </div>
  )
}