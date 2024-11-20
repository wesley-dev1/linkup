import React from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import FriendsList from '../components/FriendsList';
import styled from 'styled-components';
import PendingRequests from '../components/PendingRequests';

const HomePageContainer = styled.div`
display: flex;
height: 100vh; /* Ensures the container fills the viewport height */
overflow: hidden; /* Prevents the body from scrolling */
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%; /* Fills the parent's height */
  position: relative; /* Required for the PendingRequests overlay */
`;
const SidebarContainer = styled.div`
  width: 320px; /* Matches the Sidebar width */
  height: 100%; /* Fills the parent's height */
  flex-shrink: 0; /* Prevents shrinking */
`;
const FeedWrapper = styled.div`
  flex: 1;
  overflow-y: auto; /* Makes the Feed scrollable */
  display: flex;
  flex-direction: column;
`;
const FriendsListContainer = styled.div`
  width: 250px; /* Matches the FriendsList width */
  height: 100%; /* Fills the parent's height */
  flex-shrink: 0; /* Prevents shrinking */
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <MainContent>
        {/* If PendingRequests is an overlay, include it here */}
        <PendingRequests />
        <FeedWrapper>
          <Feed />
        </FeedWrapper>
      </MainContent>

      <FriendsListContainer>
        <FriendsList />
      </FriendsListContainer>
    </HomePageContainer>
  );
};

export default HomePage;
