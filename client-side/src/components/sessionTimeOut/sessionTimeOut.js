import React, {Fragment} from 'react';
import {logOut} from '../../actions/authActions';
import { connect } from 'react-redux'


class SessionTimeout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overLay: false
        }
    }
    componentDidMount() {
        this.pageSessionLoad();
        console.log("renderd componentDidMount")
    }
    pageSessionLoad = () => {
        this.initialTimerstart();
        // if(this.getCookie('tt') || this.getTimeDiff(this.getCookie('tt'))) {
        //     this.keepSessionAlive();
        // } else {
        //     this.refreshSession();
        // }
    }
    initialTimerstart = () => {
        this.timerid = setTimeout(() => {
            console.log("renderd initialTimerstart")
            this.setState({overLay: true}, () => {
                this.rendertimeoutoverlay();
            })
        }, 5000);
        let events = ['click', 'scroll', 'dbclick', 'keypress', 'touchstart'];
        events.map( v => {
            return window.addEventListener(v , this.resetcount)
        })
        return true;
    }
    resetcount = () => {
        console.log("renderd resetcount")
        clearTimeout(this.timerid);
        this.initialTimerstart();
    }
    
    // getCookie(cname) {
    //     let name = cname + "=";
    //     let decodedcookie = document.cookie;
    //     let ca = decodedcookie.split(";");
    //     for( let i = 0; i < ca.length; i++) {
    //         let c = ca[1];
    //         while(c.charAt(0)== '') {
    //             c = c.substring(1);

    //         }
    //         if( c.indexOf(name) === 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }
    // getTimeDiff = (timeStamp) => {
    //     if(timeStamp < this.getCurrentTime()) {
    //         return true;
    //     }
    //     return false;

    // }
    // getCurrentTime = () => {
    //     return new Date().getTime();
    // }
    // setCookieWithExpiry = (name, value) => {
    //     document.cookie = name + "=" + value + ';path=/ ; domain=.sidhu.com';
    // }
    rendertimeoutoverlay = () => {
        this.overLayTimeout = setTimeout(() => {
            console.log("renderd rendertimeoutoverlay")
            this.props.logout();
        }, 1000)
    }
    // initialTimerstart = () => {
        
    // }
    // initialTimerstart = () => {
        
    // }
    
    render() {
        console.log("renderd session timeout")
        return(
            <Fragment>
                {
                    this.state.overLay ?
                    <div>
                        <div>session time out</div>
                        <button type="button" onClick={() => alert("continue")}>continuw session</button>
                        <button onClick={() => alert("hello")}>close</button>
                    </div>
                    :
                    ""
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // todo: state.todo,
        // value: state.todo.value,
        // listData: state.todo.listData,
        // loader: state.todo.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(logOut())
        // updateValue: value => dispatch(updateValue(value)),
        // addItem: item => dispatch(addItem(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionTimeout);