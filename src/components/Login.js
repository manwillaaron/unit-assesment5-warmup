import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updatePasswordInput, updateUsernameInput, login } from '../dux/userReducer'


function Login(props) {
    // console.log(props)
    const {usernameInput, passInput, userLoggedIn} = props.userReducer
    return (
        <div>
            {userLoggedIn && <Redirect to='/profile'/>}
            <input
                value={props.userReducer.usernameInput}
                onChange={e=>props.updateUsernameInput(e.target.value)} />
            <input
                value={props.userReducer.passInput}
                onChange={e=>props.updatePasswordInput(e.target.value)} />
            <button onClick={()=>props.login(usernameInput, passInput)}>submit</button>
        </div>
    )
}
function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {login, updatePasswordInput, updateUsernameInput })(Login)