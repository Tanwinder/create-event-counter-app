import React from 'react';


class SessionTimeout extends React.Component {
    componentDidMount() {
        this.pageSessionLoad();
    }
    initialTimerstart = () => {
        this.timerid = setTimeout(() => {
            this.setState({overLay: true}, () => {
                this.rendertimeoutoverlay();
            })
        }, 9000);
        let events = ['click', 'scroll', 'dbclick', 'keypress', 'touchstart'];
        events.map( v => {
            return window.addEventListener(v , this.resetcount.bind(this))
        })
        return true;
    }
    pageSessionLoad = () => {
        this.initialTimerstart();
        if(this.getCookie('tt') || this.getTimeDiff(this.getCookie('tt'))) {
            this.keepSessionAlive();
        } else {
            this.refreshSession();
        }
    }
    getCookie(cname) {
        let name = cname + "=";
        let decodedcookie = document.cookie;
        let ca = decodedcookie.split(";");
        for( let i = 0; i < ca.length; i++) {
            let c = ca[1];
            while(c.charAt(0)== '') {
                c = c.substring(1);

            }
            if( c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    getTimeDiff = (timeStamp) => {
        if(timeStamp < this.getCurrentTime()) {
            return true;
        }
        return false;

    }
    getCurrentTime = () => {
        return new Date().getTime();
    }
    setCookieWithExpiry = (name, value) => {
        document.cookie = name + "=" + value + ';path=/ ; domain=.sidhu.com';
    }
    rendertimeoutoverlay = () => {
        this.overLayTimeout = setTimeout(() => {
            this.logout();
        }, 4000)
    }
    initialTimerstart = () => {
        
    }
    initialTimerstart = () => {
        
    }
    
    render() {
        return(
            <div>
                <div>session time out</div>
                <button type="button" onClick={() => alert("continue")}>continuw session</button>
                <button onClick={() => alert("hello")}>close</button>
            </div>
        )
    }
}

export default SessionTimeout;