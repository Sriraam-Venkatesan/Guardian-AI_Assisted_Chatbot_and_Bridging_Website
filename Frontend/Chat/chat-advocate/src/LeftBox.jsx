function LeftBox(props){
    
   
   
   
    return(
        <>
        <div id="person">
                <img id="pfp" src={props.image} alt=""/>
                <div id="name-messages">
                <h3 id="name">{props.name}</h3>
                <h5 id="message">+ New Messages</h5>
                </div>
                <div id="role"><p>{props.role}</p></div>
                </div>
        </>
    );
};
export default LeftBox;