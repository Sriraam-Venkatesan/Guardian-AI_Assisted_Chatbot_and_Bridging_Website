


function ProfilePage(props) {

    return (
        <>
            <div className="navigation_bar" id="bar">
                <div id="title"><a href="">
                    <img id="logo" src="./Guardian White.png" alt="" />
                    <h1 id="guardian">uardian</h1></a></div>
                <div></div>
                <div id="options">
                    <a href="http://localhost:8000/frontend/Home/HomePage copy.html"><h4>Home</h4></a>
                    <a href="http://localhost:5177"><h4>Chat</h4></a>
                    <button onClick={() => { document.cookie = "guardianUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; localStorage.removeItem('guardianUser'); window.location.href = 'http://localhost:8000/frontend/Home/HomePage copy.html'; }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'home-font' }}><h4>Logout</h4></button>
                </div>


            </div>
            <div className="main_page" id="page">
                <div id="desc">
                    <img id="pfp" src={props.image} alt="./download.jpg" />
                    <div id="prof-desc"> <h1 id="name">{props.name}</h1>
                        <p id="role">{props.role}</p>
                        <p><strong>Region:</strong> {props.area}</p>
                        <p><strong>Aadhar:</strong> {props.aadhar}</p>
                        <p><strong>Description:</strong> {props.description}</p>
                        <p><strong>Case Preferences:</strong> {props.case}</p>

                        <button>Connect +</button>
                        <button>Message</button>
                    </div>
                </div>
            </div>
            <div className="helpline_bar" id="helpline">
                <h1 id="queries" >For Queries Contact</h1>
                <hr id="line1" />
                <p id="call">Phone Number: +91 7305896363</p>
                <p id="mail" >Mail Id:  sriraam1411@gmail.com</p>
            </div>
        </>
    );
}
export default ProfilePage