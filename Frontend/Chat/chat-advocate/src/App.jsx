import Header from './header'
import './App.css'
import Sender from './Sender.jsx'
import LeftBoxInfo from './LeftBoxInfo';
import Receiver from './Receiver.jsx';
import Text from './Text.jsx';
import RightBoxInfo from './RightBox.jsx';
function App() {


  return (
 <>
  <Header/>
  <div id="page">
     <div id="notify">
       <div id="person">
                <img id="pfp" src="./download.jpg" alt=""/>
                <div id="name-messages">
                <h3 id="name">The Guardian</h3>
                <h5 id="message">+ New Messages</h5>
                </div>
                <div id="role"><p>Virtual Assistant</p></div>
                </div>
        
      <LeftBoxInfo/>
     </div>
     <div id="convo">
       <div id="exchanges">
        <RightBoxInfo/>
        </div>
        
        
     </div>

  </div>
    
 </>
     
 
  )
}

export default App
