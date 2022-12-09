import {useState} from "react";
import {auth, multiFactorAuthentication, verifyRecaptha} from "../services/LoginService";
import ReCAPTCHA from "react-google-recaptcha"


const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const multiFactorAuth = async (email: string) => {
        const data = await multiFactorAuthentication(email);
        let foo = prompt('Type here the code you received in your email');
        return foo == data.data;
    }


    const handleSubmit = async () => {
        if (email === '' || password === '') {
            alert('email or password is empty');
            return
        }

        if (recaptchaToken === null) {
            alert('verify that you are no robot');
            return;
        }

        if (recaptchaToken === 'Human') {

            if (await multiFactorAuth(email)) {
                const data = await auth(email, password);
                if (data.data === 'account is blocked') {
                    alert('account is blocked');
                    return;
                }
                if (data.data !== null) {
                    localStorage.setItem('jwt', data.data);
                    window.location.replace('http://localhost:3000/')
                } else alert('password or username is wrong');

            }
        } else alert('bots are not allowed here')
    }


    const getRecaptchaToken = async (value: any) => {
        setRecaptchaToken(await verifyRecaptha(value));
    }

    return <>
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-5">Sign in</h3>

                                <div className="form-outline mb-4">
                                    <input onChange={e => setEmail(e.target.value)} type="email" id="typeEmailX-2"
                                           className="form-control form-control-lg"/>
                                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input onChange={e => setPassword(e.target.value)} type="password"
                                           id="typePasswordX-2"
                                           className="form-control form-control-lg"/>
                                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                </div>

                                <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY!}
                                           onChange={getRecaptchaToken}
                                           id={'recaptcha'}
                                />

                                <button onClick={handleSubmit} className="btn btn-primary btn-lg btn-block"
                                        type="submit">Login
                                </button>

                                <p className="text-center text-muted mt-5 mb-0">Don't have an account? <a
                                    href="http://localhost:3000/register"
                                    className="fw-bold text-body"><u>register here</u></a></p>
                                <hr className="my-4"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default LoginComponent;
