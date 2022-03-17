import React from 'react';
import { List, ListItem, ListIcon, Flex, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
export default function Header({ approvers, quorum }) {
  return (
    <Flex direction="column" alignItems="center" mt={5}>
      <List spacing={3}>
        {approvers.map((approver) => (
          <ListItem color="whitesmoke">
            <ListIcon as={CheckCircleIcon} color="green.500" />
            {approver}
          </ListItem>
        ))}
      </List>
      <Flex mt={3}>
        <Text fontWeight="bold" mr={3} color="whitesmoke">
          Approvers: {approvers.length}
        </Text>
        <Text fontWeight="bold" color="whitesmoke">
          Quorum: {quorum}
        </Text>
      </Flex>
    </Flex>
  );
}
