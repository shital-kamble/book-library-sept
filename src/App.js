import './App.css';
import React,{useState, useEffect, Component} from "react";
import axios from 'axios';
import Header from './components/Header'
import BookList from './components/BookList.jsx';
import BookNotFound from './components/BookNotFound';

function App() {
  // all states of keyZoneBooks books , searchTerm, 

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");




  // ----------------------------------user search info ---------------------------------

  function implementSearchTerm (e){
    const search = e.target.value;
    setSearchTerm(search);
  }

  // ----------------------------------button search --------------------------------

  async function implementSearch(e) {
    e.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm.split(" ").join("+")}`;
    const searchBooks = await axios.get(url);
    try{
      setBooks(searchBooks.data.items);
    }
    catch{
      console.log("this is error");
    }

  }
 

//------------------------------------- default books setup using useEffect----------------------------------

  useEffect(() => {
    async function fetchDefaultLoadBooks() {
      const harrypotterBooks =  await axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter');
      const sherlockHolmesBooks = await axios.get('https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes');
      
      try{
        const defaultBooks = [...harrypotterBooks.data.items,...sherlockHolmesBooks.data.items];
        setBooks(defaultBooks);
      }
      catch{
        console.log("this is error");
      }
    }


    fetchDefaultLoadBooks();
  }, []);


  return (
    <div className="App">
      <Header implementSearch={implementSearch} implementSearchTerm={implementSearchTerm}/>
      {
        books.length==0 ? <BookNotFound /> : <BookList books={books}/>
      }
      
    </div>
  );
}

export default App;
