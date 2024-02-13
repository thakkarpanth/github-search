import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { UserData } from '../types/user';

interface UserTableProps {
  users: UserData[];
}

const UserTable = (props: UserTableProps) => {
  const { users } = props;
  return (
    <Table backgroundColor="white" variant="simple" mt="4">
      <Thead>
        <Tr>
          <Th>Avatar</Th>
          <Th>Username</Th>
          <Th>Followers</Th>
          <Th>Following</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                width="50"
              />
            </Td>
            <Td>{user.login}</Td>
            <Td>{user.followers}</Td>
            <Td>{user.following}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UserTable;
