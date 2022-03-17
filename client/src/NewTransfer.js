import React from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  chakra,
  Button,
} from "@chakra-ui/react";
export default function NewTransfer({ createTransfer }) {
  const [transfer, setTransfer] = React.useState(null);
  const updateTransfer = (evt, type) => {
    const value = evt?.target?.value;
    if (!transfer) {
      setTransfer({ [type]: value });
    } else {
      setTransfer({ ...transfer, [type]: value });
    }
  };
  const submitHandler = (evt) => {
    evt.preventDefault();
    createTransfer(transfer);
  };
  return (
    <Flex
      alignItems="center"
      direction="column"
      borderRadius="8px"
      p="12px 14px"
      bgColor="white"
      mt={5}
      width="420px"
    >
      <Heading mt={2} mb={2} fontSize="24px">
        Create Transfer
      </Heading>
      <chakra.form
        display="flex"
        flexDirection="column"
        w="100%"
        onSubmit={submitHandler}
      >
        <FormControl mb={3} w="100%" isRequired>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Input
            id="amount"
            type="text"
            placeholder="0.05"
            onChange={(evt) => updateTransfer(evt, "amount")}
          />
        </FormControl>

        <FormControl mb={3} isRequired>
          <FormLabel htmlFor="to">To</FormLabel>
          <Input
            id="to"
            placeholder="0xe391e0252fEe4D40DE0f616698FC8b3aB3a2fd52"
            type="text"
            onChange={(evt) => updateTransfer(evt, "to")}
          />
        </FormControl>
        <Button
          _hover={{ bgColor: "#2E0035" }}
          mt={2}
          borderRadius="0"
          bgColor="#2E0035"
          color="#fff"
          type="submit"
        >
          Submit
        </Button>
      </chakra.form>
    </Flex>
  );
}
