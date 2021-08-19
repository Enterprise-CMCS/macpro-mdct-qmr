import React from "react";
import {UsaBanner} from "@cmsgov/design-system";
import {Button} from "@cmsgov/design-system";
import {QMRLogo} from "../header/QMRLogo";


/**
 * Component containing header
 * @param {Object} props - component properties
 */

function Header(props) {

    return (<>
        <div className="usa-banner-custom">
            <UsaBanner/>
        </div>
        <div className="nav-bar">
            <div className="header-wrapper">
                <div className="nav-left">
                <QMRLogo/>
                </div>
                <div className="nav-right">
                    {props.isAuthenticated ? (
                        <div className="dev-login">
                            Logged In
                        </div>
                    ) : (
                        <div className="dev-login">
                            <Button className="bg-white" onClick={props.handleLogin}>
                                Login
                            </Button>
                        </div>)
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Header;