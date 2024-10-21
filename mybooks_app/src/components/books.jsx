import react,{useState,useEffect} from 'react';
import axios from 'axios'


const books=()=>{


   const [mybooks,setMybooks]= useState([]);
   const [interBook , setInterBook] = useState();


   const getBooks = async()=>{
    try{
       const res = await axios.get("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yourkey");
       setMybooks(res.data.mybooks);
    }
    catch(error){console.error("not found",error)}
   }


   useEffect(()=>{
    getBooks()
   },[])


    const handleClick = (id) =>{
    const inbook = mybooks.filter((mybook,id)=>(mybook.id == id))
     setInterBook({...interBook,inbook});
   }


    return(
        <>
        <h4>MY WISH LIST</h4>
        <h5>{interBook.name}</h5>
          <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
            </tr>
          </thead>
          <tbody>
            {mybooks.map((mybook)=>(
                <tr key={mybook.id}>
                    <td>{mybook.id}</td>
                    <td>{mybook.name}</td>
                    <button onClick={()=>handleClick(mybook.id)}>Add To Wishlist</button>
                </tr>
            ))}
          </tbody>
        </>
    )
}
export default books