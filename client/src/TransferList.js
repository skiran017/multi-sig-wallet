import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  chakra,
} from "@chakra-ui/react";
export default function TransferList({ transfers, approveTransfer }) {
  return (
    <Table size="sm" variant="striped">
      <TableCaption>
        {transfers.length
          ? "Transactions waiting for approval or already approved"
          : "No transfers yet"}
      </TableCaption>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Amount</Th>
          <Th>To</Th>
          <Th>Approvals</Th>
          <Th>Sent</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transfers?.map((transfer) => {
          return (
            <Tr key={transfer?.id}>
              <Td>{transfer?.id}</Td>
              <Td>{transfer?.amount}</Td>
              <Td>
                <chakra.span
                >
                  {transfer?.to.slice(0,16)}...
                </chakra.span>
              </Td>
              <Td>{transfer?.approvals}</Td>
              <Td>{transfer?.sent ? "yes" : "no"}</Td>
              <Td>
                <chakra.span
                  bgColor="#2e0035"
                  color="#fff"
                  px="3"
                  py="2"
                  borderRadius="8px"
                  cursor="pointer"
                  onClick={() => approveTransfer(transfer?.id)}
                >
                  Approve
                </chakra.span>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
