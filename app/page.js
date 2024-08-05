'use client';
import Image from "next/image";
import {useState, useEffect} from "react";
import {firestore} from "@/firebase";
import {Box, Button, Modal, Stack, TextField, Typography} from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(true);
  const [itemName, setItemName] = useState('');

const updateInventory = async () => {
  const snapshot = query(collection(firestore, 'inventory'));
  const docs = await getDocs(snapshot);
  const inventoryList = [];
  docs.forEach((doc) => {
    inventoryList.push({
      name: doc.id,
      ...doc.data(),
    })
  })
  setInventory(inventoryList);
  console.log(inventoryList);
}

const addItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnapshot = await getDoc(docRef)

  if(docSnapshot.exists()) {
    const {quantity} = docsSnapshot.data()
    await setDoc(docRef, {quantity: quantity + 1})
  }
  else {
    await setDoc(docRef, {quantity: 1})
  }

  await updateInventory()
}

  const removeItem = async (item) => {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnapshot = await getDoc(docRef)

      if(docSnapshot.exists()) {
        const {quantity} = docsSnapshot.data()
        if (quantity == 1){
          await deleteDoc(docRef)
        }
        else {
          await setDoc(docRef, {quantity: quantity - 1})
        }
      }

      await updateInventory()
  }

  useEffect(() => {
  }, []);

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box 
    width = "100vw" 
    height = "100vh" 
    display = "flex" 
    justify-content = "center" 
    align-items = "center"
    gap = {2}
    > 
      <Modal open={open} onClose={handleClose}>
        <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="white"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
        >

          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
            variant="outlined"
            fullWidth
            value={itemName}
            onChange= {(e) => {
              setItemName(e.target.value)
            }}
            />
            
            <Button
            variant="outlined"
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
            >
            Add
            </Button>

          </Stack>

        </Box>
      </Modal>
      <Typography variant="h1">Inventory Mangement</Typography>

    </Box>
  );
}