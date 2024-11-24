<template>
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <router-link to="/">Go back to Home</router-link>
    </div>
  </template>
  
  <style>
  div {
    text-align: center;
    margin-top: 50px;
  }
  h1 {
    font-size: 2rem;
    color: #000;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  </style>
  