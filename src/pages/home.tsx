import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Center,
  Spinner,
} from "@chakra-ui/react";
import GitHubApi from "../api/githubApi";
import UserTable from "../components/userTable";
import { UserData } from "../types/user";
import { useDebounce } from "../hooks/useDebounce";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const gitHubApi = GitHubApi.getInstance();

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const perPage = 5; // Number of users per page

  const debouncedSearch = useDebounce(
    async (query: string, pageNumber: number) => {
      if (!query) {
        setUsers([]);
        return;
      }
      setLoading(true);
      const searchUserApiResponse = await gitHubApi.searchUsers(query, pageNumber, perPage);
      const promises = searchUserApiResponse.users.map(user => gitHubApi.getUserDetails(user.login));
      const userData = await Promise.all(promises);
      userData.sort((a, b) => b.followers - a.followers);
      setUsers(userData);
      setTotalPages(Math.ceil(searchUserApiResponse.count / perPage));
      setLoading(false);
    },
    500
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    debouncedSearch(event.target.value, 1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    debouncedSearch(searchQuery, pageNumber); // Trigger search with the current query and new page number
  };

  return (
    <Box maxW="800px" mx="auto" mt="50px">
      <form>
        <FormControl>
          <FormLabel>Search GitHub Users</FormLabel>
          <Input
            backgroundColor="white"
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Enter GitHub username"
          />
        </FormControl>
      </form>

      {loading && (
        <Center mt="55">
          <Spinner size="xl" color="white" />
        </Center>
      )}

      {!loading && users.length > 0 && (
        <>
          <UserTable users={users} />
          <Flex alignItems="center" marginTop="10px">
            <div style={{ flexGrow: 1 }}></div>
            {currentPage > 1 ? (
              <ArrowLeftIcon
                marginRight="10px"
                cursor="pointer"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            ) : null}
            <div>
              {currentPage} / {totalPages}
            </div>
            {currentPage < totalPages ? (
              <ArrowRightIcon
                marginLeft="10px"
                cursor="pointer"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            ) : null}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Home;
