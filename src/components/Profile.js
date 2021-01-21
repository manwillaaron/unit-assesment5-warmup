import { connect } from "react-redux"


function Profile(props) {
    console.log(props)
    const {user} = props.userReducer
    return(
        <div>
            <p>welcome {user.username}!</p>
            <p></p>
            <p></p>
            <p></p>
        </div>
    )

}
function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Profile)