import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FeedContainer = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 20px;
box-sizing: border-box;

  /* Estilos do Scrollbar Personalizado */
  scrollbar-width: thin;
  scrollbar-color: #4A00E0 #ECF0F1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #ECF0F1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4A00E0;
    border-radius: 10px;
    border: 2px solid #ECF0F1;
  }
`;

const CreatePostContainer = styled.div`
background-color: #FFFFFF;
padding: 15px;
border-radius: 8px;
margin-bottom: 20px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

h3 {
  color: #2C3E50;
}
`;


const PostInput = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  height: 80px;
  font-size: 14px;
  padding: 10px;
  border-radius: 4px;
  background-color: #F4F6F7;
  margin-bottom: 10px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background-color: #EAECEE;
  }
`;

const PostButton = styled.button`
  padding: 10px 20px;
  background-color: #2ECC71;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #27AE60;
  }
`;

const PostsList = styled.div`
flex: 1;
display: flex;
flex-direction: column;
gap: 20px;
overflow-y: auto; /* Permite que a lista de posts seja rolável */

/* Estilos do Scrollbar Personalizado */
scrollbar-width: thin;
scrollbar-color: #4A00E0 #ECF0F1;

&::-webkit-scrollbar {
  width: 8px;
}

&::-webkit-scrollbar-track {
  background: #ECF0F1;
}

&::-webkit-scrollbar-thumb {
  background-color: #4A00E0;
  border-radius: 10px;
  border: 2px solid #ECF0F1;
}
`;

const PostContainer = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PostAuthor = styled.span`
  font-weight: 600;
  color: #2C3E50;
`;

const PostDate = styled.span`
  font-size: 12px;
  color: #95A5A6;
`;

const PostContent = styled.p`
  font-size: 14px;
  color: #2C3E50;
`;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [novoPost, setNovoPost] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  // Dados fictícios para os posts
  const samplePosts = [
    {
      id: 1,
      author: 'João Silva',
      content: 'Este é um post de exemplo para a sua rede social.',
      date: '20 de novembro de 2023, 10:30',
    },
    {
      id: 2,
      author: 'Maria Oliveira',
      content: 'Adorei usar esta nova rede social!',
      date: '19 de novembro de 2023, 15:45',
    },
    {
      id: 3,
      author: 'Carlos Souza',
      content: 'Bom dia a todos!',
      date: '18 de novembro de 2023, 08:15',
    },
  ];

  const fetchPosts = () => {
    // Aqui estamos usando dados fictícios
    setPosts(samplePosts);
  };

  const handleCreatePost = () => {
    if (novoPost.trim() === '') return;

    const newPost = {
      id: posts.length + 1,
      author: 'Você',
      content: novoPost,
      date: new Date().toLocaleString('pt-BR'),
    };

    setPosts([newPost, ...posts]);
    setNovoPost('');
  };

  return (
    <FeedContainer>
      <CreatePostContainer>
        <h3>Criar Novo Post</h3>
        <PostInput
          placeholder="O que você está pensando?"
          value={novoPost}
          onChange={(e) => setNovoPost(e.target.value)}
        />
        <PostButton onClick={handleCreatePost}>Publicar</PostButton>
      </CreatePostContainer>
      <PostsList>
        {posts.map((post) => (
          <PostContainer key={post.id}>
            <PostHeader>
              <PostAuthor>{post.author}</PostAuthor>
              <PostDate>{post.date}</PostDate>
            </PostHeader>
            <PostContent>{post.content}</PostContent>
          </PostContainer>
        ))}
      </PostsList>
    </FeedContainer>
  );
};

export default Feed;
