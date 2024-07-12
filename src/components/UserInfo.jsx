//React...
import { useContext, useEffect } from "react"
import { useNavigate, useLocation} from "react-router-dom"

//Components... 
import { MyContext } from "../App"

//Styles...
import "../index.scss"


const UserInfo = () => {
    const {form, setForm, setPageNumber, setPath, emailErr, setEmailErr} = useContext(MyContext)
    
    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const goToNextPage = useNavigate();
    const handleNextButton = () => {
        if(!regEx.test(form["email"])) {
            console.log("error")
            setEmailErr(true)
        } else {
            goToNextPage("/UserPlan")
            setPageNumber("2")
        }
    }


    const location = useLocation()
    useEffect(() => {
        setPath(location.pathname)
    }, [])

    return (
        <section className="user-input-wrap">
            <h1 className="title">Personal Info</h1>
            <p className="paragraph">Please provide your name, email address, and phone number</p>
            <label>
                Name:
                <input 
                    required
                    placeholder="e.g Stephen King"
                    name="name"
                    value={form['name']}
                    onChange={handleChange}
                />
            </label>
            <label>
                *Email address:
                {emailErr && <span className="error-msg">Invalid email</span>}
                <input 
                    placeholder="e.g stephenking@lorem.com"
                    name="email"
                    className={!emailErr ? "email-input" : "email-input active"}
                    value={form['email']}
                    onChange={handleChange}
                />
            </label>
            <label>
                Phone Number:
                <input 
                    placeholder="e.g +1234567890"
                    name="phone-number"
                    value={form['phone-number']}
                    onChange={handleChange}
                />
            </label>
            <button 
                className="button-nextPage" 
                onClick={handleNextButton}
            >
                Next
            </button>
        </section>
    )
}

export default UserInfo