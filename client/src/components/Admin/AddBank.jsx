import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Flex, Box, Card, Heading, Form, Field, Button,Loader,Text } from "rimble-ui";
import InitialiseWeb3 from "../utils/web3.js";

const AddBank = () => {

  const history = useHistory();
  const [isLoading, setisLoading] = useState(false)
  const [message, setMessage] = useState("Status Unknown")
  const [dmr, setDmr] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [formData, setformData] = useState({
    bName:"",
    bAddress:"",
    bContact:"",
    bWallet:""
  })

  const handelSubmit = (e)=>{
    e.preventDefault()
    setisLoading(true);
    addBank();
    console.log("Bank Added Successfully.....",formData)
  }

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    let [tempDmr, tempAcc] = await InitialiseWeb3();
    // console.log(tempDmr, tempAcc);
    setDmr(tempDmr);
    setAccounts(tempAcc);
    console.log(tempAcc);
  };

  const addBank = async()=>{
    console.log(accounts[0]);
    if (dmr && accounts) {
      
      try {
        dmr.methods
        .addBank(
          formData.bName,
          formData.bAddress,
          formData.bContact,
          formData.bWallet
        )
        .send({ from: accounts[0] })
        .then((res) => {
          console.log(res);
          setMessage("Account Added Successfully");
          setisLoading(false);
        });
      } catch (e) {
        
        setisLoading(false);
        setMessage("Failed");
        console.log("SOme Thing WeNt Wrong .....");
        // const data = e.data;
        // const txHash = Object.keys(data)[0]; // TODO improve
        // const reason = data[txHash].reason;    
        // console.log(reason); // prints "This is error message"
      }
    }
  }

  return (
    <Flex height={"100vh"}>
      <Box mx={"auto"} my={"auto"} width={[1, 9 / 12, 7 / 12]}>
        <Flex px={2} mx={"auto"} justifyContent="space-between">
          <Box my={"auto"}>
            <Heading as={"h2"} color={"primary"}>
              Update Details
            </Heading>
          </Box>
          <Box my={"auto"}>
            <Button onClick={() => {history.goBack()}}>
              Back
            </Button>
          </Box>
        </Flex>
        <Form id='update' onSubmit={handelSubmit}>
          <Card mb={20}>
            <Flex mx={-3} flexWrap={"wrap"}>
              <Box width={1} px={3}>
                <Field label="Bank Name" width={1}>
                  <Form.Input type="text" name="name" value={formData.bName} onChange={(e)=>setformData({...formData,'bName':e.target.value})} required width={1} />
                </Field>
              </Box>
              <Box width={1} px={3}>
                <Field label="Address" width={1}>
                  <Form.Input type="text" name="address" value={formData.bAddress} onChange={(e)=>setformData({...formData,'bAddress':e.target.value})} required width={1} />
                </Field>
              </Box>
              <Box width={1} px={3}>
                <Field label="Contact Number" width={1}>
                  <Form.Input type="text" name="Contact" value={formData.bContact} onChange={(e)=>setformData({...formData,'bContact':e.target.value})} required width={1} />
                </Field>
              </Box>
              <Box width={1} px={3}>
                <Field label="Wallet Address" width={1}>
                  <Form.Input type="text" name="Wallet" value={formData.bWallet} onChange={(e)=>setformData({...formData,'bWallet':e.target.value})} required width={1} />
                </Field>
              </Box>              
            </Flex>
          </Card>
            <Flex mx={-3} alignItems={"center"}>
                <Box px={3}>
                <Button  type="submit" mt={2} minWidth={'150px'}>
                {isLoading ? <Loader color="white" /> : <p>Submit</p>}
                </Button>
                </Box>
                {message && <Box px={3}><Text fontSize={'18px'}>{message}</Text></Box>}
            </Flex>
        </Form>
        <Card mt={20} mb={1}>© 2021-2022 Yadav Coin. All Rights Reserved.</Card>
      </Box>
    </Flex>
  );
};

export default AddBank;