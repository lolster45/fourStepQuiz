//React...
import { useState, createContext } from 'react'
import {Link, HashRouter, Routes, Route} from "react-router-dom"
export const MyContext = createContext();

//Components...
import UserInfo from "./components/UserInfo"
import UserPlan from './components/UserPlan'
import AddOns from './components/AddOns'
import Summary from './components/Summar'

//Styles...
import "./index.scss"

function App() {

  const [form, setForm] = useState({
    "name": "",
    "email": "",
    "phone-number": "",
    "plan-type": "",
    "yearly": false,
    "add-ons": {
      "online-services": false,
      "larger-storage": false,
      "customizable-profile": false
    },
    "total": 0
  })

  const [pageNumber, setPageNumber] = useState(localStorage.getItem("formPageNav") || "1")
  localStorage.setItem("formPageNav", pageNumber)


  const [path, setPath] = useState("/")
  const [emailErr, setEmailErr] = useState(false)
  const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNextButtonMobile = () => {
      if(!regEx.test(form["email"])) {
          console.log("error")
          setEmailErr(true)
      } else {
          setPageNumber("2")
      }
  }

  const handleSubmitFormMobile = () => {
    if (!form["plan-type"] || form["total"] === 0) {
        console.log("failed to submit")
        return;
    }
    setForm({
        "name": "",
        "email": "",
        "phone-number": "",
        "plan-type": "",
        "yearly": false,
        "add-ons": {
        "online-services": false,
        "larger-storage": false,
        "customizable-profile": false
        },
        "total": 0
    })  
    
  }

  return (
    <div className="App">
      <HashRouter>
        <div className='form-wrap'>

          <nav className='form-nav'>
            <span>
              <div className={`number-circle ${path === "/" ? "active" : null} `}>1</div>
              <div className='step-info'>
                <span>Step 1</span>
                <span>YOUR INFO</span>
              </div>
            </span>
            <span>
              <div className={`number-circle ${path === "/UserPlan" ? "active" : null} `}>2</div>
              <div className='step-info'>
                <span>Step 2</span>
                <span>SELECT PLAN</span>
              </div>
            </span>
            <span>
              <div className={`number-circle ${path === "/AddOns" ? "active" : null} `}>3</div>
              <div className='step-info'>
                <span>Step 3</span>
                <span>ADD-ONS</span>
              </div>
            </span>
            <span>
              <div className={`number-circle ${path === "/Summary" ? "active" : null} `}>4</div>
              <div className='step-info'>
                <span>Step 4</span>
                <span>SUMMARY</span>
              </div>
            </span>
          </nav>

          <MyContext.Provider value={{ form, setForm, pageNumber, setPageNumber, setPath, emailErr, setEmailErr}}>
            <nav className='form-input'>
              <Routes>
                <Route path='/' element={<UserInfo/>} />
                <Route path='/UserPlan' element={<UserPlan/>} />
                <Route path='/AddOns' element={<AddOns/>} />
                <Route path='/Summary' element={<Summary/>} />
              </Routes>
            </nav>
          </MyContext.Provider>
          
          <nav className='mobile-nav'>
            {regEx.test(form["email"]) && path === "/" &&
              <Link to="/UserPlan">
                <button className='forward-nav first' onClick={handleNextButtonMobile} >Next</button>
              </Link>
            }
            {path === "/UserPlan" &&
              <>
                <Link to="/">
                  <button className='backward-nav'>Go back</button>
                </Link>
                <Link to="/AddOns">
                  <button className='forward-nav'>Next</button>
                </Link>
              </>
            }
            {path === "/AddOns" &&
              <>
                <Link to="/UserPlan">
                  <button className='backward-nav'>Go back</button>
                </Link>
                <Link to="/Summary">
                  <button className='forward-nav'>Next</button>
                </Link>
              </>
            }
            {path === "/Summary" &&
              <>
                <Link to="/AddOns">
                  <button className='backward-nav'>Go back</button>
                </Link>
                <Link to="/">
                  <button className='forward-nav' onClick={handleSubmitFormMobile}>Submit</button>
                </Link>
              </>
            }
          </nav>
          
        </div>
      </HashRouter>
    </div>
  )
}

export default App
