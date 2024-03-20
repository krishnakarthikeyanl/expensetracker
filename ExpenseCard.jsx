const ExpenseCard= (props)=>{
    const{title,amount,deleteItem,id,setEditId}= props;
    const cardClass= amount>0 ? "pos":"neg";

    const handleDelete = ()=>{
        deleteItem(id);
    };
    const handleEdit = ()=>{
        setEditId(id);
    }
    return(
        <>
        <div className="expense-card-container">
        <div className={`expense ${cardClass}`}>
          <h4>{title}</h4>
          <p>{amount}</p>
        </div>
        <button onClick={handleEdit} className="edit">Edit</button>
        <button onClick={handleDelete}>Delete</button>
        </div>
        </>
    )
}
export default ExpenseCard;