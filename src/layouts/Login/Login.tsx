import './Login.module.css';

export const Login = () => {
    return (
        <div className="row">
            <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                <div className="panel border bg-white">
                    <div className="panel-heading">
                        <h3 className="pt-3 font-weight-bold">Login</h3>
                    </div>
                    <div className="panel-body p-3">
                        <form action="login_script.php" method="POST">
                            <div className="form-group py-2">
                                <div className="input-field"> 
                                    <span className="far fa-user p-2"></span> 
                                    <input type="text" placeholder="Username or Email" required/> 
                                </div>
                            </div>
                            
                            <div className="form-group py-1 pb-2">
                                <div className="input-field"> 
                                    <span className="fas fa-lock px-2"></span> 
                                    <input type="password" placeholder="Enter your Password" required/> 
                                    <button className="btn bg-white text-muted"> 
                                        <span className="far fa-eye-slash"></span> 
                                    </button> </div>
                            </div>
                            <div className="form-inline"> <input type="checkbox" name="remember" id="remember"/> 
                                <label htmlFor="remember" className="text-muted">Remember me</label> 
                                <a href="#" className="forgotLink font-weight-bold">Forgot password?</a> 
                            </div>
                            
                            <div className="btn btn-primary btn-block mt-3">Login</div>
                            <div className="text-center pt-4 text-muted">Don't have an account? <a href="#">Sign up</a> </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}